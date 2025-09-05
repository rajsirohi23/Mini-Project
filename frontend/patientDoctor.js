// Patient and Doctor Dashboard JavaScript for Sehat Setu
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!checkAuthStatus()) {
        window.location.href = 'auth.html';
        return;
    }
    
    // Get user data
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    
    // Initialize dashboard based on user role
    if (userRole === 'patient') {
        initializePatientDashboard();
    } else if (userRole === 'doctor') {
        initializeDoctorDashboard();
    } else {
        // Invalid role, redirect to auth
        logout();
        return;
    }
    
    // Common logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                logout();
            }
        });
    }
    
    // Profile update functionality
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateProfile();
        });
    }
    
    // Handle hash navigation
    handleHashNavigation();
    
    // Auto-save drafts
    setupAutoSave();
    
    // Initialize real-time features
    initializeRealTimeFeatures();
});

// Patient Dashboard Functions
function initializePatientDashboard() {
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    
    // Update welcome message
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${userName}!`;
    }
    
    // Update patient ID
    const patientId = document.getElementById('patientId');
    if (patientId) {
        patientId.textContent = userId;
    }
    
    // Initialize chatbot
    initializeChatbot();
    
    // Load patient data
    loadPatientData();
    
    // Initialize file upload
    initializeFileUpload();
    
    // Health metrics chart
    initializeHealthChart();
    
    // Load medical history
    loadMedicalHistory();
    
    // Initialize appointment reminders
    initializeAppointmentReminders();
}

// Doctor Dashboard Functions
function initializeDoctorDashboard() {
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    
    // Update welcome message
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome, ${userName}`;
    }
    
    // Update doctor ID
    const doctorId = document.getElementById('doctorId');
    if (doctorId) {
        doctorId.textContent = userId;
    }
    
    // Load patients list
    loadPatientsList();
    
    // Initialize patient search
    initializePatientSearch();
    
    // Load today's appointments
    loadTodaysAppointments();
    
    // Initialize analytics
    initializeAnalytics();
}

// Chatbot functionality for patient dashboard
function initializeChatbot() {
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatForm || !chatInput || !chatMessages) return;
    
    // Clear placeholder messages and enable chat
    chatMessages.innerHTML = `
        <div class="bot-message">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>Hello ${localStorage.getItem('userName')}! I'm your AI health assistant. How can I help you today?</p>
                <div class="quick-suggestions">
                    <button class="suggestion-btn" onclick="sendQuickMessage('I have a fever')">🌡️ Fever</button>
                    <button class="suggestion-btn" onclick="sendQuickMessage('I have a headache')">🤕 Headache</button>
                    <button class="suggestion-btn" onclick="sendQuickMessage('I have stomach pain')">🤢 Stomach Pain</button>
                </div>
            </div>
        </div>
    `;
    
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            sendChatMessage(message);
            chatInput.value = '';
        }
    });
    
    // Enable real-time typing indicator
    let typingTimer;
    chatInput.addEventListener('input', function() {
        clearTimeout(typingTimer);
        showTypingIndicator();
        
        typingTimer = setTimeout(() => {
            hideTypingIndicator();
        }, 1000);
    });
}

function sendQuickMessage(message) {
    sendChatMessage(message);
}

function sendChatMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
            <div class="message-time">${new Date().toLocaleTimeString()}</div>
        </div>
        <div class="message-avatar">👤</div>
    `;
    chatMessages.appendChild(userMessage);
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'bot-message typing-indicator';
    typingIndicator.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingIndicator);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate bot response
    setTimeout(() => {
        if (chatMessages.contains(typingIndicator)) {
            chatMessages.removeChild(typingIndicator);
        }
        
        const botResponse = generateBotResponse(message);
        const botMessage = document.createElement('div');
        botMessage.className = 'bot-message';
        botMessage.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>${botResponse.text}</p>
                ${botResponse.suggestions ? `
                    <div class="response-suggestions">
                        ${botResponse.suggestions.map(suggestion => 
                            `<button class="suggestion-btn" onclick="sendQuickMessage('${suggestion}')">${suggestion}</button>`
                        ).join('')}
                    </div>
                ` : ''}
                <div class="message-time">${new Date().toLocaleTimeString()}</div>
            </div>
        `;
        chatMessages.appendChild(botMessage);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Save chat history
        saveChatHistory(message, botResponse.text);
    }, Math.random() * 1000 + 1500);
}

function generateBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Enhanced keyword-based responses with follow-up suggestions
    if (lowerMessage.includes('fever')) {
        return {
            text: "For fever management: Rest, stay hydrated with fluids, and consider acetaminophen or ibuprofen for comfort. If temperature exceeds 102°F (38.9°C) or persists beyond 3 days, please consult a healthcare provider immediately.",
            suggestions: ["How to check temperature", "When to see a doctor", "Home remedies for fever"]
        };
    } else if (lowerMessage.includes('headache')) {
        return {
            text: "For headache relief: Try resting in a quiet, dark room, apply a cold or warm compress, stay hydrated, and consider over-the-counter pain relievers. If headaches are severe, frequent, or accompanied by other symptoms, consult a doctor.",
            suggestions: ["Types of headaches", "Prevention tips", "When to worry about headaches"]
        };
    } else if (lowerMessage.includes('cough')) {
        return {
            text: "For cough management: Stay hydrated, use honey or throat lozenges, try steam inhalation. If cough persists over a week, produces blood, or is accompanied by fever/difficulty breathing, seek medical attention.",
            suggestions: ["Dry vs wet cough", "Home remedies", "Warning signs"]
        };
    } else if (lowerMessage.includes('stomach') || lowerMessage.includes('nausea') || lowerMessage.includes('pain')) {
        return {
            text: "For stomach discomfort: Try the BRAT diet (bananas, rice, applesauce, toast), stay hydrated with clear fluids, rest, and avoid dairy/fatty foods. If severe pain, vomiting persists, or you have signs of dehydration, consult a healthcare provider.",
            suggestions: ["BRAT diet details", "Signs of dehydration", "When to seek help"]
        };
    } else if (lowerMessage.includes('cold') || lowerMessage.includes('flu')) {
        return {
            text: "For cold/flu symptoms: Get plenty of rest, drink warm fluids, use a humidifier, and consider over-the-counter medications for symptom relief. Monitor for worsening symptoms and seek medical care if breathing becomes difficult.",
            suggestions: ["Cold vs flu differences", "Recovery timeline", "Prevention tips"]
        };
    } else if (lowerMessage.includes('allergies') || lowerMessage.includes('allergy')) {
        return {
            text: "For allergy management: Identify and avoid triggers when possible, consider antihistamines, keep indoor air clean, and maintain a symptom diary. For severe allergic reactions, seek immediate medical attention.",
            suggestions: ["Common allergens", "Allergy testing", "Emergency signs"]
        };
    } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
        return {
            text: "For better sleep: Maintain a regular sleep schedule, create a comfortable sleep environment, avoid caffeine late in the day, and establish a relaxing bedtime routine. If sleep problems persist, consult a healthcare provider.",
            suggestions: ["Sleep hygiene tips", "Natural sleep aids", "Sleep disorders"]
        };
    } else {
        return {
            text: "I understand your concern. For personalized medical advice, I recommend consulting with a healthcare provider. In the meantime, maintain good hygiene, stay hydrated, get adequate rest, and monitor your symptoms closely.",
            suggestions: ["Find a doctor", "Emergency contacts", "General health tips"]
        };
    }
}

function showTypingIndicator() {
    // Implementation for typing indicator
    const indicator = document.querySelector('.typing-indicator');
    if (indicator) {
        indicator.style.display = 'flex';
    }
}

function hideTypingIndicator() {
    // Implementation for hiding typing indicator
    const indicator = document.querySelector('.typing-indicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
}

function saveChatHistory(userMessage, botResponse) {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    chatHistory.push({
        timestamp: new Date().toISOString(),
        userMessage,
        botResponse,
        userId: localStorage.getItem('userId')
    });
    
    // Keep only last 100 messages
    if (chatHistory.length > 100) {
        chatHistory.splice(0, chatHistory.length - 100);
    }
    
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// File upload functionality
function initializeFileUpload() {
    const fileUpload = document.getElementById('fileUpload');
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (fileUpload && uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            fileUpload.click();
        });
        
        fileUpload.addEventListener('change', function(e) {
            const files = e.target.files;
            if (files.length > 0) {
                uploadFiles(files);
            }
        });
    }
    
    // Drag and drop functionality
    const uploadBox = document.querySelector('.upload-box');
    if (uploadBox) {
        uploadBox.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        
        uploadBox.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
        });
        
        uploadBox.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                uploadFiles(files);
            }
        });
    }
}

