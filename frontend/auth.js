// // Authentication JavaScript for Sehat Setu
// document.addEventListener('DOMContentLoaded', function() {
//     // Check if user is already logged in
//     if (checkAuthStatus()) {
//         const userRole = localStorage.getItem('userRole');
//         if (userRole === 'patient') {
//             window.location.href = 'patient-dashboard.html';
//         } else if (userRole === 'doctor') {
//             window.location.href = 'doctor-dashboard.html';
//         }
//         return;
//     }

//     // Get URL parameters
//     const urlParams = new URLSearchParams(window.location.search);
//     const mode = urlParams.get('mode');
    
//     // Switch between login and signup forms
//     const loginForm = document.getElementById('loginForm');
//     const signupForm = document.getElementById('signupForm');
//     const authTitle = document.getElementById('authTitle');
//     const switchAuthMode = document.getElementById('switchAuthMode');
    
//     // Set initial mode
//     if (mode === 'signup') {
//         showSignupForm();
//     } else {
//         showLoginForm();
//     }
    
//     function showLoginForm() {
//         if (loginForm) loginForm.style.display = 'block';
//         if (signupForm) signupForm.style.display = 'none';
//         if (authTitle) authTitle.textContent = 'Welcome Back';
//         updateSubtitle('Please sign in to your account');
//         if (switchAuthMode) {
//             switchAuthMode.innerHTML = 'Don\'t have an account? <a href="#" onclick="showSignupForm()">Sign up</a>';
//         }
//         // Update URL without refresh
//         window.history.replaceState({}, '', 'auth.html');
        
//         // Focus on email input
//         const emailInput = document.getElementById('loginEmail');
//         if (emailInput) emailInput.focus();
//     }
    
//     function showSignupForm() {
//         if (loginForm) loginForm.style.display = 'none';
//         if (signupForm) signupForm.style.display = 'block';
//         if (authTitle) authTitle.textContent = 'Join Sehat Setu';
//         updateSubtitle('Create your healthcare account');
//         if (switchAuthMode) {
//             switchAuthMode.innerHTML = 'Already have an account? <a href="#" onclick="showLoginForm()">Login</a>';
//         }
//         // Update URL without refresh
//         window.history.replaceState({}, '', 'auth.html?mode=signup');
        
//         // Focus on name input
//         const nameInput = document.getElementById('signupName');
//         if (nameInput) nameInput.focus();
//     }
    
//     function updateSubtitle(text) {
//         const subtitle = document.querySelector('.auth-subtitle');
//         if (subtitle) subtitle.textContent = text;
//     }
    
//     // Make functions global
//     window.showLoginForm = showLoginForm;
//     window.showSignupForm = showSignupForm;
    
//     // Handle login form submission
//     const loginFormElement = document.getElementById('loginForm');
//     if (loginFormElement) {
//         loginFormElement.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             const email = document.getElementById('loginEmail').value.trim();
//             const password = document.getElementById('loginPassword').value;
//             const role = document.getElementById('loginRole').value;
            
//             // Clear any previous error states
//             clearErrorStates();
            
//             // Basic validation
//             if (!email) {
//                 showFieldError('loginEmail', 'Email is required');
//                 return;
//             }
            
//             if (!validateEmail(email)) {
//                 showFieldError('loginEmail', 'Please enter a valid email address');
//                 return;
//             }
            
//             if (!password) {
//                 showFieldError('loginPassword', 'Password is required');
//                 return;
//             }
            
//             if (!role) {
//                 showFieldError('loginRole', 'Please select your role');
//                 return;
//             }
            
//             // Attempt authentication
//             authenticateUser(email, password, role);
//         });
//     }
    
//     // Handle signup form submission
//     const signupFormElement = document.getElementById('signupForm');
//     if (signupFormElement) {
//         signupFormElement.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             const name = document.getElementById('signupName').value.trim();
//             const email = document.getElementById('signupEmail').value.trim();
//             const password = document.getElementById('signupPassword').value;
//             const confirmPassword = document.getElementById('confirmPassword').value;
//             const role = document.getElementById('signupRole').value;
//             const phone = document.getElementById('signupPhone').value.trim();
            
//             // Clear any previous error states
//             clearErrorStates();
            
//             // Validation
//             if (!name) {
//                 showFieldError('signupName', 'Full name is required');
//                 return;
//             }
            
//             if (name.length < 2) {
//                 showFieldError('signupName', 'Name must be at least 2 characters long');
//                 return;
//             }
            
//             if (!email) {
//                 showFieldError('signupEmail', 'Email is required');
//                 return;
//             }
            
//             if (!validateEmail(email)) {
//                 showFieldError('signupEmail', 'Please enter a valid email address');
//                 return;
//             }
            
//             if (!phone) {
//                 showFieldError('signupPhone', 'Phone number is required');
//                 return;
//             }
            
//             if (!validatePhone(phone)) {
//                 showFieldError('signupPhone', 'Please enter a valid phone number');
//                 return;
//             }
            
//             if (!role) {
//                 showFieldError('signupRole', 'Please select your role');
//                 return;
//             }
            
//             if (!password) {
//                 showFieldError('signupPassword', 'Password is required');
//                 return;
//             }
            
//             if (!validatePassword(password)) {
//                 showFieldError('signupPassword', 'Password must be at least 6 characters long');
//                 return;
//             }
            
//             if (!confirmPassword) {
//                 showFieldError('confirmPassword', 'Please confirm your password');
//                 return;
//             }
            
//             if (password !== confirmPassword) {
//                 showFieldError('confirmPassword', 'Passwords do not match');
//                 return;
//             }
            
//             const agreeTerms = document.getElementById('agreeTerms').checked;
//             if (!agreeTerms) {
//                 showNotification('Please agree to the Terms & Conditions', 'error');
//                 return;
//             }
            
//             // Check if email already exists (demo check)
//             if (isEmailAlreadyRegistered(email)) {
//                 showFieldError('signupEmail', 'An account with this email already exists');
//                 return;
//             }
            
//             // Attempt registration
//             registerUser(name, email, password, role, phone);
//         });
//     }
    
//     // Real-time validation
//     setupRealTimeValidation();
    
//     // Password strength indicator
//     setupPasswordStrengthIndicator();
    
//     // Demo credentials auto-fill
//     setupDemoAutoFill();
// });

// // Simulate authentication function
// function authenticateUser(email, password, role) {
//     const submitBtn = document.querySelector('#loginForm .btn-primary');
//     const originalText = submitBtn.textContent;
    
//     // Show loading state
//     setButtonLoading(submitBtn, 'Signing in...');
    
//     // Simulate API delay
//     setTimeout(() => {
//         // Demo credentials for testing
//         const demoUsers = {
//             'patient@demo.com': { 
//                 password: 'demo123', 
//                 role: 'patient', 
//                 name: 'Demo Patient', 
//                 id: 'P001',
//                 phone: '+91-9876543210'
//             },
//             'doctor@demo.com': { 
//                 password: 'demo123', 
//                 role: 'doctor', 
//                 name: 'Dr. Demo', 
//                 id: 'D001',
//                 phone: '+91-9876543211'
//             },
//             'john@example.com': {
//                 password: 'password123',
//                 role: 'patient',
//                 name: 'John Doe',
//                 id: 'P002',
//                 phone: '+91-9876543212'
//             }
//         };
        
//         const user = demoUsers[email];
        
//         if (user && user.password === password && user.role === role) {
//             // Store authentication data
//             const token = 'demo-token-' + Date.now();
//             localStorage.setItem('userToken', token);
//             localStorage.setItem('userRole', user.role);
//             localStorage.setItem('userId', user.id);
//             localStorage.setItem('userName', user.name);
//             localStorage.setItem('userEmail', email);
//             localStorage.setItem('userPhone', user.phone);
//             localStorage.setItem('loginTimestamp', Date.now().toString());
            
