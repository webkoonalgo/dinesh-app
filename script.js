// State
let selectedProduct = null;
let selectedPlan = 'annually';
let appName = '';

// DOM Elements - will be initialized after DOM loads
let menuItems, mainContent, orderSummary, licenseKeysSection, productCards, planCards, planRadios, appNameInput, termsCheckbox, copyButtons;

// Initialize DOM elements and event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    menuItems = document.querySelectorAll('.menu-item');
    mainContent = document.getElementById('main-content');
    orderSummary = document.getElementById('order-summary');
    licenseKeysSection = document.getElementById('my-license-keys-section');
    productCards = document.querySelectorAll('.product-card');
    planCards = document.querySelectorAll('.plan-card');
    planRadios = document.querySelectorAll('input[name="plan"]');
    appNameInput = document.querySelector('.app-name-input');
    termsCheckbox = document.querySelector('#terms');
    copyButtons = document.querySelectorAll('.copy-btn');

    // Initialize default state
    mainContent.style.display = 'none';
    orderSummary.style.display = 'none';
    licenseKeysSection.style.display = 'none';
    
    // Set default plan selection
    const annuallyCard = document.querySelector('.plan-card.selected');
    if (annuallyCard) {
        const radio = annuallyCard.querySelector('input[type="radio"]');
        radio.checked = true;
        selectedPlan = 'annually';
    }
    
    console.log('App Builder Interface initialized');
    showNotification('Welcome to App Builder!', 'info');

    // Menu Navigation
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            menuItems.forEach(menu => menu.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            const section = item.dataset.section;
            console.log(`Navigating to: ${section}`);
            
            // Show/hide main content based on section
            if (section === 'license') {
                mainContent.style.display = 'flex';
                orderSummary.style.display = 'block';
                licenseKeysSection.style.display = 'none';
                showNotification('License purchase page loaded', 'info');
            } else if (section === 'license-keys') {
                mainContent.style.display = 'none';
                orderSummary.style.display = 'none';
                licenseKeysSection.style.display = 'block';
                document.getElementById('build-app-section').style.display = 'none';
                showNotification('My License Keys section loaded', 'info');
            } else if (section === 'build') {
                mainContent.style.display = 'none';
                orderSummary.style.display = 'none';
                licenseKeysSection.style.display = 'none';
                const buildSection = document.getElementById('build-app-section');
                if (buildSection) {
                    buildSection.style.display = 'block';
                    console.log('Build App section displayed');
                }
                showNotification('Build App section loaded', 'info');
            } else {
                mainContent.style.display = 'none';
                orderSummary.style.display = 'none';
                licenseKeysSection.style.display = 'none';
                const buildSection = document.getElementById('build-app-section');
                if (buildSection) {
                    buildSection.style.display = 'none';
                }
                const sectionName = section.charAt(0).toUpperCase() + section.slice(1);
                showNotification(`${sectionName} section - Coming soon!`, 'info');
            }
            
            // Add visual feedback
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Product Selection
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all cards
            productCards.forEach(c => c.classList.remove('selected'));
            // Add selected class to clicked card
            card.classList.add('selected');
            
            selectedProduct = card.dataset.product;
            console.log(`Selected product: ${selectedProduct}`);
            
            // Update app name input with product name
            const productName = card.querySelector('h3').textContent;
            appNameInput.value = `${productName} App`;
            appName = appNameInput.value;
            
            // Add animation effect
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'translateY(-4px)';
            }, 150);
            
            // Show success message
            showNotification(`${productName} selected successfully!`, 'success');
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('selected')) {
                card.style.transform = 'translateY(-4px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('selected')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });

    // Plan Selection
    planCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all plan cards
            planCards.forEach(c => c.classList.remove('selected'));
            // Add selected class to clicked card
            card.classList.add('selected');
            
            // Update radio button
            const radio = card.querySelector('input[type="radio"]');
            radio.checked = true;
            selectedPlan = radio.value;
            
            console.log(`Selected plan: ${selectedPlan}`);
            
            // Update pricing based on selection
            updatePricing(selectedPlan);
            
            // Add animation effect
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
            
            showNotification(`${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan selected!`, 'info');
        });
    });

    // Radio button change handler
    planRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedPlan = e.target.value;
            
            // Update plan card selection
            planCards.forEach(card => {
                card.classList.remove('selected');
                if (card.querySelector('input[type="radio"]').value === selectedPlan) {
                    card.classList.add('selected');
                }
            });
            
            updatePricing(selectedPlan);
        });
    });

    // App Name Input
    appNameInput.addEventListener('input', (e) => {
        appName = e.target.value;
        console.log(`App name updated: ${appName}`);
    });

    appNameInput.addEventListener('focus', () => {
        appNameInput.style.borderColor = '#007aff';
        appNameInput.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
    });

    appNameInput.addEventListener('blur', () => {
        appNameInput.style.borderColor = '#d2d2d7';
        appNameInput.style.boxShadow = 'none';
    });

    // Checkout Button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        if (!selectedProduct) {
            showNotification('Please select a product first!', 'error');
            return;
        }
        
        if (!appName.trim()) {
            showNotification('Please enter an app name!', 'error');
            appNameInput.focus();
            return;
        }
        
        if (!termsCheckbox.checked) {
            showNotification('Please accept the Terms of Service!', 'error');
            return;
        }
        
        // Simulate checkout process
        checkoutBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" class="loading-spinner">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="4" fill="none"/>
            </svg>
            Processing...
        `;
        checkoutBtn.disabled = true;
        
        // Add loading animation
        const spinner = checkoutBtn.querySelector('.loading-spinner');
        spinner.style.animation = 'spin 1s linear infinite';
        
        setTimeout(() => {
            checkoutBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M9 12l2 2 4-4"/>
                </svg>
                Success!
            `;
            checkoutBtn.style.background = '#34c759';
            
            showNotification(`Order placed successfully for ${appName}!`, 'success');
            
            // Reset after 2 seconds
            setTimeout(() => {
                checkoutBtn.innerHTML = `
                    <span>Continue</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                `;
                checkoutBtn.disabled = false;
                checkoutBtn.style.background = '#007aff';
            }, 2000);
        }, 2000);
    });

    // Terms checkbox
    termsCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            showNotification('Terms accepted', 'success');
        }
    });

    // License key copy functionality
    setupLicenseKeyCopy();
    
    // Build App functionality
    setupBuildAppFunctionality();
});

