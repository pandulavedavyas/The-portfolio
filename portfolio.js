// ============================================================================
// FUTURISTIC PORTFOLIO - INTERACTIVE JAVASCRIPT
// Animations, Cursor Effects, Form Handling, and More
// ============================================================================

// ============================================================================
// 1. CUSTOM CURSOR SYSTEM
// ============================================================================

const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Main cursor
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';

    // Follower cursor with slight delay
    setTimeout(() => {
        cursorFollower.style.left = x + 'px';
        cursorFollower.style.top = y + 'px';
    }, 50);
});

// Cursor expansion on hover
document.addEventListener('mouseover', (e) => {
    if (e.target.matches('a, button, .project-card, .about-card, .skill-tag')) {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(2)';
        cursor.style.borderColor = '#ffd60a';
        cursor.style.boxShadow = '0 0 20px #ffd60a, inset 0 0 20px #ffd60a';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.matches('a, button, .project-card, .about-card, .skill-tag')) {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
        cursor.style.borderColor = '#00d4ff';
        cursor.style.boxShadow = '0 0 10px #00d4ff, inset 0 0 10px #00d4ff';
    }
});

// ============================================================================
// 2. LOADING SCREEN
// ============================================================================

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 2500);
});

// ============================================================================
// 3. PARTICLE ANIMATION SYSTEM
// ============================================================================

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = ['#00d4ff', '#ff006e', '#ffd60a'][Math.floor(Math.random() * 3)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary wrapping
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Opacity pulse
        this.opacity = Math.sin(Date.now() / 1000) * 0.3 + 0.4;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Animation loop for particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    particles.forEach((particle) => {
        particle.update();
        particle.draw();

        // Draw connections
        particles.forEach((p) => {
            const dx = particle.x - p.x;
            const dy = particle.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = particle.color;
                ctx.globalAlpha = (1 - distance / 100) * 0.3;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ============================================================================
// 4. IRON MAN EYES TRACKING
// ============================================================================

const eyeLeft = document.getElementById('eyeLeft');
const eyeRight = document.getElementById('eyeRight');
const ironManSVG = document.getElementById('ironManSVG');

document.addEventListener('mousemove', (e) => {
    const ironManRect = ironManSVG.getBoundingClientRect();
    const ironManCenterX = ironManRect.left + ironManRect.width / 2;
    const ironManCenterY = ironManRect.top + ironManRect.height / 2;

    const angle = Math.atan2(e.clientY - ironManCenterY, e.clientX - ironManCenterX);

    // Eye tracking
    const eyeDistance = 8;
    const leftEyeX = 90 + Math.cos(angle) * eyeDistance;
    const leftEyeY = 55 + Math.sin(angle) * eyeDistance;
    const rightEyeX = 110 + Math.cos(angle) * eyeDistance;
    const rightEyeY = 55 + Math.sin(angle) * eyeDistance;

    if (eyeLeft) eyeLeft.setAttribute('cx', leftEyeX);
    if (eyeLeft) eyeLeft.setAttribute('cy', leftEyeY);
    if (eyeRight) eyeRight.setAttribute('cx', rightEyeX);
    if (eyeRight) eyeRight.setAttribute('cy', rightEyeY);
});

// ============================================================================
// 5. TYPING ANIMATION
// ============================================================================

const typingText = document.querySelector('.typing-text');
const typingSubtitle = document.querySelector('.typing-subtitle');

const text1 = 'I am Veda Vyas Pandula';
const text2 = 'FULL-STACK DEVELOPER | TECH ENTHUSIAST | JARVIS PROTOTYPE';

let index1 = 0;
let index2 = 0;

function typeWriter1() {
    if (index1 < text1.length) {
        typingText.textContent += text1.charAt(index1);
        index1++;
        setTimeout(typeWriter1, 50);
    } else {
        typeWriter2();
    }
}

function typeWriter2() {
    if (index2 < text2.length) {
        typingSubtitle.textContent += text2.charAt(index2);
        index2++;
        setTimeout(typeWriter2, 30);
    }
}

// Start typing animation after loading
setTimeout(() => {
    typeWriter1();
}, 2600);

// ============================================================================
// 6. NAVIGATION MENU & HAMBURGER
// ============================================================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================================================================
// 7. SCROLL ANIMATIONS & ACTIVE NAV LINK
// ============================================================================

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.8s ease-out';

            // Update active nav link
            navLinks.forEach((link) => {
                link.classList.remove('active');
            });

            const activeLink = document.querySelector(
                `[data-section="${entry.target.id}"]`
            );
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('section');
sections.forEach((section) => {
    observer.observe(section);
});

// ============================================================================
// 8. PROJECT CARDS - 3D TILT EFFECT
// ============================================================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ============================================================================
// 9. CONTACT FORM HANDLING
// ============================================================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector('textarea').value;

    // Simple validation
    if (name && email && subject && message) {
        // Create mailto link
        const mailtoLink = `mailto:pandulavedavyas@gmail.com?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(
            `From: ${name} (${email})\n\n${message}`
        )}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        showNotification('Message prepared! Opening your email client...', 'success');

        // Reset form
        contactForm.reset();
    } else {
        showNotification('Please fill all fields!', 'error');
    }
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00d4ff' : '#ff006e'};
        color: #0a0e27;
        padding: 15px 25px;
        border-radius: 5px;
        font-weight: bold;
        z-index: 11000;
        animation: slideInRight 0.5s ease-out;
        box-shadow: 0 0 20px ${type === 'success' ? 'rgba(0, 212, 255, 0.6)' : 'rgba(255, 0, 110, 0.6)'};
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ============================================================================
// 10. SMOOTH SCROLL BEHAVIOR FOR NAV LINKS
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
            });
        }
    });
});

// ============================================================================
// 11. PARALLAX SCROLL EFFECT
// ============================================================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.radar-scan');

    parallaxElements.forEach((element) => {
        element.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.1}deg)`;
    });
});

// ============================================================================
// 12. SKILL BARS ANIMATION ON SCROLL
// ============================================================================

const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.animation = 'skillFill 1.5s ease-out forwards';
                entry.target.style.width = width;
            }, 100);
            skillObserver.unobserve(entry.target);
        }
    });
});

