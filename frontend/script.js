// Main JavaScript file for Sehat Setu
document.addEventListener('DOMContentLoaded', function() {
    // Navigation and UI elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const startChatBtn = document.getElementById('startChatBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWidget = document.getElementById('chatbotWidget');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatLoginBtn = document.getElementById('chatLoginBtn');

    // Navigation functionality
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            window.location.href = 'auth.html';
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            window.location.href = 'auth.html?mode=signup';
        });
    }

    // Chatbot functionality
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotWidget.classList.toggle('active');
        });
    }

    if (closeChatbot) {
        closeChatbot.addEventListener('click', function() {
            chatbotWidget.classList.remove('active');
        });
    }

    if (startChatBtn) {
        startChatBtn.addEventListener('click', function() {
            // Check if user is logged in
            if (checkAuthStatus()) {
                const userRole = localStorage.getItem('userRole');
                if (userRole === 'patient') {
                    window.location.href = 'patient-dashboard.html#chat';
                } else {
                    chatbotWidget.classList.add('active');
                }
            } else {
                chatbotWidget.classList.add('active');
            }
        });
    }

    if (chatLoginBtn) {
        chatLoginBtn.addEventListener('click', function() {
            window.location.href = 'auth.html';
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Learn More button functionality
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            const featuresSection = document.querySelector('#features');
            if (featuresSection) {
                featuresSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Emergency chat functionality
    const emergencyBtn = document.querySelector('.btn-emergency');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function() {
            // Show emergency alert first
            const confirmEmergency = confirm(
                'For immediate medical emergencies, please call:\n\n' +
                '🚨 108 (Ambulance)\n' +
                '🚨 102 (Medical Helpline)\n\n' +
                'Click OK to continue with emergency chat support, or Cancel to call emergency services.'
            );
            
            if (confirmEmergency) {
                if (checkAuthStatus()) {
                    const userRole = localStorage.getItem('userRole');
                    if (userRole === 'patient') {
                        window.location.href = 'patient-dashboard.html#chat';
                    } else {
                        chatbotWidget.classList.add('active');
                    }
                } else {
                    chatbotWidget.classList.add('active');
                }
            }
        });
    }

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe feature cards and tip cards
    const animatedElements = document.querySelectorAll('.feature-card, .tip-card');
    animatedElements.forEach(el => observer.observe(el));

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Health tips rotation
    const tipCards = document.querySelectorAll('.tip-card');
    let currentTipIndex = 0;
    
    function highlightNextTip() {
        // Remove highlight from all cards
        tipCards.forEach(card => card.classList.remove('highlighted'));
        
        // Add highlight to current card
        if (tipCards[currentTipIndex]) {
            tipCards[currentTipIndex].classList.add('highlighted');
        }
        
        // Move to next tip
        currentTipIndex = (currentTipIndex + 1) % tipCards.length;
    }
    
    // Start tip highlighting
    if (tipCards.length > 0) {
        setInterval(highlightNextTip, 3000);
    }

    // Initialize tooltips
    initializeTooltips();
    
    // Initialize loading states
    initializeLoadingStates();
    
    // Check for session expiry
    checkSessionExpiry();
});

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Check if user is logged in
function checkAuthStatus() {
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('userRole');
    return token !== null && role !== null;
}

// Check session expiry
function checkSessionExpiry() {
    const token = localStorage.getItem('userToken');
    if (token && token.startsWith('demo-token-')) {
        const timestamp = parseInt(token.replace('demo-token-', ''));
        const now = Date.now();
        const hoursPassed = (now - timestamp) / (1000 * 60 * 60);
        
        // Session expires after 24 hours for demo
        if (hoursPassed > 24) {
            logout();
            showNotification('Session expired. Please login again.', 'info');
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    window.location.href = 'index.html';
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            setTimeout(() => tooltip.classList.add('show'), 10);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(tooltip)) {
                        document.body.removeChild(tooltip);
                    }
                }, 200);
            }
        });
    });
}

// Initialize loading states
function initializeLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled && !this.classList.contains('no-loading')) {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                // Re-enable after 2 seconds (for demo purposes)
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
}

// Form validation utilities
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

function validatePassword(password) {
    return password.length >= 6;
}

// Theme switching functionality
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', newTheme);
    
    showNotification(`Switched to ${newTheme} theme`, 'info');
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchableItems = document.querySelectorAll('.searchable-item');
            
            searchableItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Lazy loading for images
function initializeLazyLoading() {
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
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// Error handling
function handleError(error, context = 'Unknown') {
    console.error(`Error in ${context}:`, error);
    showNotification('Something went wrong. Please try again.', 'error');
}

// Network status monitoring
function monitorNetworkStatus() {
    function updateOnlineStatus() {
        const condition = navigator.onLine ? 'online' : 'offline';
        
        if (condition === 'offline') {
            showNotification('You are offline. Some features may not work.', 'error');
        } else {
            showNotification('Connection restored.', 'success');
        }
    }
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
}

// Performance monitoring
function measurePagePerformance() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            if (loadTime > 3000) {
                console.warn('Page load time is high:', loadTime + 'ms');
            }
            
            // Store performance data for analytics
            localStorage.setItem('lastPageLoadTime', loadTime);
        }, 0);
    });
}

// Accessibility improvements
function enhanceAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation for custom elements
    const interactiveElements = document.querySelectorAll('.feature-card, .tip-card, .action-btn');
    
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Focus indicators
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
}

// Initialize all features
function initializeApp() {
    try {
        initializeTheme();
        initializeSearch();
        initializeLazyLoading();
        monitorNetworkStatus();
        measurePagePerformance();
        enhanceAccessibility();
        
        // Check if user should be redirected to dashboard
        if (checkAuthStatus() && window.location.pathname === '/index.html') {
            const userRole = localStorage.getItem('userRole');
            const userName = localStorage.getItem('userName');
            
            if (userRole && userName) {
                // Show welcome back message but don't redirect automatically
                showNotification(`Welcome back, ${userName}!`, 'success');
            }
        }
        
        console.log('Sehat Setu app initialized successfully');
    } catch (error) {
        handleError(error, 'App Initialization');
    }
}

// Service Worker registration for PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for use in other modules
window.SehatSetu = {
    showNotification,
    checkAuthStatus,
    logout,
    validateEmail,
    validatePhone,
    validatePassword,
    toggleTheme,
    handleError
};

// Auto-initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}