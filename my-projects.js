// My Projects Page JavaScript

// Initialize DOM elements and event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('My Projects page initialized');
    showNotification('Projects loaded successfully!', 'info');
    
    // Setup project functionality
    setupProjectFunctionality();
});

// Project Functionality
function setupProjectFunctionality() {
    // Download buttons functionality
    const downloadButtons = document.querySelectorAll('.download-btn:not(.disabled)');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const projectName = e.target.closest('.project-card').querySelector('h3').textContent;
            const projectType = button.dataset.project;
            
            // Simulate download process
            button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" class="loading-spinner">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="4" fill="none"/>
                </svg>
                Downloading...
            `;
            button.disabled = true;
            
            // Add loading animation
            const spinner = button.querySelector('.loading-spinner');
            if (spinner) {
                spinner.style.animation = 'spin 1s linear infinite';
            }
            
            setTimeout(() => {
                button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M9 12l2 2 4-4"/>
                    </svg>
                    Downloaded!
                `;
                button.style.background = '#34c759';
                
                showNotification(`${projectName} downloaded successfully!`, 'success');
                
                // Reset after 3 seconds
                setTimeout(() => {
                    button.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7,10 12,15 17,10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Download
                    `;
                    button.disabled = false;
                    button.style.background = '#007aff';
                }, 3000);
            }, 2000);
        });
    });
    
    // Rebuild buttons functionality
    const rebuildButtons = document.querySelectorAll('.rebuild-btn');
    rebuildButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const projectName = e.target.closest('.project-card').querySelector('h3').textContent;
            const projectType = button.dataset.project;
            
            // Show confirmation
            if (confirm(`Are you sure you want to rebuild ${projectName}? This will take you to the Build App section.`)) {
                showNotification(`Redirecting to Build App for Telegram App...`, 'info');
                
                // Add loading state
                button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" class="loading-spinner">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.3"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="4" fill="none"/>
                    </svg>
                    Redirecting...
                `;
                button.disabled = true;
                
                // Add loading animation
                const spinner = button.querySelector('.loading-spinner');
                if (spinner) {
                    spinner.style.animation = 'spin 1s linear infinite';
                }
                
                // Redirect to build app page after 1.5 seconds
                setTimeout(() => {
                    window.location.href = 'build-app.html';
                }, 1500);
            }
        });
    });
    
    // New Project button functionality
    const newProjectBtn = document.querySelector('.new-project-btn');
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', () => {
            showNotification('Redirecting to create new project...', 'info');
            setTimeout(() => {
                window.location.href = 'buy-license-key.html';
            }, 1000);
        });
    }
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
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