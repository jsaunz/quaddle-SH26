// Sample service listings data
const SAMPLE_POSTS = [
    {
        id: 1,
        category: "💇 Hair & Beauty",
        provider: "Elite Hair Studio",
        time: "0.5 miles away",
        title: "Premium Hair Styling & Coloring",
        preview: "Expert stylists specializing in modern cuts, balayage, and hair treatments. Over 10 years of experience making clients look and feel their best.",
        image: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-211032-853427.jpg&fm=jpg",
        rating: 4.9,
        reviews: 234,
        price: "$$"
    },
    {
        id: 2,
        category: "💅 Nails & Spa",
        provider: "Serenity Nail Bar",
        time: "0.8 miles away",
        title: "Luxury Manicures & Pedicures",
        preview: "Relax and rejuvenate with our premium nail services. We use high-quality products and maintain the highest hygiene standards.",
        image: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-211032-853427.jpg&fm=jpg",
        rating: 4.8,
        reviews: 189,
        price: "$$"
    },
    {
        id: 3,
        category: "💆 Massage & Wellness",
        provider: "Zen Wellness Center",
        time: "1.2 miles away",
        title: "Therapeutic Massage & Spa Treatments",
        preview: "Experience deep relaxation with our certified massage therapists. Swedish, deep tissue, hot stone, and more specialized treatments available.",
        image: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-211032-853427.jpg&fm=jpg",
        rating: 4.9,
        reviews: 312,
        price: "$$$"
    },
    {
        id: 4,
        category: "🏋️ Fitness & Gym",
        provider: "Urban Fitness Studio",
        time: "0.3 miles away",
        title: "Personal Training & Group Classes",
        preview: "State-of-the-art equipment, expert trainers, and motivating group classes. Start your fitness journey with us today!",
        image: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-211032-853427.jpg&fm=jpg",
        rating: 4.7,
        reviews: 421,
        price: "$$"
    },
    {
        id: 5,
        category: "🧘 Yoga & Meditation",
        provider: "Inner Peace Yoga",
        time: "1.5 miles away",
        title: "Yoga Classes for All Levels",
        preview: "Join our welcoming community for vinyasa, hatha, and restorative yoga. Beginner-friendly with experienced instructors guiding every session.",
        image: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-211032-853427.jpg&fm=jpg",
        rating: 4.9,
        reviews: 267,
        price: "$"
    },
    {
        id: 6,
        category: "💇 Hair & Beauty",
        provider: "Glamour Beauty Lounge",
        time: "0.9 miles away",
        title: "Complete Beauty Services",
        preview: "From haircuts to makeup, we offer a full suite of beauty services. Perfect for special occasions or everyday glam.",
        image: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-211032-853427.jpg&fm=jpg",
        rating: 4.6,
        reviews: 198,
        price: "$$"
    },
    {
        id: 7,
        category: "💅 Nails & Spa",
        provider: "Crystal Spa Retreat",
        time: "2.1 miles away",
        title: "Full Service Day Spa",
        preview: "Escape the stress of everyday life at our luxurious spa. Facials, body treatments, and nail services in a tranquil atmosphere.",
        image: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-211032-853427.jpg&fm=jpg",
        rating: 4.8,
        reviews: 345,
        price: "$$$"
    },
    {
        id: 8,
        category: "💆 Massage & Wellness",
        provider: "Healing Hands Massage",
        time: "0.7 miles away",
        title: "Sports & Therapeutic Massage",
        preview: "Specialized in injury recovery and pain management. Our licensed therapists use evidence-based techniques for optimal results.",
        image: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-211032-853427.jpg&fm=jpg",
        rating: 4.9,
        reviews: 276,
        price: "$$"
    }
];

// Services state
let posts = JSON.parse(JSON.stringify(SAMPLE_POSTS));
let currentSort = 'hot';
let userFavorites = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    setupEventListeners();
    setupCategoryLinks();
    initializeReviewSystem();
});

// Wire left-sidebar category items to open a category page
function setupCategoryLinks() {
    // Select the first sidebar section (Categories)
    const categoryItems = document.querySelectorAll('.sidebar .sidebar-section:first-of-type .sidebar-item');
    categoryItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const categoryText = item.textContent.trim();
            // Navigate to category page
            window.location.href = `category.html?category=${encodeURIComponent(categoryText)}`;
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Sort buttons
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.dataset.sort;
            sortPosts(currentSort);
        });
    });
}

