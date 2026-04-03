document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for fade-up animations
    const fadeUpElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeUpElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    // Blob movement based on mouse position
    const hero = document.querySelector('.hero');
    const blob = document.querySelector('.blob-wrapper-centered');
    
    if (hero && blob) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const heroRect = hero.getBoundingClientRect();
            
            const moveIntensity = 30; // higher = less movement
            const moveX = (clientX - heroRect.left - heroRect.width / 2) / moveIntensity;
            const moveY = (clientY - heroRect.top - heroRect.height / 2) / moveIntensity;
            
            blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        hero.addEventListener('mouseleave', () => {
            blob.style.transform = `translate(0px, 0px)`;
        });
    }

    // Modal Logic
    const contactModal = document.getElementById('contact-modal');
    const triggers = document.querySelectorAll('a[href="#contact"]');
    const closeBtn = document.querySelector('.close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');

    const openModal = (e) => {
        if(e) e.preventDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    triggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    if(modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Form logic
    const form = document.querySelector('.contact-form');
    const modalText = document.querySelector('.modal-text');
    const thankYou = document.querySelector('.thank-you-state');
    const closeThankYou = document.querySelector('.close-modal-btn');

    const resetModalState = () => {
        if(form) form.style.display = 'flex';
        if(modalText) modalText.style.display = 'block';
        if(thankYou) thankYou.style.display = 'none';
    };

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 1. Get Form Data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const plan = formData.get('plan');

            // 2. Format WhatsApp Message
            const yourWhatsAppNumber = "2349051720972";
            const message = `Hello YungZee Media! 🚀\n\nI'm interested in scaling my business presence.\n\n*Full Name:* ${name}\n*Email:* ${email}\n*WhatsApp:* ${phone}\n*Plan Choice:* ${plan}\n\nLet's grow! 📈`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${yourWhatsAppNumber}?text=${encodedMessage}`;

            // 3. Open WhatsApp and Show Thank You
            window.open(whatsappUrl, '_blank');
            if(form) form.style.display = 'none';
            if(modalText) modalText.style.display = 'none';
            if(thankYou) thankYou.style.display = 'flex';
        });
    }

    if(closeThankYou) closeThankYou.addEventListener('click', closeModal);
    
    // Reset modal when opened
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if(contactModal) {
                resetModalState();
                contactModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
});
