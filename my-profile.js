// My Profile Page JavaScript

// Initialize DOM elements and event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('My Profile page initialized');
    showNotification('Profile loaded successfully!', 'info');
    
    // Load user data
    loadUserData();
});

// Load user data from localStorage or defaults
function loadUserData() {
    const userData = {
        name: localStorage.getItem('userName') || 'John Doe',
        email: localStorage.getItem('userEmail') || 'john@example.com',
        phone: localStorage.getItem('userPhone') || '+1 (555) 123-4567',
        location: localStorage.getItem('userLocation') || 'New York, USA'
    };
    
    // Update profile display
    document.getElementById('profileName').textContent = userData.name;
    document.getElementById('profileEmail').textContent = userData.email;
    document.getElementById('fullName').textContent = userData.name;
    document.getElementById('emailAddress').textContent = userData.email;
    document.getElementById('phoneNumber').textContent = userData.phone;
    document.getElementById('location').textContent = userData.location;
}

// Navigation function
function navigateTo(page) {
    window.location.href = page;
}

// Expose function to global scope for onclick access
window.navigateTo = navigateTo;

// Change Profile Picture
function changeProfilePicture() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('profileImage').src = e.target.result;
                showNotification('Profile picture updated successfully!', 'success');
            };
            reader.readAsDataURL(file);
        }
    });
    
    fileInput.click();
}

// Open Edit Profile Modal
function openEditProfile() {
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Edit Profile</h3>
                <button class="modal-close" onclick="closeModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
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
                            <input type="text" value="John" id="editFirstName">
                        </div>
                        <div class="form-group">
                            <label>Last Name</label>
                            <input type="text" value="Doe" id="editLastName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" value="john@example.com" id="editEmail">
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" value="+1 (555) 123-4567" id="editPhone">
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
                        <input type="text" value="United States" id="editCountry">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>City</label>
                            <input type="text" value="New York" id="editCity">
                        </div>
                        <div class="form-group">
                            <label>Timezone</label>
                            <input type="text" value="EST (UTC-5)" id="editTimezone">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="saveProfile()">Save Changes</button>
            </div>
        </div>
    `;
    
    showModal(modalContent);
}

// Open Change Password Modal
function openChangePassword() {
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Change Password</h3>
                <button class="modal-close" onclick="closeModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
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
                        <div class="password-field-container">
                            <input type="password" placeholder="Enter current password" id="currentPassword" class="password-input-enhanced">
                            <button type="button" class="password-toggle-enhanced" onclick="togglePasswordField('currentPassword')">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>New Password</label>
                        <div class="password-field-container">
                            <input type="password" placeholder="Enter new password" id="newPassword" class="password-input-enhanced">
                            <button type="button" class="password-toggle-enhanced" onclick="togglePasswordField('newPassword')">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            </button>
                        </div>
                        <div class="password-strength-enhanced">
                            <div class="strength-header">
                                <span class="strength-label">Password Strength</span>
                                <span class="strength-score weak">Weak</span>
                            </div>
                            
                            <div class="strength-bars">
                                <div class="strength-bar-item"></div>
                                <div class="strength-bar-item"></div>
                                <div class="strength-bar-item"></div>
                                <div class="strength-bar-item"></div>
                                <div class="strength-bar-item"></div>
                            </div>
                            
                            <div class="strength-requirements">
                                <div class="requirement-item" data-requirement="length">
                                    <div class="requirement-icon">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                            <path d="M9 12l2 2 4-4"/>
                                        </svg>
                                    </div>
                                    <span>8+ characters</span>
                                </div>
                                <div class="requirement-item" data-requirement="lowercase">
                                    <div class="requirement-icon">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                            <path d="M9 12l2 2 4-4"/>
                                        </svg>
                                    </div>
                                    <span>Lowercase letter</span>
                                </div>
                                <div class="requirement-item" data-requirement="uppercase">
                                    <div class="requirement-icon">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                            <path d="M9 12l2 2 4-4"/>
                                        </svg>
                                    </div>
                                    <span>Uppercase letter</span>
                                </div>
                                <div class="requirement-item" data-requirement="number">
                                    <div class="requirement-icon">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                            <path d="M9 12l2 2 4-4"/>
                                        </svg>
                                    </div>
                                    <span>Number</span>
                                </div>
                                <div class="requirement-item" data-requirement="special">
                                    <div class="requirement-icon">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                            <path d="M9 12l2 2 4-4"/>
                                        </svg>
                                    </div>
                                    <span>Special character</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Confirm New Password</label>
                        <div class="password-field-container">
                            <input type="password" placeholder="Confirm new password" id="confirmPassword" class="password-input-enhanced">
                            <button type="button" class="password-toggle-enhanced" onclick="togglePasswordField('confirmPassword')">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="changePassword()">Update Password</button>
            </div>
        </div>
    `;
    
    showModal(modalContent);
    
    // Setup password strength checker for new password
    setTimeout(() => {
        const newPasswordInput = document.getElementById('newPassword');
        if (newPasswordInput) {
            newPasswordInput.addEventListener('input', (e) => {
                const password = e.target.value;
                const strength = calculatePasswordStrength(password);
                updatePasswordStrength(strength);
                updatePasswordRequirements(password);
            });
        }
    }, 100);
}

