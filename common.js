// Common JavaScript for pages without specific functionality

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

// Initialize common functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page initialized');
    
    // Store button functionality for Design My App page
    const storeButtons = document.querySelectorAll('.store-button');
    storeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const isAppStore = button.classList.contains('app-store-btn');
            const storeName = isAppStore ? 'App Store' : 'Google Play Store';
            showNotification(`Redirecting to ${storeName}...`, 'info');
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'translateY(-2px)';
            }, 150);
        });
    });
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .coming-soon-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            text-align: center;
            padding: 40px;
        }
        
        .coming-soon-icon {
            margin-bottom: 24px;
            opacity: 0.6;
        }
        
        .coming-soon-icon svg {
            stroke: #007aff;
        }
        
        .coming-soon-section h1 {
            font-size: 32px;
            font-weight: 700;
            color: #1d1d1f;
            margin-bottom: 12px;
        }
        
        .coming-soon-section p {
            font-size: 18px;
            color: #6e6e73;
            max-width: 500px;
            line-height: 1.5;
        }
    `;
    document.head.appendChild(style);
});