function uploadFiles(files) {
    const fileList = document.getElementById('fileList');
    if (!fileList) return;
    
    Array.from(files).forEach(file => {
        // Validate file type and size
        if (!validateFile(file)) return;
        
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <span class="file-name">${file.name}</span>
                <span class="file-size">${formatFileSize(file.size)}</span>
                <span class="file-date">Uploaded: ${new Date().toLocaleDateString()}</span>
            </div>
            <div class="file-status">
                <div class="upload-progress">
                    <div class="progress-bar" style="width: 0%"></div>
                </div>
                <span class="status-text">Uploading...</span>
            </div>
        `;
        fileList.appendChild(fileItem);
        
        // Simulate upload progress
        simulateUpload(fileItem, file);
    });
}

function validateFile(file) {
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
        showNotification(`File type ${fileExtension} is not allowed`, 'error');
        return false;
    }
    
    if (file.size > maxSize) {
        showNotification('File size must be less than 10MB', 'error');
        return false;
    }
    
    return true;
}

function simulateUpload(fileItem, file) {
    const progressBar = fileItem.querySelector('.progress-bar');
    const statusText = fileItem.querySelector('.status-text');
    let progress = 0;
    
    const uploadInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(uploadInterval);
            statusText.textContent = 'Completed';
            fileItem.querySelector('.file-status').innerHTML = `
                <div class="file-actions">
                    <button class="btn btn-small">View</button>
                    <button class="btn btn-small btn-outline">Download</button>
                    <button class="btn btn-small btn-outline" onclick="deleteFile(this)">Delete</button>
                </div>
            `;
            
            // Save file info to localStorage
            saveFileInfo(file);
        }
    }, 200);
}

function deleteFile(button) {
    if (confirm('Are you sure you want to delete this file?')) {
        const fileItem = button.closest('.file-item');
        fileItem.remove();
        showNotification('File deleted successfully', 'success');
    }
}

function saveFileInfo(file) {
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    uploadedFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        userId: localStorage.getItem('userId')
    });
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Load patient data (mock data)
function loadPatientData() {
    const patientName = document.getElementById('patientName');
    const patientAge = document.getElementById('patientAge');
    const patientGender = document.getElementById('patientGender');
    const lastVisit = document.getElementById('lastVisit');
    
    // Get stored data or use defaults
    const userData = {
        name: localStorage.getItem('userName') || 'Patient',
        age: '28 years',
        gender: 'Male',
        lastVisit: '2024-01-15'
    };
    
    if (patientName) patientName.textContent = userData.name;
    if (patientAge) patientAge.textContent = userData.age;
    if (patientGender) patientGender.textContent = userData.gender;
    if (lastVisit) lastVisit.textContent = userData.lastVisit;
}

function loadMedicalHistory() {
    // Load and display medical history from localStorage
    const medicalHistory = JSON.parse(localStorage.getItem('medicalHistory') || '[]');
    
    if (medicalHistory.length === 0) {
        // Add some default history
        const defaultHistory = [
            {
                date: '2024-01-15',
                type: 'General Checkup',
                description: 'Routine health examination. All vitals normal.',
                doctor: 'Dr. Smith'
            },
            {
                date: '2024-01-10',
                type: 'Fever Treatment',
                description: 'Prescribed paracetamol for viral fever. Recovered completely.',
                doctor: 'Dr. Johnson'
            }
        ];
        localStorage.setItem('medicalHistory', JSON.stringify(defaultHistory));
    }
}

// Load patients list for doctor dashboard
function loadPatientsList() {
    const patientsList = document.getElementById('patientsList');
    if (!patientsList) return;
    
    // Mock patients data (in real app, this would come from API)
    const mockPatients = [
        { 
            id: 'P001', 
            name: 'John Doe', 
            age: 28, 
            lastVisit: '2024-01-15', 
            status: 'Active',
            condition: 'Hypertension',
            phone: '+91-9876543210'
        },
        { 
            id: 'P002', 
            name: 'Jane Smith', 
            age: 34, 
            lastVisit: '2024-01-14', 
            status: 'Follow-up',
            condition: 'Diabetes',
            phone: '+91-9876543211'
        },
        { 
            id: 'P003', 
            name: 'Mike Johnson', 
            age: 45, 
            lastVisit: '2024-01-13', 
            status: 'Recovered',
            condition: 'Common Cold',
            phone: '+91-9876543212'
        },
        { 
            id: 'P004', 
            name: 'Sarah Wilson', 
            age: 22, 
            lastVisit: '2024-01-12', 
            status: 'Active',
            condition: 'Allergies',
            phone: '+91-9876543213'
        }
    ];
    
    patientsList.innerHTML = mockPatients.map(patient => `
        <div class="patient-item" onclick="viewPatientDetails('${patient.id}')">
            <div class="patient-info">
                <h4>${patient.name}</h4>
                <p>ID: ${patient.id} | Age: ${patient.age}</p>
                <p>Condition: ${patient.condition}</p>
                <p>Last Visit: ${patient.lastVisit}</p>
                <p>Phone: ${patient.phone}</p>
            </div>
            <div class="patient-status status-${patient.status.toLowerCase().replace('-', '')}">${patient.status}</div>
        </div>
    `).join('');
    
    // Store patients data for search functionality
    window.patientsData = mockPatients;
}

// View patient details
function viewPatientDetails(patientId) {
    const patient = window.patientsData?.find(p => p.id === patientId);
    if (patient) {
        showNotification(`Viewing details for ${patient.name} (${patientId})`, 'info');
        
        // In a real application, this would open a detailed patient view
        // For now, we'll show an alert with patient information
        alert(`Patient Details:\n\nName: ${patient.name}\nID: ${patient.id}\nAge: ${patient.age}\nCondition: ${patient.condition}\nStatus: ${patient.status}\nLast Visit: ${patient.lastVisit}\nPhone: ${patient.phone}`);
    }
}

// Initialize patient search
function initializePatientSearch() {
    const searchInput = document.getElementById('patientSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const patientItems = document.querySelectorAll('.patient-item');
        
        patientItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show no results message if no patients match
        const visiblePatients = Array.from(patientItems).filter(item => 
            item.style.display !== 'none'
        );
        
        let noResultsMsg = document.querySelector('.no-results-message');
        if (visiblePatients.length === 0 && searchTerm) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.innerHTML = '<p>No patients found matching your search.</p>';
                document.getElementById('patientsList').appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    });
}

function loadTodaysAppointments() {
    // Load today's appointments for doctor dashboard
    const scheduleList = document.querySelector('.schedule-list');
    if (!scheduleList) return;
    
    // This would typically fetch from an API
    console.log('Loading today\'s appointments...');
}

function initializeAnalytics() {
    // Initialize analytics charts and data for doctor dashboard
    const analyticsCards = document.querySelectorAll('.analytics-card');
    if (analyticsCards.length === 0) return;
    
    // Animate metrics on load
    analyticsCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

function initializeAppointmentReminders() {
    // Check for upcoming appointments and show reminders
    const now = new Date();
    const reminderTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
    
    // Mock appointment reminder
    setTimeout(() => {
        if (localStorage.getItem('userRole') === 'patient') {
            showNotification('Reminder: You have an appointment tomorrow at 10:00 AM', 'info');
        }
    }, 5000);
}

// Initialize health chart for patient dashboard
function initializeHealthChart() {
    const chartContainer = document.getElementById('healthChart');
    if (!chartContainer) return;
    
    // Enhanced mock chart data with more metrics
    const chartData = [
        { date: '2024-01-01', weight: 70, bp: 120, heartRate: 72, temperature: 98.6 },
        { date: '2024-01-15', weight: 69, bp: 118, heartRate: 70, temperature: 98.4 },
        { date: '2024-02-01', weight: 68, bp: 115, heartRate: 68, temperature: 98.6 },
        { date: '2024-02-15', weight: 68, bp: 117, heartRate: 72, temperature: 98.5 }
    ];
    
    const latestData = chartData[chartData.length - 1];
    
    chartContainer.innerHTML = `
        <div class="chart-content">
            <h4>Health Metrics Trend</h4>
            <div class="metrics-grid">
                <div class="metric-item">
                    <span class="metric-label">Weight:</span>
                    <span class="metric-value">${latestData.weight} kg</span>
                    <span class="metric-trend">↓ 2kg</span>
                </div>
                <div class="metric-item">
                    <span class="metric-label">Blood Pressure:</span>
                    <span class="metric-value">${latestData.bp}/80 mmHg</span>
                    <span class="metric-trend">↓ Normal</span>
                </div>
                <div class="metric-item">
                    <span class="metric-label">Heart Rate:</span>
                    <span class="metric-value">${latestData.heartRate} bpm</span>
                    <span class="metric-trend">→ Stable</span>
                </div>
                <div class="metric-item">
                    <span class="metric-label">Temperature:</span>
                    <span class="metric-value">${latestData.temperature}°F</span>
                    <span class="metric-trend">→ Normal</span>
                </div>
            </div>
        </div>
    `;
}

// Update profile function
function updateProfile() {
    const userRole = localStorage.getItem('userRole');
    
    if (userRole === 'patient') {
        const name = document.getElementById('profileName')?.value;
        const email = document.getElementById('profileEmail')?.value;
        const phone = document.getElementById('profilePhone')?.value;
        const age = document.getElementById('profileAge')?.value;
        const gender = document.getElementById('profileGender')?.value;
        const bloodGroup = document.getElementById('profileBloodGroup')?.value;
        
        if (name) localStorage.setItem('userName', name);
        if (email) localStorage.setItem('userEmail', email);
        if (phone) localStorage.setItem('userPhone', phone);
        if (age) localStorage.setItem('userAge', age);
        if (gender) localStorage.setItem('userGender', gender);
        if (bloodGroup) localStorage.setItem('userBloodGroup', bloodGroup);
        
    } else if (userRole === 'doctor') {
        const name = document.getElementById('doctorName')?.value;
        const email = document.getElementById('doctorEmail')?.value;
        const phone = document.getElementById('doctorPhone')?.value;
        const specialty = document.getElementById('doctorSpecialty')?.value;
        const experience = document.getElementById('doctorExperience')?.value;
        const license = document.getElementById('doctorLicense')?.value;
        const bio = document.getElementById('doctorBio')?.value;
        
        if (name) localStorage.setItem('userName', name);
        if (email) localStorage.setItem('userEmail', email);
        if (phone) localStorage.setItem('userPhone', phone);
        if (specialty) localStorage.setItem('doctorSpecialty', specialty);
        if (experience) localStorage.setItem('doctorExperience', experience);
        if (license) localStorage.setItem('doctorLicense', license);
        if (bio) localStorage.setItem('doctorBio', bio);
    }
    
    showNotification('Profile updated successfully!', 'success');
    
    // Update welcome message if name changed
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        const userName = localStorage.getItem('userName');
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'patient') {
            welcomeMessage.textContent = `Welcome back, ${userName}!`;
        } else {
            welcomeMessage.textContent = `Welcome, ${userName}`;
        }
    }
}

function handleHashNavigation() {
    // Handle navigation based on URL hash
    const hash = window.location.hash.substring(1);
    if (hash) {
        const section = document.getElementById(hash);
        if (section) {
            // Switch to the section
            document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            
            section.classList.add('active');
            const navItem = document.querySelector(`[href="#${hash}"]`);
            if (navItem) navItem.classList.add('active');
        }
    }
}

function setupAutoSave() {
    // Auto-save form data every 30 seconds
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                // Debounce auto-save
                clearTimeout(this.autoSaveTimer);
                this.autoSaveTimer = setTimeout(() => {
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);
                    localStorage.setItem(`autosave_${form.id}`, JSON.stringify(data));
                }, 2000);
            });
        });
    });
    
    // Load auto-saved data on page load
    forms.forEach(form => {
        const savedData = localStorage.getItem(`autosave_${form.id}`);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const input = form.querySelector(`[name="${key}"]`);
                    if (input) {
                        input.value = data[key];
                    }
                });
            } catch (e) {
                console.error('Failed to load auto-saved data:', e);
            }
        }
    });
}

function initializeRealTimeFeatures() {
    // Simulated real-time updates
    setInterval(() => {
        // Update last activity time
        const now = new Date();
        localStorage.setItem('lastActivity', now.toISOString());
        
        // Check for new notifications (simulated)
        if (Math.random() < 0.1) { // 10% chance every interval
            const notifications = [
                'New health tip available',
                'Appointment reminder: Tomorrow at 10:00 AM',
                'Lab results are ready for review',
                'Monthly health report generated'
            ];
            
            const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
            showNotification(randomNotification, 'info');
        }
    }, 30000); // Check every 30 seconds
}

// Utility functions
function checkAuthStatus() {
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('userRole');
    return token !== null && role !== null;
}

function logout() {
    // Clear all user data
    const keysToRemove = [
        'userToken', 'userRole', 'userId', 'userName', 'userEmail', 
        'userPhone', 'userAge', 'userGender', 'userBloodGroup',
        'doctorSpecialty', 'doctorExperience', 'doctorLicense', 'doctorBio',
        'loginTimestamp', 'lastActivity'
    ];
    
    keysToRemove.forEach(key => {
        localStorage.removeItem(key);
    });
    
    // Clear auto-saved form data
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('autosave_')) {
            localStorage.removeItem(key);
        }
    });
    
    showNotification('Logged out successfully', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Additional utility functions for enhanced functionality
function exportHealthData() {
    const userData = {
        profile: {
            name: localStorage.getItem('userName'),
            email: localStorage.getItem('userEmail'),
            phone: localStorage.getItem('userPhone'),
            role: localStorage.getItem('userRole')
        },
        chatHistory: JSON.parse(localStorage.getItem('chatHistory') || '[]'),
        medicalHistory: JSON.parse(localStorage.getItem('medicalHistory') || '[]'),
        uploadedFiles: JSON.parse(localStorage.getItem('uploadedFiles') || '[]')
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `sehat-setu-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Health data exported successfully', 'success');
}

function importHealthData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            // Validate data structure
            if (data.profile && data.chatHistory && data.medicalHistory) {
                // Import data
                if (data.chatHistory) localStorage.setItem('chatHistory', JSON.stringify(data.chatHistory));
                if (data.medicalHistory) localStorage.setItem('medicalHistory', JSON.stringify(data.medicalHistory));
                if (data.uploadedFiles) localStorage.setItem('uploadedFiles', JSON.stringify(data.uploadedFiles));
                
                showNotification('Health data imported successfully', 'success');
                
                // Refresh the page to load new data
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            console.error('Import error:', error);
            showNotification('Failed to import data. Please check the file format.', 'error');
        }
    };
    
    reader.readAsText(file);
}