skillBars.forEach((bar) => {
    skillObserver.observe(bar);
});

// ============================================================================
// 13. ABOUT CARDS STAGGER ANIMATION
// ============================================================================

const aboutCards = document.querySelectorAll('.about-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideUp 0.8s ease-out ${index * 0.1}s both`;
            cardObserver.unobserve(entry.target);
        }
    });
});

aboutCards.forEach((card) => {
    cardObserver.observe(card);
});

// ============================================================================
// 14. FLOATING ICONS INTERACTION
// ============================================================================

const floatingIcons = document.querySelectorAll('.floating-icon');

floatingIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
        // Add click feedback
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = 'float-icon 3s ease-in-out infinite';
        }, 10);
    });
});

// ============================================================================
// 15. SOUND EFFECTS (Optional)
// ============================================================================

// Create a simple beep sound function
function playBeep(frequency = 800, duration = 100) {
    try {
        const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + duration / 1000
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
        // Audio context not available, silently fail
    }
}

// Play beep on button click
document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        playBeep(600, 100);
    });
});

// Play different beep for form submission
contactForm.addEventListener('submit', () => {
    playBeep(800, 150);
});

// ============================================================================
// 16. DYNAMIC GLOW EFFECT ON MOUSE MOVE
// ============================================================================

document.addEventListener('mousemove', (e) => {
    const glowElements = document.querySelectorAll('.card-glow');

    glowElements.forEach((element) => {
        const rect = element.parentElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        element.style.left = x + 'px';
        element.style.top = y + 'px';
    });
});

// ============================================================================
// 17. INTERSECTION OBSERVER FOR LAZY LOADING
// ============================================================================

const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
}

// ============================================================================
// 18. KEYBOARD NAVIGATION
// ============================================================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Number keys for quick nav
    const sections = {
        1: '#hero',
        2: '#about',
        3: '#projects',
        4: '#contact',
    };

    if (sections[e.key]) {
        e.preventDefault();
        document.querySelector(sections[e.key]).scrollIntoView({
            behavior: 'smooth',
        });
    }
});

// ============================================================================
// 19. BACK TO TOP BUTTON
// ============================================================================

function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.textContent = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00d4ff, #ffd60a);
        border: 2px solid #ffd60a;
        color: #0a0e27;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
        font-weight: bold;
    `;

    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        playBeep(1000, 100);
    });

    backToTop.addEventListener('mouseover', () => {
        backToTop.style.transform = 'scale(1.1)';
        backToTop.style.boxShadow = '0 0 30px rgba(255, 214, 10, 0.8)';
    });

    backToTop.addEventListener('mouseout', () => {
        backToTop.style.transform = 'scale(1)';
        backToTop.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.6)';
    });
}

createBackToTopButton();

// ============================================================================
// 20. MOBILE RESPONSIVENESS IMPROVEMENTS
// ============================================================================

// Detect if device is mobile
const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile()) {
    // Adjust particle count for mobile
    while (particles.length > 20) {
        particles.pop();
    }

    // Remove hover effects on mobile
    document.addEventListener('touchstart', function() {}, false);
}

// ============================================================================
// 21. INITIALIZATION & READY STATE
// ============================================================================

console.log(
    '%c🤖 JARVIS PROTOCOL INITIALIZED',
    'font-size: 16px; color: #00d4ff; font-weight: bold; text-shadow: 0 0 10px #00d4ff'
);
console.log(
    '%c© 2024 Veda Vyas Pandula - Futuristic Portfolio',
    'font-size: 12px; color: #ffd60a'
);

// Add some Easter eggs
window.addEventListener('keydown', (e) => {
    if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        alert(
            '🎮 JARVIS TIPS:\n\n' +
                '⌨️ Press 1 → Hero\n' +
                '⌨️ Press 2 → About\n' +
                '⌨️ Press 3 → Projects\n' +
                '⌨️ Press 4 → Contact\n' +
                '⌨️ Press ESC → Close Menu\n\n' +
                'Enjoy exploring! 🚀'
        );
    }
});

// Performance optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});
