// Authentication JavaScript

// DOM Elements
let loginForm, signupForm, passwordInputs, strengthBar, strengthText;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loginForm = document.getElementById('loginForm');
    signupForm = document.getElementById('signupForm');
    passwordInputs = document.querySelectorAll('input[type="password"]');
    strengthBar = document.querySelector('.strength-fill');
    strengthText = document.querySelector('.strength-text');
    
    // Initialize form handlers
    if (loginForm) {
        setupLoginForm();
    }
    
    if (signupForm) {
        setupSignupForm();
    }
    
    // Setup password strength checker
    setupPasswordStrength();
    
    // Setup social login
    setupSocialLogin();
    
    console.log('Auth system initialized');
});

// Login Form Setup
function setupLoginForm() {
    loginForm.addEventListener('submit', handleLogin);
    
    // Add input animations
    const inputs = loginForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// Signup Form Setup
function setupSignupForm() {
    signupForm.addEventListener('submit', handleSignup);
    
    // Password confirmation validation
    const password = signupForm.querySelector('#password');
    const confirmPassword = signupForm.querySelector('#confirmPassword');
    
    confirmPassword.addEventListener('input', () => {
        validatePasswordMatch(password.value, confirmPassword.value);
    });
    
    // Add input animations
    const inputs = signupForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// Handle Login
async function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');
    
    // Validate inputs
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (!password) {
        showNotification('Please enter your password', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = loginForm.querySelector('.auth-btn');
    setLoadingState(submitBtn, true);
    
    try {
        // Simulate API call
        await simulateLogin(email, password);
        
        // Store auth state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        showNotification('Login successful! Redirecting...', 'success');
        
        // Redirect to dashboard after short delay
        setTimeout(() => {
            window.location.href = 'buy-license-key.html';
        }, 1500);
        
    } catch (error) {
        showNotification(error.message, 'error');
        setLoadingState(submitBtn, false);
    }
}

// Handle Signup
async function handleSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(signupForm);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const terms = formData.get('terms');
    
    // Validate inputs
    if (!firstName || !lastName) {
        showNotification('Please enter your full name', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (!validatePassword(password)) {
        showNotification('Password must be at least 8 characters with uppercase, lowercase, and number', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (!terms) {
        showNotification('Please accept the Terms of Service', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = signupForm.querySelector('.auth-btn');
    setLoadingState(submitBtn, true);
    
    try {
        // Simulate API call
        await simulateSignup(firstName, lastName, email, password);
        
        // Store auth state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', `${firstName} ${lastName}`);
        
        showNotification('Account created successfully! Redirecting...', 'success');
        
        // Redirect to dashboard after short delay
        setTimeout(() => {
            window.location.href = 'buy-license-key.html';
        }, 1500);
        
    } catch (error) {
        showNotification(error.message, 'error');
        setLoadingState(submitBtn, false);
    }
}

// Password Toggle
function togglePassword() {
    const passwordInput = document.querySelector('#password');
    const toggleBtn = document.querySelector('.password-toggle-enhanced') || document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
        `;
    } else {
        passwordInput.type = 'password';
        toggleBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
        `;
    }
}

// Password Strength Checker
function setupPasswordStrength() {
    const passwordInput = document.querySelector('#password');
    if (!passwordInput) return;
    
    passwordInput.addEventListener('input', (e) => {
        const password = e.target.value;
        const strength = calculatePasswordStrength(password);
        updatePasswordStrength(strength);
        updatePasswordRequirements(password);
        
        // Add visual feedback to input
        const container = passwordInput.closest('.password-field-container');
        if (container) {
            container.classList.remove('valid', 'invalid');
            if (password.length > 0) {
                if (strength.score >= 3) {
                    passwordInput.classList.add('valid');
                    passwordInput.classList.remove('invalid');
                } else {
                    passwordInput.classList.add('invalid');
                    passwordInput.classList.remove('valid');
                }
            }
        }
    });
    
    // Add focus/blur handlers
    passwordInput.addEventListener('focus', () => {
        const container = passwordInput.closest('.password-field-container');
        if (container) {
            container.classList.add('focused');
        }
    });
    
    passwordInput.addEventListener('blur', () => {
        const container = passwordInput.closest('.password-field-container');
        if (container) {
            container.classList.remove('focused');
        }
    });
}

function calculatePasswordStrength(password) {
    let score = 0;
    let feedback = 'Too weak';
    
    if (password.length >= 8) score += 1;
    if (password.match(/[a-z]/)) score += 1;
    if (password.match(/[A-Z]/)) score += 1;
    if (password.match(/[0-9]/)) score += 1;
    if (password.match(/[^a-zA-Z0-9]/)) score += 1;
    
    switch (score) {
        case 0:
        case 1:
            feedback = 'Too weak';
            break;
        case 2:
            feedback = 'Weak';
            break;
        case 3:
            feedback = 'Fair';
            break;
        case 4:
            feedback = 'Good';
            break;
        case 5:
            feedback = 'Strong';
            break;
    }
    
    return { score, feedback };
}

function updatePasswordStrength(strength) {
    // Update legacy strength bar if it exists
    if (strengthBar) {
        const percentage = (strength.score / 5) * 100;
        strengthBar.style.width = `${percentage}%`;
    }
    
    if (strengthText) {
        strengthText.textContent = strength.feedback;
    }
    
    // Update enhanced strength indicator
    const strengthScore = document.querySelector('.strength-score');
    const strengthBars = document.querySelectorAll('.strength-bar-item');
    
    if (strengthScore) {
        strengthScore.textContent = strength.feedback;
        strengthScore.className = `strength-score ${strength.feedback.toLowerCase()}`;
    }
    
    if (strengthBars.length > 0) {
        strengthBars.forEach((bar, index) => {
            bar.classList.remove('active', 'weak', 'fair', 'good', 'strong');
            if (index < strength.score) {
                bar.classList.add('active', strength.feedback.toLowerCase());
            }
        });
    }
    
    // Update color based on strength
    if (strengthBar) {
        if (strength.score <= 2) {
            strengthBar.style.background = '#ff3b30';
        } else if (strength.score <= 3) {
            strengthBar.style.background = '#ff9500';
        } else {
            strengthBar.style.background = '#34c759';
        }
    }
}

function updatePasswordRequirements(password) {
    const requirements = [
        { id: 'length', test: password.length >= 8, text: '8+ characters' },
        { id: 'lowercase', test: /[a-z]/.test(password), text: 'Lowercase letter' },
        { id: 'uppercase', test: /[A-Z]/.test(password), text: 'Uppercase letter' },
        { id: 'number', test: /[0-9]/.test(password), text: 'Number' },
        { id: 'special', test: /[^a-zA-Z0-9]/.test(password), text: 'Special character' }
    ];
    
    requirements.forEach(req => {
        const element = document.querySelector(`[data-requirement="${req.id}"]`);
        if (element) {
            element.classList.toggle('met', req.test);
        }
    });
}

// Password Match Validation
function validatePasswordMatch(password, confirmPassword) {
    const confirmInput = document.querySelector('#confirmPassword');
    
    if (confirmPassword && password !== confirmPassword) {
        confirmInput.style.borderColor = '#ff3b30';
        confirmInput.style.boxShadow = '0 0 0 4px rgba(255, 59, 48, 0.1)';
    } else if (confirmPassword) {
        confirmInput.style.borderColor = '#34c759';
        confirmInput.style.boxShadow = '0 0 0 4px rgba(52, 199, 89, 0.1)';
    } else {
        confirmInput.style.borderColor = '#e5e5e7';
        confirmInput.style.boxShadow = 'none';
    }
}

// Social Login Setup
function setupSocialLogin() {
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = btn.classList.contains('google') ? 'Google' : 'GitHub';
            handleSocialLogin(provider);
        });
    });
}

function handleSocialLogin(provider) {
    showNotification(`${provider} login coming soon!`, 'info');
    
    // Simulate social login success for demo
    setTimeout(() => {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', `user@${provider.toLowerCase()}.com`);
        localStorage.setItem('userName', `${provider} User`);
        
        showNotification(`${provider} login successful! Redirecting...`, 'success');
        
        setTimeout(() => {
            window.location.href = 'buy-license-key.html';
        }, 1500);
    }, 1000);
}

// Validation Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Simulate API Calls
async function simulateLogin(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Demo credentials
            if (email === 'demo@appbuilder.com' && password === 'Demo123!') {
                resolve({ success: true, user: { email } });
            } else if (email && password) {
                // Accept any valid email/password for demo
                resolve({ success: true, user: { email } });
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, 1500);
    });
}

async function simulateSignup(firstName, lastName, email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Check if email already exists (demo)
            if (email === 'existing@example.com') {
                reject(new Error('Email already exists'));
            } else {
                resolve({ 
                    success: true, 
                    user: { 
                        firstName, 
                        lastName, 
                        email 
                    } 
                });
            }
        }, 2000);
    });
}