//             showNotification('Login successful! Redirecting...', 'success');
            
//             // Redirect based on role
//             setTimeout(() => {
//                 if (user.role === 'patient') {
//                     window.location.href = 'patient-dashboard.html';
//                 } else if (user.role === 'doctor') {
//                     window.location.href = 'doctor-dashboard.html';
//                 }
//             }, 1500);
//         } else {
//             let errorMessage = 'Invalid credentials';
            
//             if (user && user.password !== password) {
//                 errorMessage = 'Incorrect password';
//                 showFieldError('loginPassword', errorMessage);
//             } else if (user && user.role !== role) {
//                 errorMessage = 'Role mismatch. Please select the correct role.';
//                 showFieldError('loginRole', errorMessage);
//             } else {
//                 errorMessage = 'No account found with this email address';
//                 showFieldError('loginEmail', errorMessage);
//             }
            
//             showNotification(errorMessage, 'error');
//             resetButtonLoading(submitBtn, originalText);
//         }
//     }, 1500);
// }

// // Simulate registration function
// function registerUser(name, email, password, role, phone) {
//     const submitBtn = document.querySelector('#signupForm .btn-primary');
//     const originalText = submitBtn.textContent;
    
//     // Show loading state
//     setButtonLoading(submitBtn, 'Creating Account...');
    
//     // Simulate API delay
//     setTimeout(() => {
//         try {
//             // Generate user ID
//             const prefix = role.charAt(0).toUpperCase();
//             const userId = prefix + String(Date.now()).slice(-3);
            
//             // Store user data (in real app, this would be sent to server)
//             const userData = {
//                 id: userId,
//                 name,
//                 email,
//                 role,
//                 phone,
//                 createdAt: new Date().toISOString()
//             };
            
//             // Store authentication data
//             const token = 'demo-token-' + Date.now();
//             localStorage.setItem('userToken', token);
//             localStorage.setItem('userRole', role);
//             localStorage.setItem('userId', userId);
//             localStorage.setItem('userName', name);
//             localStorage.setItem('userEmail', email);
//             localStorage.setItem('userPhone', phone);
//             localStorage.setItem('loginTimestamp', Date.now().toString());
            
//             // Store demo user data for future logins
//             const existingUsers = JSON.parse(localStorage.getItem('demoUsers') || '{}');
//             existingUsers[email] = {
//                 password,
//                 role,
//                 name,
//                 id: userId,
//                 phone
//             };
//             localStorage.setItem('demoUsers', JSON.stringify(existingUsers));
            
//             showNotification('Account created successfully! Redirecting...', 'success');
            
//             // Show welcome message
//             setTimeout(() => {
//                 showNotification(`Welcome to Sehat Setu, ${name}!`, 'info');
//             }, 1000);
            
//             // Redirect based on role
//             setTimeout(() => {
//                 if (role === 'patient') {
//                     window.location.href = 'patient-dashboard.html';
//                 } else if (role === 'doctor') {
//                     window.location.href = 'doctor-dashboard.html';
//                 }
//             }, 2500);
            
//         } catch (error) {
//             console.error('Registration error:', error);
//             showNotification('Registration failed. Please try again.', 'error');
//             resetButtonLoading(submitBtn, originalText);
//         }
//     }, 2000);
// }

// // Helper Functions
// function clearErrorStates() {
//     const errorElements = document.querySelectorAll('.field-error');
//     errorElements.forEach(element => element.remove());
    
//     const inputElements = document.querySelectorAll('.form-input.error');
//     inputElements.forEach(element => element.classList.remove('error'));
// }

// function showFieldError(fieldId, message) {
//     const field = document.getElementById(fieldId);
//     if (!field) return;
    
//     field.classList.add('error');
    
//     // Remove existing error message
//     const existingError = field.parentNode.querySelector('.field-error');
//     if (existingError) {
//         existingError.remove();
//     }
    
//     // Add new error message
//     const errorElement = document.createElement('div');
//     errorElement.className = 'field-error';
//     errorElement.textContent = message;
//     errorElement.style.color = '#dc3545';
//     errorElement.style.fontSize = '0.85rem';
//     errorElement.style.marginTop = '5px';
    
//     field.parentNode.appendChild(errorElement);
//     field.focus();
// }

// function setButtonLoading(button, text) {
//     button.textContent = text;
//     button.disabled = true;
//     button.classList.add('loading');
// }

// function resetButtonLoading(button, originalText) {
//     button.textContent = originalText;
//     button.disabled = false;
//     button.classList.remove('loading');
// }

// function isEmailAlreadyRegistered(email) {
//     const demoUsers = {
//         'patient@demo.com': true,
//         'doctor@demo.com': true
//     };
    
//     const customUsers = JSON.parse(localStorage.getItem('demoUsers') || '{}');
    
//     return demoUsers[email] || customUsers[email];
// }

// function setupRealTimeValidation() {
//     // Email validation
//     const emailInputs = document.querySelectorAll('input[type="email"]');
//     emailInputs.forEach(input => {
//         input.addEventListener('blur', function() {
//             if (this.value && !validateEmail(this.value)) {
//                 showFieldError(this.id, 'Please enter a valid email address');
//             } else {
//                 clearFieldError(this.id);
//             }
//         });
//     });
    
//     // Password validation
//     const passwordInputs = document.querySelectorAll('input[type="password"]');
//     passwordInputs.forEach(input => {
//         if (input.id === 'signupPassword') {
//             input.addEventListener('input', function() {
//                 updatePasswordStrength(this.value);
//             });
//         }
        
//         if (input.id === 'confirmPassword') {
//             input.addEventListener('blur', function() {
//                 const password = document.getElementById('signupPassword').value;
//                 if (this.value && this.value !== password) {
//                     showFieldError(this.id, 'Passwords do not match');
//                 } else {
//                     clearFieldError(this.id);
//                 }
//             });
//         }
//     });
    
//     // Phone validation
//     const phoneInputs = document.querySelectorAll('input[type="tel"]');
//     phoneInputs.forEach(input => {
//         input.addEventListener('blur', function() {
//             if (this.value && !validatePhone(this.value)) {
//                 showFieldError(this.id, 'Please enter a valid phone number');
//             } else {
//                 clearFieldError(this.id);
//             }
//         });
//     });
// }

// function clearFieldError(fieldId) {
//     const field = document.getElementById(fieldId);
//     if (!field) return;
    
//     field.classList.remove('error');
//     const errorElement = field.parentNode.querySelector('.field-error');
//     if (errorElement) {
//         errorElement.remove();
//     }
// }

// function setupPasswordStrengthIndicator() {
//     const passwordInput = document.getElementById('signupPassword');
//     if (!passwordInput) return;
    
//     const strengthIndicator = document.createElement('div');
//     strengthIndicator.className = 'password-strength';
//     strengthIndicator.innerHTML = `
//         <div class="strength-bars">
//             <div class="strength-bar"></div>
//             <div class="strength-bar"></div>
//             <div class="strength-bar"></div>
//             <div class="strength-bar"></div>
//         </div>
//         <div class="strength-text">Password strength</div>
//     `;
    
//     passwordInput.parentNode.appendChild(strengthIndicator);
// }

// function updatePasswordStrength(password) {
//     const indicator = document.querySelector('.password-strength');
//     if (!indicator) return;
    
//     const bars = indicator.querySelectorAll('.strength-bar');
//     const text = indicator.querySelector('.strength-text');
    