// Sort services
function sortPosts(sortType) {
    switch(sortType) {
        case 'hot':
            posts.sort((a, b) => b.rating - a.rating);
            break;
        case 'new':
            posts.reverse();
            break;
        case 'top':
            posts.sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews));
            break;
        case 'rising':
            posts.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
            break;
    }
    renderPosts();
}

// Render posts
function renderPosts() {
    const container = document.getElementById('postsContainer');
    container.innerHTML = '';

    posts.forEach(post => {
        const postEl = createPostElement(post);
        container.appendChild(postEl);
    });
}

// Create service card element
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.dataset.postId = post.id;
    
    // Set background image if available
    if (post.image) {
        postDiv.style.backgroundImage = `url('${post.image}')`;
        postDiv.style.backgroundSize = 'cover';
        postDiv.style.backgroundPosition = 'center';
    }

    const isFavorited = userFavorites[post.id] || false;
    const stars = '⭐'.repeat(Math.floor(post.rating));

    postDiv.innerHTML = `
        <div class="post-content">
            <div class="post-header">
                <span class="post-subreddit">${post.category}</span>
                <span>•</span>
                <span class="post-time">${post.time}</span>
            </div>
            <h3 class="post-title">${escapeHtml(post.title)}</h3>
            <div class="post-provider">${post.provider}</div>
            ${post.preview ? `<p class="post-preview">${escapeHtml(post.preview)}</p>` : ''}
            <div class="post-rating">
                <span class="rating-stars">${stars}</span>
                <span class="rating-value">${post.rating}</span>
                <span class="rating-reviews">(${post.reviews} reviews)</span>
                <span class="rating-price">${post.price}</span>
            </div>
            <div class="post-footer">
                <button class="post-action book-btn">
                    <span class="post-action-icon">📅</span>
                    <span>Book Now</span>
                </button>
                <button class="post-action favorite-btn ${isFavorited ? 'favorited' : ''}">
                    <span class="post-action-icon">${isFavorited ? '❤️' : '🤍'}</span>
                    <span>Save</span>
                </button>
                <button class="post-action">
                    <span class="post-action-icon">ℹ️</span>
                    <span>Details</span>
                </button>
            </div>
        </div>
    `;

    // Add event listeners
    const title = postDiv.querySelector('.post-title');
    const bookBtn = postDiv.querySelector('.book-btn');
    const favoriteBtn = postDiv.querySelector('.favorite-btn');
    const detailsBtn = postDiv.querySelectorAll('.post-action')[2];

    title.addEventListener('click', () => handleServiceClick(post, 'view'));
    bookBtn.addEventListener('click', () => handleServiceClick(post, 'book'));
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(post.id);
    });
    detailsBtn.addEventListener('click', () => handleServiceClick(post, 'details'));

    return postDiv;
}

// Toggle favorite
function toggleFavorite(serviceId) {
    userFavorites[serviceId] = !userFavorites[serviceId];
    
    const postEl = document.querySelector(`[data-post-id="${serviceId}"]`);
    const favoriteBtn = postEl.querySelector('.favorite-btn');
    const icon = favoriteBtn.querySelector('.post-action-icon');
    
    if (userFavorites[serviceId]) {
        favoriteBtn.classList.add('favorited');
        icon.textContent = '❤️';
    } else {
        favoriteBtn.classList.remove('favorited');
        icon.textContent = '🤍';
    }
    
    // Save to localStorage
    localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
}

// Handle service interactions
function handleServiceClick(service, action) {
    let message = '';
    switch(action) {
        case 'view':
            message = `Viewing: ${service.provider} - ${service.title}`;
            alert(`Opening: ${service.provider}\n\nService: ${service.title}\nRating: ${service.rating} ⭐ (${service.reviews} reviews)\nPrice: ${service.price}\nLocation: ${service.time}`);
            break;
        case 'book':
            message = `Booking: ${service.provider}`;
            alert(`Book an appointment at ${service.provider}!\n\nIn a real app, this would open a booking calendar.`);
            break;
        case 'details':
                message = `Viewing details for: ${service.provider}`;
                // Open a dedicated details page and pass the service id
                window.open(`details.html?id=${service.id}`, '_blank');
            break;
    }
    console.log(message);
}

// Utility functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function escapeHtml(text) {
    const element = document.createElement('div');
    element.textContent = text;
    return element.innerHTML;
}

// Hash a string using SHA-256 and return hex digest
async function hashString(str) {
    try {
        const enc = new TextEncoder();
        const data = enc.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
        console.warn('Hashing not available', e);
        // fallback (not secure) if crypto not available
        return String(str);
    }
}

