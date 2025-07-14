// Build App Page JavaScript

// Initialize DOM elements and event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Build App page initialized');
    showNotification('Build App interface loaded!', 'info');
    
    // Setup build app functionality
    setupBuildAppFunctionality();
    
    // Setup project selector
    setupProjectSelector();
});

// Project Selector Functionality
function setupProjectSelector() {
    const projectSelector = document.querySelector('.project-selector');
    const licenseKeyInput = document.querySelector('.license-key-input');
    
    if (projectSelector && licenseKeyInput) {
        projectSelector.addEventListener('change', (e) => {
            const selectedOption = e.target.selectedOptions[0];
            const licenseKey = selectedOption.dataset.key;
            
            if (licenseKey) {
                licenseKeyInput.value = licenseKey;
                const projectName = selectedOption.textContent;
                showNotification(`Selected ${projectName}`, 'success');
            } else {
                licenseKeyInput.value = 'Select a project to view license key';
            }
        });
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
            const buildType = document.querySelector('.build-select').value.toUpperCase();
            
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