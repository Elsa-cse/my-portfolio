// DOM Element Targets
const themeBtn = document.getElementById('themeBtn');
const icon = themeBtn.querySelector('i');
const text = themeBtn.querySelector('span');
const contactForm = document.getElementById('contactForm');

// 1. Dark/Light Mode Theme Toggle Logic
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

// 2. Contact Form Interface Alert Logic
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert("Message feature ready to connect!");
    contactForm.reset();
});