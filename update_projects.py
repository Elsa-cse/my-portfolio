import os
import json
import requests

def fetch_github_repositories():
    username = "Elsa-cse"
    # Authenticate using GitHub's automatic short-lived runtime token
    token = os.environ.get("GITHUB_TOKEN")
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {token}" if token else ""
    }
    
    url = f"https://api.github.com/users/{username}/repos?sort=updated&per_page=100"
    
    try:
        print("Connecting to GitHub API...")
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        repos = response.json()
        
        project_list = []
        for repo in repos:
            # Skip fork repositories to only showcase your original work
            if repo.get("fork"):
                continue
                
            # Clean up repo descriptors to build presentable cards
            project_data = {
                "name": repo.get("name").replace("_", " ").replace("-", " ").title(),
                "description": repo.get("description") or "A technical engineering project developed and deployed via GitHub.",
                "url": repo.get("html_url"),
                "topics": repo.get("topics", []),
                "language": repo.get("language") or "Python",
                "updated_at": repo.get("updated_at")[:10]  # Extracts base date format: YYYY-MM-DD
            }
            project_list.append(project_data)
            
        # Write the compiled repository array data directly into your local projects template
        with open("projects.json", "w", encoding="utf-8") as f:
            json.dump(project_list, f, indent=4, ensure_ascii=False)
            
        print(f"Successfully compiled {len(project_list)} projects into projects.json!")
        
    except Exception as e:
        print(f"An error occurred while compiling your repositories: {e}")

if __name__ == "__main__":
    fetch_github_repositories()