//     let strength = 0;
//     let strengthText = '';
    
//     if (password.length >= 6) strength++;
//     if (password.match(/[a-z]/)) strength++;
//     if (password.match(/[A-Z]/)) strength++;
//     if (password.match(/[0-9]/)) strength++;
//     if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
//     // Reset bars
//     bars.forEach(bar => {
//         bar.className = 'strength-bar';
//     });
    
//     // Update bars and text based on strength
//     if (strength <= 1) {
//         strengthText = 'Weak';
//         bars[0].classList.add('weak');
//     } else if (strength <= 2) {
//         strengthText = 'Fair';
//         bars[0].classList.add('fair');
//         bars[1].classList.add('fair');
//     } else if (strength <= 3) {
//         strengthText = 'Good';
//         bars[0].classList.add('good');
//         bars[1].classList.add('good');
//         bars[2].classList.add('good');
//     } else {
//         strengthText = 'Strong';
//         bars.forEach(bar => bar.classList.add('strong'));
//     }
    
//     text.textContent = strengthText;
// }

// function setupDemoAutoFill() {
//     // Add quick fill buttons for demo credentials
//     const loginForm = document.getElementById('loginForm');
//     if (loginForm) {
//         const demoButtonsContainer = document.createElement('div');
//         demoButtonsContainer.className = 'demo-buttons';
//         demoButtonsContainer.innerHTML = `
//             <div style="margin-top: 10px; font-size: 0.85rem; color: #666;">
//                 Quick fill:
//                 <button type="button" class="demo-fill-btn" data-type="patient">Patient Demo</button>
//                 <button type="button" class="demo-fill-btn" data-type="doctor">Doctor Demo</button>
//             </div>
//         `;
        
//         loginForm.appendChild(demoButtonsContainer);
        
//         // Add event listeners for demo buttons
//         const demoButtons = demoButtonsContainer.querySelectorAll('.demo-fill-btn');
//         demoButtons.forEach(button => {
//             button.addEventListener('click', function() {
//                 const type = this.dataset.type;
//                 if (type === 'patient') {
//                     document.getElementById('loginEmail').value = 'patient@demo.com';
//                     document.getElementById('loginPassword').value = 'demo123';
//                     document.getElementById('loginRole').value = 'patient';
//                 } else if (type === 'doctor') {
//                     document.getElementById('loginEmail').value = 'doctor@demo.com';
//                     document.getElementById('loginPassword').value = 'demo123';
//                     document.getElementById('loginRole').value = 'doctor';
//                 }
//             });
//         });
//     }
// }

// // Utility functions (from main script)
// function showNotification(message, type = 'info') {
//     const notification = document.createElement('div');
//     notification.className = `notification notification-${type}`;
//     notification.textContent = message;
    
//     document.body.appendChild(notification);
    
//     setTimeout(() => {
//         notification.classList.add('show');
//     }, 100);
    
//     setTimeout(() => {
//         notification.classList.remove('show');
//         setTimeout(() => {
//             if (document.body.contains(notification)) {
//                 document.body.removeChild(notification);
//             }
//         }, 300);
//     }, 3000);
// }

// function checkAuthStatus() {
//     return localStorage.getItem('userToken') !== null;
// }

// function validateEmail(email) {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
// }

// function validatePhone(phone) {
//     const re = /^[\+]?[1-9][\d]{0,15}$/;
//     return re.test(phone.replace(/\s/g, ''));
// }

// function validatePassword(password) {
//     return password.length >= 6;
// }
























// // Sehat Setu Authentication System
// Professional JavaScript code for login/signup functionality


// class SehatSetuAuth {
//     constructor() {
//         this.users = this.loadUsers();
//         this.init();
//     }

//     init() {
//         // Wait for DOM to be fully loaded
//         if (document.readyState === 'loading') {
//             document.addEventListener('DOMContentLoaded', () => this.setupSystem());
//         } else {
//             this.setupSystem();
//         }
//     }

//     setupSystem() {
//         this.setupEventListeners();
//         this.checkExistingSession();
//     }

//     setupEventListeners() {
//         // Login form
//         const loginForm = document.getElementById('loginForm');
//         if (loginForm) {
//             loginForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 this.handleLogin(e);
//             });
//         }

//         // Signup form
//         const signupForm = document.getElementById('signupForm');
//         if (signupForm) {
//             signupForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 this.handleSignup(e);
//             });
//         }

//         // Real-time validation
//         this.setupValidationListeners();
//     }

//     setupValidationListeners() {
//         // Email validation
//         const loginEmail = document.getElementById('loginEmail');
//         const signupEmail = document.getElementById('signupEmail');
        
//         if (loginEmail) {
//             loginEmail.addEventListener('blur', () => this.validateEmailField(loginEmail));
//         }
        
//         if (signupEmail) {
//             signupEmail.addEventListener('blur', () => this.validateEmailField(signupEmail));
//         }

//         // Password strength for signup
//         const signupPassword = document.getElementById('signupPassword');
//         if (signupPassword) {
//             signupPassword.addEventListener('input', () => this.checkPasswordStrength());
//         }

//         // Password match validation
//         const confirmPassword = document.getElementById('confirmPassword');
//         if (confirmPassword) {
//             confirmPassword.addEventListener('input', () => this.checkPasswordMatch());
//         }
//     }

//     // User data management
//     loadUsers() {
//         try {
//             const stored = localStorage.getItem('sehat_setu_users');
//             return stored ? JSON.parse(stored) : {};
//         } catch (error) {
//             console.error('Error loading users:', error);
//             return {};
//         }
//     }

//     saveUsers() {
//         try {
//             localStorage.setItem('sehat_setu_users', JSON.stringify(this.users));
//         } catch (error) {
//             console.error('Error saving users:', error);
//             this.showMessage('Unable to save user data', 'error');
//         }
//     }

//     // Validation methods
//     validateEmailField(emailField) {
//         if (!emailField || !emailField.value) return false;
        
//         const email = emailField.value.trim();
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         const isValid = emailRegex.test(email);
        
//         this.toggleFieldError(emailField, isValid ? null : 'Please enter a valid email address');
//         return isValid;
//     }

//     checkPasswordStrength() {
//         const passwordField = document.getElementById('signupPassword');
//         if (!passwordField) return;

//         const password = passwordField.value;
//         const strength = this.calculatePasswordStrength(password);
        
//         // Remove existing strength indicator
//         const existingIndicator = document.querySelector('.password-strength-indicator');
//         if (existingIndicator) {
//             existingIndicator.remove();
//         }

//         if (password.length > 0) {
//             const indicator = document.createElement('div');
//             indicator.className = 'password-strength-indicator';
//             indicator.innerHTML = `<small style="color: ${strength.color}">Password Strength: ${strength.text}</small>`;
//             passwordField.parentNode.appendChild(indicator);
//         }
//     }

//     calculatePasswordStrength(password) {
//         let score = 0;
        
//         if (password.length >= 8) score++;
//         if (/[a-z]/.test(password)) score++;
//         if (/[A-Z]/.test(password)) score++;
//         if (/[0-9]/.test(password)) score++;
//         if (/[^A-Za-z0-9]/.test(password)) score++;

//         const levels = [
//             { text: 'Very Weak', color: '#e74c3c' },
//             { text: 'Weak', color: '#e67e22' },
//             { text: 'Fair', color: '#f39c12' },
//             { text: 'Good', color: '#27ae60' },
//             { text: 'Strong', color: '#2ecc71' }
//         ];

//         return levels[Math.min(score, 4)];
//     }