// Open Change Login Details Modal
function openChangeLoginDetails() {
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Change Login Details</h3>
                <button class="modal-close" onclick="closeModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-section">
                    <div class="section-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        Login Information
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" value="john@example.com" id="loginEmail">
                        <small class="form-help">This will be your new login email</small>
                    </div>
                    <div class="form-group">
                        <label>Username (Optional)</label>
                        <input type="text" value="johndoe" id="loginUsername">
                        <small class="form-help">You can also login with a username</small>
                    </div>
                </div>
                
                <div class="form-section">
                    <div class="section-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        Security Preferences
                    </div>
                    <div class="form-group">
                        <label class="checkbox-wrapper">
                            <input type="checkbox" id="emailNotifications" checked>
                            <span class="checkmark"></span>
                            Email notifications for login attempts
                        </label>
                    </div>
                    <div class="form-group">
                        <label class="checkbox-wrapper">
                            <input type="checkbox" id="rememberDevice" checked>
                            <span class="checkmark"></span>
                            Remember this device for 30 days
                        </label>
                    </div>
                    <div class="form-group">
                        <label class="checkbox-wrapper">
                            <input type="checkbox" id="requirePassword">
                            <span class="checkmark"></span>
                            Require password confirmation for changes
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="saveLoginDetails()">Save Changes</button>
            </div>
        </div>
    `;
    
    showModal(modalContent);
}

// Setup 2FA
function setup2FA() {
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Setup Two-Factor Authentication</h3>
                <button class="modal-close" onclick="closeModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-section">
                    <div class="section-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        Scan QR Code
                    </div>
                    <div class="qr-code-section">
                        <div class="qr-code-placeholder">
                            <img src="https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" alt="2FA QR Code" style="width: 200px; height: 200px; border-radius: 8px;">
                        </div>
                        <p class="qr-instructions">Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)</p>
                    </div>
                    <div class="form-group">
                        <label>Verification Code</label>
                        <input type="text" placeholder="Enter 6-digit code" id="verificationCode" maxlength="6">
                        <small class="form-help">Enter the 6-digit code from your authenticator app</small>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="verify2FA()">Verify & Enable</button>
            </div>
        </div>
    `;
    
    showModal(modalContent);
}

// Export Account Data
function exportAccountData() {
    showNotification('Preparing account data for export...', 'info');
    
    // Simulate data export
    setTimeout(() => {
        const accountData = {
            profile: {
                name: document.getElementById('profileName').textContent,
                email: document.getElementById('profileEmail').textContent,
                phone: document.getElementById('phoneNumber').textContent,
                location: document.getElementById('location').textContent
            },
            exportDate: new Date().toISOString(),
            dataVersion: '1.0'
        };
        
        const dataStr = JSON.stringify(accountData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'account-data.json';
        link.click();
        
        showNotification('Account data exported successfully!', 'success');
    }, 2000);
}

// Delete Account
function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        if (confirm('This will permanently delete all your data, projects, and licenses. Type "DELETE" to confirm.')) {
            const confirmation = prompt('Type "DELETE" to confirm account deletion:');
            if (confirmation === 'DELETE') {
                showNotification('Account deletion initiated. You will receive an email confirmation.', 'warning');
                setTimeout(() => {
                    logout();
                }, 3000);
            } else {
                showNotification('Account deletion cancelled.', 'info');
            }
        }
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('rememberMe');
        
        showNotification('Logged out successfully', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}

// Save Profile
function saveProfile() {
    const firstName = document.getElementById('editFirstName').value;
    const lastName = document.getElementById('editLastName').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;
    const country = document.getElementById('editCountry').value;
    const city = document.getElementById('editCity').value;
    
    // Update localStorage
    localStorage.setItem('userName', `${firstName} ${lastName}`);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPhone', phone);
    localStorage.setItem('userLocation', `${city}, ${country}`);
    
    // Update display
    loadUserData();
    
    closeModal();
    showNotification('Profile updated successfully!', 'success');
}

// Change Password
function changePassword() {
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
    
    if (!validatePassword(newPassword)) {
        showNotification('Password does not meet requirements', 'error');
        return;
    }
    
    closeModal();
    showNotification('Password updated successfully!', 'success');
}

// Save Login Details
function saveLoginDetails() {
    const email = document.getElementById('loginEmail').value;
    const username = document.getElementById('loginUsername').value;
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    localStorage.setItem('userEmail', email);
    localStorage.setItem('username', username);
    
    loadUserData();
    closeModal();
    showNotification('Login details updated successfully!', 'success');
}

// Verify 2FA
function verify2FA() {
    const code = document.getElementById('verificationCode').value;
    
    if (!code || code.length !== 6) {
        showNotification('Please enter a valid 6-digit code', 'error');
        return;
    }
    
    closeModal();
    showNotification('Two-factor authentication enabled successfully!', 'success');
}

// Toggle Password Field Visibility
function togglePasswordField(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const toggleBtn = passwordInput.nextElementSibling;
    
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

// Password Strength Functions
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

// Validation Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Modal Functions
function showModal(content) {
    const overlay = document.getElementById('modalOverlay');
    overlay.innerHTML = content;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        overlay.classList.add('show');
    }, 10);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('show');
    
    setTimeout(() => {
        overlay.style.display = 'none';
        overlay.innerHTML = '';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Notification System
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
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
    
    const colors = {
        success: '#34c759',
        error: '#ff3b30',
        info: '#007aff',
        warning: '#ff9500'
    };
    
    notification.style.background = colors[type] || colors.info;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}