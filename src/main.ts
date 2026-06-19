import './style.css'
import generatedContent from './generated-content.json'

type Question = {
  text: string
  field: string
  note: string
}

type Topic = {
  label: string
  x: number
  y: number
  tone: 'red' | 'green' | 'indigo' | 'earth' | 'saffron'
}

type RoutePage = {
  title: string
  kicker: string
  deck: string
  entries: Array<{
    meta: string
    title: string
    body: string
  }>
}

const questions: Question[] = [
  {
    text: 'Why are we lonely in the most connected age?',
    field: 'culture / technology',
    note: 'a letter on friendship, feeds, and the architecture of attention',
  },
  {
    text: 'Can capitalism survive AI?',
    field: 'future / economics',
    note: 'not a prediction, a map of incentives',
  },
  {
    text: 'Does religion divide us or save us?',
    field: 'religion / compassion',
    note: 'for people allergic to certainty but hungry for depth',
  },
  {
    text: 'What happens after work?',
    field: 'technology / meaning',
    note: 'a conversation between robots, poets, unions, and tired engineers',
  },
  {
    text: 'What if nationalism is adolescence?',
    field: 'history / politics',
    note: 'a generous argument against small identities',
  },
]

const topics: Topic[] = [
  { label: 'religion', x: 23, y: 20, tone: 'red' },
  { label: 'philosophy', x: 39, y: 10, tone: 'indigo' },
  { label: 'politics', x: 58, y: 18, tone: 'indigo' },
  { label: 'culture', x: 82, y: 26, tone: 'indigo' },
  { label: 'books', x: 14, y: 40, tone: 'saffron' },
  { label: 'history', x: 33, y: 46, tone: 'indigo' },
  { label: 'AI', x: 48, y: 34, tone: 'saffron' },
  { label: 'climate', x: 64, y: 42, tone: 'green' },
  { label: 'love', x: 86, y: 58, tone: 'red' },
  { label: 'sex', x: 18, y: 64, tone: 'indigo' },
  { label: 'cities', x: 30, y: 66, tone: 'indigo' },
  { label: 'architecture', x: 58, y: 68, tone: 'indigo' },
  { label: 'geopolitics', x: 70, y: 78, tone: 'indigo' },
  { label: 'consciousness', x: 18, y: 86, tone: 'saffron' },
  { label: 'ecology', x: 48, y: 82, tone: 'green' },
  { label: 'technology', x: 48, y: 96, tone: 'indigo' },
  { label: 'future', x: 76, y: 95, tone: 'indigo' },
]

const formats = [
  ['01', 'essays', 'slow arguments, reported wonder, anti-clickbait', 'pen'],
  ['02', 'interviews', 'people thinking in public without performance', 'chairs'],
  ['03', 'reading lists', 'books as portable villages, not trophies', 'books'],
  ['04', 'podcasts', 'voices that leave room for silence', 'mic'],
  ['05', 'salons', 'reading circles, addas, generous disagreement', 'hands'],
  ['06', 'letters', 'weekly questions, no urgency, no manipulation', 'letter'],
  ['07', 'discussions', 'doubt practiced with manners and heat', 'chat'],
  ['08', 'book clubs', 'texts as campfires, not credentials', 'openbook'],
  ['09', 'docs', 'documentaries for the long attention span', 'camera'],
  ['10', 'visual explainers', 'maps, diagrams, timelines, beautiful doubt', 'eye'],
]

const essays = [
  {
    label: 'Issue 001 / attention',
    title: 'Why are we lonely in the most connected age?',
    deck: 'A field note on friendship, feeds, memory, and the architecture of attention.',
    meta: '22 min read / citations 14',
    tone: 'red',
  },
  {
    label: 'Dispatch / future',
    title: 'Can capitalism survive AI?',
    deck: 'Not a prediction. A humane map of incentives, dignity, and work after work.',
    meta: '31 min read / citations 22',
    tone: 'indigo',
  },
  {
    label: 'Essay / faith',
    title: 'Does religion divide us or save us?',
    deck: 'A generous argument for spiritual depth without certainty, gurus, or cages.',
    meta: '18 min read / citations 9',
    tone: 'green',
  },
]

const quotes = [
  ['The revolution begins with attention.', 'field note / consciousness'],
  ['No gurus. Just questions.', 'house rule / anti-dogma'],
  ['Think like civilization depends on it.', 'poster / future club'],
]

const readingList = [
  ['The Whole Earth Catalog', 'tools for planetary imagination'],
  ['Santiniketan letters', 'learning as atmosphere'],
  ['Auroville notes', 'experiments in unfinished community'],
  ['The Caravan archive', 'long-form patience'],
]

const timeline = [
  ['renaissance salon', 'artists, scientists, poets, arguments'],
  ['summer of love', 'freedom, flowers, contradictions'],
  ['whole earth', 'tools, ecology, networks'],
  ['early internet', 'curiosity before sludge'],
  ['desihippe', 'better questions, fewer cages'],
]