//     checkPasswordMatch() {
//         const password = document.getElementById('signupPassword');
//         const confirmPassword = document.getElementById('confirmPassword');
        
//         if (!password || !confirmPassword) return false;

//         const isMatch = password.value === confirmPassword.value;
//         this.toggleFieldError(confirmPassword, isMatch ? null : 'Passwords do not match');
//         return isMatch;
//     }

//     toggleFieldError(field, errorMessage) {
//         if (!field) return;

//         // Remove existing error
//         const existingError = field.parentNode.querySelector('.field-error');
//         if (existingError) {
//             existingError.remove();
//         }

//         // Remove error styling
//         field.style.borderColor = '';

//         if (errorMessage) {
//             // Add error message
//             const errorDiv = document.createElement('div');
//             errorDiv.className = 'field-error';
//             errorDiv.innerHTML = `<small style="color: #e74c3c; display: block; margin-top: 5px;">${errorMessage}</small>`;
//             field.parentNode.appendChild(errorDiv);
            
//             // Add error styling
//             field.style.borderColor = '#e74c3c';
//         }
//     }

//     // Authentication handlers
//     async handleLogin(e) {
//         const formData = new FormData(e.target);
//         const email = formData.get('email').trim().toLowerCase();
//         const password = formData.get('password');
//         const role = formData.get('role');

//         // Clear any existing messages
//         this.clearMessages();

//         // Basic validation
//         if (!email || !password || !role) {
//             this.showMessage('Please fill in all fields', 'error');
//             return;
//         }

//         if (!this.isValidEmail(email)) {
//             this.showMessage('Please enter a valid email address', 'error');
//             return;
//         }

//         // Show loading
//         this.setButtonLoading('loginForm', true);

//         try {
//             // Simulate network delay
//             await this.delay(1000);

//             // Check user credentials
//             const user = this.authenticateUser(email, password, role);
            
//             if (user) {
//                 this.createSession(user);
//                 this.showMessage('Login successful! Redirecting...', 'success');
                
//                 // Redirect after success message
//                 setTimeout(() => {
//                     this.redirectToDashboard(user.role);
//                 }, 1500);
//             } else {
//                 this.showMessage('Invalid email, password, or role. Please try again.', 'error');
//             }

//         } catch (error) {
//             this.showMessage('Login failed. Please try again.', 'error');
//         } finally {
//             this.setButtonLoading('loginForm', false);
//         }
//     }

//     async handleSignup(e) {
//         const formData = new FormData(e.target);
//         const userData = {
//             name: formData.get('name').trim(),
//             email: formData.get('email').trim().toLowerCase(),
//             phone: formData.get('phone').replace(/\D/g, ''),
//             role: formData.get('role'),
//             password: formData.get('password'),
//             confirmPassword: formData.get('confirmPassword')
//         };

//         // Clear any existing messages
//         this.clearMessages();

//         // Validation
//         if (!this.validateSignupData(userData)) {
//             return;
//         }

//         // Check if user exists
//         if (this.users[userData.email]) {
//             this.showMessage('An account with this email already exists', 'error');
//             return;
//         }

//         // Show loading
//         this.setButtonLoading('signupForm', true);

//         try {
//             // Simulate network delay
//             await this.delay(1500);

//             // Create user
//             const newUser = {
//                 id: this.generateId(),
//                 name: userData.name,
//                 email: userData.email,
//                 phone: userData.phone,
//                 role: userData.role,
//                 password: this.hashPassword(userData.password),
//                 createdAt: new Date().toISOString()
//             };

//             this.users[userData.email] = newUser;
//             this.saveUsers();

//             this.showMessage('Account created successfully! You can now log in.', 'success');

//             // Switch to login form
//             setTimeout(() => {
//                 this.switchToLogin();
//                 // Pre-fill login form
//                 const loginEmail = document.getElementById('loginEmail');
//                 const loginRole = document.getElementById('loginRole');
//                 if (loginEmail) loginEmail.value = userData.email;
//                 if (loginRole) loginRole.value = userData.role;
//             }, 2000);

//         } catch (error) {
//             this.showMessage('Failed to create account. Please try again.', 'error');
//         } finally {
//             this.setButtonLoading('signupForm', false);
//         }
//     }

//     validateSignupData(data) {
//         if (!data.name || data.name.length < 2) {
//             this.showMessage('Name must be at least 2 characters long', 'error');
//             return false;
//         }

//         if (!this.isValidEmail(data.email)) {
//             this.showMessage('Please enter a valid email address', 'error');
//             return false;
//         }

//         if (!data.phone || data.phone.length !== 10) {
//             this.showMessage('Please enter a valid 10-digit phone number', 'error');
//             return false;
//         }

//         if (!data.role) {
//             this.showMessage('Please select a role', 'error');
//             return false;
//         }

//         if (!data.password || data.password.length < 8) {
//             this.showMessage('Password must be at least 8 characters long', 'error');
//             return false;
//         }

//         if (data.password !== data.confirmPassword) {
//             this.showMessage('Passwords do not match', 'error');
//             return false;
//         }

//         return true;
//     }

//     // Utility methods
//     isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     authenticateUser(email, password, role) {
//         const user = this.users[email];
//         if (!user) return null;

//         const hashedPassword = this.hashPassword(password);
//         if (user.password === hashedPassword && user.role === role) {
//             return {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 phone: user.phone,
//                 role: user.role
//             };
//         }
//         return null;
//     }

//     hashPassword(password) {
//         // Simple hash for demo - use bcrypt in production
//         let hash = 0;
//         for (let i = 0; i < password.length; i++) {
//             const char = password.charCodeAt(i);
//             hash = ((hash << 5) - hash) + char;
//             hash = hash & hash;
//         }
//         return Math.abs(hash).toString(36);
//     }

//     generateId() {
//         return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
//     }

//     delay(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms));
//     }

//     // Session management
//     createSession(user) {
//         const sessionData = {
//             ...user,
//             loginTime: new Date().toISOString(),
//             expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
//         };

//         sessionStorage.setItem('sehat_setu_session', JSON.stringify(sessionData));
//     }

//     checkExistingSession() {
//         try {
//             const session = sessionStorage.getItem('sehat_setu_session');
//             if (session) {
//                 const userData = JSON.parse(session);
//                 if (userData.expires > Date.now()) {
//                     // Valid session exists - redirect to dashboard
//                     this.redirectToDashboard(userData.role);
//                 } else {
//                     // Session expired
//                     sessionStorage.removeItem('sehat_setu_session');
//                 }
//             }
//         } catch (error) {
//             console.error('Session check failed:', error);
//             sessionStorage.removeItem('sehat_setu_session');
//         }
//     }

//     // UI methods
//     showMessage(message, type) {
//         this.clearMessages();
        
//         const messageDiv = document.createElement('div');
//         messageDiv.className = `auth-message ${type}`;
//         messageDiv.style.cssText = `
//             padding: 12px 16px;
//             border-radius: 8px;
//             margin-bottom: 20px;
//             font-size: 14px;
//             font-weight: 500;
//             ${type === 'error' 
//                 ? 'background-color: #fee; color: #c53030; border: 1px solid #feb2b2;' 
//                 : 'background-color: #f0fff4; color: #22543d; border: 1px solid #9ae6b4;'
//             }
//         `;
//         messageDiv.textContent = message;

//         const authCard = document.querySelector('.auth-card');
//         if (authCard) {
//             authCard.insertBefore(messageDiv, authCard.firstChild);
            
//             // Auto remove after 5 seconds
//             setTimeout(() => {
//                 if (messageDiv.parentNode) {
//                     messageDiv.remove();
//                 }
//             }, 5000);
//         }
//     }

