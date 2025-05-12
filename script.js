document.addEventListener('DOMContentLoaded', () => {
    // === Theme Initialization ===
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        document.documentElement.removeAttribute('data-theme');
    }

    const themeBtn = document.querySelector('.toggle-theme');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            applyGradientTransition();
        });
    }

    function applyGradientTransition() {
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    }

    // === Fade-in on Scroll ===
    const revealElements = () => {
        const triggerBottom = window.innerHeight * 0.85;
        const elements = document.querySelectorAll('section, .card, .side-image');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', revealElements);
    revealElements();

    // === Nav Link Hover ===
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.1)';
            link.style.transition = 'transform 0.3s ease';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
        });
    });

    // === Smooth Scroll on Button Click ===
    const helpButton = document.querySelector('.hero button');
    if (helpButton) {
        helpButton.addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // === Parallax Scroll Effect ===
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero) {
            const parallaxSpeed = 0.3;
            hero.style.backgroundPositionY = `${scrollPos * parallaxSpeed}px`;
        }
    });

    // === Feedback Form Submission ===
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('feedbackName').value;
            const email = document.getElementById('feedbackEmail').value;
            const message = document.getElementById('feedbackMessage').value;

            fetch('feedback.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Feedback submitted successfully!');
                    feedbackForm.reset();
                } else {
                    alert('Error: ' + data.error);
                }
            })
            .catch(error => {
                alert('Request failed: ' + error);
            });
        });
    }
});