const routePages: Record<string, RoutePage> = {
  essays: {
    kicker: 'essays',
    title: 'Long-form thinking for restless minds.',
    deck:
      'Essays at Desihippe are not takes. They are walks. Each one begins with an itch and ends with better attention.',
    entries: [
      {
        meta: 'philosophy / 22 min',
        title: 'Why do humans need meaning?',
        body:
          'A conversation between science, spirituality and civilization. We look at meaning as a public resource - something built in families, libraries, temples, studios, streets and friendships.',
      },
      {
        meta: 'technology / 31 min',
        title: 'Can capitalism survive AI?',
        body:
          'Jobs, power and purpose in an age of accelerating intelligence. Not doom, not hype - just a careful look at incentives, dignity and what work used to give us.',
      },
      {
        meta: 'cities / 18 min',
        title: 'Why are cities making us unhappy?',
        body:
          'On design, distance and the loneliness of the concrete age. A note from metro platforms, rented rooms, gated colonies and streets that forgot how to host people.',
      },
    ],
  },
  interviews: {
    kicker: 'interviews',
    title: 'People thinking slowly, in public.',
    deck:
      'No celebrity worship. No hot-seat theatre. Just conversations with builders, monks, designers, researchers, artists and people who kept their curiosity alive.',
    entries: [
      {
        meta: 'architect / auroville',
        title: 'What does a humane city remember?',
        body:
          'A conversation about shaded streets, water, material honesty and why concrete can feel lonely when it forgets the body.',
      },
      {
        meta: 'engineer / bengaluru',
        title: 'Can software have a conscience?',
        body:
          'On code, incentives, attention, open knowledge and the quiet violence of interfaces that make people smaller.',
      },
      {
        meta: 'musician / delhi',
        title: 'What does longing sound like after midnight?',
        body:
          'A talk about ghazals, house music, memory, exile and the strange democracy of a shared chorus.',
      },
    ],
  },
  salon: {
    kicker: 'salon',
    title: 'An adda with better lighting and fewer certainties.',
    deck:
      'The salon is a room for interdisciplinary friendship. Come with one doubt, one citation and one story from your life.',
    entries: [
      {
        meta: 'sunday circle',
        title: 'Are we becoming machines?',
        body:
          'A guided discussion on automation, exhaustion, embodiment and why intelligence without tenderness feels unfinished.',
      },
      {
        meta: 'reading room',
        title: 'Nationalism after adolescence',
        body:
          'A gentle argument about identity, belonging, maturity and the moral circle beyond flags.',
      },
      {
        meta: 'night session',
        title: 'Can love be political without becoming tribal?',
        body:
          'A conversation about solidarity, intimacy, disgust, borders and the difficult discipline of universal dignity.',
      },
    ],
  },
  'reading-lists': {
    kicker: 'reading lists',
    title: 'Maps for getting lost more intelligently.',
    deck:
      'Reading lists are assembled like travel diaries - a few books, one essay, one film, one question and a reason to keep going.',
    entries: [
      {
        meta: 'starter shelf',
        title: 'Whole Earth, small rooms, planetary minds',
        body:
          'Buckminster Fuller, Ursula Le Guin, Ivan Illich, Vandana Shiva, Rabindranath Tagore and one notebook with your own questions.',
      },
      {
        meta: 'attention shelf',
        title: 'How to stop being farmed by the feed',
        body:
          'Books and essays on attention, media, boredom, ritual and the small daily technologies of freedom.',
      },
      {
        meta: 'meaning shelf',
        title: 'For people who miss things they never had',
        body:
          'A humane sequence on loneliness, memory, spirituality, friendship and the ache behind modern convenience.',
      },
    ],
  },
  podcasts: {
    kicker: 'podcasts',
    title: 'Audio for walks, trains and uncertain evenings.',
    deck:
      'Field recordings, long conversations, monologues and gentle disagreements. No shouting. No guru voice. No fake urgency.',
    entries: [
      {
        meta: 'episode 01',
        title: 'The revolution begins with attention',
        body:
          'Why doomscrolling feels like participation and what it means to recover attention without becoming a productivity bro.',
      },
      {
        meta: 'episode 02',
        title: 'Are cities bad at friendship?',
        body:
          'Concrete, commute, rent, public benches, third places and the social life that urban design either permits or punishes.',
      },
      {
        meta: 'episode 03',
        title: 'Spirituality after certainty',
        body:
          'A conversation about Vedanta, Buddhism, science, doubt and the possibility of depth without domination.',
      },
    ],
  },
  letters: {
    kicker: 'letters',
    title: 'Slow mail from the unfinished future.',
    deck:
      'A letter arrives when there is something worth thinking about. It may include a question, a paragraph, a reading note or a small field report.',
    entries: [
      {
        meta: 'letter 07',
        title: 'Wake up gently',
        body:
          'A note on mornings, phones, inherited anxieties and the radical act of not beginning the day as a consumer.',
      },
      {
        meta: 'letter 08',
        title: 'No gurus, just questions',
        body:
          'Why charismatic certainty is seductive, why humility is harder and how groups can stay alive without becoming cages.',
      },
      {
        meta: 'letter 09',
        title: 'Humanity is still loading',
        body:
          'A small meditation on errors, updates, compassion and the unfinished software of moral life.',
      },
    ],
  },
  discussions: {
    kicker: 'discussions',
    title: 'Thoughtful disagreement without bloodsport.',
    deck:
      'A discussion is not a debate club with better fonts. It is a way to test ideas without humiliating the people holding them.',
    entries: [
      {
        meta: 'prompt',
        title: 'Does religion divide us or save us?',
        body:
          'Bring a memory, not a slogan. The room begins with lived experience before it touches doctrine.',
      },
      {
        meta: 'prompt',
        title: 'Can India avoid ecological collapse?',
        body:
          'A conversation across rivers, heat, development, dignity and the future of cities that still need monsoons.',
      },
      {
        meta: 'prompt',
        title: 'What can psychedelics teach us?',
        body:
          'Beyond escapism - altered states, humility, risk, care, ritual and the limits of neurochemical revelation.',
      },
    ],
  },
  'book-clubs': {
    kicker: 'book clubs',
    title: 'Texts as campfires, not credentials.',
    deck:
      'A book club for people who underline badly, argue kindly and believe a sentence can still change the temperature of a room.',
    entries: [
      {
        meta: 'month 01',
        title: 'The machine and the soul',
        body:
          'A paired reading on AI, human dignity and the strange comfort of tools that also threaten to flatten us.',
      },
      {
        meta: 'month 02',
        title: 'Cities, loneliness and public life',
        body:
          'Jane Jacobs beside Indian street life, metro maps, tea stalls and the vanishing art of loitering without buying.',
      },
      {
        meta: 'month 03',
        title: 'Mysticism for rational people',
        body:
          'A careful route through Advaita, Buddhism, neuroscience, poetry and the discipline of not pretending to know.',
      },
    ],
  },
  docs: {
    kicker: 'docs',
    title: 'Documentaries for the long attention span.',
    deck:
      'Film essays, research diaries and quiet documentaries that look at the world as if complexity is not a bug.',
    entries: [
      {
        meta: 'film essay',
        title: 'The concrete age is lonely',
        body:
          'An urban diary about towers, rent, heat, security gates and the human need for messy public life.',
      },
      {
        meta: 'field doc',
        title: 'Auroville after the brochure',
        body:
          'A patient look at utopia, bureaucracy, ecology, idealism and what remains when experiments grow older.',
      },
      {
        meta: 'visual essay',
        title: 'The feed ate the adda',
        body:
          'How conversation became content, how content became identity and why we still need rooms with no algorithmic audience.',
      },
    ],
  },
  'visual-explainers': {
    kicker: 'visual explainers',
    title: 'Maps, diagrams, timelines and beautiful doubt.',
    deck:
      'Visual explainers are for ideas too tangled for hot takes. They turn complexity into a table you can sit around.',
    entries: [
      {
        meta: 'map',
        title: 'The moral circle keeps expanding',
        body:
          'A visual map of who counts, who gets excluded and how compassion becomes political without becoming tribal.',
      },
      {
        meta: 'diagram',
        title: 'How outrage travels',
        body:
          'A gentle diagram of incentives, identity, humiliation, platforms and the ordinary loneliness underneath public anger.',
      },
      {
        meta: 'timeline',
        title: 'From Renaissance salons to group chats',
        body:
          'A history of rooms where people tried to think together - sometimes beautifully, sometimes badly, always humanly.',
      },
    ],
  },
  about: {
    kicker: 'about',
    title: 'Not a cult. Not a party. Not a media company.',
    deck:
      'Desihippe is an invitation to conscious living inspired by humanism, scientific temper, spiritual depth, ecological care and technological imagination.',
    entries: [
      {
        meta: 'principle',
        title: 'Question everything. Including us.',
        body:
          'A healthy community must contain tools for doubting itself. Otherwise it becomes theatre, tribe or brand.',
      },
      {
        meta: 'principle',
        title: 'No gurus',
        body:
          'We prefer rooms to thrones, questions to commandments and honest uncertainty to borrowed charisma.',
      },
      {
        meta: 'principle',
        title: 'For curious humans',
        body:
          'English-speaking Indians first, global minds welcome - artists, engineers, readers, burnt-out professionals and lonely intellectuals tired of algorithmic sludge.',
      },
    ],
  },
}

