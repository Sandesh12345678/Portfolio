// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const backToTopBtn = document.querySelector('.back-to-top');
const navLinks = document.querySelectorAll('.nav-link');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const statNumbers = document.querySelectorAll('.stat-number');
const floatingCube = document.getElementById('floatingCube');
const sections = document.querySelectorAll('.section');
const form = document.querySelector('.contact-form');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    // Update active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Update active link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    skillProgressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
};

// Animate statistics counters
const animateCounters = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
};

// 3D Cube Interaction
let mouseX = 0;
let mouseY = 0;
let cubeX = 20;
let cubeY = 20;

if (floatingCube) {
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        
        cubeX = 20 + (mouseY * 10);
        cubeY = 20 + (mouseX * 10);
        
        floatingCube.style.transform = `rotateX(${cubeX}deg) rotateY(${cubeY}deg)`;
    });
    
    // Auto-rotate when not interacting
    let autoRotate = true;
    let autoRotateX = 20;
    let autoRotateY = 20;
    
    document.addEventListener('mouseleave', () => {
        autoRotate = true;
    });
    
    document.addEventListener('mousemove', () => {
        autoRotate = false;
    });
    
    function autoRotateCube() {
        if (autoRotate) {
            autoRotateY += 0.3;
            floatingCube.style.transform = `rotateX(${autoRotateX}deg) rotateY(${autoRotateY}deg)`;
        }
        requestAnimationFrame(autoRotateCube);
    }
    
    autoRotateCube();
}

// Form submission
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;
        
        // Create a success message
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending (in a real app, you would send to a server)
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #8BC34A)';
            
            // Reset form
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// Initialize animations when elements come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate skill bars when skills section is in view
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
            
            // Animate counters when about section is in view
            if (entry.target.id === 'about') {
                animateCounters();
            }
            
            // Add animation class to project cards
            if (entry.target.id === 'projects') {
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe sections
sections.forEach(section => {
    observer.observe(section);
});

// Initialize project card animations
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Text rotation effect for hero section
const rotateText = document.querySelector('.rotate-text');
const words = ['Engage', 'Captivate', 'Transform', 'Elevate'];
let wordIndex = 0;

function rotateWords() {
    rotateText.style.opacity = '0';
    
    setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        rotateText.textContent = words[wordIndex];
        rotateText.style.opacity = '1';
    }, 500);
}

// Start word rotation after 3 seconds
setTimeout(() => {
    setInterval(rotateWords, 3000);
}, 3000);

// Initialize floating shapes animation
const shapes = document.querySelectorAll('.shape');
shapes.forEach((shape, index) => {
    shape.style.animationDelay = `${index * 2}s`;
});

// Add some random movement to shapes on mousemove
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translate(${x * speed * 20}px, ${y * speed * 20}px)`;
    });
});

// Page load animation
window.addEventListener('load', () => {
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
});