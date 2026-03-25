// Loader & Progress
const loader = document.getElementById('loader');
const progressText = document.getElementById('progress');
const progressBar = document.querySelector('.progress-bar');

let progress = 0;
const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 10) + 5;
    if (progress > 100) progress = 100;
    
    progressText.innerText = progress + '%';
    progressBar.style.width = progress + '%';
    
    if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                initTypewriter();
            }, 1000);
        }, 500);
    }
}, 150);

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    
    // Slight delay for the ring
    setTimeout(() => {
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top = e.clientY + 'px';
    }, 50);
});

// Cursor Hover Effects
document.querySelectorAll('a, button, input, textarea, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
});

// Click visual effect
document.addEventListener('click', () => {
    cursorRing.style.transform = 'translate(-50%, -50%) scale(0.8)';
    setTimeout(() => cursorRing.style.transform = 'translate(-50%, -50%) scale(1)', 150);
});

// Typewriter Effect
const textArray = [
    "AI SYSTEMS ENGINEER",
    "FULL STACK DEVELOPER",
    "CYBERNETIC UI DESIGNER",
    "SYSTEMS ARCHITECT"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeTarget = document.getElementById('typewriter');

function initTypewriter() {
    type();
}

function type() {
    const currentText = textArray[textIndex];
    if (isDeleting) {
        typeTarget.innerText = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeTarget.innerText = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500; // Pause before typing next
    }

    setTimeout(type, typeSpeed);
}

// 3D Tilt Effect
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});

// Robot UI Eye Tracking
const helmet = document.querySelector('.helmet-placeholder');
const eyes = document.querySelectorAll('.eye');

window.addEventListener('mousemove', (e) => {
    if(!helmet) return;
    const rect = helmet.getBoundingClientRect();
    const helmetX = rect.left + rect.width / 2;
    const helmetY = rect.top + rect.height / 2;
    
    const angleX = (e.clientY - helmetY) / 30;
    const angleY = (e.clientX - helmetX) / 30;
    
    helmet.style.transform = `rotateX(${-angleX}deg) rotateY(${angleY}deg)`;
    
    // Eyes glow intensity based on movement
    eyes.forEach(eye => {
        eye.style.boxShadow = `0 0 ${20 + Math.abs(angleX)}px var(--primary-blue), 0 0 ${40 + Math.abs(angleY)*2}px var(--primary-blue)`;
    });
});

// Scroll Reveal Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Canvas Background Connections (Particles)
const canvas = document.getElementById('system-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01; // optionally shrink
        
        // Bounce off edges
        if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 243, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Connect lines
        for(let j = i; j < particlesArray.length; j++) {
            let dx = particlesArray[i].x - particlesArray[j].x;
            let dy = particlesArray[i].y - particlesArray[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 243, 255, ${1 - distance/100})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();

// Form Submission Hook
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.querySelector('.form-status');
    status.style.color = 'var(--primary-blue)';
    status.style.fontFamily = 'var(--font-mono)';
    status.style.marginTop = '15px';
    status.innerText = 'ENCRYPTING PAYLOAD... TRANSMITTING...';
    
    setTimeout(() => {
        status.innerText = 'TRANSMISSION SUCCESSFUL. SYSTEM SECURE.';
        e.target.reset();
        setTimeout(() => status.innerText = '', 3000);
    }, 2000);
});
