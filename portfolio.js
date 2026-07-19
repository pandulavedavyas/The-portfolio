/* ================================================================
   VEDA VYAS PANDULA - PORTFOLIO JAVASCRIPT
   Premium AI Engineer Portfolio - Full Interactivity
   ================================================================ */

// Emergency loader dismiss - runs immediately, no dependencies
(function(){
    setTimeout(function(){
        var ls = document.getElementById('loadingScreen');
        if(ls) { ls.style.opacity='0'; ls.style.visibility='hidden'; ls.style.pointerEvents='none'; }
        document.body.style.overflow='';
    }, 3000);
})();

(function () {
    'use strict';

    /* ======================== DOM REFS ======================== */
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    const loadingScreen = $('#loadingScreen');
    const loadingProgress = $('#loadingProgress');
    const loadingPercent = $('#loadingPercent');
    const cursorDot = $('#cursorDot');
    const cursorRing = $('#cursorRing');
    const mouseGlow = $('#mouseGlow');
    const scrollProgressBar = $('#scrollProgress');
    const navbar = $('#navbar');
    const hamburger = $('#hamburger');
    const mobileMenu = $('#mobileMenu');
    const themeToggle = $('#themeToggle');
    const particleCanvas = $('#particleCanvas');
    const typingText = $('#typingText');
    const robotSVG = $('#robotSVG');
    const robotEyeL = $('#robotEyeL');
    const robotEyeR = $('#robotEyeR');
    const contactForm = $('#contactForm');
    const projectModal = $('#projectModal');
    const modalOverlay = $('#modalOverlay');
    const modalClose = $('#modalClose');
    const modalBody = $('#modalBody');
    const aiBtn = $('#aiBtn');
    const aiChatbox = $('#aiChatbox');
    const aiChatClose = $('#aiChatClose');
    const aiChatMessages = $('#aiChatMessages');
    const aiInput = $('#aiInput');
    const aiSend = $('#aiSend');
    const backToTop = $('#backToTop');
    const notification = $('#notification');

    /* ======================== LOADING SCREEN ======================== */
    let loadProgress = 0;
    const loadInterval = setInterval(() => {
        loadProgress += Math.random() * 20 + 8;
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(loadInterval);
            setTimeout(dismissLoader, 200);
        }
        if (loadingProgress) loadingProgress.style.width = loadProgress + '%';
        if (loadingPercent) loadingPercent.textContent = Math.floor(loadProgress) + '%';
    }, 80);

    function dismissLoader() {
        if (loadingScreen) loadingScreen.classList.add('hidden');
        document.body.style.overflow = '';
        initRevealAnimations();
    }

    // Safety: force-dismiss after 2.5s no matter what
    setTimeout(dismissLoader, 2500);

    document.body.style.overflow = 'hidden';

    /* ======================== CUSTOM CURSOR ======================== */
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (mouseGlow) {
                mouseGlow.style.left = mouseX + 'px';
                mouseGlow.style.top = mouseY + 'px';
            }
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            ringX += (mouseX - ringX) * 0.08;
            ringY += (mouseY - ringY) * 0.08;
            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        $$('a, button, .tech-card, .project-card, .cert-card, .stat-card, .timeline-card, .showcase-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hovering');
                cursorRing.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hovering');
                cursorRing.classList.remove('hovering');
            });
        });
    } else {
        cursorDot.style.display = 'none';
        cursorRing.style.display = 'none';
        if (mouseGlow) mouseGlow.style.display = 'none';
    }

    /* ======================== SCROLL PROGRESS ======================== */
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgressBar.style.width = scrollPercent + '%';

        // Navbar scroll state
        navbar.classList.toggle('scrolled', scrollTop > 50);

        // Back to top
        backToTop.classList.toggle('visible', scrollTop > 400);
    });

    /* ======================== HAMBURGER & MOBILE MENU ======================== */
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    $$('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* ======================== ACTIVE NAV LINK ======================== */
    const sections = $$('section[id]');
    const navLinks = $$('.nav-link');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    /* ======================== BACK TO TOP ======================== */
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ======================== THEME TOGGLE ======================== */
    themeToggle.addEventListener('click', () => {
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        document.body.classList.toggle('light-theme');
        showNotification(icon.classList.contains('fa-sun') ? 'Light mode enabled' : 'Dark mode enabled', 'success');
    });

    /* ======================== PARTICLE SYSTEM ======================== */
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    let animationId;
    let canvasW, canvasH;

    function resizeCanvas() {
        canvasW = particleCanvas.width = window.innerWidth;
        canvasH = particleCanvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvasW;
            this.y = Math.random() * canvasH;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvasW) this.speedX *= -1;
            if (this.y < 0 || this.y > canvasH) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        resizeCanvas();
        const count = isTouchDevice ? 30 : 60;
        particles = Array.from({ length: count }, () => new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvasW, canvasH);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawConnections();
        animationId = requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    // Pause when tab hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animateParticles();
        }
    });

    /* ======================== TYPING ANIMATION ======================== */
    const typingStrings = [
        'Building AI Solutions.',
        'Developing Intelligent Systems.',
        'Creating Modern Web Experiences.',
        'Solving Real World Problems.'
    ];
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        const currentString = typingStrings[stringIndex];
        if (isDeleting) {
            typingText.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingText.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentString.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % typingStrings.length;
            typingSpeed = 400;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 1200);

    /* ======================== ROBOT EYE TRACKING ======================== */
    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            if (!robotEyeL || !robotEyeR) return;
            const svgRect = robotSVG.getBoundingClientRect();
            const svgCenterX = svgRect.left + svgRect.width / 2;
            const svgCenterY = svgRect.top + svgRect.height / 2;
            const angle = Math.atan2(e.clientY - svgCenterY, e.clientX - svgCenterX);
            const distance = Math.min(3, Math.sqrt(Math.pow(e.clientX - svgCenterX, 2) + Math.pow(e.clientY - svgCenterY, 2)) / 80);

            const eyeOffsetX = Math.cos(angle) * distance;
            const eyeOffsetY = Math.sin(angle) * distance;

            robotEyeL.setAttribute('cx', 100 + eyeOffsetX);
            robotEyeL.setAttribute('cy', 55 + eyeOffsetY);
            robotEyeR.setAttribute('cx', 140 + eyeOffsetX);
            robotEyeR.setAttribute('cy', 55 + eyeOffsetY);
        });
    }

    /* ======================== REVEAL ANIMATIONS ======================== */
    function initRevealAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        $$('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
    }

    /* ======================== STAT COUNTER ANIMATION ======================== */
    const statCards = $$('.stat-card[data-target]');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const target = parseInt(card.dataset.target);
                const suffix = card.dataset.suffix || '+';
                const numEl = card.querySelector('.stat-number');
                animateCount(numEl, 0, target, 1500, suffix);
                statObserver.unobserve(card);
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => statObserver.observe(card));

    function animateCount(el, start, end, duration, suffix) {
        const startTime = performance.now();
        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * eased);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    /* ======================== ACHIEVEMENT COUNTER ======================== */
    const achievementItems = $$('.achievement-item[data-target]');
    const achieveObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const target = parseInt(item.dataset.target);
                const numEl = item.querySelector('.achievement-number');
                animateCount(numEl, 0, target, 2000, '+');
                achieveObserver.unobserve(item);
            }
        });
    }, { threshold: 0.5 });

    achievementItems.forEach(item => achieveObserver.observe(item));

    /* ======================== SKILL BARS ======================== */
    const skillBars = $$('.skill-bar-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.dataset.width + '%';
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    /* ======================== PROJECT DETAIL MODAL ======================== */
    const projectData = {
        chatbot: {
            title: 'AI Chatbot Assistant',
            overview: 'A conversational AI assistant built using Python, Flask, and the Google Gemini API. It provides intelligent responses through a modern, responsive chat interface and demonstrates seamless integration with state-of-the-art generative AI models.',
            objectives: [
                'Build an intelligent chat interface powered by Gemini AI',
                'Create a clean, responsive UI for seamless conversation',
                'Implement secure API key management and backend architecture',
                'Provide real-time streaming responses for natural conversation flow'
            ],
            problemStatement: 'Traditional chatbots rely on rigid rule-based systems that fail to understand context and nuance. This project leverages large language models to create a truly conversational experience that understands intent and provides meaningful, contextual responses.',
            architecture: [
                'Frontend: HTML, CSS, JavaScript — modern responsive chat interface',
                'Backend: Python Flask server handling API requests and session management',
                'AI Engine: Google Gemini API for natural language understanding and generation',
                'Communication: RESTful API design with JSON payloads'
            ],
            features: [
                'Real-time AI-powered responses using Gemini API',
                'Chat history maintained during session',
                'Responsive design — works on all devices',
                'Secure API integration with environment variables',
                'Clean, modular code architecture',
                'Error handling and graceful fallbacks',
                'Modern glassmorphism UI design'
            ],
            challenges: [
                'Managing API rate limits and token quotas efficiently',
                'Implementing streaming responses for real-time feel',
                'Handling context across multi-turn conversations',
                'Securing API keys and sensitive configuration'
            ],
            improvements: [
                'Add user authentication for persistent chat history',
                'Implement conversation memory across sessions',
                'Add support for file uploads and image analysis',
                'Deploy to cloud with auto-scaling',
                'Add voice input/output capabilities'
            ],
            tech: ['Python', 'Flask', 'Gemini API', 'HTML', 'CSS', 'JavaScript'],
            github: 'https://github.com/pandulavedavyas',
            liveDemo: '#'
        },
        expense: {
            title: 'Expense Tracker Dashboard',
            overview: 'A comprehensive expense management dashboard that helps users monitor income, expenses, savings, and financial insights through interactive analytics. Built with vanilla web technologies for maximum performance and zero dependencies.',
            objectives: [
                'Create an intuitive financial tracking interface',
                'Build interactive charts and analytics visualizations',
                'Implement category-based expense filtering and reporting',
                'Provide real-time financial insights and summaries'
            ],
            problemStatement: 'Personal finance management is often overlooked due to the complexity of existing tools. This project simplifies expense tracking with a clean, visual dashboard that makes understanding spending patterns effortless and actionable.',
            architecture: [
                'Frontend: HTML5, CSS3, modern vanilla JavaScript',
                'Storage: LocalStorage for client-side data persistence',
                'Charts: Chart.js for interactive data visualizations',
                'Design: Responsive grid layout with glassmorphism aesthetics'
            ],
            features: [
                'Income and expense tracking with categories',
                'Interactive analytics dashboard with charts',
                'Monthly and weekly financial reports',
                'Category-based expense filtering',
                'Data persistence via LocalStorage',
                'Responsive design for all screen sizes',
                'Visual data representations with Chart.js',
                'Export functionality for reports'
            ],
            challenges: [
                'Optimizing chart rendering for large datasets',
                'Implementing complex date-range filtering',
                'Ensuring data consistency across LocalStorage operations',
                'Creating performant real-time updates'
            ],
            improvements: [
                'Add backend API with database for multi-device sync',
                'Implement budget alerts and notifications',
                'Add CSV/PDF export capabilities',
                'Integrate bank API for automatic transaction import',
                'Add multi-currency support'
            ],
            tech: ['HTML', 'CSS', 'JavaScript', 'Chart.js', 'LocalStorage'],
            github: 'https://github.com/pandulavedavyas',
            liveDemo: '#'
        }
    };

    $$('.project-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.dataset.project;
            const data = projectData[projectId];
            if (!data) return;

            modalBody.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.overview}</p>

                <h3>Objectives</h3>
                <ul>${data.objectives.map(o => `<li>${o}</li>`).join('')}</ul>

                <h3>Problem Statement</h3>
                <p>${data.problemStatement}</p>

                <h3>Architecture</h3>
                <ul>${data.architecture.map(a => `<li>${a}</li>`).join('')}</ul>

                <h3>Key Features</h3>
                <ul>${data.features.map(f => `<li>${f}</li>`).join('')}</ul>

                <h3>Challenges Faced</h3>
                <ul>${data.challenges.map(c => `<li>${c}</li>`).join('')}</ul>

                <h3>Future Improvements</h3>
                <ul>${data.improvements.map(i => `<li>${i}</li>`).join('')}</ul>

                <h3>Technology Stack</h3>
                <div class="modal-tech-tags">${data.tech.map(t => `<span>${t}</span>`).join('')}</div>

                <div class="modal-buttons">
                    <a href="${data.liveDemo}" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                    <a href="${data.github}" target="_blank" class="btn btn-outline btn-sm" rel="noopener"><i class="fab fa-github"></i> GitHub</a>
                </div>
            `;

            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    /* ======================== CONTACT FORM ======================== */
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = $('#contactName').value;
        const email = $('#contactEmail').value;
        const subject = $('#contactSubject').value;
        const message = $('#contactMessage').value;

        const mailtoLink = `mailto:pandulavedavyas@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        window.location.href = mailtoLink;

        showNotification('Opening email client...', 'success');
        contactForm.reset();
    });

    /* ======================== NOTIFICATION ======================== */
    function showNotification(msg, type = 'success') {
        notification.textContent = msg;
        notification.className = 'notification ' + type + ' show';
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    /* ======================== AI ASSISTANT ======================== */
    let aiChatOpen = false;

    aiBtn.addEventListener('click', () => {
        aiChatOpen = !aiChatOpen;
        aiChatbox.classList.toggle('active', aiChatOpen);
    });

    aiChatClose.addEventListener('click', () => {
        aiChatOpen = false;
        aiChatbox.classList.remove('active');
    });

    const aiResponses = {
        'hello': 'Hey there! Welcome to Veda\'s portfolio. How can I help you today?',
        'hi': 'Hello! I\'m VEDA AI. Ask me about Veda\'s projects, skills, or experience!',
        'project': 'Veda has built several impressive projects including an AI Chatbot Assistant using Flask & Gemini API, and an Expense Tracker Dashboard with interactive analytics. Click "View Details" to learn more!',
        'skill': 'Veda is proficient in Python, JavaScript, React, Flask, Machine Learning, OpenCV, TensorFlow, and more. Check out the Tech Stack section for the full list!',
        'contact': 'You can reach Veda at pandulavedavyas@gmail.com or connect on LinkedIn and GitHub. The contact form is also available at the bottom of the page!',
        'education': 'Veda is pursuing a B.Tech in AI & Data Science, with certifications from IBM, Google, EY, and Microsoft.',
        'resume': 'You can download Veda\'s resume from the hero section. Just click the "Download Resume" link!',
        'experience': 'Veda has completed multiple certifications, built 12+ projects, and actively contributes to GitHub with 200+ contributions.',
        'default': 'That\'s a great question! I\'m a demo AI assistant. Try asking about projects, skills, education, or how to contact Veda!'
    };

    function handleAiMessage() {
        const input = aiInput.value.trim().toLowerCase();
        if (!input) return;

        addAiMessage(input, 'user');
        aiInput.value = '';

        setTimeout(() => {
            let response = aiResponses.default;
            for (const [key, val] of Object.entries(aiResponses)) {
                if (input.includes(key)) {
                    response = val;
                    break;
                }
            }
            addAiMessage(response, 'bot');
        }, 600);
    }

    function addAiMessage(text, type) {
        const msg = document.createElement('div');
        msg.className = `ai-msg ${type}`;
        msg.innerHTML = `<p>${text}</p>`;
        aiChatMessages.appendChild(msg);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

    aiSend.addEventListener('click', handleAiMessage);
    aiInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleAiMessage();
    });

    /* ======================== SMOOTH SCROLL ======================== */
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ======================== KEYBOARD NAVIGATION ======================== */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (aiChatOpen) {
                aiChatOpen = false;
                aiChatbox.classList.remove('active');
            }
        }
    });

    /* ======================== DOWNLOAD RESUME HANDLER ======================== */
    const downloadResume = $('#downloadResume');
    if (downloadResume) {
        downloadResume.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Resume download will be available soon!', 'success');
        });
    }

    /* ======================== PERFORMANCE ======================== */
    // Lazy load below-fold sections
    const lazySections = $$('.section');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                lazyObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '200px' });

    lazySections.forEach(s => lazyObserver.observe(s));

})();