//     clearMessages() {
//         const messages = document.querySelectorAll('.auth-message');
//         messages.forEach(msg => msg.remove());
//     }

//     setButtonLoading(formId, isLoading) {
//         const form = document.getElementById(formId);
//         if (!form) return;

//         const button = form.querySelector('button[type="submit"]');
//         if (!button) return;

//         if (isLoading) {
//             button.disabled = true;
//             button.innerHTML = '⏳ Processing...';
//         } else {
//             button.disabled = false;
//             button.innerHTML = formId === 'loginForm' ? 'Login' : 'Create Account';
//         }
//     }

//     switchToLogin() {
//         const loginForm = document.getElementById('loginForm');
//         const signupForm = document.getElementById('signupForm');
//         const title = document.getElementById('authTitle');
//         const subtitle = document.querySelector('.auth-subtitle');
//         const switchLink = document.getElementById('switchAuthMode');

//         if (loginForm) loginForm.style.display = 'block';
//         if (signupForm) signupForm.style.display = 'none';
//         if (title) title.textContent = 'Welcome Back';
//         if (subtitle) subtitle.textContent = 'Please sign in to your account';
//         if (switchLink) {
//             switchLink.innerHTML = 'Don\'t have an account? <a href="#" onclick="authSystem.switchToSignup()">Sign up</a>';
//         }
//     }

//     switchToSignup() {
//         const loginForm = document.getElementById('loginForm');
//         const signupForm = document.getElementById('signupForm');
//         const title = document.getElementById('authTitle');
//         const subtitle = document.querySelector('.auth-subtitle');
//         const switchLink = document.getElementById('switchAuthMode');

//         if (loginForm) loginForm.style.display = 'none';
//         if (signupForm) signupForm.style.display = 'block';
//         if (title) title.textContent = 'Create Account';
//         if (subtitle) subtitle.textContent = 'Join Sehat Setu today';
//         if (switchLink) {
//             switchLink.innerHTML = 'Already have an account? <a href="#" onclick="authSystem.switchToLogin()">Sign in</a>';
//         }
//     }

//     redirectToDashboard(role) {
//         const dashboards = {
//             'patient': 'patient-dashboard.html',
//             'doctor': 'doctor-dashboard.html'
//         };

//         const url = dashboards[role];
//         if (url) {
//             window.location.href = url;
//         } else {
//             this.showMessage('Invalid user role', 'error');
//         }
//     }

//     // Public methods
//     logout() {
//         sessionStorage.removeItem('sehat_setu_session');
//         window.location.href = 'index.html';
//     }
// }

// // Initialize the system
// const authSystem = new SehatSetuAuth();

// // Global functions for HTML onclick handlers
// function showSignupForm() {
//     authSystem.switchToSignup();
// }

// function showLoginForm() {
//     authSystem.switchToLogin();
// }










// // Professional JavaScript code for login/signup functionality

// class SehatSetuAuth {
//     constructor() {
//         this.users = this.loadUsers();
//         this.init();
//     }

//     init() {
//         // Wait for DOM to be fully loaded
//         if (document.readyState === 'loading') {
//             document.addEventListener('DOMContentLoaded', () => this.setupSystem());
//         } else {
//             this.setupSystem();
//         }
//     }

//     setupSystem() {
//         this.setupEventListeners();
//         this.checkExistingSession();
//     }

//     setupEventListeners() {
//         // Login form
//         const loginForm = document.getElementById('loginForm');
//         if (loginForm) {
//             loginForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 this.handleLogin(e);
//             });
//         }

//         // Signup form
//         const signupForm = document.getElementById('signupForm');
//         if (signupForm) {
//             signupForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 this.handleSignup(e);
//             });
//         }

//         // Real-time validation
//         this.setupValidationListeners();
//     }

//     setupValidationListeners() {
//         // Email validation
//         const loginEmail = document.getElementById('loginEmail');
//         const signupEmail = document.getElementById('signupEmail');
        
//         if (loginEmail) {
//             loginEmail.addEventListener('blur', () => this.validateEmailField(loginEmail));
//         }
        
//         if (signupEmail) {
//             signupEmail.addEventListener('blur', () => this.validateEmailField(signupEmail));
//         }

//         // Password strength for signup
//         const signupPassword = document.getElementById('signupPassword');
//         if (signupPassword) {
//             signupPassword.addEventListener('input', () => this.checkPasswordStrength());
//         }

//         // Password match validation
//         const confirmPassword = document.getElementById('confirmPassword');
//         if (confirmPassword) {
//             confirmPassword.addEventListener('input', () => this.checkPasswordMatch());
//         }
//     }

//     // User data management
//     loadUsers() {
//         try {
//             const stored = localStorage.getItem('sehat_setu_users');
//             const users = stored ? JSON.parse(stored) : {};
            
//             // Add default demo users for testing
//             if (!users['patient@demo.com']) {
//                 users['patient@demo.com'] = {
//                     id: 'P001',
//                     name: 'Demo Patient',
//                     email: 'patient@demo.com',
//                     phone: '9876543210',
//                     role: 'patient',
//                     password: this.hashPassword('demo123'),
//                     createdAt: new Date().toISOString()
//                 };
//             }
            
//             if (!users['doctor@demo.com']) {
//                 users['doctor@demo.com'] = {
//                     id: 'D001',
//                     name: 'Dr. Demo',
//                     email: 'doctor@demo.com',
//                     phone: '9876543211',
//                     role: 'doctor',
//                     password: this.hashPassword('demo123'),
//                     createdAt: new Date().toISOString()
//                 };
//             }
            
//             return users;
//         } catch (error) {
//             console.error('Error loading users:', error);
//             return {};
//         }
//     }

//     saveUsers() {
//         try {
//             localStorage.setItem('sehat_setu_users', JSON.stringify(this.users));
//         } catch (error) {
//             console.error('Error saving users:', error);
//             this.showMessage('Unable to save user data', 'error');
//         }
//     }

//     // Validation methods
//     validateEmailField(emailField) {
//         if (!emailField || !emailField.value) return false;
        
//         const email = emailField.value.trim();
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         const isValid = emailRegex.test(email);
        
//         this.toggleFieldError(emailField, isValid ? null : 'Please enter a valid email address');
//         return isValid;
//     }

//     checkPasswordStrength() {
//         const passwordField = document.getElementById('signupPassword');
//         if (!passwordField) return;

//         const password = passwordField.value;
//         const strength = this.calculatePasswordStrength(password);
        
//         // Remove existing strength indicator
//         const existingIndicator = document.querySelector('.password-strength-indicator');
//         if (existingIndicator) {
//             existingIndicator.remove();
//         }

//         if (password.length > 0) {
//             const indicator = document.createElement('div');
//             indicator.className = 'password-strength-indicator';
//             indicator.innerHTML = `<small style="color: ${strength.color}">Password Strength: ${strength.text}</small>`;
//             passwordField.parentNode.appendChild(indicator);
//         }
//     }

//     calculatePasswordStrength(password) {
//         let score = 0;
        
//         if (password.length >= 8) score++;
//         if (/[a-z]/.test(password)) score++;
//         if (/[A-Z]/.test(password)) score++;
//         if (/[0-9]/.test(password)) score++;
//         if (/[^A-Za-z0-9]/.test(password)) score++;

//         const levels = [
//             { text: 'Very Weak', color: '#e74c3c' },
//             { text: 'Weak', color: '#e67e22' },
//             { text: 'Fair', color: '#f39c12' },
//             { text: 'Good', color: '#27ae60' },
//             { text: 'Strong', color: '#2ecc71' }
//         ];