// Load user favorites from localStorage
function loadUserFavorites() {
    const saved = localStorage.getItem('userFavorites');
    if (saved) {
        userFavorites = JSON.parse(saved);
    }
}

// Load favorites on startup
loadUserFavorites();

// University and Quad data
const UNIVERSITIES = {
    uic: {
        name: 'University of Illinois Chicago',
        quads: ['beauty', 'clothes', 'food', 'jewelry', 'artwork']
    },
    uiuc: {
        name: 'University of Illinois Urbana-Champaign',
        quads: ['beauty', 'clothes', 'food', 'jewelry', 'artwork']
    },
    uchicago: {
        name: 'University of Chicago',
        quads: ['beauty', 'clothes', 'food', 'jewelry', 'artwork']
    }
};

// Account creation modal functionality
function initializeAccountModal() {
    const accountModal = document.getElementById('accountModal');
    const accountForm = document.getElementById('accountForm');
    const skipBtn1 = document.getElementById('skipBtn1');
    const nextStep1Btn = document.getElementById('nextStep1Btn');
    const backBtn1 = document.getElementById('backBtn1');
    const backBtn2 = document.getElementById('backBtn2');
    
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    
    let selectedUniversity = null;
    let selectedQuad = null;
    
    // If an account already exists, don't show the modal
    const userAccount = localStorage.getItem('userAccount');
    if (userAccount) {
        accountModal.classList.add('hidden');
        return;
    }

    // If we've already shown the welcome/account flow once, don't auto-show again
    const seenWelcome = localStorage.getItem('seenWelcome') === 'true';
    if (seenWelcome) {
        accountModal.classList.add('hidden');
        return;
    }

    // Show the modal on first load only if no account and not logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        accountModal.classList.remove('hidden');
    } else {
        accountModal.classList.add('hidden');
    }
    
    // Step 1: Move to university selection
    nextStep1Btn.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (username && email && password) {
            // Store temp data
            localStorage.setItem('tempUsername', username);
            localStorage.setItem('tempEmail', email);
            localStorage.setItem('tempPassword', password);
            
            // Move to step 2
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
        }
    });
    
    // Step 2: University selection
    const universityItems = document.querySelectorAll('#universityList .selection-item');
    universityItems.forEach(item => {
        item.addEventListener('click', () => {
            universityItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            selectedUniversity = item.dataset.university;
            
            // Move to step 3 automatically
            setTimeout(() => {
                step2.classList.add('hidden');
                step3.classList.remove('hidden');
                
                // Populate quads
                const quadList = document.getElementById('quadList');
                const universityDisplay = document.getElementById('universityDisplay');
                const univData = UNIVERSITIES[selectedUniversity];
                
                universityDisplay.textContent = `Join a Quad - ${univData.name}`;
                quadList.innerHTML = univData.quads.map(quad => `
                    <div class="selection-item" data-quad="${quad}">
                        <div class="selection-icon">📍</div>
                        <div class="selection-text">${quad}</div>
                    </div>
                `).join('');
                
                // Add quad selection handlers
                const quadItems = quadList.querySelectorAll('.selection-item');
                quadItems.forEach(quadItem => {
                    quadItem.addEventListener('click', () => {
                        selectedQuad = quadItem.dataset.quad;
                        finishAccountCreation();
                    });
                });
            }, 100);
        });
    });
    
    // Back buttons
    backBtn1.addEventListener('click', () => {
        step2.classList.add('hidden');
        step1.classList.remove('hidden');
        selectedUniversity = null;
    });
    
    backBtn2.addEventListener('click', () => {
        step3.classList.add('hidden');
        step2.classList.remove('hidden');
        selectedQuad = null;
    });
    
    // Skip button
    skipBtn1.addEventListener('click', () => {
        accountModal.classList.add('hidden');
        localStorage.setItem('skippedAccount', 'true');
        // Mark that we've shown/suppressed the welcome flow so it won't auto-show again
        localStorage.setItem('seenWelcome', 'true');
    });
    
    // Finish account creation
    async function finishAccountCreation() {
        const username = localStorage.getItem('tempUsername');
        const email = localStorage.getItem('tempEmail');
        const passwordPlain = localStorage.getItem('tempPassword') || '';
        const passwordHash = await hashString(passwordPlain);
        
        // Save account to localStorage (store hashed password)
        const account = {
            username,
            email,
            password: passwordHash,
            university: selectedUniversity,
            universityName: UNIVERSITIES[selectedUniversity].name,
            quad: selectedQuad,
            createdAt: new Date().toISOString()
        };
        localStorage.setItem('userAccount', JSON.stringify(account));
        localStorage.setItem('currentUser', username);
        localStorage.setItem('rememberMe', 'true');

        // Mark that the welcome/account flow has been completed so it won't auto-show again
        localStorage.setItem('seenWelcome', 'true');
        
        // Clear temp data
        localStorage.removeItem('tempUsername');
        localStorage.removeItem('tempEmail');
        localStorage.removeItem('tempPassword');
        
        // Close modal and update UI
        accountModal.classList.add('hidden');
        updateUserUI();
    }
}