routePages.essays.entries = generatedContent.essays;
routePages.interviews.entries = generatedContent.interviews;
routePages.letters.entries = generatedContent.letters;
routePages.podcasts.entries = generatedContent.podcasts;


const footerSocials = [
  ['instagram', 'https://instagram.com/desihippe'],
  ['reddit', 'https://reddit.com/r/desihippe'],
  ['discord', 'https://discord.gg/desihippe'],
  ['medium', 'https://medium.com/@desihippe'],
  ['youtube', 'https://youtube.com/@desihippe'],
  ['podcasts', 'https://open.spotify.com/show/desihippe'],
  ['X.com', 'https://x.com/desihippe'],
  ['patreon', 'https://patreon.com/desihippe'],
]

const principles = [
  'curiosity over ideology',
  'compassion over ego',
  'truth over convenience',
  'meaning over consumption',
  'love over fear',
  'planet over profit',
  'consciousness over noise',
  'freedom with responsibility',
]

const manifestos = [
  'question beautifully',
  'think for yourself',
  'pause',
  'curiosity is resistance',
  'no gurus. just questions.',
  'become impossible to manipulate',
  'humanity is still loading',
  'the future is unfinished',
]

const app = document.querySelector<HTMLDivElement>('#app')!

function iconSvg(name: string) {
  const icons: Record<string, string> = {
    sun: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="24"/><circle cx="60" cy="60" r="7"/><path d="M60 8v22M60 90v22M8 60h22M90 60h22M23 23l16 16M81 81l16 16M97 23 81 39M39 81 23 97"/><path d="M42 60c7-9 13-13 18-13s11 4 18 13c-7 9-13 13-18 13s-11-4-18-13Z"/></svg>',
    lotus: '<svg viewBox="0 0 120 120"><path d="M60 86c-18-8-29-22-29-41 15 5 24 16 29 33 5-17 14-28 29-33 0 19-11 33-29 41Z"/><path d="M60 82c-11-18-10-35 0-52 10 17 11 34 0 52Z"/><path d="M21 78c18 0 31 4 39 14 8-10 21-14 39-14M32 92h56"/></svg>',
    book: '<svg viewBox="0 0 120 120"><path d="M18 28c18 0 31 4 42 15v55c-11-11-24-16-42-16Z"/><path d="M102 28c-18 0-31 4-42 15v55c11-11 24-16 42-16Z"/><path d="M31 43c9 1 17 3 23 8M31 58c9 1 17 3 23 8M89 43c-9 1-17 3-23 8M89 58c-9 1-17 3-23 8"/></svg>',
    hands: '<svg viewBox="0 0 120 120"><path d="M16 70c15-10 29-10 43 0l13 10c7 5 14 4 20-2"/><path d="M104 48c-15 10-29 10-43 0L48 38c-7-5-14-4-20 2"/><path d="M35 65l17 13M71 42l17 13M47 72l11-9M73 49l-11 9"/></svg>',
    orbit: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="18"/><ellipse cx="60" cy="60" rx="49" ry="19" transform="rotate(-24 60 60)"/><ellipse cx="60" cy="60" rx="49" ry="19" transform="rotate(31 60 60)"/><circle cx="94" cy="34" r="3"/></svg>',
    tree: '<svg viewBox="0 0 120 120"><path d="M60 101V55M60 55c-15-16-12-36 8-43 17 8 22 28 7 43 18-8 33 1 34 17-11 11-27 11-41 0 4 14-1 26-8 29-7-3-12-15-8-29-14 11-30 11-41 0 1-16 16-25 34-17-15-15-10-35 7-43 20 7 23 27 8 43Z"/><path d="M31 104h58M47 77c-8 6-15 9-23 9M73 77c8 6 15 9 23 9"/></svg>',
    wave: '<svg viewBox="0 0 180 90"><path d="M12 64c32-6 44-28 62-28 24 0 23 27 51 27 15 0 29-8 43-23"/><path d="M74 36c8 15-1 32-20 41M112 63c6 8 19 11 35 3M129 40c14 3 24 12 31 27"/><circle cx="143" cy="25" r="17"/></svg>',
    pen: '<svg viewBox="0 0 120 120"><path d="M75 12 28 83l-8 25 25-8 47-71Z"/><path d="M64 28 76 40M28 83l17 17M47 70l18 18"/></svg>',
    chairs: '<svg viewBox="0 0 120 120"><circle cx="39" cy="30" r="12"/><path d="M25 56c0-14 28-14 28 0v32H25Z"/><circle cx="82" cy="30" r="12"/><path d="M68 56c0-14 28-14 28 0v32H68Z"/><path d="M33 88v18M88 88v18"/></svg>',
    books: '<svg viewBox="0 0 120 120"><path d="M24 34h58l14 10-14 10H24l14-10Z"/><path d="M24 54h58l14 10-14 10H24l14-10Z"/><path d="M24 74h58l14 10-14 10H24l14-10Z"/></svg>',
    mic: '<svg viewBox="0 0 120 120"><rect x="43" y="14" width="34" height="58" rx="17"/><path d="M29 52c0 20 12 32 31 32s31-12 31-32M60 84v22M40 106h40M43 34h34M43 52h34"/></svg>',
    letter: '<svg viewBox="0 0 120 120"><path d="M20 34h80v56H20Z"/><path d="m20 38 40 31 40-31M20 90l31-28M100 90 69 62"/></svg>',
    chat: '<svg viewBox="0 0 120 120"><path d="M20 28h58v38H42L25 82V66h-5Z"/><path d="M48 70h52v34L86 92H48Z"/><path d="M36 47h26M64 85h20"/></svg>',
    openbook: '<svg viewBox="0 0 120 120"><path d="M16 32c20 0 34 5 44 17v53c-10-12-24-17-44-17Z"/><path d="M104 32c-20 0-34 5-44 17v53c10-12 24-17 44-17Z"/><path d="M60 49v53"/></svg>',
    camera: '<svg viewBox="0 0 120 120"><path d="M18 32h64v56H18Z"/><circle cx="48" cy="60" r="14"/><path d="M82 48 104 36v48L82 72Z"/><circle cx="82" cy="24" r="9"/><circle cx="103" cy="24" r="9"/></svg>',
    eye: '<svg viewBox="0 0 120 120"><path d="M12 60c18-27 36-40 48-40s30 13 48 40c-18 27-36 40-48 40S30 87 12 60Z"/><circle cx="60" cy="60" r="18"/><circle cx="60" cy="60" r="6"/><path d="M60 8v18M60 94v18M8 60h18M94 60h18"/></svg>',
  }

  return icons[name] ?? icons.orbit
}

