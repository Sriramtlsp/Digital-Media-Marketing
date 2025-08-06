// OneTen Digital Media Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initChatWidget();
    initMobileMenu();
    initSmoothScrolling();
    initIntersectionObserver();
    initFormValidation();
    initToastNotifications();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-white', 'shadow-lg');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-white', 'shadow-lg');
            navbar.classList.add('bg-transparent');
        }
    });
    
    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe testimonial cards
    document.querySelectorAll('.testimonial-card').forEach(card => {
        observer.observe(card);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
}

// Form validation
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        showToast(errors.join(', '), 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Live chat widget
function initChatWidget() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatContainer = document.getElementById('chat-container');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    
    let isChatOpen = false;
    
    // Toggle chat
    chatToggle.addEventListener('click', function() {
        if (isChatOpen) {
            closeChat();
        } else {
            openChat();
        }
    });
    
    // Close chat
    chatClose.addEventListener('click', closeChat);
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                addTypingIndicator();
                setTimeout(() => {
                    removeTypingIndicator();
                    addBotResponse(message);
                }, 1500);
            }, 500);
        }
    }
    
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function openChat() {
        chatContainer.classList.remove('hidden');
        setTimeout(() => {
            chatContainer.classList.add('show');
        }, 10);
        isChatOpen = true;
        chatInput.focus();
    }
    
    function closeChat() {
        chatContainer.classList.remove('show');
        setTimeout(() => {
            chatContainer.classList.add('hidden');
        }, 300);
        isChatOpen = false;
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex items-start';
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="ml-auto">
                    <div class="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                        <p class="text-sm">${text}</p>
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-3">
                    T
                </div>
                <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p class="text-sm">${text}</p>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'flex items-start typing-indicator-container';
        typingDiv.innerHTML = `
            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-3">
                T
            </div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function removeTypingIndicator() {
        const typingContainer = chatMessages.querySelector('.typing-indicator-container');
        if (typingContainer) {
            typingContainer.remove();
        }
    }
    
    function addBotResponse(userMessage) {
        const responses = [
            "Thanks for your message! Our team will get back to you shortly.",
            "That's a great question! Let me connect you with our specialist.",
            "I understand you're interested in our services. Let me help you get started.",
            "Thanks for reaching out! We'd love to discuss your project in detail.",
            "I'll make sure our team reviews your inquiry and responds promptly."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, 'bot');
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('show');
    });
    
    // Close mobile menu when clicking on links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        }
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in classes
    document.querySelectorAll('.fade-in, .fade-in-delay').forEach(el => {
        observer.observe(el);
    });
}

// Toast notifications
function initToastNotifications() {
    // Create toast container if it doesn't exist
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed top-4 right-4 z-50 space-y-2';
        document.body.appendChild(toastContainer);
    }
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast message ${type} bg-white border-l-4 ${
        type === 'success' ? 'border-green-500' : 
        type === 'error' ? 'border-red-500' : 'border-blue-500'
    } p-4 rounded-lg shadow-lg max-w-sm`;
    
    toast.innerHTML = `
        <div class="flex items-center">
            <div class="flex-shrink-0">
                ${type === 'success' ? '<i class="fas fa-check-circle text-green-500"></i>' :
                  type === 'error' ? '<i class="fas fa-exclamation-circle text-red-500"></i>' :
                  '<i class="fas fa-info-circle text-blue-500"></i>'}
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">${message}</p>
            </div>
            <div class="ml-auto pl-3">
                <button class="text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(() => {
        // Handle scroll events efficiently
    }, 16); // ~60fps
    
    window.addEventListener('scroll', debouncedScrollHandler);
}

// Accessibility enhancements
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (button.textContent.trim()) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // Keyboard navigation for chat
    const chatToggle = document.getElementById('chat-toggle');
    if (chatToggle) {
        chatToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
}

// Initialize performance optimizations and accessibility
initPerformanceOptimizations();
initAccessibility();

// Service Worker for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking (example with Google Analytics)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track form submissions
document.addEventListener('submit', function(e) {
    if (e.target.id === 'contact-form') {
        trackEvent('Form', 'Submit', 'Contact Form');
    }
});

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href="#contact"]')) {
        trackEvent('Button', 'Click', 'Contact CTA');
    }
    if (e.target.matches('a[href="#services"]')) {
        trackEvent('Button', 'Click', 'Services CTA');
    }
});

// Export functions for global access
window.showToast = showToast;
window.trackEvent = trackEvent; 