// Update user UI with account info
function updateUserUI() {
    const currentUser = localStorage.getItem('currentUser');
    const userBtn = document.querySelector('.btn-user');
    if (userBtn) {
        if (currentUser) {
            // User is logged in - show first letter of username
            userBtn.innerHTML = `<span style="font-size: 16px; font-weight: 700;">${currentUser.substring(0, 1).toUpperCase()}</span>`;
            userBtn.title = `Logged in as ${currentUser} - Click to manage account`;
        } else {
            // User is not logged in - show icon
            userBtn.innerHTML = '<span class="user-icon">👤</span>';
            userBtn.title = 'Click to log in';
        }
    }
}

// Quad selection modal functionality (appears after account creation)
function initializeQuadSelectionModal() {
    const quadModal = document.getElementById('quadSelectionModal');
    const quadStep1 = document.getElementById('quadStep1');
    const quadStep2 = document.getElementById('quadStep2');
    const skipQuadBtn = document.getElementById('skipQuadBtn');
    const backQuadBtn = document.getElementById('backQuadBtn');
    
    let selectedQuadUniversity = null;
    
    // Show quad selection modal
    function showQuadSelectionModal() {
        // If user already set a home quad, or if we've shown the quad selection once, don't show again
        const userHomeQuad = localStorage.getItem('userHomeQuad');
        const seenQuad = localStorage.getItem('seenQuadSelection') === 'true';
        if (userHomeQuad || seenQuad) {
            return; // Don't show if already completed or already shown once
        }

        // Mark that quad selection was shown so it won't auto-show again
        localStorage.setItem('seenQuadSelection', 'true');

        quadModal.classList.remove('hidden');
        quadStep1.classList.remove('hidden');
        quadStep2.classList.add('hidden');
        selectedQuadUniversity = null;
    }
    
    // Close quad selection modal
    function closeQuadSelectionModal() {
        quadModal.classList.add('hidden');
    }
    
    // University selection in quad modal
    const quadUniversityItems = document.querySelectorAll('#quadUniversityList .selection-item');
    quadUniversityItems.forEach(item => {
        item.addEventListener('click', () => {
            quadUniversityItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            selectedQuadUniversity = item.dataset.university;
            
            // Move to quad selection
            setTimeout(() => {
                quadStep1.classList.add('hidden');
                quadStep2.classList.remove('hidden');
                
                // Populate quads
                const homeQuadList = document.getElementById('homeQuadList');
                const quadUniversityDisplay = document.getElementById('quadUniversityDisplay');
                const univData = UNIVERSITIES[selectedQuadUniversity];
                
                quadUniversityDisplay.textContent = `${univData.name} Quads`;
                homeQuadList.innerHTML = univData.quads.map(quad => `
                    <div class="selection-item" data-quad="${quad}">
                        <div class="selection-icon">📍</div>
                        <div class="selection-text">${quad}</div>
                    </div>
                `).join('');
                
                // Add quad selection handlers
                const quadItems = homeQuadList.querySelectorAll('.selection-item');
                quadItems.forEach(quadItem => {
                    quadItem.addEventListener('click', () => {
                        // Save user's home quad
                        const homeQuad = {
                            university: selectedQuadUniversity,
                            universityName: univData.name,
                            quad: quadItem.dataset.quad
                        };
                        localStorage.setItem('userHomeQuad', JSON.stringify(homeQuad));
                        // mark as seen/completed so it won't auto-show again
                        localStorage.setItem('seenQuadSelection', 'true');
                        
                        // Close modal
                        closeQuadSelectionModal();
                    });
                });
            }, 100);
        });
    });
    
    // Back button
    backQuadBtn.addEventListener('click', () => {
        quadStep2.classList.add('hidden');
        quadStep1.classList.remove('hidden');
        selectedQuadUniversity = null;
    });
    
    // Skip button
    skipQuadBtn.addEventListener('click', () => {
        // mark as seen so it doesn't show again
        localStorage.setItem('seenQuadSelection', 'true');
        closeQuadSelectionModal();
    });
    
    // Expose function globally
    window.showQuadSelectionModal = showQuadSelectionModal;
}