// License key copy functionality  
function setupLicenseKeyCopy() {
    const copyButtons = document.querySelectorAll('.license-copy-btn');
    
    copyButtons.forEach(copyButton => {
        copyButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering parent click events
            const licenseKey = copyButton.dataset.key;
            
            // Copy to clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(licenseKey).then(() => {
                    showCopySuccess(copyButton);
                    showNotification(`License key copied: ${licenseKey}`, 'success');
                }).catch(() => {
                    fallbackCopyTextToClipboard(licenseKey, copyButton);
                });
            } else {
                fallbackCopyTextToClipboard(licenseKey, copyButton);
            }
        });
    });
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(button);
        showNotification(`License key copied: ${text}`, 'success');
    } catch (err) {
        showNotification('Failed to copy license key', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Show copy success animation
function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 12l2 2 4-4"/>
        </svg>
    `;
    button.style.background = '#34c759';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = '#007aff';
    }, 1500);
}

// Update Pricing Function
function updatePricing(plan) {
    const prices = {
        monthly: { price: 250.00, total: 5600.00 },
        quarterly: { price: 74.00, total: 5600.00 },
        annually: { price: 1500.00, total: 5600.00 }
    };
    
    const selectedPrice = prices[plan];
    const totalElement = document.querySelector('.total-amount');
    
    if (totalElement) {
        // Update total amount with animation
        totalElement.style.transform = 'scale(0.9)';
        totalElement.style.opacity = '0.5';
        
        setTimeout(() => {
            totalElement.textContent = `$${selectedPrice.total.toLocaleString()}.00 USD`;
            totalElement.style.transform = 'scale(1)';
            totalElement.style.opacity = '1';
        }, 200);
    }
}

// Notification System
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
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
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

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to checkout
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.click();
        }
    }
    
    // Escape to clear selections
    if (e.key === 'Escape') {
        const productCards = document.querySelectorAll('.product-card');
        const appNameInput = document.querySelector('.app-name-input');
        
        if (productCards) {
            productCards.forEach(card => card.classList.remove('selected'));
        }
        selectedProduct = null;
        if (appNameInput) {
            appNameInput.value = '';
        }
        appName = '';
        showNotification('Selection cleared', 'info');
    }
});

// Add CSS for loading spinner animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .notification {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;
document.head.appendChild(style);

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Profile Menu Functions
function toggleProfileMenu() {
    const profileMenu = document.getElementById('profileMenu');
    profileMenu.classList.toggle('show');
    
    // Close menu when clicking outside
    document.addEventListener('click', function closeMenu(e) {
        if (!e.target.closest('.profile-dropdown')) {
            profileMenu.classList.remove('show');
            document.removeEventListener('click', closeMenu);
        }
    });
}

function openProfileSettings() {
    showProfileModal('Profile Settings', `
        <div class="form-section">
            <div class="section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
                Personal Information
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" value="John" id="firstName">
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" value="Doe" id="lastName">
                </div>
            </div>
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" value="john@example.com" id="email">
            </div>
            <div class="form-group">
                <label>Phone Number</label>
                <input type="tel" value="+1 (555) 123-4567" id="phone">
            </div>
        </div>
        
        <div class="form-section">
            <div class="section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                Location
            </div>
            <div class="form-group">
                <label>Country</label>
                <input type="text" value="United States" id="country">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>City</label>
                    <input type="text" value="New York" id="city">
                </div>
                <div class="form-group">
                    <label>Timezone</label>
                    <input type="text" value="EST (UTC-5)" id="timezone">
                </div>
            </div>
        </div>
    `, 'Save Changes', () => {
        showNotification('Profile updated successfully!', 'success');
        closeProfileModal();
    });
}

function openChangePassword() {
    showProfileModal('Change Password', `
        <div class="form-section">
            <div class="section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Security Settings
            </div>
            <div class="form-group">
                <label>Current Password</label>
                <input type="password" placeholder="Enter current password" id="currentPassword">
            </div>
            <div class="form-group">
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" id="newPassword">
            </div>
            <div class="form-group">
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" id="confirmPassword">
            </div>
        </div>
    `, 'Update Password', () => {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!currentPassword || !newPassword || !confirmPassword) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match', 'error');
            return;
        }
        
        showNotification('Password updated successfully!', 'success');
        closeProfileModal();
    });
}

function openChangeDetails() {
    showProfileModal('Edit Details', `
        <div class="form-section">
            <div class="section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Account Details
            </div>
            <div class="form-group">
                <label>Display Name</label>
                <input type="text" value="John Doe" id="displayName">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" value="Tech Solutions Inc." id="company">
            </div>
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" value="Senior Developer" id="jobTitle">
            </div>
            <div class="form-group">
                <label>Bio</label>
                <textarea rows="3" placeholder="Tell us about yourself..." id="bio" style="padding: 12px 16px; border: 2px solid #e5e5e7; border-radius: 8px; font-family: inherit; resize: vertical;">Passionate developer with 5+ years of experience in mobile app development.</textarea>
            </div>
        </div>
    `, 'Save Details', () => {
        showNotification('Details updated successfully!', 'success');
        closeProfileModal();
    });
}

function showProfileModal(title, content, actionText, actionCallback) {
    // Remove existing modal
    const existingModal = document.querySelector('.profile-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">${title}</h3>
                <button class="modal-close" onclick="closeProfileModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeProfileModal()">Cancel</button>
                <button class="btn btn-primary" onclick="handleModalAction()">${actionText}</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Store the action callback
    window.currentModalAction = actionCallback;
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProfileModal();
        }
    });
}

function closeProfileModal() {
    const modal = document.querySelector('.profile-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function handleModalAction() {
    if (window.currentModalAction) {
        window.currentModalAction();
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        showNotification('Logged out successfully', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}
// License Options Menu Functions
function showLicenseOptionsMenu() {
    const optionsMenu = document.getElementById('license-options-menu');
    if (optionsMenu) {
        optionsMenu.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add event listeners for options menu
        setupLicenseOptionsMenu();
    }
}

function hideLicenseOptionsMenu() {
    const optionsMenu = document.getElementById('license-options-menu');
    if (optionsMenu) {
        optionsMenu.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

function setupLicenseOptionsMenu() {
    const closeBtn = document.getElementById('close-options-btn');
    const overlay = document.getElementById('options-overlay');
    const optionCards = document.querySelectorAll('.option-card');
    
    // Close menu handlers
    if (closeBtn) {
        closeBtn.addEventListener('click', hideLicenseOptionsMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', hideLicenseOptionsMenu);
    }
    
    // Option card handlers
    optionCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const action = card.dataset.action;
            handleLicenseOption(action);
        });
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideLicenseOptionsMenu();
        }
    });
}

function handleLicenseOption(action) {
    hideLicenseOptionsMenu();
    
    switch (action) {
        case 'view-key':
            // Show the license key section
            mainContent.style.display = 'none';
            orderSummary.style.display = 'none';
            licenseKeysSection.style.display = 'block';
            showNotification('License Key details loaded', 'success');
            break;
            
        case 'generate-new':
            showNotification('Generating new license key...', 'info');
            // Simulate key generation
            setTimeout(() => {
                showNotification('New license key generated successfully!', 'success');
            }, 2000);
            break;
            
        case 'activate-device':
            showNotification('Device activation initiated', 'info');
            break;
            
        case 'deactivate-device':
            showNotification('Device deactivation options opened', 'info');
            break;
            
        case 'transfer-license':
            showNotification('License transfer process started', 'info');
            break;
            
        case 'download-certificate':
            showNotification('Downloading license certificate...', 'info');
            // Simulate download
            setTimeout(() => {
                showNotification('Certificate downloaded successfully!', 'success');
            }, 1500);
            break;
            
        default:
            showNotification('Feature coming soon!', 'info');
    }
}

// Build App Functionality
function setupBuildAppFunctionality() {
    // Update buttons functionality
    const updateButtons = document.querySelectorAll('.update-btn');
    updateButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.settings-card');
            const cardTitle = card.querySelector('h3').textContent;
            
            // Simulate update process
            button.innerHTML = 'Updating...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = 'Update';
                button.disabled = false;
                showNotification(`${cardTitle} updated successfully!`, 'success');
            }, 1500);
        });
    });
    
    // Browse file buttons functionality
    const browseButtons = document.querySelectorAll('.browse-btn');
    browseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.settings-card');
            const cardTitle = card.querySelector('h3').textContent;
            
            // Create file input
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = getFileAcceptType(cardTitle);
            
            fileInput.addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    showNotification(`${file.name} selected for ${cardTitle}`, 'success');
                }
            });
            
            fileInput.click();
        });
    });
    
    // Build button functionality
    const buildButton = document.querySelector('.build-btn');
    if (buildButton) {
        buildButton.addEventListener('click', () => {
            const buildType = document.querySelector('.settings-select').value.toUpperCase();
            
            // Simulate build process
            buildButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" class="loading-spinner">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="4" fill="none"/>
                </svg>
                Building ${buildType}...
            `;
            buildButton.disabled = true;
            
            // Add loading animation
            const spinner = buildButton.querySelector('.loading-spinner');
            if (spinner) {
                spinner.style.animation = 'spin 1s linear infinite';
            }
            
            setTimeout(() => {
                buildButton.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M9 12l2 2 4-4"/>
                    </svg>
                    Build Complete!
                `;
                buildButton.style.background = '#34c759';
                
                showNotification(`${buildType} build completed successfully!`, 'success');
                
                // Reset after 3 seconds
                setTimeout(() => {
                    buildButton.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                        </svg>
                        Build
                    `;
                    buildButton.disabled = false;
                    buildButton.style.background = '#2d3748';
                }, 3000);
            }, 3000);
        });
    }
    
    // Color picker functionality
    const colorPicker = document.querySelector('.color-picker');
    if (colorPicker) {
        colorPicker.addEventListener('change', (e) => {
            const phoneScreen = document.querySelector('.phone-screen');
            if (phoneScreen) {
                phoneScreen.style.background = e.target.value;
            }
            showNotification(`Splash screen color updated to ${e.target.value}`, 'info');
        });
    }
    
    // Input field change handlers
    const settingsInputs = document.querySelectorAll('.settings-input');
    settingsInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            // Real-time validation or preview updates can be added here
            if (e.target.placeholder.includes('App Name')) {
                // Update phone preview if needed
            }
        });
    });
}

// Helper function to determine file accept types
function getFileAcceptType(cardTitle) {
    switch (cardTitle.toLowerCase()) {
        case 'app logo':
        case 'app icon':
        case 'splash screen':
            return 'image/*';
        case 'google services json':
            return '.json';
        case 'keystore file':
            return '.jks,.keystore';
        case 'keystore properties':
            return '.properties';
        default:
            return '*/*';
    }
}