//         return levels[Math.min(score, 4)];
//     }

//     checkPasswordMatch() {
//         const password = document.getElementById('signupPassword');
//         const confirmPassword = document.getElementById('confirmPassword');
        
//         if (!password || !confirmPassword) return false;

//         const isMatch = password.value === confirmPassword.value;
//         this.toggleFieldError(confirmPassword, isMatch ? null : 'Passwords do not match');
//         return isMatch;
//     }

//     toggleFieldError(field, errorMessage) {
//         if (!field) return;

//         // Remove existing error
//         const existingError = field.parentNode.querySelector('.field-error');
//         if (existingError) {
//             existingError.remove();
//         }

//         // Remove error styling
//         field.style.borderColor = '';

//         if (errorMessage) {
//             // Add error message
//             const errorDiv = document.createElement('div');
//             errorDiv.className = 'field-error';
//             errorDiv.innerHTML = `<small style="color: #e74c3c; display: block; margin-top: 5px;">${errorMessage}</small>`;
//             field.parentNode.appendChild(errorDiv);
            
//             // Add error styling
//             field.style.borderColor = '#e74c3c';
//         }
//     }

//     // Authentication handlers
//     async handleLogin(e) {
//         const formData = new FormData(e.target);
//         const email = formData.get('email').trim().toLowerCase();
//         const password = formData.get('password');
//         const role = formData.get('role');

//         // Clear any existing messages
//         this.clearMessages();

//         // Basic validation
//         if (!email || !password || !role) {
//             this.showMessage('Please fill in all fields', 'error');
//             return;
//         }

//         if (!this.isValidEmail(email)) {
//             this.showMessage('Please enter a valid email address', 'error');
//             return;
//         }

//         // Show loading
//         this.setButtonLoading('loginForm', true);

//         try {
//             // Simulate network delay
//             await this.delay(1000);

//             // Check user credentials
//             const user = this.authenticateUser(email, password, role);
            
//             if (user) {
//                 this.createSession(user);
//                 this.showMessage('Login successful! Redirecting...', 'success');
                
//                 // Redirect after success message
//                 setTimeout(() => {
//                     this.redirectToDashboard(user.role);
//                 }, 1500);
//             } else {
//                 this.showMessage('Invalid email, password, or role. Please try again.', 'error');
//             }

//         } catch (error) {
//             this.showMessage('Login failed. Please try again.', 'error');
//         } finally {
//             this.setButtonLoading('loginForm', false);
//         }
//     }

//     async handleSignup(e) {
//         const formData = new FormData(e.target);
//         const userData = {
//             name: formData.get('name').trim(),
//             email: formData.get('email').trim().toLowerCase(),
//             phone: formData.get('phone').replace(/\D/g, ''),
//             role: formData.get('role'),
//             password: formData.get('password'),
//             confirmPassword: formData.get('confirmPassword')
//         };

//         // Clear any existing messages
//         this.clearMessages();

//         // Validation
//         if (!this.validateSignupData(userData)) {
//             return;
//         }

//         // Check if user exists
//         if (this.users[userData.email]) {
//             this.showMessage('An account with this email already exists', 'error');
//             return;
//         }

//         // Show loading
//         this.setButtonLoading('signupForm', true);

//         try {
//             // Simulate network delay
//             await this.delay(1500);

//             // Create user
//             const newUser = {
//                 id: this.generateId(),
//                 name: userData.name,
//                 email: userData.email,
//                 phone: userData.phone,
//                 role: userData.role,
//                 password: this.hashPassword(userData.password),
//                 createdAt: new Date().toISOString()
//             };

//             this.users[userData.email] = newUser;
//             this.saveUsers();

//             this.showMessage('Account created successfully! You can now log in.', 'success');

//             // Switch to login form
//             setTimeout(() => {
//                 this.switchToLogin();
//                 // Pre-fill login form
//                 const loginEmail = document.getElementById('loginEmail');
//                 const loginRole = document.getElementById('loginRole');
//                 if (loginEmail) loginEmail.value = userData.email;
//                 if (loginRole) loginRole.value = userData.role;
//             }, 2000);

//         } catch (error) {
//             this.showMessage('Failed to create account. Please try again.', 'error');
//         } finally {
//             this.setButtonLoading('signupForm', false);
//         }
//     }

//     validateSignupData(data) {
//         if (!data.name || data.name.length < 2) {
//             this.showMessage('Name must be at least 2 characters long', 'error');
//             return false;
//         }

//         if (!this.isValidEmail(data.email)) {
//             this.showMessage('Please enter a valid email address', 'error');
//             return false;
//         }

//         if (!data.phone || data.phone.length !== 10) {
//             this.showMessage('Please enter a valid 10-digit phone number', 'error');
//             return false;
//         }

//         if (!data.role) {
//             this.showMessage('Please select a role', 'error');
//             return false;
//         }

//         if (!data.password || data.password.length < 6) {
//             this.showMessage('Password must be at least 6 characters long', 'error');
//             return false;
//         }

//         if (data.password !== data.confirmPassword) {
//             this.showMessage('Passwords do not match', 'error');
//             return false;
//         }

//         return true;
//     }

//     // Utility methods
//     isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     authenticateUser(email, password, role) {
//         const user = this.users[email];
//         if (!user) return null;

//         const hashedPassword = this.hashPassword(password);
//         if (user.password === hashedPassword && user.role === role) {
//             return {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 phone: user.phone,
//                 role: user.role
//             };
//         }
//         return null;
//     }

//     hashPassword(password) {
//         // Simple hash for demo - use bcrypt in production
//         let hash = 0;
//         for (let i = 0; i < password.length; i++) {
//             const char = password.charCodeAt(i);
//             hash = ((hash << 5) - hash) + char;
//             hash = hash & hash;
//         }
//         return Math.abs(hash).toString(36);
//     }

//     generateId() {
//         return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
//     }

//     delay(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms));
//     }

//     // Session management - Using localStorage to match dashboard expectations
//     createSession(user) {
//         // Store authentication data in localStorage to match the first code's approach
//         const token = 'demo-token-' + Date.now();
//         localStorage.setItem('userToken', token);
//         localStorage.setItem('userRole', user.role);
//         localStorage.setItem('userId', user.id);
//         localStorage.setItem('userName', user.name);
//         localStorage.setItem('userEmail', user.email);
//         localStorage.setItem('userPhone', user.phone);
//         localStorage.setItem('loginTimestamp', Date.now().toString());
//     }

//     checkExistingSession() {
//         // Check for existing authentication using localStorage
//         const userToken = localStorage.getItem('userToken');
//         const userRole = localStorage.getItem('userRole');
        
//         if (userToken && userRole) {
//             // Valid session exists - redirect to dashboard
//             if (userRole === 'patient') {
//                 window.location.href = 'patient-dashboard.html';
//             } else if (userRole === 'doctor') {
//                 window.location.href = 'doctor-dashboard.html';
//             }
//             return true;
//         }
//         return false;
//     }

//     // UI methods
//     showMessage(message, type) {
//         this.clearMessages();
        
//         const messageDiv = document.createElement('div');
//         messageDiv.className = `auth-message ${type}`;
//         messageDiv.style.cssText = `
//             padding: 12px 16px;
//             border-radius: 8px;
//             margin-bottom: 20px;
//             font-size: 14px;
//             font-weight: 500;
//             ${type === 'error' 
//                 ? 'background-color: #fee; color: #c53030; border: 1px solid #feb2b2;' 
//                 : 'background-color: #f0fff4; color: #22543d; border: 1px solid #9ae6b4;'
//             }
//         `;
//         messageDiv.textContent = message;