// Initialize modal on page load
initializeAccountModal();
initializeQuadSelectionModal();
initializeLoginModal();
updateUserUI();

// ==================== LOGIN SYSTEM ====================

function initializeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const closeLoginBtn = document.getElementById('closeLoginBtn');
    const showSignupLink = document.getElementById('showSignupLink');
    const userBtn = document.querySelector('.btn-user');
    const loginError = document.getElementById('loginError');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    // User button click handler
    userBtn.addEventListener('click', () => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            // User is logged in - show options menu
            showUserMenu();
        } else {
            // User is not logged in - show login modal
            showLoginModal();
        }
    });

    // Close login modal
    closeLoginBtn.addEventListener('click', () => {
        loginModal.classList.add('hidden');
        clearLoginForm();
        if (loginError) loginError.textContent = '';
    });

    // Show signup from login
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.add('hidden');
        clearLoginForm();
        if (loginError) loginError.textContent = '';
        // Show account modal
        const accountModal = document.getElementById('accountModal');
        accountModal.classList.remove('hidden');
        document.getElementById('step1').classList.remove('hidden');
        document.getElementById('step2').classList.add('hidden');
        document.getElementById('step3').classList.add('hidden');
    });

    // Toggle password visibility
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const pass = document.getElementById('loginPassword');
            if (!pass) return;
            if (pass.type === 'password') {
                pass.type = 'text';
                togglePasswordBtn.textContent = '🙈';
            } else {
                pass.type = 'password';
                togglePasswordBtn.textContent = '👁️';
            }
        });
    }

    // Login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (loginError) loginError.textContent = '';
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value || '';

        // Retrieve stored account
        const storedAccount = localStorage.getItem('userAccount');
        
        if (!storedAccount) {
            if (loginError) loginError.textContent = 'No account found. Please create an account first.';
            return;
        }

        const account = JSON.parse(storedAccount);
        // Verify username matches
        if (account.username !== username) {
            if (loginError) loginError.textContent = 'Invalid username or password.';
            return;
        }

        const hashed = await hashString(password);
        if (account.password === hashed) {
            // Set current user
            localStorage.setItem('currentUser', username);
            const remember = rememberMeCheckbox && rememberMeCheckbox.checked;
            localStorage.setItem('rememberMe', remember ? 'true' : 'false');
            loginModal.classList.add('hidden');
            clearLoginForm();
            updateUserUI();
        } else {
            if (loginError) loginError.textContent = 'Invalid username or password.';
        }
    });

    // Click outside modal to close
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.add('hidden');
            clearLoginForm();
            if (loginError) loginError.textContent = '';
        }
    });
}

function showLoginModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.classList.remove('hidden');
}

function clearLoginForm() {
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
}

function showUserMenu() {
    const currentUser = localStorage.getItem('currentUser');
    const userAccount = localStorage.getItem('userAccount');
    
    let accountInfo = '';
    if (userAccount) {
        const account = JSON.parse(userAccount);
        accountInfo = `\n\nUniversity: ${account.universityName || 'Not set'}\nQuad: ${account.quad || 'Not set'}`;
    }
    
    const logout = confirm(`Logged in as: ${currentUser}${accountInfo}\n\nWould you like to log out?`);
    
    if (logout) {
        localStorage.removeItem('currentUser');
        updateUserUI();
        alert('You have been logged out successfully.');
    }
}

// ==================== USER REVIEW SYSTEM ====================

// Store for user reviews and ratings
let userReviews = {};

// Rating descriptions
const RATING_DESCRIPTIONS = {
    1: '⭐ Very Bad',
    2: '⭐⭐ Bad',
    3: '⭐⭐⭐ Okay',
    4: '⭐⭐⭐⭐ Good',
    5: '⭐⭐⭐⭐⭐ Very Good'
};

// Initialize review system
function initializeReviewSystem() {
    loadUserReviews();
    setupReviewEventListeners();
}