function generateHealthReport() {
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    const medicalHistory = JSON.parse(localStorage.getItem('medicalHistory') || '[]');
    
    let reportContent = `
        <div class="health-report">
            <h2>Health Report for ${userName}</h2>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            
            <div class="report-section">
                <h3>Chat Summary</h3>
                <p>Total conversations: ${chatHistory.length}</p>
                <p>Most recent chat: ${chatHistory.length > 0 ? new Date(chatHistory[chatHistory.length - 1].timestamp).toLocaleDateString() : 'No chats'}</p>
            </div>
            
            <div class="report-section">
                <h3>Medical History</h3>
                <p>Total records: ${medicalHistory.length}</p>
                ${medicalHistory.map(record => `
                    <div class="history-item">
                        <strong>${record.date}</strong> - ${record.type}
                        <p>${record.description}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="report-section">
                <h3>Recommendations</h3>
                <ul>
                    <li>Continue regular health monitoring</li>
                    <li>Maintain communication with healthcare providers</li>
                    <li>Keep medical records up to date</li>
                    <li>Follow prescribed treatment plans</li>
                </ul>
            </div>
        </div>
    `;
    
    // Create and show modal with report
    const modal = document.createElement('div');
    modal.className = 'report-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            ${reportContent}
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="printReport()">Print Report</button>
                <button class="btn btn-outline" onclick="this.parentElement.parentElement.parentElement.remove()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Store report content for printing
    window.currentReport = reportContent;
}

function printReport() {
    if (window.currentReport) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Health Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .health-report { max-width: 800px; margin: 0 auto; }
                        .report-section { margin-bottom: 20px; }
                        .history-item { margin-bottom: 10px; padding: 10px; border-left: 3px solid #007bff; }
                        h2, h3 { color: #333; }
                    </style>
                </head>
                <body>
                    ${window.currentReport}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Export functions for global use
window.viewPatientDetails = viewPatientDetails;
window.sendQuickMessage = sendQuickMessage;
window.deleteFile = deleteFile;
window.exportHealthData = exportHealthData;
window.importHealthData = importHealthData;
window.generateHealthReport = generateHealthReport;
window.printReport = printReport;