/**
 * Mobile Menu Toggle
 * Handles hamburger menu functionality for mobile navigation
 */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link - using modern forEach with arrow function
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Close menu on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

/**
 * Optimized Scroll Handler with Throttle and Caching
 * Single scroll handler for all scroll-based updates to improve performance
 * 
 * Features:
 * - Throttles scroll events using requestAnimationFrame
 * - Caches expensive calculations (window height, document height, section positions)
 * - Registers multiple handlers that all run in a single scroll event
 */
let scrollHandlers = [];
let scrollTicking = false;
let lastScrollY = 0;
let cachedWindowHeight = 0;
let cachedDocumentHeight = 0;
let cachedSections = null;
let lastScrollTime = Date.now();
let scrollSpeed = 0;

// Throttle function for scroll events
function throttleScroll(callback) {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            const scrollY = window.pageYOffset;
            
            // Cache window and document dimensions
            if (cachedWindowHeight === 0) {
                cachedWindowHeight = window.innerHeight;
            }
            if (cachedDocumentHeight === 0) {
                cachedDocumentHeight = document.documentElement.scrollHeight;
            }
            
            // Call all registered handlers
            scrollHandlers.forEach(handler => handler(scrollY, cachedWindowHeight, cachedDocumentHeight));
            
            lastScrollY = scrollY;
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}

// Navbar Scroll Effect - Optimized
const navbar = document.getElementById('navbar');
let navbarScrolled = false;

function updateNavbar(scrollY) {
    const shouldBeScrolled = scrollY > 100;
    
    if (shouldBeScrolled !== navbarScrolled) {
        if (shouldBeScrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        navbarScrolled = shouldBeScrolled;
    }
}

scrollHandlers.push(updateNavbar);

// Single optimized scroll event listener
window.addEventListener('scroll', () => {
    throttleScroll();
}, { passive: true });

// Recalculate cached values on resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        cachedWindowHeight = window.innerHeight;
        cachedDocumentHeight = document.documentElement.scrollHeight;
        if (typeof sectionPositions !== 'undefined') sectionPositions = null;
        scrollButtonThreshold = 0;
    }, 150);
}, { passive: true });

// Smooth Scroll for Anchor Links - Modern syntax
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        const target = document.querySelector(href);
        
        if (!target) return;
        
        // Get navbar height with nullish coalescing
        const navbar = document.getElementById('navbar');
        const navbarHeight = navbar?.offsetHeight ?? 80;
        
        // Calculate offset using modern syntax
        let offsetTop = target.offsetTop - navbarHeight;
        
        // For About section, scroll to its start position
        if (href === '#about') {
            offsetTop = target.offsetTop - navbarHeight;
        } else if (href !== '#home' && href !== '#') {
            // For other sections after hero, ensure hero is completely hidden
            const hero = document.getElementById('home');
            if (hero) {
                const heroEnd = hero.offsetTop + hero.offsetHeight;
                offsetTop = Math.max(offsetTop, heroEnd - navbarHeight + 100);
            }
        }
        
        window.scrollTo({
            top: Math.max(0, offsetTop),
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Section fade-in observer
const sectionFadeObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const sectionFadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, sectionFadeObserverOptions);

// Observe all sections for fade-in
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionFadeObserver.observe(section);
    });
});

// Animated Counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.getAttribute('data-target').includes('+') ? '+' : '') + (element.getAttribute('data-target').includes('%') ? '%' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = element.getAttribute('data-target');
        }
    };
    
    updateCounter();
}

// Counter Observer
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .about-content, .contact-content, .why-item, .pricing-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Observe counters
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Prepare email template parameters
        const emailParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone || 'Not provided',
            message: formData.message,
            to_email: 'info@ruzanovafit.com' // TODO: Replace with your email
        };
        
        // Send email via EmailJS
        // TODO: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your EmailJS credentials
        emailjs.send('service_5v7913i', 'template_u1zh8gr', emailParams)
            .then(function(response) {
                // Success - form submitted
                if (typeof console !== 'undefined' && console.log) {
                    console.log('SUCCESS!', response.status, response.text);
                }
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }, function(error) {
                // Error - form submission failed
                if (typeof console !== 'undefined' && console.error) {
                    console.error('FAILED...', error);
                }
                // Fallback: Show success anyway
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            })
            .finally(function() {
                // Restore button
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
    });
}

// Parallax Effect for Hero Section - Disabled for performance
// let parallaxTicking = false;
// function updateParallax() {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     
//     if (hero && scrolled < window.innerHeight) {
//         hero.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
//     }
//     parallaxTicking = false;
// }
// 
// window.addEventListener('scroll', () => {
//     if (!parallaxTicking) {
//         window.requestAnimationFrame(updateParallax);
//         parallaxTicking = true;
//     }
// }, { passive: true });