// Setup review event listeners
function setupReviewEventListeners() {
    const reviewModal = document.getElementById('reviewModal');
    const closeReviewBtn = document.getElementById('closeReviewBtn');
    const submitReviewBtn = document.getElementById('submitReviewBtn');
    const stars = document.querySelectorAll('#starRating .star');
    
    let currentRating = 0;
    let currentReviewingUser = '';

    // Close review modal
    closeReviewBtn.addEventListener('click', () => {
        reviewModal.classList.add('hidden');
        currentRating = 0;
        updateStars(0);
        document.getElementById('reviewComment').value = '';
    });

    // Star hover and click
    stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.dataset.rating);
            highlightStars(rating);
        });

        star.addEventListener('click', () => {
            currentRating = parseInt(star.dataset.rating);
            updateStars(currentRating);
            updateRatingDescription(currentRating);
        });
    });

    // Remove hover highlight when leaving star rating area
    document.getElementById('starRating').addEventListener('mouseleave', () => {
        updateStars(currentRating);
    });

    // Submit review
    submitReviewBtn.addEventListener('click', () => {
        if (currentRating === 0) {
            alert('Please select a rating');
            return;
        }

        const comment = document.getElementById('reviewComment').value;
        submitReview(currentReviewingUser, currentRating, comment);

        // Reset and close
        reviewModal.classList.add('hidden');
        currentRating = 0;
        updateStars(0);
        document.getElementById('reviewComment').value = '';
    });

    // Store reference to current reviewing user
    window.setCurrentReviewingUser = (username) => {
        currentReviewingUser = username;
    };
}

// Highlight stars up to rating
function highlightStars(rating) {
    const stars = document.querySelectorAll('#starRating .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('hovered');
        } else {
            star.classList.remove('hovered');
        }
    });
}

// Update stars display
function updateStars(rating) {
    const stars = document.querySelectorAll('#starRating .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Update rating description
function updateRatingDescription(rating) {
    const description = document.getElementById('ratingDescription');
    if (rating > 0) {
        description.textContent = RATING_DESCRIPTIONS[rating];
        description.style.color = '#ffc107';
    } else {
        description.textContent = 'Select a rating';
        description.style.color = 'var(--text-secondary)';
    }
}

// Submit review
function submitReview(username, rating, comment) {
    if (!userReviews[username]) {
        userReviews[username] = [];
    }

    const review = {
        rating,
        comment,
        timestamp: new Date().toISOString(),
        rater: localStorage.getItem('currentUser') || 'Anonymous'
    };

    userReviews[username].push(review);
    saveUserReviews();
    alert(`Review submitted! You rated ${username} ${rating} star${rating !== 1 ? 's' : ''}.`);
}

// Save reviews to localStorage
function saveUserReviews() {
    localStorage.setItem('userReviews', JSON.stringify(userReviews));
}

// Load reviews from localStorage
function loadUserReviews() {
    const saved = localStorage.getItem('userReviews');
    if (saved) {
        userReviews = JSON.parse(saved);
    }
}

// Get user average rating
function getUserAverageRating(username) {
    if (!userReviews[username] || userReviews[username].length === 0) {
        return null;
    }

    const avgRating = userReviews[username].reduce((sum, review) => sum + review.rating, 0) / userReviews[username].length;
    return avgRating.toFixed(1);
}

// Get user rating count
function getUserRatingCount(username) {
    if (!userReviews[username]) {
        return 0;
    }
    return userReviews[username].length;
}

// Open review modal
function openReviewModal(username) {
    const reviewModal = document.getElementById('reviewModal');
    const reviewUsername = document.getElementById('reviewUsername');
    const reviewUserStats = document.getElementById('reviewUserStats');
    
    reviewUsername.textContent = username;
    
    const avgRating = getUserAverageRating(username);
    const ratingCount = getUserRatingCount(username);
    
    if (avgRating) {
        reviewUserStats.innerHTML = `Current Rating: ${RATING_DESCRIPTIONS[Math.round(avgRating)]} (${ratingCount} review${ratingCount !== 1 ? 's' : ''})`;
    } else {
        reviewUserStats.textContent = 'No reviews yet';
    }
    
    window.setCurrentReviewingUser(username);
    reviewModal.classList.remove('hidden');
    document.getElementById('ratingDescription').textContent = 'Select a rating';
}

// Persist sample posts data so other pages can read it (e.g., details page)
try {
    localStorage.setItem('postsData', JSON.stringify(SAMPLE_POSTS));
} catch (e) {
    console.warn('Could not persist postsData to localStorage', e);
}
