// ============================================
// FairPlay Check Website - JavaScript
// ============================================

// Smooth scroll helper functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToFeatures() {
    scrollToSection('features');
}

function scrollToApps() {
    scrollToSection('apps');
}

function scrollToPayment() {
    scrollToSection('payment');
}

// Toggle PayPal info display
function showPayPalInfo() {
    const paypalInfo = document.getElementById('paypal-info');
    if (paypalInfo) {
        paypalInfo.classList.toggle('hidden');
        
        // Scroll to payment info
        setTimeout(() => {
            paypalInfo.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

// Add active state to navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Fade in elements on scroll
    observeElements();
});

// Intersection Observer for fade-in animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe feature cards, app cards, and other elements
    const elements = document.querySelectorAll(
        '.feature-card, .app-card, .score-card, .faq-item, .step'
    );
    
    elements.forEach(el => {
        observer.observe(el);
    });
}

// Mobile menu toggle (if needed for responsive design)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// PayPal Button Integration
// NOTE: Replace with your actual PayPal integration
// This is a placeholder for PayPal Smart Buttons

function initPayPalButtons() {
    // This function will be called when PayPal SDK is loaded
    // Replace with your PayPal integration code
    
    console.log('PayPal buttons ready for integration');
    
    // Example PayPal button setup (requires PayPal SDK):
    /*
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: '2.99'
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(orderData) {
                console.log('Order captured:', orderData);
                // Handle successful payment
                showPaymentSuccess();
            });
        },
        onError: function(err) {
            console.error('PayPal error:', err);
            showPaymentError();
        }
    }).render('#paypal-button-container');
    */
}

// Payment success handler
function showPaymentSuccess() {
    alert('Payment successful! Thank you for your purchase. Download instructions will be sent to your email.');
}

// Payment error handler
function showPaymentError() {
    alert('Payment failed. Please try again or contact support.');
}

// Analytics tracking (optional)
function trackEvent(eventName, eventData) {
    console.log('Event:', eventName, eventData);
    
    // Add your analytics code here
    // Example: Google Analytics, Mixpanel, etc.
}

// Track button clicks
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            trackEvent('button_click', { button: buttonText });
        });
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll event listener for navbar effects
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Escape key to close PayPal info
    if (event.key === 'Escape') {
        const paypalInfo = document.getElementById('paypal-info');
        if (paypalInfo && !paypalInfo.classList.contains('hidden')) {
            paypalInfo.classList.add('hidden');
        }
    }
});

// Form validation (if contact form is added)
function validateContactForm(form) {
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');
    
    if (!email.value || !message.value) {
        alert('Please fill in all fields');
        return false;
    }
    
    if (!isValidEmail(email.value)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Export functions for external use
window.FairPlayCheck = {
    scrollToFeatures,
    scrollToApps,
    scrollToPayment,
    showPayPalInfo,
    toggleMobileMenu,
    initPayPalButtons,
    trackEvent
};

console.log('FairPlay Check website loaded successfully');