function slugFor(title: string) {
  return title.toLowerCase().replace(/\s+/g, '-')
}

function renderRoutePages() {
  return Object.entries(routePages)
    .map(
      ([slug, page]) => `
        <section class="route-page" data-route="${slug}" aria-hidden="true">
          <a class="route-back" href="#salon">back to the salon</a>
          <div class="route-hero">
            <span class="section-kicker">${page.kicker}</span>
            <h1>${page.title}</h1>
            <p>${page.deck}</p>
          </div>
          <div class="route-entries">
            ${page.entries
              .map(
                (entry: any) => `
                  <article id="${entry.slug || slugFor(entry.title)}">
                    <span>${entry.meta}</span>
                    <h2>${entry.title}</h2>
                    <div class="article-body">${entry.body}</div>
                  </article>
                `,
              )
              .join('')}
          </div>
        </section>
      `,
    )
    .join('')
}

app.innerHTML = `
  <div class="paper-texture" aria-hidden="true"></div>
  <div class="cursor-orbit" aria-hidden="true"></div>

  <header class="masthead">
    <a class="wordmark" href="#top" aria-label="Desihippe home">
      <span>desihippe</span>
      <small>question everything</small>
    </a>
    <nav aria-label="primary">
      <a href="#/essays">essays</a>
      <a href="#/interviews">interviews</a>
      <a href="#/salon">salon</a>
      <a href="#/reading-lists">reading lists</a>
      <a href="#/podcasts">podcasts</a>
      <a href="#/docs">docs</a>
      <a href="#/discussions">discussions</a>
      <a href="#/about">about</a>
    </nav>
    <div class="header-actions">
      <button class="mode-toggle" type="button" aria-pressed="false">dark</button>
      <a class="letter-link" href="#letter">letter</a>
    </div>
  </header>

  <main id="top">
    <section class="hero" data-reveal>
      <div class="hero-copy">
        <h1>STOP SCROLLING. THINK.</h1>
        <p class="subhead">Society. Religion. Politics. Culture. Technology. Consciousness. For curious humans.</p>
        <p class="thesis">The world doesn’t need more outrage. It needs better questions.</p>
      </div>

      <div class="hero-instrument" aria-label="interactive Desihippe thought instrument">
        <div class="line-art art-sun">${iconSvg('sun')}</div>
        <div class="line-art art-lotus">${iconSvg('lotus')}</div>
        <div class="line-art art-book">${iconSvg('book')}</div>
        <div class="line-art art-hands">${iconSvg('hands')}</div>
        <div class="line-art art-wave">${iconSvg('wave')}</div>
        <svg class="symbol sun-eye" viewBox="0 0 220 220" aria-hidden="true">
          <circle cx="110" cy="110" r="58" />
          <circle cx="110" cy="110" r="15" />
          <path d="M110 10v34M110 176v34M10 110h34M176 110h34M39 39l24 24M157 157l24 24M181 39l-24 24M63 157l-24 24" />
          <path d="M54 110c20-30 42-45 56-45s36 15 56 45c-20 30-42 45-56 45s-36-15-56-45Z" />
        </svg>
        <button class="question-dial" type="button" aria-label="rotate question">
          <span class="dial-number">01</span>
          <strong id="dialQuestion">${questions[0].text}</strong>
          <em id="dialField">${questions[0].field}</em>
        </button>
        <svg class="symbol orbit-lines" viewBox="0 0 360 360" aria-hidden="true">
          <circle cx="180" cy="180" r="130" />
          <ellipse cx="180" cy="180" rx="160" ry="62" transform="rotate(-18 180 180)" />
          <ellipse cx="180" cy="180" rx="160" ry="62" transform="rotate(33 180 180)" />
          <path d="M90 258c38 38 105 42 150 8" />
        </svg>
      </div>
    </section>

    <section class="section topics-section" id="topics" data-reveal>
      <div class="section-heading">
        <span class="section-kicker">topics cloud</span>
        <h2>Society, religion, politics, culture, AI, books, climate, love, cities, consciousness and future.</h2>
      </div>
      <div class="constellation bento-surface" aria-label="Desihippe topic constellation">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M23 20 39 10 58 18 82 26 86 58 70 78 76 95 48 96 48 82 18 86 30 66 18 64 14 40 33 46 48 34 64 42 58 68 48 82 33 46 23 20" />
          <circle cx="50" cy="57" r="13" />
          <circle cx="50" cy="57" r="20" stroke-dasharray="1 2" />
        </svg>
        <div class="constellation-core" aria-hidden="true">${iconSvg('sun')}</div>
        <div class="constellation-tree" aria-hidden="true">${iconSvg('tree')}</div>
        ${topics
          .map(
            (topic) => `
              <button class="topic-dot tone-${topic.tone}" type="button" style="--x:${topic.x}%; --y:${topic.y}%">
                <span>*</span>${topic.label}
              </button>
            `,
          )
          .join('')}

        <!-- Topic Popover Details Card -->
        <div class="topic-popover" style="display: none;">
          <button class="popover-close" type="button" aria-label="close popup">&times;</button>
          <div class="popover-header">
            <span class="popover-kicker">topic constellation</span>
            <h3 class="popover-title">philosophy</h3>
          </div>
          <div class="popover-body">
            <p class="popover-empty">No articles tagged with this topic yet.</p>
            <ul class="popover-list"></ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section essays-section" id="essays" data-reveal>
      <div class="section-heading">
        <span class="section-kicker">featured essays</span>
        <h2>intrigue, not certainty. covers you enter like rooms.</h2>
      </div>
      <div class="essay-grid">
        ${essays
          .map(
            (essay, index) => `
              <article class="essay-card tone-${essay.tone} ${index === 0 ? 'is-large' : ''}">
                <div class="essay-art" aria-hidden="true">
                  <svg viewBox="0 0 260 180">
                    <path d="M20 132c44-58 86-86 126-86 33 0 63 19 94 58" />
                    <circle cx="126" cy="88" r="31" />
                    <path d="M126 25v126M61 88h132" />
                    <path d="M38 149c59-23 119-22 180 2" />
                  </svg>
                </div>
                <span>${essay.label}</span>
                <h3>${essay.title}</h3>
                <p>${essay.deck}</p>
                <small>${essay.meta}</small>
              </article>
            `,
          )
          .join('')}
      </div>
    </section>

    <section class="question-strip" id="questions" data-reveal>
      <p>you don’t need another answer.</p>
      <p>you need better questions.</p>
    </section>

    <section class="section question-lab" data-reveal>
      <div class="section-kicker">live question</div>
      <div class="question-card">
        <div>
          <span id="questionField">${questions[0].field}</span>
          <h2 id="questionText">${questions[0].text}</h2>
          <p id="questionNote">${questions[0].note}</p>
        </div>
        <button class="swap-question" type="button">ask another</button>
      </div>
    </section>

    <section class="section values-section" data-reveal>
      <div class="values-orbit">
        <svg viewBox="0 0 500 500" aria-hidden="true">
          <path d="M250 48c91 0 165 90 165 201s-74 202-165 202S85 361 85 250 159 48 250 48Z" />
          <path d="M86 250c55-39 109-58 164-58s109 19 164 58c-55 39-109 58-164 58S141 289 86 250Z" />
          <path d="M250 92v316M92 250h316" />
        </svg>
      </div>
      <div>
        <span class="section-kicker">operating system</span>
        <h2>no dogma. no hate. no certainty. no hero worship.</h2>
        <div class="principles">
          ${principles.map((principle) => `<button type="button">${principle}</button>`).join('')}
        </div>
      </div>
    </section>

    <section class="manifesto-band" id="manifesto" data-reveal>
      ${manifestos.map((line) => `<span>${line}</span>`).join('')}
    </section>

    <section class="section quote-section" data-reveal>
      <div class="quote-carousel bento-surface">
        <button class="quote-button" type="button" aria-label="next quote">
          <blockquote id="quoteText">${quotes[0][0]}</blockquote>
          <span id="quoteMeta">${quotes[0][1]}</span>
        </button>
        <div class="margin-note">
          <span>margin note 03</span>
          <p>Desihippe should feel like discovering a beautifully preserved underground magazine from the future.</p>
        </div>
      </div>
    </section>

    <section class="section editorial-section" id="salon" data-reveal>
      <div class="editorial-lede">
        <span class="section-kicker">salon, not movement</span>
        <h2>Renaissance Florence meets Santiniketan meets early internet curiosity.</h2>
      </div>
      <div class="format-list">
        ${formats
          .map(
            ([number, title, description, icon]) => `
              <article class="format-row">
                <span>${number}</span>
                <a class="format-icon" href="#/${slugFor(title)}" aria-label="${title} page">${iconSvg(icon)}</a>
                <h3><a href="#/${slugFor(title)}">${title}</a></h3>
                <p>${description}</p>
              </article>
            `,
          )
          .join('')}
      </div>
    </section>

    <section class="section club-section" data-reveal>
      <div class="section-heading">
        <span class="section-kicker">book club + conversations</span>
        <h2>texts as campfires, disagreement as craft.</h2>
      </div>
      <div class="club-grid">
        <article class="reading-list bento-surface">
          <span class="section-kicker">reading list</span>
          ${readingList
            .map(
              ([title, note]) => `
                <div class="reading-row">
                  <strong>${title}</strong>
                  <p>${note}</p>
                </div>
              `,
            )
            .join('')}
        </article>
        <article class="timeline-card bento-surface">
          <span class="section-kicker">timeline</span>
          ${timeline
            .map(
              ([era, note]) => `
                <div class="timeline-row">
                  <strong>${era}</strong>
                  <p>${note}</p>
                </div>
              `,
            )
            .join('')}
        </article>
        <article class="conversation-card bento-surface">
          <span class="section-kicker">conversation card</span>
          <h3>Are we becoming machines?</h3>
          <p>Bring one doubt, one citation, and one story from your life. Leave with better questions.</p>
          <small>[1] not therapy. [2] not discourse theatre. [3] no dunking.</small>
        </article>
      </div>
    </section>

    <section class="section community-section" data-reveal>
      <div>
        <span class="section-kicker">community salons</span>
        <h2>not everybody. curious humans first.</h2>
      </div>
      <div class="community-circles">
        <span>engineers</span>
        <span>artists</span>
        <span>historians</span>
        <span>burnt-out professionals</span>
        <span>rational spiritual seekers</span>
        <span>lonely intellectuals</span>
      </div>
    </section>

    <section class="section letter-section" id="letter" data-reveal>
      <div>
        <span class="section-kicker">weekly letter</span>
        <h2>wake up gently.</h2>
        <p>No urgency. No growth hack. No cult. A thoughtful note when there is something worth thinking about.</p>
      </div>
      <form class="letter-form">
        <label for="email">email for the adda</label>
        <div>
          <input id="email" type="email" placeholder="you@unfinished.world" required />
          <button type="submit">pause with us</button>
        </div>
        <p class="form-state" role="status"></p>
      </form>
    </section>
  </main>

  <footer>
    <div>
      <p>Question everything. Including us.</p>
      <span>desihippe / humanity is one unfinished conversation</span>
    </div>
    <nav class="footer-socials" aria-label="social links">
      ${footerSocials
        .map(([social, href]) => `<a href="${href}" target="_blank" rel="noreferrer">${social}</a>`)
        .join('')}
    </nav>
  </footer>

  ${renderRoutePages()}
`