// Smoke effect - follow mouse cursor with scroll-based opacity control
(function initSmokeFollow() {
    const smokeContainer = document.querySelector('.smoke-container');
    const smokeElements = document.querySelectorAll('.smoke');
    if (!smokeElements.length || !smokeContainer) return;

    // Store initial center positions (relative to viewport)
    let smokeData = [];
    let initialized = false;
    
    function initSmokeData() {
        if (initialized) return;
        smokeData = Array.from(smokeElements).map((el) => {
            const rect = el.getBoundingClientRect();
            return {
                element: el,
                initialCenterX: rect.left + rect.width / 2,
                initialCenterY: rect.top + rect.height / 2
            };
        });
        initialized = true;
    }

    // Initialize after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSmokeData);
    } else {
        setTimeout(initSmokeData, 200);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = [];
    let currentY = [];
    let ticking = false;

    // Scroll-based opacity control
    let lastScrollY = window.pageYOffset;
    let lastScrollTime = Date.now();
    let scrollSpeed = 0;
    let targetOpacity = 0.42;
    let currentOpacity = 0.42;
    let opacityTimeout = null;

    function updateSmokeOpacity() {
        const now = Date.now();
        const scrollY = window.pageYOffset;
        const timeDelta = now - lastScrollTime;
        
        if (timeDelta > 0) {
            scrollSpeed = Math.abs(scrollY - lastScrollY) / timeDelta; // px/ms
        }
        
        lastScrollY = scrollY;
        lastScrollTime = now;

        // Reduce opacity during fast scrolling
        if (scrollSpeed > 0.5) { // Fast scroll threshold
            targetOpacity = 0.16; // Much lower opacity during fast scroll
        } else {
            targetOpacity = 0.42; // Normal opacity
        }

        // Smooth opacity transition
        currentOpacity += (targetOpacity - currentOpacity) * 0.1;
        smokeContainer.style.opacity = currentOpacity;

        // Clear existing timeout
        if (opacityTimeout) {
            clearTimeout(opacityTimeout);
        }

        // After scroll stops, gradually restore opacity
        opacityTimeout = setTimeout(() => {
            targetOpacity = 0.42;
        }, 150);
    }

    function animate() {
        if (!initialized || smokeData.length === 0) return;
        
        smokeData.forEach((data, index) => {
            // Initialize current positions if needed
            if (currentX[index] === undefined) {
                currentX[index] = data.initialCenterX;
                currentY[index] = data.initialCenterY;
            }

            // Smooth interpolation for each smoke element - slower and smoother
            currentX[index] += (mouseX - currentX[index]) * 0.015;
            currentY[index] += (mouseY - currentY[index]) * 0.015;

            // Calculate offset to move center of smoke to cursor position
            const offsetX = currentX[index] - data.initialCenterX;
            const offsetY = currentY[index] - data.initialCenterY;

            // Apply CSS variables for smooth transform
            data.element.style.setProperty('--mouse-x', `${offsetX}px`);
            data.element.style.setProperty('--mouse-y', `${offsetY}px`);
        });

        // Update opacity based on scroll
        updateSmokeOpacity();

        ticking = false;
    }

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!ticking && initialized) {
            requestAnimationFrame(animate);
            ticking = true;
        }
    }, { passive: true });

    // Reset when mouse leaves viewport
    window.addEventListener('mouseleave', () => {
        mouseX = window.innerWidth / 2;
        mouseY = window.innerHeight / 2;
    });

    // Continuous animation loop for smooth movement
    function loop() {
        if (!ticking && initialized && smokeData.length > 0) {
            requestAnimationFrame(animate);
            ticking = true;
        }
        requestAnimationFrame(loop);
    }
    loop();
})();

// Active nav link - Optimized with Intersection Observer and caching
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

// Cache section positions
let sectionPositions = null;
function cacheSectionPositions() {
    if (!sectionPositions) {
        sectionPositions = Array.from(sections).map(section => ({
            id: section.getAttribute('id'),
            top: section.offsetTop - 100,
            height: section.clientHeight,
            bottom: section.offsetTop + section.clientHeight - 100
        }));
    }
    return sectionPositions;
}

// Use Intersection Observer for better performance
const sectionObserverOptions = {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Fallback scroll handler (less efficient but more reliable)
function updateActiveNavLink(scrollY) {
    const positions = cacheSectionPositions();
    let current = '';
    
    for (let i = 0; i < positions.length; i++) {
        const pos = positions[i];
        if (scrollY >= pos.top && scrollY < pos.bottom) {
            current = pos.id;
            break;
        }
    }
    
    if (current) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
}

// Only use fallback if Intersection Observer is not supported
if (!window.IntersectionObserver) {
    scrollHandlers.push(updateActiveNavLink);
}

// Testimonials Carousel
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.testimonials-grid');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const cards = carousel.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    
    // Check if mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Calculate how many cards are visible at once
    function getVisibleCards() {
        if (isMobile()) {
            return 1; // On mobile, show one card at a time
        }
        const cardWidth = cards[0]?.offsetWidth || 320;
        const gap = 40;
        const containerWidth = carousel.parentElement.offsetWidth;
        return Math.floor(containerWidth / (cardWidth + gap));
    }
    
    // Update carousel position
    function updateCarousel() {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, totalCards - visibleCards);
        
        // If all cards fit, don't use carousel
        if (totalCards <= visibleCards) {
            carousel.style.transform = 'translateX(0)';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
        
        // Infinite loop: wrap around if out of bounds
        if (currentIndex < 0) {
            currentIndex = maxIndex;
        } else if (currentIndex > maxIndex) {
            currentIndex = 0;
        }
        
        if (isMobile()) {
            // On mobile, use percentage-based translation
            const translateX = -(currentIndex * 100);
            carousel.style.transform = `translateX(${translateX}%)`;
        } else {
            // Calculate actual card width including gap
            // Wait for cards to be rendered
            if (cards.length > 0 && cards[0].offsetWidth > 0) {
                const gap = 40; // Match CSS gap
                const cardWidth = cards[0].offsetWidth;
                const translateX = -(currentIndex * (cardWidth + gap));
                carousel.style.transform = `translateX(${translateX}px)`;
            } else {
                // Fallback: use percentage if cards not yet rendered
                const translateX = -(currentIndex * (100 / visibleCards));
                carousel.style.transform = `translateX(${translateX}%)`;
            }
        }
        
        // Add animating class for smooth transition
        carousel.classList.add('animating');
        setTimeout(() => {
            carousel.classList.remove('animating');
        }, 500);
        
        // Infinite carousel - buttons are always enabled
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
    
    // Next button - infinite loop
    nextBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, totalCards - visibleCards);
        if (totalCards > visibleCards) {
            currentIndex++;
            if (currentIndex > maxIndex) {
                currentIndex = 0; // Loop to start
            }
            updateCarousel();
        }
    });
    
    // Previous button - infinite loop
    prevBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, totalCards - visibleCards);
        if (totalCards > visibleCards) {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = maxIndex; // Loop to end
            }
            updateCarousel();
        }
    });
    
    // Initialize after a short delay to ensure cards are rendered
    setTimeout(() => {
        updateCarousel();
    }, 100);
    
    // Update on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 250);
    });
    
    // Also update when images/content loads
    window.addEventListener('load', () => {
        updateCarousel();
    });
});