// UI Helper Functions
function setLoadingState(button, loading) {
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Styles for notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        fontSize: '14px',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });
    
    // Set background color based on type
    const colors = {
        success: '#34c759',
        error: '#ff3b30',
        info: '#007aff',
        warning: '#ff9500'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Check Authentication Status
function checkAuthStatus() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const currentPage = window.location.pathname;
    
    // If user is authenticated and on auth pages, redirect to dashboard
    if (isAuthenticated === 'true' && (currentPage.includes('login.html') || currentPage.includes('signup.html'))) {
        window.location.href = 'buy-license-key.html';
    }
    
    // If user is not authenticated and on dashboard pages, redirect to login
    if (isAuthenticated !== 'true' && !currentPage.includes('login.html') && !currentPage.includes('signup.html') && !currentPage.includes('index.html')) {
        window.location.href = 'login.html';
    }
}

// Initialize auth check
document.addEventListener('DOMContentLoaded', () => {
    // Only check auth status if not on auth pages
    const currentPage = window.location.pathname;
    if (!currentPage.includes('login.html') && !currentPage.includes('signup.html')) {
        // checkAuthStatus(); // Commented out for demo purposes
    }
});

// Logout function (can be called from dashboard)
function logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('rememberMe');
    
    showNotification('Logged out successfully', 'success');
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Export functions for use in other files
window.logout = logout;
window.checkAuthStatus = checkAuthStatus;