const cursor = document.querySelector<HTMLDivElement>('.cursor-orbit')
const dial = document.querySelector<HTMLButtonElement>('.question-dial')!
const dialNumber = document.querySelector<HTMLSpanElement>('.dial-number')!
const dialQuestion = document.querySelector<HTMLElement>('#dialQuestion')!
const dialField = document.querySelector<HTMLElement>('#dialField')!
const questionText = document.querySelector<HTMLElement>('#questionText')!
const questionField = document.querySelector<HTMLElement>('#questionField')!
const questionNote = document.querySelector<HTMLElement>('#questionNote')!
const swapQuestion = document.querySelector<HTMLButtonElement>('.swap-question')!
const questionCard = document.querySelector<HTMLDivElement>('.question-card')!
const quoteButton = document.querySelector<HTMLButtonElement>('.quote-button')!
const quoteText = document.querySelector<HTMLElement>('#quoteText')!
const quoteMeta = document.querySelector<HTMLElement>('#quoteMeta')!
const modeToggle = document.querySelector<HTMLButtonElement>('.mode-toggle')!
let activeQuestion = 0
let activeQuote = 0

const popover = document.querySelector<HTMLDivElement>('.topic-popover')!
const popoverClose = document.querySelector<HTMLButtonElement>('.popover-close')!
const popoverTitle = document.querySelector<HTMLElement>('.popover-title')!
const popoverEmpty = document.querySelector<HTMLParagraphElement>('.popover-empty')!
const popoverList = document.querySelector<HTMLUListElement>('.popover-list')!