//         const authCard = document.querySelector('.auth-card');
//         if (authCard) {
//             authCard.insertBefore(messageDiv, authCard.firstChild);
            
//             // Auto remove after 5 seconds
//             setTimeout(() => {
//                 if (messageDiv.parentNode) {
//                     messageDiv.remove();
//                 }
//             }, 5000);
//         }
//     }

//     clearMessages() {
//         const messages = document.querySelectorAll('.auth-message');
//         messages.forEach(msg => msg.remove());
//     }

//     setButtonLoading(formId, isLoading) {
//         const form = document.getElementById(formId);
//         if (!form) return;

//         const button = form.querySelector('button[type="submit"]');
//         if (!button) return;

//         if (isLoading) {
//             button.disabled = true;
//             button.innerHTML = 'Processing...';
//         } else {
//             button.disabled = false;
//             button.innerHTML = formId === 'loginForm' ? 'Login' : 'Create Account';
//         }
//     }

//     switchToLogin() {
//         const loginForm = document.getElementById('loginForm');
//         const signupForm = document.getElementById('signupForm');
//         const title = document.getElementById('authTitle');
//         const subtitle = document.querySelector('.auth-subtitle');
//         const switchLink = document.getElementById('switchAuthMode');

//         if (loginForm) loginForm.style.display = 'block';
//         if (signupForm) signupForm.style.display = 'none';
//         if (title) title.textContent = 'Welcome Back';
//         if (subtitle) subtitle.textContent = 'Please sign in to your account';
//         if (switchLink) {
//             switchLink.innerHTML = 'Don\'t have an account? <a href="#" onclick="authSystem.switchToSignup()">Sign up</a>';
//         }
//     }

//     switchToSignup() {
//         const loginForm = document.getElementById('loginForm');
//         const signupForm = document.getElementById('signupForm');
//         const title = document.getElementById('authTitle');
//         const subtitle = document.querySelector('.auth-subtitle');
//         const switchLink = document.getElementById('switchAuthMode');

//         if (loginForm) loginForm.style.display = 'none';
//         if (signupForm) signupForm.style.display = 'block';
//         if (title) title.textContent = 'Create Account';
//         if (subtitle) subtitle.textContent = 'Join Sehat Setu today';
//         if (switchLink) {
//             switchLink.innerHTML = 'Already have an account? <a href="#" onclick="authSystem.switchToLogin()">Sign in</a>';
//         }
//     }

//     redirectToDashboard(role) {
//         if (role === 'patient') {
//             window.location.href = 'patient-dashboard.html';
//         } else if (role === 'doctor') {
//             window.location.href = 'doctor-dashboard.html';
//         } else {
//             this.showMessage('Invalid user role', 'error');
//         }
//     }

//     // Public methods
//     logout() {
//         // Clear all authentication data from localStorage
//         localStorage.removeItem('userToken');
//         localStorage.removeItem('userRole');
//         localStorage.removeItem('userId');
//         localStorage.removeItem('userName');
//         localStorage.removeItem('userEmail');
//         localStorage.removeItem('userPhone');
//         localStorage.removeItem('loginTimestamp');
//         window.location.href = 'index.html';
//     }
// }

// // Initialize the system
// const authSystem = new SehatSetuAuth();

// // Global functions for HTML onclick handlers
// function showSignupForm() {
//     authSystem.switchToSignup();
// }

// function showLoginForm() {
//     authSystem.switchToLogin();
// }












// Professional JavaScript code for login/signup functionality

