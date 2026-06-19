import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { Marked } from 'marked';

const marked = new Marked();

try {
  process.loadEnvFile();
} catch (e) {
  // Ignore if .env is missing
}
const API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'google/gemini-2.5-flash:free';

const VALID_TOPICS = [
  'religion', 'philosophy', 'politics', 'culture', 'books', 'history', 'AI',
  'climate', 'love', 'sex', 'cities', 'architecture', 'geopolitics',
  'consciousness', 'ecology', 'technology', 'future'
];

const CONTENT_DIRS = ['essays', 'letters', 'interviews', 'podcasts'];
const BASE_CONTENT_DIR = path.resolve('content');
const CACHE_FILE = path.resolve('.content-cache.json');
const OUTPUT_FILE = path.resolve('src/generated-content.json');

// Ensure content directories exist
CONTENT_DIRS.forEach(dir => {
  fs.mkdirSync(path.join(BASE_CONTENT_DIR, dir), { recursive: true });
});

// Load cache
let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch (e) {
    console.warn('Failed to parse cache, resetting:', e.message);
  }
}

// Compute SHA256 of content
function getHash(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

// Custom simple YAML frontmatter parser
function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: fileContent };
  }
  const yamlSection = match[1];
  const body = match[2];
  const data = {};

  yamlSection.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > -1) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      // Remove enclosing quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      data[key] = val;
    }
  });

  return { data, body };
}

// Simple rule-based keyword matching fallback for offline/errors
function getLocalKeywordTopics(title, body) {
  const text = (title + ' ' + body).toLowerCase();
  const assigned = [];
  if (text.includes('religion') || text.includes('faith') || text.includes('god') || text.includes('spiritual')) assigned.push('religion');
  if (text.includes('philosoph') || text.includes('meaning') || text.includes('reason') || text.includes('exist')) assigned.push('philosophy');
  if (text.includes('politic') || text.includes('capitalism') || text.includes('government') || text.includes('state')) assigned.push('politics');
  if (text.includes('culture') || text.includes('art') || text.includes('music') || text.includes('ghazal')) assigned.push('culture');
  if (text.includes('book') || text.includes('read') || text.includes('library') || text.includes('literature')) assigned.push('books');
  if (text.includes('history') || text.includes('past') || text.includes('renaissance') || text.includes('century')) assigned.push('history');
  if (text.includes('ai') || text.includes('artificial intelligence') || text.includes('algorithm') || text.includes('machine')) assigned.push('AI');
  if (text.includes('climate') || text.includes('warm') || text.includes('environment')) assigned.push('climate');
  if (text.includes('love') || text.includes('friend') || text.includes('intimacy')) assigned.push('love');
  if (text.includes('sex') || text.includes('gender') || text.includes('desire')) assigned.push('sex');
  if (text.includes('cit') || text.includes('urban') || text.includes('metro') || text.includes('street')) assigned.push('cities');
  if (text.includes('architect') || text.includes('build') || text.includes('concrete')) assigned.push('architecture');
  if (text.includes('geopolitic') || text.includes('border') || text.includes('global') || text.includes('nation')) assigned.push('geopolitics');
  if (text.includes('conscious') || text.includes('mind') || text.includes('meditat') || text.includes('attention')) assigned.push('consciousness');
  if (text.includes('ecology') || text.includes('nature') || text.includes('river') || text.includes('planet')) assigned.push('ecology');
  if (text.includes('technology') || text.includes('software') || text.includes('code') || text.includes('internet')) assigned.push('technology');
  if (text.includes('future') || text.includes('tomorrow') || text.includes('accelerat')) assigned.push('future');
  return assigned.length > 0 ? assigned : ['philosophy'];
}