let popoverTimeout: number | undefined
let isPopoverPinned = false

function showPopoverForTopic(topicDot: HTMLButtonElement) {
  if (popoverTimeout) {
    clearTimeout(popoverTimeout)
    popoverTimeout = undefined
  }

  const topicName = topicDot.textContent?.replace('*', '').trim() || ''
  popoverTitle.textContent = topicName

  // Find matching articles
  const matching: Array<{ title: string; deck: string; slug: string; type: string }> = []
  
  const contentTypes = ['essays', 'letters', 'interviews', 'podcasts']
  contentTypes.forEach((type) => {
    const list = (generatedContent as any)[type] || []
    list.forEach((article: any) => {
      if (article.topics && article.topics.map((t: string) => t.toLowerCase()).includes(topicName.toLowerCase())) {
        matching.push({
          title: article.title,
          deck: article.deck,
          slug: article.slug,
          type
        })
      }
    })
  })

  // Render list
  if (matching.length === 0) {
    popoverEmpty.style.display = 'block'
    popoverList.style.display = 'none'
    popoverList.innerHTML = ''
  } else {
    popoverEmpty.style.display = 'none'
    popoverList.style.display = 'flex'
    popoverList.innerHTML = matching
      .map(
        (item) => `
          <li class="popover-item">
            <span class="popover-item-type">${item.type}</span>
            <a class="popover-item-link" href="#/${item.type}#${item.slug}">${item.title}</a>
            <p class="popover-item-desc">${item.deck}</p>
          </li>
        `
      )
      .join('')
  }

  // Position popover
  const constellationContainer = document.querySelector<HTMLDivElement>('.constellation')!
  const rect = topicDot.getBoundingClientRect()
  const containerRect = constellationContainer.getBoundingClientRect()
  
  const x = rect.left - containerRect.left + rect.width / 2
  const y = rect.top - containerRect.top
  
  popover.style.setProperty('--popover-x', `${(x / containerRect.width) * 100}%`)
  popover.style.setProperty('--popover-y', `${(y / containerRect.height) * 100}%`)
  
  popover.style.display = 'flex'
  // Force a reflow for transition
  popover.offsetHeight
  popover.classList.add('is-active')
}