class SehatSetuAuth {
    constructor() {
        this.users = this.loadUsers();
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupSystem());
        } else {
            this.setupSystem();
        }
    }

    setupSystem() {
        this.setupEventListeners();
        this.checkExistingSession();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e);
            });
        }

        // Signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignup(e);
            });
        }

        // Real-time validation
        this.setupValidationListeners();
    }

    setupValidationListeners() {
        // Email validation
        const loginEmail = document.getElementById('loginEmail');
        const signupEmail = document.getElementById('signupEmail');
        
        if (loginEmail) {
            loginEmail.addEventListener('blur', () => this.validateEmailField(loginEmail));
        }
        
        if (signupEmail) {
            signupEmail.addEventListener('blur', () => this.validateEmailField(signupEmail));
        }

        // Password strength for signup
        const signupPassword = document.getElementById('signupPassword');
        if (signupPassword) {
            signupPassword.addEventListener('input', () => this.checkPasswordStrength());
        }

        // Password match validation
        const confirmPassword = document.getElementById('confirmPassword');
        if (confirmPassword) {
            confirmPassword.addEventListener('input', () => this.checkPasswordMatch());
        }
    }

    // User data management
    loadUsers() {
        try {
            const stored = localStorage.getItem('sehat_setu_users');
            const users = stored ? JSON.parse(stored) : {};
            
            // Add default demo users for testing
            if (!users['patient@demo.com']) {
                users['patient@demo.com'] = {
                    id: 'P001',
                    name: 'Demo Patient',
                    email: 'patient@demo.com',
                    phone: '9876543210',
                    role: 'patient',
                    password: this.hashPassword('demo123'),
                    createdAt: new Date().toISOString()
                };
            }
            
            if (!users['doctor@demo.com']) {
                users['doctor@demo.com'] = {
                    id: 'D001',
                    name: 'Dr. Demo',
                    email: 'doctor@demo.com',
                    phone: '9876543211',
                    role: 'doctor',
                    password: this.hashPassword('demo123'),
                    createdAt: new Date().toISOString()
                };
            }
            
            return users;
        } catch (error) {
            console.error('Error loading users:', error);
            return {};
        }
    }

    saveUsers() {
        try {
            localStorage.setItem('sehat_setu_users', JSON.stringify(this.users));
        } catch (error) {
            console.error('Error saving users:', error);
            this.showMessage('Unable to save user data', 'error');
        }
    }

    // Validation methods
    validateEmailField(emailField) {
        if (!emailField || !emailField.value) return false;
        
        const email = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        
        this.toggleFieldError(emailField, isValid ? null : 'Please enter a valid email address');
        return isValid;
    }

    checkPasswordStrength() {
        const passwordField = document.getElementById('signupPassword');
        if (!passwordField) return;

        const password = passwordField.value;
        const strength = this.calculatePasswordStrength(password);
        
        // Remove existing strength indicator
        const existingIndicator = document.querySelector('.password-strength-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }

        if (password.length > 0) {
            const indicator = document.createElement('div');
            indicator.className = 'password-strength-indicator';
            indicator.innerHTML = `<small style="color: ${strength.color}">Password Strength: ${strength.text}</small>`;
            passwordField.parentNode.appendChild(indicator);
        }
    }

    calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        const levels = [
            { text: 'Very Weak', color: '#e74c3c' },
            { text: 'Weak', color: '#e67e22' },
            { text: 'Fair', color: '#f39c12' },
            { text: 'Good', color: '#27ae60' },
            { text: 'Strong', color: '#2ecc71' }
        ];

        return levels[Math.min(score, 4)];
    }

    checkPasswordMatch() {
        const password = document.getElementById('signupPassword');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (!password || !confirmPassword) return false;

        const isMatch = password.value === confirmPassword.value;
        this.toggleFieldError(confirmPassword, isMatch ? null : 'Passwords do not match');
        return isMatch;
    }

    toggleFieldError(field, errorMessage) {
        if (!field) return;

        // Remove existing error
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Remove error styling
        field.style.borderColor = '';

        if (errorMessage) {
            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.innerHTML = `<small style="color: #e74c3c; display: block; margin-top: 5px;">${errorMessage}</small>`;
            field.parentNode.appendChild(errorDiv);
            
            // Add error styling
            field.style.borderColor = '#e74c3c';
        }
    }

    // Authentication handlers
    async handleLogin(e) {
        const formData = new FormData(e.target);
        const email = formData.get('email').trim().toLowerCase();
        const password = formData.get('password');
        const role = formData.get('role');

        // Clear any existing messages
        this.clearMessages();

        // Basic validation
        if (!email || !password || !role) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Show loading
        this.setButtonLoading('loginForm', true);

        try {
            // Simulate network delay
            await this.delay(1000);

            // Check user credentials
            const user = this.authenticateUser(email, password, role);
            
            if (user) {
                this.createSession(user);
                this.showMessage('Login successful! Redirecting...', 'success');
                
                // Redirect after success message
                setTimeout(() => {
                    this.redirectToDashboard(user.role);
                }, 1500);
            } else {
                this.showMessage('Invalid email, password, or role. Please try again.', 'error');
            }

        } catch (error) {
            this.showMessage('Login failed. Please try again.', 'error');
        } finally {
            this.setButtonLoading('loginForm', false);
        }
    }

    async handleSignup(e) {
        const formData = new FormData(e.target);
        const userData = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim().toLowerCase(),
            phone: formData.get('phone').replace(/\D/g, ''),
            role: formData.get('role'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        // Clear any existing messages
        this.clearMessages();

        // Validation
        if (!this.validateSignupData(userData)) {
            return;
        }

        // Check if user exists
        if (this.users[userData.email]) {
            this.showMessage('An account with this email already exists', 'error');
            return;
        }

        // Show loading
        this.setButtonLoading('signupForm', true);

        try {
            // Simulate network delay
            await this.delay(1500);

            // Create user
            const newUser = {
                id: this.generateId(),
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                role: userData.role,
                password: this.hashPassword(userData.password),
                createdAt: new Date().toISOString()
            };

            this.users[userData.email] = newUser;
            this.saveUsers();

            this.showMessage('Account created successfully! You can now log in.', 'success');

            // Switch to login form
            setTimeout(() => {
                this.switchToLogin();
                // Pre-fill login form
                const loginEmail = document.getElementById('loginEmail');
                const loginRole = document.getElementById('loginRole');
                if (loginEmail) loginEmail.value = userData.email;
                if (loginRole) loginRole.value = userData.role;
            }, 2000);

        } catch (error) {
            this.showMessage('Failed to create account. Please try again.', 'error');
        } finally {
            this.setButtonLoading('signupForm', false);
        }
    }

    validateSignupData(data) {
        if (!data.name || data.name.length < 2) {
            this.showMessage('Name must be at least 2 characters long', 'error');
            return false;
        }

        if (!this.isValidEmail(data.email)) {
            this.showMessage('Please enter a valid email address', 'error');
            return false;
        }

        if (!data.phone || data.phone.length !== 10) {
            this.showMessage('Please enter a valid 10-digit phone number', 'error');
            return false;
        }

        if (!data.role) {
            this.showMessage('Please select a role', 'error');
            return false;
        }

        if (!data.password || data.password.length < 6) {
            this.showMessage('Password must be at least 6 characters long', 'error');
            return false;
        }

        if (data.password !== data.confirmPassword) {
            this.showMessage('Passwords do not match', 'error');
            return false;
        }

        return true;
    }

    // Utility methods
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    authenticateUser(email, password, role) {
        const user = this.users[email];
        if (!user) return null;

        const hashedPassword = this.hashPassword(password);
        if (user.password === hashedPassword && user.role === role) {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            };
        }
        return null;
    }

    hashPassword(password) {
        // Simple hash for demo - use bcrypt in production
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(36);
    }

    generateId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Session management - Using localStorage to match dashboard expectations
    createSession(user) {
        // Store authentication data in localStorage to match the first code's approach
        const token = 'demo-token-' + Date.now();
        localStorage.setItem('userToken', token);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userPhone', user.phone);
        localStorage.setItem('loginTimestamp', Date.now().toString());
    }

    checkExistingSession() {
        // Check for existing authentication using localStorage
        const userToken = localStorage.getItem('userToken');
        const userRole = localStorage.getItem('userRole');
        
        if (userToken && userRole) {
            // Valid session exists - redirect to dashboard
            if (userRole === 'patient') {
                window.location.href = 'patient-dashboard.html';
            } else if (userRole === 'doctor') {
                window.location.href = 'doctor-dashboard.html';
            }
            return true;
        }
        return false;
    }

    // UI methods
    showMessage(message, type) {
        this.clearMessages();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `auth-message ${type}`;
        messageDiv.style.cssText = `
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            font-weight: 500;
            ${type === 'error' 
                ? 'background-color: #fee; color: #c53030; border: 1px solid #feb2b2;' 
                : 'background-color: #f0fff4; color: #22543d; border: 1px solid #9ae6b4;'
            }
        `;
        messageDiv.textContent = message;

        const authCard = document.querySelector('.auth-card');
        if (authCard) {
            authCard.insertBefore(messageDiv, authCard.firstChild);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }

    clearMessages() {
        const messages = document.querySelectorAll('.auth-message');
        messages.forEach(msg => msg.remove());
    }

    setButtonLoading(formId, isLoading) {
        const form = document.getElementById(formId);
        if (!form) return;

        const button = form.querySelector('button[type="submit"]');
        if (!button) return;

        if (isLoading) {
            button.disabled = true;
            button.innerHTML = 'Processing...';
        } else {
            button.disabled = false;
            button.innerHTML = formId === 'loginForm' ? 'Login' : 'Create Account';
        }
    }

    switchToLogin() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const title = document.getElementById('authTitle');
        const subtitle = document.querySelector('.auth-subtitle');
        const switchLink = document.getElementById('switchAuthMode');

        if (loginForm) loginForm.style.display = 'block';
        if (signupForm) signupForm.style.display = 'none';
        if (title) title.textContent = 'Welcome Back';
        if (subtitle) subtitle.textContent = 'Please sign in to your account';
        if (switchLink) {
            switchLink.innerHTML = 'Don\'t have an account? <a href="#" onclick="authSystem.switchToSignup()">Sign up</a>';
        }
    }

    switchToSignup() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const title = document.getElementById('authTitle');
        const subtitle = document.querySelector('.auth-subtitle');
        const switchLink = document.getElementById('switchAuthMode');

        if (loginForm) loginForm.style.display = 'none';
        if (signupForm) signupForm.style.display = 'block';
        if (title) title.textContent = 'Create Account';
        if (subtitle) subtitle.textContent = 'Join Sehat Setu today';
        if (switchLink) {
            switchLink.innerHTML = 'Already have an account? <a href="#" onclick="authSystem.switchToLogin()">Sign in</a>';
        }
    }

    redirectToDashboard(role) {
        if (role === 'patient') {
            window.location.href = 'patient-dashboard.html';
        } else if (role === 'doctor') {
            window.location.href = 'doctor-dashboard.html';
        } else {
            this.showMessage('Invalid user role', 'error');
        }
    }

    // Public methods
    logout() {
        // Clear all authentication data from localStorage
        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('loginTimestamp');
        localStorage.removeItem('sehat_setu_session');
        window.location.href = 'index.html';
    }
}

// Initialize the system
const authSystem = new SehatSetuAuth();

// Global functions for HTML onclick handlers
function showSignupForm() {
    authSystem.switchToSignup();
}

function showLoginForm() {
    authSystem.switchToLogin();
}

// Global session validation function for dashboards to use
function checkAuthStatus() {
    return authSystem.validateSession();
}

// Global logout function
function logoutUser() {
    authSystem.logout();
}