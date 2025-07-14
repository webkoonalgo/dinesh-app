// My Billing Page JavaScript

// Initialize DOM elements and event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('My Billing page initialized');
    showNotification('Billing information loaded successfully!', 'info');
    
    // Setup billing functionality
    setupBillingFunctionality();
});

// Billing Functionality
function setupBillingFunctionality() {
    // Renew License buttons functionality
    const renewButtons = document.querySelectorAll('.renew-btn');
    renewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const licenseType = button.dataset.license;
            const isExpired = button.classList.contains('expired');
            
            // Show confirmation
            const action = isExpired ? 'renew the expired' : 'renew the';
            if (confirm(`Are you sure you want to ${action} ${licenseType} license? This will redirect you to the purchase page.`)) {
                // Simulate renewal process
                button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" class="loading-spinner">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.3"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="4" fill="none"/>
                    </svg>
                    Processing...
                `;
                button.disabled = true;
                
                // Add loading animation
                const spinner = button.querySelector('.loading-spinner');
                if (spinner) {
                    spinner.style.animation = 'spin 1s linear infinite';
                }
                
                const message = isExpired ? 
                    `Renewing expired ${licenseType} license...` : 
                    `Renewing ${licenseType} license...`;
                showNotification(message, 'info');
                
                // Redirect to purchase page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'buy-license-key.html';
                }, 2000);
            }
        });
    });
    
    // Pay Due buttons functionality
    const payDueButtons = document.querySelectorAll('.pay-due-btn');
    payDueButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const licenseType = button.dataset.license;
            const dueAmount = button.closest('.license-billing-item').querySelector('.amount-due .amount-value').textContent;
            
            // Show confirmation
            if (confirm(`Pay ${dueAmount} for ${licenseType} license?`)) {
                // Simulate payment process
                button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" class="loading-spinner">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.3"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="4" fill="none"/>
                    </svg>
                    Processing...
                `;
                button.disabled = true;
                
                // Add loading animation
                const spinner = button.querySelector('.loading-spinner');
                if (spinner) {
                    spinner.style.animation = 'spin 1s linear infinite';
                }
                
                showNotification(`Processing payment of ${dueAmount}...`, 'info');
                
                setTimeout(() => {
                    // Update due amount to $0.00
                    const dueElement = button.closest('.license-billing-item').querySelector('.amount-due .amount-value');
                    dueElement.textContent = '$0.00';
                    dueElement.classList.remove('due');
                    
                    // Remove the pay due button
                    button.remove();
                    
                    // Update overview cards
                    updateOverviewCards();
                    
                    showNotification(`Payment of ${dueAmount} completed successfully!`, 'success');
                }, 3000);
            }
        });
    });
    
    // Download Invoice buttons functionality
    const downloadInvoiceButtons = document.querySelectorAll('.download-invoice-btn');
    downloadInvoiceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const invoiceId = button.dataset.invoice;
            
            // Simulate download process
            button.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="loading-spinner">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="4" fill="none"/>
                </svg>
            `;
            button.disabled = true;
            
            // Add loading animation
            const spinner = button.querySelector('.loading-spinner');
            if (spinner) {
                spinner.style.animation = 'spin 1s linear infinite';
            }
            
            showNotification(`Downloading invoice ${invoiceId}...`, 'info');
            
            setTimeout(() => {
                button.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 12l2 2 4-4"/>
                    </svg>
                `;
                button.style.color = '#34c759';
                
                showNotification(`Invoice ${invoiceId} downloaded successfully!`, 'success');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    button.innerHTML = `
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7,10 12,15 17,10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                    `;
                    button.disabled = false;
                    button.style.color = '';
                }, 2000);
            }, 1500);
        });
    });
    
    // Overview card hover effects
    const overviewCards = document.querySelectorAll('.overview-card');
    overviewCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Update overview cards after payment
function updateOverviewCards() {
    // Update pending dues
    const pendingDuesCard = document.querySelector('.pending-dues .overview-amount');
    const pendingDuesSubtitle = document.querySelector('.pending-dues .overview-subtitle');
    
    if (pendingDuesCard) {
        pendingDuesCard.textContent = '$0.00';
        pendingDuesSubtitle.textContent = 'All dues cleared';
    }
    
    // Update total spent (add the paid amount)
    const totalSpentCard = document.querySelector('.total-spent .overview-amount');
    if (totalSpentCard) {
        totalSpentCard.textContent = '$18,300.00'; // Updated total
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