function hidePopover(force = false) {
  if (isPopoverPinned && !force) return
  
  popover.classList.remove('is-active')
  popoverTimeout = window.setTimeout(() => {
    popover.style.display = 'none'
  }, 220)
}

function syncRoute() {
  const hash = window.location.hash
  const hashParts = hash.split('#')
  const routePath = hashParts[1] || ''
  const articleSlug = hashParts[2] || ''
  
  const slug = routePath.startsWith('/') ? routePath.slice(1) : ''

  document.querySelectorAll<HTMLElement>('.route-page').forEach((page) => {
    const active = page.dataset.route === slug
    page.classList.toggle('is-active', active)
    page.setAttribute('aria-hidden', String(!active))
  })

  document.body.classList.toggle('route-open', Boolean(slug && routePages[slug]))

  if (slug && articleSlug) {
    setTimeout(() => {
      const articleEl = document.getElementById(articleSlug)
      if (articleEl) {
        articleEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        articleEl.classList.add('article-highlight')
        setTimeout(() => {
          articleEl.classList.remove('article-highlight')
        }, 2500)
      }
    }, 150)
  }
}

window.addEventListener('hashchange', syncRoute)
syncRoute()

function setQuestion(next: number) {
  activeQuestion = next % questions.length
  const question = questions[activeQuestion]

  questionCard.animate(
    [
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
      { opacity: 0.45, transform: 'translateY(8px)', filter: 'blur(3px)' },
    ],
    { duration: 170, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
  ).onfinish = () => {
    dialNumber.textContent = String(activeQuestion + 1).padStart(2, '0')
    dialQuestion.textContent = question.text
    dialField.textContent = question.field
    questionText.textContent = question.text
    questionField.textContent = question.field
    questionNote.textContent = question.note
    questionCard.animate(
      [
        { opacity: 0.45, transform: 'translateY(-8px)', filter: 'blur(3px)' },
        { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
      ],
      { duration: 220, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    )
  }
}

dial.addEventListener('click', () => setQuestion(activeQuestion + 1))
swapQuestion.addEventListener('click', () => setQuestion(activeQuestion + 1))

quoteButton.addEventListener('click', () => {
  activeQuote = (activeQuote + 1) % quotes.length
  quoteButton.animate(
    [
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
      { opacity: 0.5, transform: 'translateY(7px)', filter: 'blur(3px)' },
    ],
    { duration: 160, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
  ).onfinish = () => {
    quoteText.textContent = quotes[activeQuote][0]
    quoteMeta.textContent = quotes[activeQuote][1]
    quoteButton.animate(
      [
        { opacity: 0.5, transform: 'translateY(-7px)', filter: 'blur(3px)' },
        { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
      ],
      { duration: 220, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    )
  }
})

modeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode')
  modeToggle.textContent = isDark ? 'light' : 'dark'
  modeToggle.setAttribute('aria-pressed', String(isDark))
})

document.addEventListener('pointermove', (event) => {
  cursor?.style.setProperty('--x', `${event.clientX}px`)
  cursor?.style.setProperty('--y', `${event.clientY}px`)
})

document.querySelectorAll<HTMLButtonElement>('.topic-dot').forEach((topic) => {
  topic.addEventListener('click', (e) => {
    e.stopPropagation()
    isPopoverPinned = true
    showPopoverForTopic(topic)
  })

  topic.addEventListener('mouseenter', () => {
    if (!isPopoverPinned) {
      showPopoverForTopic(topic)
    }
  })

  topic.addEventListener('mouseleave', () => {
    hidePopover()
  })
})

popover.addEventListener('mouseenter', () => {
  if (popoverTimeout) {
    clearTimeout(popoverTimeout)
    popoverTimeout = undefined
  }
})

popover.addEventListener('mouseleave', () => {
  hidePopover()
})

popoverClose.addEventListener('click', (e) => {
  e.stopPropagation()
  isPopoverPinned = false
  hidePopover(true)
})

document.addEventListener('click', () => {
  if (isPopoverPinned) {
    isPopoverPinned = false
    hidePopover(true)
  }
})

document.querySelectorAll<HTMLButtonElement>('.principles button').forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('is-active')
  })
})

document.querySelector<HTMLFormElement>('.letter-form')!.addEventListener('submit', (event) => {
  event.preventDefault()
  const state = document.querySelector<HTMLParagraphElement>('.form-state')!
  state.textContent = 'you are in. no certainty will be shipped.'
})

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible')
    })
  },
  { threshold: 0.08 },
)

document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => revealObserver.observe(element))
