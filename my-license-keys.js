// My License Keys Page JavaScript

// Initialize DOM elements and event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('My License Keys page initialized');
    showNotification('License Keys loaded successfully!', 'info');
    
    // License key copy functionality
    setupLicenseKeyCopy();
    
    // Add License button functionality
    const addLicenseBtn = document.querySelector('.add-license-btn');
    if (addLicenseBtn) {
        addLicenseBtn.addEventListener('click', () => {
            showNotification('Add License feature coming soon!', 'info');
        });
    }
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