// Request AI tagging from OpenRouter
async function getAiTopics(title, deck, bodyText) {
  const cleanBody = bodyText.replace(/<[^>]*>/g, '').slice(0, 1500); // Send first 1500 chars of body
  const systemPrompt = `You are a precise content classification assistant for the website "Desihippe".
Your job is to read an article (Title, Deck, and Body excerpt) and select the most relevant topic categories from this exact list:
[${VALID_TOPICS.join(', ')}].

Output MUST be a JSON array of strings containing ONLY items from the list above. Do not include markdown code block syntax. Return only the raw JSON.
Example output: ["AI", "technology", "future"]`;

  const userPrompt = `Title: ${title}\nDeck: ${deck}\nExcerpt:\n${cleanBody}`;

  const FREE_MODELS = [
    'google/gemini-2.5-flash:free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'deepseek/deepseek-chat:free',
    'openchat/openchat-7b:free',
    'mistralai/mistral-7b-instruct:free'
  ];

  for (const model of FREE_MODELS) {
    try {
      console.log(`🤖 Requesting AI topics for: "${title}" using ${model}...`);
      const response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://desihippe.com', 
          'X-Title': 'Desihippe Content Builder'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.1,
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API responded with status ${response.status}`);
      }

      const data = await response.json();
      const resultText = data.choices?.[0]?.message?.content?.trim();
      if (!resultText) {
        throw new Error('Empty response from OpenRouter');
      }

      // Try parsing as JSON array
      let parsed = JSON.parse(resultText);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        // Sometimes models wrap it in a root key
        const keys = Object.keys(parsed);
        if (keys.length === 1 && Array.isArray(parsed[keys[0]])) {
          parsed = parsed[keys[0]];
        } else {
          parsed = Object.values(parsed).flat();
        }
      }

      if (Array.isArray(parsed)) {
        // Filter valid topics (case-insensitive matching)
        const cleaned = parsed
          .map(t => String(t).trim())
          .filter(t => VALID_TOPICS.some(vt => vt.toLowerCase() === t.toLowerCase()))
          .map(t => VALID_TOPICS.find(vt => vt.toLowerCase() === t.toLowerCase()));
        
        if (cleaned.length > 0) {
          console.log(`✅ AI assigned topics: ${JSON.stringify(cleaned)}`);
          return cleaned;
        }
      }
      throw new Error('Could not parse valid topic array from AI response: ' + resultText);
    } catch (e) {
      console.warn(`⚠️ AI Tagging with ${model} failed for "${title}":`, e.message);
    }
  }

  const local = getLocalKeywordTopics(title, bodyText);
  console.log(`ℹ️ All free AI models failed. Falling back to keyword topics: ${JSON.stringify(local)}`);
  return local;
}

async function processAll() {
  const result = {
    essays: [],
    letters: [],
    interviews: [],
    podcasts: []
  };

  let cacheUpdated = false;

  for (const dir of CONTENT_DIRS) {
    const dirPath = path.join(BASE_CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    console.log(`Processing ${files.length} markdown file(s) in "content/${dir}"...`);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const rawContent = fs.readFileSync(filePath, 'utf8');
      const hash = getHash(rawContent);

      const { data, body } = parseFrontmatter(rawContent);
      const htmlBody = await marked.parse(body);

      const title = data.title || path.basename(file, '.md').replace(/-/g, ' ');
      const meta = data.meta || `${dir} / 5 min`;
      const deck = data.deck || '';
      const tone = data.tone || 'indigo';

      let topics = [];

      // Check cache first
      if (cache[filePath] && cache[filePath].hash === hash) {
        topics = cache[filePath].topics;
        console.log(`💾 Cache hit for: "${title}" -> ${JSON.stringify(topics)}`);
      } else {
        // If frontmatter specifies topics, we can use them directly or run AI to expand/verify.
        // Let's check frontmatter topics first. If they exist, we can parse them.
        if (data.topics) {
          topics = data.topics.split(',').map(t => t.trim()).filter(t => VALID_TOPICS.includes(t));
        }

        // If no valid topics are found in frontmatter, run AI tagging
        if (topics.length === 0) {
          topics = await getAiTopics(title, deck, body);
        }

        // Save to cache
        cache[filePath] = {
          hash,
          topics,
          timestamp: Date.now()
        };
        cacheUpdated = true;
      }

      result[dir].push({
        title,
        meta,
        deck,
        body: htmlBody,
        tone,
        topics,
        slug: path.basename(file, '.md')
      });
    }
  }

  // Save cache if updated
  if (cacheUpdated) {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
    console.log(`💾 Cache file updated: ${CACHE_FILE}`);
  }

  // Write the output file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf8');
  console.log(`🎉 Processed content saved to: ${OUTPUT_FILE}`);
}

processAll().catch(err => {
  console.error('Fatal processing error:', err);
  process.exit(1);
});