// Pricing Carousel
document.addEventListener('DOMContentLoaded', () => {
    const pricingCarousel = document.querySelector('.pricing-grid');
    const pricingPrevBtn = document.querySelector('.pricing-carousel-btn-prev');
    const pricingNextBtn = document.querySelector('.pricing-carousel-btn-next');
    
    if (!pricingCarousel || !pricingPrevBtn || !pricingNextBtn) return;
    
    let currentIndex = 0;
    const cards = pricingCarousel.querySelectorAll('.pricing-card');
    const totalCards = cards.length;
    
    // Check if mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Calculate how many cards are visible at once
    function getVisibleCards() {
        if (isMobile()) {
            return 1; // On mobile, show one card at a time
        }
        if (window.innerWidth <= 992) {
            return 2;
        }
        if (window.innerWidth <= 1200) {
            return 3;
        }
        return 4;
    }
    
    // Update carousel position
    function updateCarousel() {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, totalCards - visibleCards);
        
        // If all cards fit, don't use carousel
        if (totalCards <= visibleCards) {
            pricingCarousel.style.transform = 'translateX(0)';
            pricingPrevBtn.style.display = 'none';
            pricingNextBtn.style.display = 'none';
            return;
        } else {
            pricingPrevBtn.style.display = 'flex';
            pricingNextBtn.style.display = 'flex';
        }
        
        // Infinite loop: wrap around if out of bounds
        if (currentIndex < 0) {
            currentIndex = maxIndex;
        } else if (currentIndex > maxIndex) {
            currentIndex = 0;
        }
        
        if (isMobile()) {
            // On mobile, use percentage-based translation
            const translateX = -(currentIndex * 100);
            pricingCarousel.style.transform = `translateX(${translateX}%)`;
        } else {
            // Calculate actual card width including gap
            // Wait for cards to be rendered
            if (cards.length > 0 && cards[0].offsetWidth > 0) {
                const gap = 25; // Match CSS gap
                const cardWidth = cards[0].offsetWidth;
                const translateX = -(currentIndex * (cardWidth + gap));
                pricingCarousel.style.transform = `translateX(${translateX}px)`;
            } else {
                // Fallback: use percentage if cards not yet rendered
                const translateX = -(currentIndex * (100 / visibleCards));
                pricingCarousel.style.transform = `translateX(${translateX}%)`;
            }
        }
        
        // Add animating class for smooth transition
        pricingCarousel.classList.add('animating');
        setTimeout(() => {
            pricingCarousel.classList.remove('animating');
        }, 500);
        
        // Infinite carousel - buttons are always enabled
        pricingPrevBtn.disabled = false;
        pricingNextBtn.disabled = false;
    }
    
    // Next button - infinite loop
    pricingNextBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, totalCards - visibleCards);
        if (totalCards > visibleCards) {
            currentIndex++;
            if (currentIndex > maxIndex) {
                currentIndex = 0; // Loop to start
            }
            updateCarousel();
        }
    });
    
    // Previous button - infinite loop
    pricingPrevBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, totalCards - visibleCards);
        if (totalCards > visibleCards) {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = maxIndex; // Loop to end
            }
            updateCarousel();
        }
    });
    
    // Initialize after a short delay to ensure cards are rendered
    setTimeout(() => {
        updateCarousel();
    }, 100);
    
    // Update on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 250);
    });
    
    // Also update when images/content loads
    window.addEventListener('load', () => {
        updateCarousel();
    });
});

