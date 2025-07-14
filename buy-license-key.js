// Buy License Key Page JavaScript

// State
let selectedProduct = null;
let selectedPlan = 'annually';
let selectedAddons = [];
let appName = '';
let basePrice = 0;

// DOM Elements - will be initialized after DOM loads
let productCards, planCards, planRadios, appNameInput, termsCheckbox, addonCards;

// Initialize DOM elements and event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    productCards = document.querySelectorAll('.product-card');
    planCards = document.querySelectorAll('.plan-card');
    planRadios = document.querySelectorAll('input[name="plan"]');
    appNameInput = document.querySelector('.app-name-input');
    termsCheckbox = document.querySelector('#terms');
    addonCards = document.querySelectorAll('.addon-card');
    
    // Set default plan selection
    const annuallyCard = document.querySelector('.plan-card.selected');
    if (annuallyCard) {
        const radio = annuallyCard.querySelector('input[type="radio"]');
        radio.checked = true;
        selectedPlan = 'annually';
    }
    
    console.log('Buy License Key page initialized');
    showNotification('Welcome to License Purchase!', 'info');

    // Product Selection
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all cards
            productCards.forEach(c => c.classList.remove('selected'));
            // Add selected class to clicked card
            card.classList.add('selected');
            
            selectedProduct = card.dataset.product;
            basePrice = parseInt(card.dataset.price);
            
            console.log(`Selected product: ${selectedProduct}, Price: ${basePrice}`);
            
            // Update app name input with product name
            const productName = card.querySelector('h3').textContent;
            appNameInput.value = `${productName}`;
            appName = appNameInput.value;
            
            // Update order summary
            updateOrderSummary();
            
            // Add animation effect
            card.style.transform = 'scale(0.98)';
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
            
            // Update order summary
            updateOrderSummary();
            
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
            
            updateOrderSummary();
        });
    });

    // Add-on Selection
    addonCards.forEach(card => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        
        card.addEventListener('click', (e) => {
            if (e.target.type !== 'checkbox') {
                checkbox.checked = !checkbox.checked;
            }
            
            const addonValue = checkbox.value;
            const addonPrice = parseInt(card.dataset.price);
            
            if (checkbox.checked) {
                card.classList.add('selected');
                selectedAddons.push({
                    name: addonValue,
                    price: addonPrice,
                    label: card.querySelector('h4').textContent
                });
                showNotification(`${card.querySelector('h4').textContent} added`, 'success');
            } else {
                card.classList.remove('selected');
                selectedAddons = selectedAddons.filter(addon => addon.name !== addonValue);
                showNotification(`${card.querySelector('h4').textContent} removed`, 'info');
            }
            
            updateOrderSummary();
        });
        
        checkbox.addEventListener('change', (e) => {
            e.stopPropagation();
        });
    });

    // App Name Input
    appNameInput.addEventListener('input', (e) => {
        appName = e.target.value;
        updateOrderSummary();
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
            showNotification('Please select an app first!', 'error');
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
        
        const totalAmount = document.querySelector('.total-amount').textContent;
        
        setTimeout(() => {
            checkoutBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M9 12l2 2 4-4"/>
                </svg>
                Purchase Complete!
            `;
            checkoutBtn.style.background = '#34c759';
            
            showNotification(`Order placed successfully for ${appName}! Total: ${totalAmount}`, 'success');
            
            // Reset after 3 seconds
            setTimeout(() => {
                checkoutBtn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M9 12l2 2 4-4"/>
                    </svg>
                    <span>Complete Purchase</span>
                `;
                checkoutBtn.disabled = false;
                checkoutBtn.style.background = '#007aff';
            }, 3000);
        }, 2500);
    });

    // Terms checkbox
    termsCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            showNotification('Terms accepted', 'success');
        }
        updateCheckoutButton();
    });

    // Initial update
    updateOrderSummary();
});

