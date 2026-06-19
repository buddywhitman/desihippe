import os
import sys
import re
import argparse
import urllib.request
import urllib.parse
import json

def parse_markdown(filepath):
    if not os.path.exists(filepath):
        print(f"Error: File '{filepath}' not found.")
        sys.exit(1)
        
    with open(filepath, 'r', encoding='utf-8') as f:
        raw_content = f.read()

    # Match frontmatter
    match = re.match(r'^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$', raw_content)
    if not match:
        return {"title": os.path.basename(filepath), "deck": "", "content": raw_content}
        
    yaml_section = match.group(1)
    body_content = match.group(2)
    
    metadata = {}
    for line in yaml_section.split('\n'):
        if ':' in line:
            parts = line.split(':', 1)
            key = parts[0].strip()
            val = parts[1].strip().strip('"').strip("'")
            metadata[key] = val
            
    return {
        "title": metadata.get("title", os.path.basename(filepath)),
        "deck": metadata.get("deck", ""),
        "content": body_content.strip()
    }

def post_to_medium(title, content, token):
    if not token:
        print("Medium Token not provided. Skipping Medium.")
        return
        
    print("Publishing to Medium...")
    
    # Step 1: Get user ID
    user_url = "https://api.medium.com/v1/me"
    req = urllib.request.Request(
        user_url, 
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req) as res:
            user_data = json.loads(res.read().decode())
            author_id = user_data["data"]["id"]
            username = user_data["data"]["username"]
            print(f"Authenticated Medium user: @{username}")
    except Exception as e:
        print(f"Medium authentication failed: {e}")
        return

    # Step 2: Publish post
    post_url = f"https://api.medium.com/v1/users/{author_id}/posts"
    post_data = {
        "title": title,
        "contentFormat": "markdown",
        "content": f"# {title}\n\n{content}",
        "publishStatus": "draft"  # Set to 'public' to publish directly
    }
    
    req = urllib.request.Request(
        post_url,
        data=json.dumps(post_data).encode('utf-8'),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req) as res:
            result = json.loads(res.read().decode())
            post_url = result["data"]["url"]
            print(f"🎉 Medium draft created successfully! View it here: {post_url}")
    except Exception as e:
        print(f"Failed to post to Medium: {e}")

def post_to_reddit(title, target_url, subreddit, client_id, client_secret, username, password):
    if not (client_id and client_secret and username and password):
        print("Reddit credentials not fully provided. Skipping Reddit.")
        return
        
    print(f"Posting link to r/{subreddit}...")
    # Step 1: Get OAuth token
    auth = urllib.request.HTTPBasicAuthHandler()
    auth.add_password(realm='reddit', uri='https://www.reddit.com', user=client_id, passwd=client_secret)
    opener = urllib.request.build_opener(auth)
    
    token_url = "https://www.reddit.com/api/v1/access_token"
    data = urllib.parse.urlencode({
        "grant_type": "password",
        "username": username,
        "password": password
    }).encode('utf-8')
    
    req = urllib.request.Request(
        token_url, 
        data=data,
        headers={"User-Agent": "DesihippeCrossPoster/1.0 by @desihippe"}
    )
    try:
        with urllib.request.urlopen(req) as res:
            res_data = json.loads(res.read().decode())
            token = res_data["access_token"]
    except Exception as e:
        print(f"Reddit OAuth authentication failed: {e}")
        return

    # Step 2: Submit link
    submit_url = "https://oauth.reddit.com/api/submit"
    submit_data = urllib.parse.urlencode({
        "sr": subreddit,
        "kind": "link",
        "title": title,
        "url": target_url,
        "resubmit": "true"
    }).encode('utf-8')
    
    req = urllib.request.Request(
        submit_url,
        data=submit_data,
        headers={
            "Authorization": f"bearer {token}",
            "User-Agent": "DesihippeCrossPoster/1.0 by @desihippe",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    )
    try:
        with urllib.request.urlopen(req) as res:
            result = json.loads(res.read().decode())
            if result.get("json", {}).get("errors"):
                print(f"Reddit submission error: {result['json']['errors']}")
            else:
                post_url = result.get("json", {}).get("data", {}).get("url", "https://reddit.com")
                print(f"🎉 Successfully posted to r/{subreddit}! Link: {post_url}")
    except Exception as e:
        print(f"Failed to submit link to Reddit: {e}")

def main():
    parser = argparse.ArgumentParser(description="Cross-post Desihippe markdown content to platforms.")
    parser.add_argument("file", help="Path to the markdown file to cross-post")
    parser.add_argument("--url", help="Live URL of the article on your website (needed for link-sharing on Reddit/HackerNews)")
    parser.add_argument("--subreddit", default="culture", help="Subreddit to post the link to")
    
    args = parser.parse_args()
    
    # Load env variables or credentials file
    medium_token = os.getenv("MEDIUM_INTEGRATION_TOKEN")
    
    reddit_client_id = os.getenv("REDDIT_CLIENT_ID")
    reddit_client_secret = os.getenv("REDDIT_CLIENT_SECRET")
    reddit_username = os.getenv("REDDIT_USERNAME")
    reddit_password = os.getenv("REDDIT_PASSWORD")
    
    parsed = parse_markdown(args.file)
    print(f"Loaded article: '{parsed['title']}'")
    
    # Cross-post to Medium
    if medium_token:
        post_to_medium(parsed['title'], parsed['content'], medium_token)
    else:
        print("Note: MEDIUM_INTEGRATION_TOKEN environment variable not set.")
        
    # Cross-post to Reddit
    if args.url:
        if reddit_client_id:
            post_to_reddit(
                parsed['title'], 
                args.url, 
                args.subreddit, 
                reddit_client_id, 
                reddit_client_secret, 
                reddit_username, 
                reddit_password
            )
        else:
            print("Note: REDDIT_CLIENT_ID environment variable not set.")
    else:
        print("Note: Live URL not provided via --url. Reddit link posting skipped.")

    # Print general notes for platforms without write APIs (Substack & Hacker News)
    print("\n" + "="*50)
    print("SUBSTACK & HACKER NEWS CROSS-POSTING INSTRUCTIONS:")
    print("="*50)
    print("1. Substack (Automated RSS Import):")
    print("   Substack does not offer an official publishing API. The best way to automate is:")
    print("   - Expose an RSS feed from your Desihippe built site.")
    print("   - Go to your Substack Dashboard -> Settings -> Imports -> Import RSS Feed.")
    print("   - Input your feed URL. Substack will auto-import all your new essays!")
    print("\n2. Hacker News:")
    print("   HN does not have a write API. To submit, manually submit or run:")
    if args.url:
        hn_url = f"https://news.ycombinator.com/submitlink?u={urllib.parse.quote(args.url)}&t={urllib.parse.quote(parsed['title'])}"
        print(f"   👉 Open this link to submit directly to Hacker News:\n   {hn_url}")
    else:
        print("   👉 Open: https://news.ycombinator.com/submit")
    print("="*50)

if __name__ == "__main__":
    main()