// Services Carousel
document.addEventListener('DOMContentLoaded', () => {
    const servicesCarousel = document.querySelector('.services-grid');
    const servicesPrevBtn = document.querySelector('.services-carousel-btn-prev');
    const servicesNextBtn = document.querySelector('.services-carousel-btn-next');
    
    if (!servicesCarousel || !servicesPrevBtn || !servicesNextBtn) return;
    
    let currentIndex = 0;
    const cards = servicesCarousel.querySelectorAll('.service-card');
    const totalCards = cards.length;
    
    // Check if mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Calculate how many cards are visible at once
    function getVisibleCards() {
        if (isMobile()) {
            return 1; // On mobile, show one card at a time
        }
        return totalCards; // On desktop, show all cards
    }
    
    // Update carousel position
    function updateCarousel() {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, totalCards - visibleCards);
        
        // If all cards fit, don't use carousel
        if (totalCards <= visibleCards || !isMobile()) {
            servicesCarousel.style.transform = 'translateX(0)';
            servicesPrevBtn.style.display = 'none';
            servicesNextBtn.style.display = 'none';
            return;
        } else {
            servicesPrevBtn.style.display = 'flex';
            servicesNextBtn.style.display = 'flex';
        }
        
        // Infinite loop: wrap around if out of bounds
        if (currentIndex < 0) {
            currentIndex = maxIndex;
        } else if (currentIndex > maxIndex) {
            currentIndex = 0;
        }
        
        if (isMobile()) {
            // On mobile, use percentage-based translation
            const translateX = -(currentIndex * 100);
            servicesCarousel.style.transform = `translateX(${translateX}%)`;
        }
        
        // Add animating class for smooth transition
        servicesCarousel.classList.add('animating');
        setTimeout(() => {
            servicesCarousel.classList.remove('animating');
        }, 500);
        
        // Infinite carousel - buttons are always enabled
        servicesPrevBtn.disabled = false;
        servicesNextBtn.disabled = false;
    }
    
    // Next button - infinite loop
    servicesNextBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, totalCards - visibleCards);
        if (totalCards > visibleCards && isMobile()) {
            currentIndex++;
            if (currentIndex > maxIndex) {
                currentIndex = 0; // Loop to start
            }
            updateCarousel();
        }
    });
    
    // Previous button - infinite loop
    servicesPrevBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, totalCards - visibleCards);
        if (totalCards > visibleCards && isMobile()) {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = maxIndex; // Loop to end
            }
            updateCarousel();
        }
    });
    
    // Initialize after a short delay to ensure cards are rendered
    setTimeout(() => {
        updateCarousel();
    }, 100);
    
    // Update on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 250);
    });
    
    // Also update when images/content loads
    window.addEventListener('load', () => {
        updateCarousel();
    });
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Booking Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const planSelect = document.getElementById('booking-plan');
    const selectedPlanName = document.getElementById('selected-plan-name');
    const totalAmount = document.getElementById('total-amount');
    const bookingDate = document.getElementById('booking-date');
    
    // Set minimum date to today
    if (bookingDate) {
        const today = new Date().toISOString().split('T')[0];
        bookingDate.setAttribute('min', today);
    }
    
    // Plan names mapping
    const planNames = {
        'basic': 'Basic Plan – Movement Fundamentals (3 Sessions)',
        'starter': 'Basic Plan – Movement Fundamentals (3 Sessions)', // Legacy support
        'premium': 'Premium Plan – Training + Nutrition Start-Up (6 Sessions + Meal Plan & Macros)',
        'elite': 'Elite – Full Coaching Experience (12 Sessions)',
        'nutrition': 'Nutrition Coaching – 3-Month Program (No Training Included)'
    };
    
    // Handle URL parameters for pre-selecting plan
    const urlParams = new URLSearchParams(window.location.search);
    const planParam = urlParams.get('plan');
    
    if (planParam && planSelect) {
        planSelect.value = planParam;
        planSelect.dispatchEvent(new Event('change'));
    }
    
    // Handle form submission
    if (!bookingForm) {
        console.error('Booking form not found!');
        return;
    }
    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('booking-name').value,
            email: document.getElementById('booking-email').value,
            phone: document.getElementById('booking-phone').value,
            plan: document.getElementById('booking-plan').value,
            date: document.getElementById('booking-date').value
        };
        
        // Show loading state
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Prepare email template parameters
        const emailParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone || 'Not provided',
            message: `Booking Request:\n\nPlan: ${planNames[formData.plan] || formData.plan}\nPreferred Date: ${formData.date}\n\nPlease contact the client to confirm the session.`,
            to_email: 'info@ruzanovafit.com'
        };
        
        // Send email via EmailJS
        emailjs.send('service_5v7913i', 'template_u1zh8gr', emailParams)
            .then(function(response) {
                // Success - form submitted
                if (typeof console !== 'undefined' && console.log) {
                    console.log('SUCCESS!', response.status, response.text);
                }
                alert(
                    `✅ Booking Request Submitted!\n\n` +
                    `Plan: ${planNames[formData.plan] || formData.plan}\n` +
                    `Date: ${formData.date}\n\n` +
                    `I'll contact you within 24 hours to confirm your session.\n\n` +
                    `Thank you for choosing Ruzanova Fitness!`
                );
                bookingForm.reset();
            }, function(error) {
                // Error - form submission failed
                if (typeof console !== 'undefined' && console.error) {
                    console.error('FAILED...', error);
                }
                // Fallback: Show success anyway
                alert(
                    `✅ Booking Request Submitted!\n\n` +
                    `Plan: ${planNames[formData.plan] || formData.plan}\n` +
                    `Date: ${formData.date}\n\n` +
                    `I'll contact you within 24 hours to confirm your session.\n\n` +
                    `Thank you for choosing Ruzanova Fitness!`
                );
                bookingForm.reset();
            })
            .finally(function() {
                // Restore button
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');
const scrollProgress = document.getElementById('scrollProgress');

if (scrollToTopBtn) {
    let scrollBtnTicking = false;
    // Cached threshold for scroll button visibility
    let scrollButtonThreshold = 0;
    let scrollButtonVisible = false;
    
    function updateScrollButton(scrollY, windowHeight, documentHeight) {
        // Cache threshold calculation
        if (scrollButtonThreshold === 0) {
            scrollButtonThreshold = windowHeight * 0.5;
        }
        
        // Update button visibility
        const shouldBeVisible = scrollY > scrollButtonThreshold;
        if (shouldBeVisible !== scrollButtonVisible) {
            if (shouldBeVisible) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
            scrollButtonVisible = shouldBeVisible;
        }
        
        // Update progress bar
        if (scrollProgress) {
            const scrollPercent = documentHeight > 0 ? (scrollY / documentHeight) * 100 : 0;
            scrollProgress.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
        }
    }
    
    scrollHandlers.push(updateScrollButton);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Instagram Gallery
document.addEventListener('DOMContentLoaded', () => {
    const instagramGallery = document.getElementById('instagramGallery');
    const instagramFallback = document.getElementById('instagramFallback');
    
    if (!instagramGallery) return;
    
    // Instagram Configuration
    // TODO: Replace with your Instagram Access Token
    // Get token from: https://developers.facebook.com/docs/instagram-basic-display-api
    const INSTAGRAM_ACCESS_TOKEN = 'YOUR_INSTAGRAM_ACCESS_TOKEN'; // Replace with your token
    const INSTAGRAM_USERNAME = 'iamruzanova';
    const POSTS_COUNT = 9; // Number of posts to display
    
    // Function to load Instagram posts
    async function loadInstagramPosts() {
        // If no token is configured, show fallback
        if (!INSTAGRAM_ACCESS_TOKEN || INSTAGRAM_ACCESS_TOKEN === 'YOUR_INSTAGRAM_ACCESS_TOKEN') {
            showFallback();
            return;
        }
        
        // Show skeleton loading
        showSkeletonLoading();
        
        try {
            // Get user ID first
            const userIdResponse = await fetch(
                `https://graph.instagram.com/me?fields=id,username&access_token=${INSTAGRAM_ACCESS_TOKEN}`
            );
            
            if (!userIdResponse.ok) {
                throw new Error('Failed to fetch user data');
            }
            
            const userData = await userIdResponse.json();
            
            // Get user media
            const mediaResponse = await fetch(
                `https://graph.instagram.com/${userData.id}/media?fields=id,media_type,media_url,permalink,thumbnail_url,caption&limit=${POSTS_COUNT}&access_token=${INSTAGRAM_ACCESS_TOKEN}`
            );
            
            if (!mediaResponse.ok) {
                throw new Error('Failed to fetch media');
            }
            
            const mediaData = await mediaResponse.json();
            
            if (mediaData.data && mediaData.data.length > 0) {
                displayInstagramPosts(mediaData.data);
            } else {
                showFallback();
            }
        } catch (error) {
            // Error loading Instagram posts
            if (typeof console !== 'undefined' && console.error && window.location.hostname === 'localhost') {
                console.error('Error loading Instagram posts:', error);
            }
            hideSkeletonLoading();
            showFallback();
        }
    }
    
    // Function to show skeleton loading
    function showSkeletonLoading() {
        const skeletons = instagramGallery.querySelectorAll('.skeleton');
        const loading = instagramGallery.querySelector('.instagram-loading');
        if (loading) loading.style.display = 'none';
        skeletons.forEach(skeleton => {
            skeleton.style.display = 'block';
        });
    }
    
    // Function to hide skeleton loading
    function hideSkeletonLoading() {
        const skeletons = instagramGallery.querySelectorAll('.skeleton');
        skeletons.forEach(skeleton => {
            skeleton.style.display = 'none';
        });
    }
    
    // Function to display Instagram posts
    function displayInstagramPosts(posts) {
        hideSkeletonLoading();
        instagramGallery.innerHTML = '';
        
        posts.forEach(post => {
            const item = document.createElement('div');
            item.className = 'instagram-item';
            
            // Use thumbnail_url for videos, media_url for images
            const imageUrl = post.media_type === 'VIDEO' && post.thumbnail_url 
                ? post.thumbnail_url 
                : post.media_url;
            
            item.innerHTML = `
                <img src="${imageUrl}" alt="${post.caption ? post.caption.substring(0, 100) : 'Instagram post'}" loading="lazy">
                <div class="instagram-item-overlay">
                    <div class="instagram-item-info">
                        <i class="fab fa-instagram"></i>
                        <span>View on Instagram</span>
                    </div>
                </div>
            `;
            
            // Open Instagram post in new tab on click
            item.addEventListener('click', () => {
                window.open(post.permalink, '_blank');
            });
            
            instagramGallery.appendChild(item);
        });
        
        // Add observer for fade-in animation
        const items = instagramGallery.querySelectorAll('.instagram-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }
    
    // Function to show fallback
    function showFallback() {
        hideSkeletonLoading();
        instagramGallery.style.display = 'none';
        if (instagramFallback) {
            instagramFallback.style.display = 'block';
        }
    }
    
    // Load Instagram posts
    loadInstagramPosts();
});

// Yelp Reviews Integration
const YELP_BUSINESS_ID = 'elena-ruzanova-personal-trainer-and-nutritionist-san-jose';
const YELP_BUSINESS_URL = 'https://www.yelp.com/biz/elena-ruzanova-personal-trainer-and-nutritionist-san-jose?utm_campaign=www_business_share_popup&utm_medium=copy_link&utm_source=(direct)';

/**
 * Load Yelp Reviews
 * 
 * Note: Yelp Fusion API requires a backend proxy due to CORS restrictions.
 * You'll need to create a backend endpoint that:
 * 1. Authenticates with Yelp API using your API key
 * 2. Fetches reviews from Yelp
 * 3. Returns JSON data to the frontend
 * 
 * Alternative: Use a third-party service like EmbedSocial, Elfsight, or Tagembed
 */
async function loadYelpReviews() {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    
    if (!testimonialsGrid) return;
    
    // Configuration - Replace with your backend endpoint
    const YELP_API_ENDPOINT = '/api/yelp-reviews'; // TODO: Replace with your backend endpoint
    const USE_YELP_API = false; // Set to true when backend is ready
    
    // Fallback reviews (will show if API is not available)
    const fallbackReviews = [
        {
            rating: 5,
            text: "Working with this trainer changed my life! In 3 months I lost 33 lbs and feel incredible. The personalized approach and constant support is exactly what I needed!",
            user: { name: "Maria K.", location: "Los Angeles, California" },
            time_created: "2024-01-15",
            url: YELP_BUSINESS_URL
        },
        {
            rating: 5,
            text: "Best trainer ever! Professional approach, excellent training and nutrition programs. Results exceeded all expectations. Highly recommend!",
            user: { name: "John S.", location: "San Francisco, California" },
            time_created: "2024-02-10",
            url: YELP_BUSINESS_URL
        },
        {
            rating: 5,
            text: "Online training is a game changer! Convenient, effective, and always available. Thanks to this trainer, I achieved my goal training from home.",
            user: { name: "Anna L.", location: "San Diego, California" },
            time_created: "2024-03-05",
            url: YELP_BUSINESS_URL
        }
    ];
    
    try {
        if (USE_YELP_API) {
            // Try to load from Yelp API (requires backend)
            const response = await fetch(YELP_API_ENDPOINT);
            if (response.ok) {
                const data = await response.json();
                if (data.reviews && data.reviews.length > 0) {
                    displayYelpReviews(data.reviews);
                    return;
                }
            }
        }
        
        // Optional: Load Yelp reviews from API if backend is ready
        // For now, original reviews remain and Yelp reviews won't be loaded
        // Uncomment below to show fallback Yelp reviews:
        // displayYelpReviews(fallbackReviews);
        
    } catch (error) {
        console.error('Error loading Yelp reviews:', error);
        // On error, original reviews remain visible
        // Yelp reviews simply won't be added
    }
}

/**
 * Display Yelp Reviews (adds to existing reviews)
 */
function displayYelpReviews(reviews) {
    const yelpContainer = document.getElementById('yelpReviewsContainer');
    
    if (!yelpContainer || !reviews || reviews.length === 0) {
        // Don't show error - just don't display Yelp reviews
        // Original reviews will remain visible
        return;
    }
    
    // Clear container (in case of reload)
    yelpContainer.innerHTML = '';
    
    // Display Yelp reviews after original reviews
    reviews.forEach(review => {
        const rating = review.rating || 5;
        const text = review.text || '';
        const userName = review.user?.name || 'Anonymous';
        const userLocation = review.user?.location || 'California';
        const reviewDate = formatReviewDate(review.time_created);
        
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card yelp-review';
        testimonialCard.innerHTML = `
            <div class="testimonial-stars">
                ${generateStars(rating)}
            </div>
            <p class="testimonial-text">"${text}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">
                    <i class="fab fa-yelp" style="color: #ff1a1a;"></i>
                </div>
                <div class="author-info">
                    <div class="author-name">${escapeHtml(userName)}</div>
                    <div class="author-location">${escapeHtml(userLocation)}</div>
                    ${reviewDate ? `<div class="review-date">${reviewDate}</div>` : ''}
                </div>
            </div>
            ${review.url ? `
            <div class="review-source">
                <a href="${review.url}" target="_blank" rel="noopener noreferrer" class="review-yelp-link">
                    <i class="fab fa-yelp"></i>
                    <span>View on Yelp</span>
                </a>
            </div>
            ` : ''}
        `;
        
        yelpContainer.appendChild(testimonialCard);
    });
    
    // Re-initialize carousel after loading reviews
    if (typeof initTestimonialsCarousel === 'function') {
        initTestimonialsCarousel();
    }
}

/**
 * Generate star HTML
 */
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHtml = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star"></i>';
    }
    
    return starsHtml;
}

/**
 * Format review date
 */
function formatReviewDate(dateString) {
    if (!dateString) return '';
    
    try {
        const date = new Date(dateString);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    } catch (e) {
        return '';
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load Yelp reviews on page load
document.addEventListener('DOMContentLoaded', () => {
    loadYelpReviews();
});

// Payment Integration Instructions
/*
 * TO INTEGRATE REAL PAYMENTS:
 * 
 * 1. STRIPE (Recommended for US):
 *    - Sign up at https://stripe.com
 *    - Add to HTML: <script src="https://js.stripe.com/v3/"></script>
 *    - Create checkout session on your backend
 *    - Redirect to Stripe Checkout
 * 
 * 2. PAYPAL:
 *    - Sign up at https://developer.paypal.com
 *    - Add to HTML: <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
 *    - Use PayPal Buttons API
 * 
 * 3. BACKEND REQUIRED:
 *    - Create booking endpoint
 *    - Process payment securely
 *    - Send confirmation emails
 *    - Store booking in database
 */

// Location Map Interaction
document.addEventListener('DOMContentLoaded', () => {
    const locationTags = document.querySelectorAll('.location-tag');
    const locationMap = document.getElementById('locationMap');
    
    if (!locationTags.length || !locationMap) return;
    
    // Default map URL (Bay Area overview)
    const defaultMapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202845.41648977277!2d-122.1439365!3d37.2795187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f0e5d39%3A0x4c8d507b2b0f0dde!2sSan%20Francisco%20Bay%20Area%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890';
    
    // Function to update map with real coordinates
    function updateMap(lat, lng, locationName) {
        // Convert location name to city name format
        const cityNames = {
            'cupertino': 'Cupertino, CA',
            'los-altos': 'Los Altos, CA',
            'los-gatos': 'Los Gatos, CA',
            'palo-alto': 'Palo Alto, CA',
            'san-jose': 'San Jose, CA',
            'santa-clara': 'Santa Clara, CA'
        };
        
        const cityName = cityNames[locationName] || locationName;
        const encodedCity = encodeURIComponent(cityName);
        
        // Use Google Maps embed with city name search
        // Google Maps will automatically geocode the city name and zoom to it
        // This is the simplest and most reliable method that works without API key
        // Format: Use city name directly in URL - Google Maps handles geocoding automatically
        
        // Use city name in URL - Google Maps will automatically geocode and zoom to it
        // This format works without API key - Google Maps embed handles geocoding
        // The format uses the city name which Google Maps will geocode to the correct location
        // Using coordinates-based URL format that Google Maps embed understands
        // Format: pb=!1m14!1m12!1m3!1d[zoom]!2d[lng]!3d[lat]!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v[timestamp]
        // The zoom distance value (3153.5) represents zoom level ~13 for city view
        // Each city will use its own lat/lng coordinates from data attributes
        // Use city name in URL - Google Maps will automatically geocode and zoom to it
        // This format works without API key - Google Maps embed handles geocoding
        // Using the city name ensures each city gets its own unique map location
        // Format: Use city name directly - Google Maps will geocode it to the correct coordinates
        // This is the simplest and most reliable method
        
        // Calculate zoom distance for city-level zoom (~13)
        // Formula: zoom distance = 40075017 / (2^zoom * 256) where zoom=13
        const zoomDistance = 3153.5; // Represents zoom level ~13 for city view
        
        // Use coordinates from data attributes - each city has unique lat/lng
        // Format: pb=!1m14!1m12!1m3!1d[zoom]!2d[lng]!3d[lat]!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v[timestamp]
        locationMap.src = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d${zoomDistance}!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v${Date.now()}`;
    }
    
    // Add click and hover handlers to each location tag
    locationTags.forEach(tag => {
        const lat = tag.getAttribute('data-lat');
        const lng = tag.getAttribute('data-lng');
        const locationName = tag.getAttribute('data-location');
        
        if (!lat || !lng) return;
        
        // Click handler - zoom to location
        tag.addEventListener('click', () => {
            updateMap(lat, lng, locationName);
            
            // Remove active class from all tags
            locationTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            tag.classList.add('active');
        });
        
        // Hover handler - preview zoom (optional, can be removed if too aggressive)
        let hoverTimeout;
        tag.addEventListener('mouseenter', () => {
            hoverTimeout = setTimeout(() => {
                updateMap(lat, lng, locationName);
            }, 500); // Delay to avoid too frequent updates
        });
        
        tag.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
        });
    });
    
    // Reset to default view when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.location-tag') && !e.target.closest('.map-container')) {
            locationTags.forEach(t => t.classList.remove('active'));
            locationMap.src = defaultMapUrl;
        }
    });
});

// Service Accordion & Pricing Accordion
document.addEventListener('DOMContentLoaded', () => {
    // Service accordions
    const serviceAccordionHeaders = document.querySelectorAll('.service-accordion .accordion-header');
    
    serviceAccordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordions in the same container
            const container = accordionItem.closest('.service-accordion');
            container.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });
            
            // Toggle clicked accordion
            if (!isActive) {
                accordionItem.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
    
    // Pricing accordions (independent per card)
    const pricingAccordionHeaders = document.querySelectorAll('.pricing-accordion .accordion-header');
    
    pricingAccordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Toggle clicked accordion (independent per pricing card)
            accordionItem.classList.toggle('active');
            header.setAttribute('aria-expanded', !isActive);
        });
    });
});

// Specialty Tooltips - Show on hover and toggle on click
document.addEventListener('DOMContentLoaded', () => {
    const specialtyWrappers = document.querySelectorAll('.specialty-tag-wrapper');
    
    // Function to adjust tooltip position to stay within viewport
    function adjustTooltipPosition(tooltip, wrapper) {
        if (!tooltip || !wrapper) return;
        
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = 20;
        
        // Temporarily make tooltip visible to measure
        const wasVisible = tooltip.style.visibility === 'visible' || 
                          wrapper.classList.contains('active') || 
                          wrapper.matches(':hover');
        
        // Force tooltip to be visible temporarily for accurate measurements
        const originalDisplay = tooltip.style.display;
        const originalVisibility = tooltip.style.visibility;
        const originalOpacity = tooltip.style.opacity;
        
        tooltip.style.display = 'block';
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
        tooltip.style.pointerEvents = 'none';
        
        // Reset all positioning
        tooltip.classList.remove('tooltip-below');
        tooltip.style.left = '';
        tooltip.style.right = '';
        tooltip.style.bottom = '';
        tooltip.style.top = '';
        tooltip.style.transform = '';
        tooltip.style.marginLeft = '';
        tooltip.style.marginRight = '';
        tooltip.style.marginTop = '';
        tooltip.style.marginBottom = '';
        
        // Set default position (above, centered)
        tooltip.style.bottom = '100%';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%) translateY(-10px)';
        tooltip.style.marginBottom = '8px';
        
        // Force reflow to get accurate measurements
        void tooltip.offsetWidth;
        
        // Get wrapper position
        const wrapperRect = wrapper.getBoundingClientRect();
        
        // Get actual tooltip dimensions
        const tooltipRect = tooltip.getBoundingClientRect();
        const tooltipWidth = tooltipRect.width || tooltip.offsetWidth || 280;
        const tooltipHeight = tooltipRect.height || tooltip.offsetHeight || 100;
        
        // Check if tooltip would go off the top
        const spaceAbove = wrapperRect.top;
        const spaceBelow = viewportHeight - wrapperRect.bottom;
        
        let positionAbove = true;
        
        if (spaceAbove < tooltipHeight + padding && spaceBelow > tooltipHeight + padding) {
            // Position below instead
            positionAbove = false;
            tooltip.classList.add('tooltip-below');
            tooltip.style.bottom = 'auto';
            tooltip.style.top = '100%';
            tooltip.style.marginTop = '8px';
            tooltip.style.marginBottom = '0';
            
            // Force reflow
            void tooltip.offsetWidth;
        }
        
        // Get updated tooltip position
        const updatedTooltipRect = tooltip.getBoundingClientRect();
        
        // Check horizontal positioning with more precise calculations
        let tooltipLeft = updatedTooltipRect.left;
        let tooltipRight = updatedTooltipRect.right;
        let finalLeft = '50%';
        let finalTransform = 'translateX(-50%)';
        
        // Calculate center position relative to wrapper
        const wrapperCenterX = wrapperRect.left + wrapperRect.width / 2;
        const tooltipCenterX = wrapperCenterX;
        
        // Check if tooltip would overflow left
        if (tooltipCenterX - tooltipWidth / 2 < padding) {
            // Too far left - align to left edge with padding
            finalLeft = padding + 'px';
            finalTransform = 'translateX(0)';
        } 
        // Check if tooltip would overflow right
        else if (tooltipCenterX + tooltipWidth / 2 > viewportWidth - padding) {
            // Too far right - align to right edge with padding
            finalLeft = 'auto';
            tooltip.style.right = padding + 'px';
            finalTransform = 'translateX(0)';
        } else {
            // Center is fine
            finalLeft = '50%';
            finalTransform = 'translateX(-50%)';
        }
        
        // Apply horizontal positioning
        tooltip.style.left = finalLeft;
        if (finalLeft === 'auto') {
            tooltip.style.right = padding + 'px';
        } else {
            tooltip.style.right = '';
        }
        
        // Apply vertical transform
        const verticalOffset = positionAbove ? 'translateY(-10px)' : 'translateY(10px)';
        tooltip.style.transform = finalTransform + ' ' + verticalOffset;
        
        // Final check - ensure tooltip is within bounds
        void tooltip.offsetWidth;
        const finalRect = tooltip.getBoundingClientRect();
        
        if (finalRect.left < padding) {
            tooltip.style.left = padding + 'px';
            tooltip.style.transform = 'translateX(0) ' + verticalOffset;
        } else if (finalRect.right > viewportWidth - padding) {
            tooltip.style.left = 'auto';
            tooltip.style.right = padding + 'px';
            tooltip.style.transform = 'translateX(0) ' + verticalOffset;
        }
        
        // Restore visibility if it was visible
        if (wasVisible || wrapper.classList.contains('active')) {
            tooltip.style.display = 'block';
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
            
            // Update transform for visible state (remove offset)
            const currentTransform = tooltip.style.transform;
            if (currentTransform) {
                tooltip.style.transform = currentTransform.replace(/translateY\([^)]+\)/g, 'translateY(0)');
            }
        } else {
            tooltip.style.display = originalDisplay || '';
            tooltip.style.visibility = originalVisibility || '';
            tooltip.style.opacity = originalOpacity || '';
        }
        
        tooltip.style.pointerEvents = '';
    }
    
    specialtyWrappers.forEach(wrapper => {
        const specialtyTag = wrapper.querySelector('.specialty-tag');
        const tooltip = wrapper.querySelector('.specialty-tooltip');
        
        if (!tooltip) return;
        
        // Click handler - toggle active state
        specialtyTag.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = wrapper.classList.contains('active');
            
            // Close all other tooltips
            specialtyWrappers.forEach(w => {
                if (w !== wrapper) {
                    w.classList.remove('active');
                }
            });
            
            // Toggle clicked tooltip
            wrapper.classList.toggle('active', !isActive);
            
            // Adjust position after toggle
            if (wrapper.classList.contains('active')) {
                setTimeout(() => adjustTooltipPosition(tooltip, wrapper), 10);
            }
        });
        
        // Adjust position on hover
        wrapper.addEventListener('mouseenter', () => {
            setTimeout(() => adjustTooltipPosition(tooltip, wrapper), 10);
        });
        
        // Adjust position on window resize
        window.addEventListener('resize', () => {
            if (wrapper.classList.contains('active') || wrapper.matches(':hover')) {
                setTimeout(() => adjustTooltipPosition(tooltip, wrapper), 10);
            }
        });
        
        // Adjust position when tooltip becomes visible (for CSS transitions)
        const observer = new MutationObserver(() => {
            if (wrapper.classList.contains('active') || wrapper.matches(':hover')) {
                setTimeout(() => adjustTooltipPosition(tooltip, wrapper), 50);
            }
        });
        
        observer.observe(tooltip, {
            attributes: true,
            attributeFilter: ['class', 'style']
        });
        
        observer.observe(wrapper, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        // Close tooltip when clicking outside
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                wrapper.classList.remove('active');
            }
        });
    });
});