// Update Order Summary Function
function updateOrderSummary() {
    const appPreview = document.querySelector('.selected-app');
    const appPrice = document.querySelector('.app-price');
    const subtotalAmount = document.querySelector('.subtotal-amount');
    const discountItem = document.querySelector('.discount');
    const discountLabel = document.querySelector('.discount-label');
    const discountAmount = document.querySelector('.discount-amount');
    const taxAmount = document.querySelector('.tax-amount');
    const totalAmount = document.querySelector('.total-amount');
    const addonsListContainer = document.querySelector('.addons-list');
    
    if (!selectedProduct || !basePrice) {
        // Reset to default state
        appPreview.querySelector('.app-name').textContent = 'Select an app';
        appPreview.querySelector('.app-plan').textContent = 'Choose your plan';
        appPrice.textContent = '$0.00';
        subtotalAmount.textContent = '$0.00';
        discountItem.style.display = 'none';
        taxAmount.textContent = '$0.00';
        totalAmount.textContent = '$0.00';
        addonsListContainer.innerHTML = '';
        updateCheckoutButton();
        return;
    }
    
    // Get plan details
    const planCard = document.querySelector(`.plan-card[data-plan="${selectedPlan}"]`);
    const multiplier = parseInt(planCard.dataset.multiplier) || 1;
    const discountPercent = parseInt(planCard.dataset.discount) || 0;
    
    // Calculate base price based on plan
    let planPrice = basePrice;
    if (selectedPlan === 'monthly') {
        planPrice = Math.round(basePrice / 12);
    } else if (selectedPlan === 'quarterly') {
        planPrice = Math.round((basePrice * 3) / 12);
    }
    
    // Update app preview
    const selectedCard = document.querySelector('.product-card.selected');
    if (selectedCard) {
        const appIcon = selectedCard.querySelector('.product-icon').innerHTML;
        const appNameText = selectedCard.querySelector('h3').textContent;
        
        appPreview.querySelector('.app-icon-small').innerHTML = appIcon;
        appPreview.querySelector('.app-name').textContent = appName || appNameText;
        appPreview.querySelector('.app-plan').textContent = `${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan`;
    }
    
    // Update pricing
    appPrice.textContent = `$${planPrice.toLocaleString()}.00`;
    
    // Update add-ons list
    addonsListContainer.innerHTML = '';
    let addonsTotal = 0;
    
    selectedAddons.forEach(addon => {
        let addonPrice = addon.price;
        if (selectedPlan === 'monthly') {
            addonPrice = Math.round(addon.price / 12);
        } else if (selectedPlan === 'quarterly') {
            addonPrice = Math.round((addon.price * 3) / 12);
        }
        
        addonsTotal += addonPrice;
        
        const addonElement = document.createElement('div');
        addonElement.className = 'pricing-item addon-item';
        addonElement.innerHTML = `
            <span class="pricing-label">${addon.label}</span>
            <span class="pricing-value">+$${addonPrice.toLocaleString()}.00</span>
        `;
        addonsListContainer.appendChild(addonElement);
    });
    
    // Calculate subtotal
    const subtotal = planPrice + addonsTotal;
    subtotalAmount.textContent = `$${subtotal.toLocaleString()}.00`;
    
    // Calculate discount
    let discountValue = 0;
    if (discountPercent > 0) {
        discountValue = Math.round(subtotal * (discountPercent / 100));
        discountItem.style.display = 'flex';
        discountLabel.textContent = `Discount (${discountPercent}%)`;
        discountAmount.textContent = `-$${discountValue.toLocaleString()}.00`;
    } else {
        discountItem.style.display = 'none';
    }
    
    // Calculate tax (8%)
    const afterDiscount = subtotal - discountValue;
    const tax = Math.round(afterDiscount * 0.08);
    taxAmount.textContent = `$${tax.toLocaleString()}.00`;
    
    // Calculate total
    const total = afterDiscount + tax;
    totalAmount.textContent = `$${total.toLocaleString()}.00`;
    
    updateCheckoutButton();
}

// Update Checkout Button State
function updateCheckoutButton() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    const canCheckout = selectedProduct && appName.trim() && termsCheckbox.checked;
    
    checkoutBtn.disabled = !canCheckout;
    
    if (canCheckout) {
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.cursor = 'pointer';
    } else {
        checkoutBtn.style.opacity = '0.6';
        checkoutBtn.style.cursor = 'not-allowed';
    }
}

// Navigation function
function navigateTo(page) {
    window.location.href = page;
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
        if (checkoutBtn && !checkoutBtn.disabled) {
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
        basePrice = 0;
        if (appNameInput) {
            appNameInput.value = '';
        }
        appName = '';
        
        // Clear add-ons
        selectedAddons = [];
        document.querySelectorAll('.addon-card').forEach(card => {
            card.classList.remove('selected');
            card.querySelector('input[type="checkbox"]').checked = false;
        });
        
        updateOrderSummary();
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
// Attach functions to window object for HTML onclick access
window.toggleProfileMenu = function() {
    const profileMenu = document.getElementById('profileMenu');
    if (profileMenu) {
        profileMenu.classList.toggle('show');
    }
};

window.navigateTo = navigateTo;

window.openProfileSettings = function() {
    showNotification('Profile Settings opened', 'info');
    // Add profile settings modal logic here
};

window.openChangePassword = function() {
    showNotification('Change Password opened', 'info');
    // Add change password modal logic here
};

window.openChangeDetails = function() {
    showNotification('Edit Details opened', 'info');
    // Add edit details modal logic here
};

window.logout = function() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
        showNotification('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
};

// Close profile menu when clicking outside
document.addEventListener('click', function(event) {
    const profileDropdown = document.querySelector('.profile-dropdown');
    const profileMenu = document.getElementById('profileMenu');
    
    if (profileMenu && !profileDropdown.contains(event.target)) {
        profileMenu.classList.remove('show');
    }
});