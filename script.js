
const themeBtn = document.getElementById('themeBtn');
const icon = themeBtn.querySelector('i');
const text = themeBtn.querySelector('span');
const contactForm = document.getElementById('contactForm');

// 1. Dark/Light Mode Theme Toggle Logic
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            icon.className = 'fas fa-moon';
            text.innerText = 'Dark';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            icon.className = 'fas fa-sun';
            text.innerText = 'Light';
        }
    });
}

// 2. Contact Form Interface Alert Logic
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert("Message feature ready to connect!");
        contactForm.reset();
    });
}

// 3. Dynamic Repository Fetch Logic
function loadGitHubProjects() {
    fetch('projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load projects data file.");
            }
            return response.json();
        })
        .then(projects => {
            const container = document.getElementById('project-container'); 
            if (!container) return;

            container.innerHTML = ""; // Clear out the loading notice string

            if (projects.length === 0) {
                container.innerHTML = `<p style="color: #7f8c8d; text-align: center; width: 100%;">No projects fetched yet.</p>`;
                return;
            }

            // Map and generate matching grid architecture layout cards dynamically
            projects.forEach(project => {
                // Pick an icon format dynamically based on project primary tag languages
                let iconClass = "fas fa-code";
                if (project.language.toLowerCase() === 'python') iconClass = "fab fa-python";
                if (project.language.toLowerCase() === 'javascript') iconClass = "fab fa-js";
                if (project.language.toLowerCase() === 'java') iconClass = "fab fa-java";

                const projectCard = `
                    <div class="project-card">
                        <div class="project-header">
                            <i class="${iconClass} project-icon"></i>
                        </div>
                        <h3>${project.name}</h3>
                        <div class="project-tech" style="font-weight: bold; margin-bottom: 0.5rem; font-size: 13px; color: #3498db;">
                            ${project.language}
                        </div>
                        <p>${project.description}</p>
                        <br>
                        <a href="${project.url}" target="_blank" class="btn btn-primary" style="padding: 6px 12px; font-size: 12px; text-decoration: none; display: inline-block;">
                            View Repository &rarr;
                        </a>
                    </div>
                `;
                container.innerHTML += projectCard;
            });
        })
        .catch(error => {
            console.error("Error loading auto-projects index template:", error);
            const container = document.getElementById('project-container');
            if (container) {
                container.innerHTML = `<p style="color: #e74c3c; text-align: center; width: 100%;">Failed to load automated projects stream.</p>`;
            }
        });
}

// Run integration components right when document nodes load securely
document.addEventListener("DOMContentLoaded", loadGitHubProjects);