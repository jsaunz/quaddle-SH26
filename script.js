// Sample service listings data
const SAMPLE_POSTS = [
    {
        id: 1,
        category: "✂️ Haircuts",
        provider: "Elite Hair Studio",
        time: "0.5 miles away",
        title: "Professional Haircuts & Styling",
        preview: "Expert stylists specializing in modern cuts, fades, and hair treatments. Professional haircuts for all hair types and styles.",
        image: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-211032-853427.jpg&fm=jpg",
        rating: 4.9,
        reviews: 234,
        price: "$$"
    },
    {
        id: 2,
        category: "✨ Nails",
        provider: "Serenity Nail Bar",
        time: "0.8 miles away",
        title: "Luxury Manicures & Pedicures",
        preview: "Premium nail services with high-quality products and impeccable hygiene standards. Gel, acrylics, and natural nail care available.",
        image: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-211032-853427.jpg&fm=jpg",
        rating: 4.8,
        reviews: 189,
        price: "$$"
    },
    {
        id: 3,
        category: "👁️ Lashes",
        provider: "Lash & Beauty Co",
        time: "1.2 miles away",
        title: "Professional Lash Extensions & Treatments",
        preview: "Expert lash technicians specializing in volume lashes, classic lashes, and lash lift treatments. Natural-looking results with premium materials.",
        image: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-211032-853427.jpg&fm=jpg",
        rating: 4.9,
        reviews: 312,
        price: "$$$"
    },
    {
        id: 4,
        category: "👗 Clothes",
        provider: "Trendy Boutique",
        time: "0.3 miles away",
        title: "Fashion & Personal Styling Consultations",
        preview: "Expert personal stylists help you find the perfect wardrobe. Clothing alterations, styling advice, and seasonal collections available.",
        image: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-211032-853427.jpg&fm=jpg",
        rating: 4.7,
        reviews: 421,
        price: "$$"
    },
    {
        id: 5,
        category: "📚 Tutoring",
        provider: "Academic Excellence Tutoring",
        time: "1.5 miles away",
        title: "Professional Tutoring Services",
        preview: "Expert tutors in math, science, English, and more. One-on-one sessions tailored to student needs. Test prep and homework help available.",
        image: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-211032-853427.jpg&fm=jpg",
        rating: 4.9,
        reviews: 267,
        price: "$"
    },
    {
        id: 6,
        category: "💰 Fundraising",
        provider: "Community Fundraising Solutions",
        time: "0.9 miles away",
        title: "Professional Fundraising Event Planning",
        preview: "Full-service fundraising support for nonprofits and student organizations. Donation coordination, event management, and grant writing assistance.",
        image: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-211032-853427.jpg&fm=jpg",
        rating: 4.6,
        reviews: 198,
        price: "$$"
    },
    {
        id: 7,
        category: "✂️ Haircuts",
        provider: "Modern Barber Shop",
        time: "2.1 miles away",
        title: "Barber Services & Grooming",
        preview: "Classic and contemporary haircuts. Skilled barbers specializing in fades, line-ups, and traditional shaving services.",
        image: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?cs=srgb&dl=pexels-delbeautybox-211032-853427.jpg&fm=jpg",
        rating: 4.8,
        reviews: 345,
        price: "$$"
    },
    {
        id: 8,
        category: "👗 Clothes",
        provider: "Vintage & Thrift Collective",
        time: "0.7 miles away",
        title: "Sustainable Fashion & Tailoring",
        preview: "Curated vintage clothing, eco-friendly brands, and professional alteration services. Express yourself sustainably.",
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
    initializeUploadFunctionality();
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
    
    const isFavorited = userFavorites[post.id] || false;
    const stars = '⭐'.repeat(Math.floor(post.rating));

    // normalize images for legacy posts
    const images = (post.images && Array.isArray(post.images)) ? post.images : (post.image ? [post.image] : []);

    let mediaHtml = '';
    if (images.length === 0) {
        mediaHtml = `<img src="https://via.placeholder.com/600" alt="${escapeHtml(post.title)}" class="post-image">`;
    } else if (images.length === 1) {
        mediaHtml = `<img src="${images[0]}" alt="${escapeHtml(post.title)}" class="post-image" onerror="this.src='https://via.placeholder.com/600'">`;
    } else {
        // build a collage grid (limit to 4 shown)
        const show = images.slice(0, 4);
        mediaHtml = `<div class="post-collage">${show.map((src, i) => `<img src="${src}" alt="${escapeHtml(post.title)}-${i}" onerror="this.src='https://via.placeholder.com/600'">`).join('')}</div>`;
    }

    postDiv.innerHTML = `
        ${mediaHtml}
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
                ${post.isUserPost ? `<button class="post-action edit-btn"><span class="post-action-icon">✏️</span><span>Edit</span></button>` : ''}
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
    const editBtn = postDiv.querySelector('.edit-btn');
    if (editBtn) {
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openUploadModal(post);
        });
    }

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
            openBookingModal(service);
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

// Booking System
let currentBooking = {
    service: null,
    date: null,
    time: null
};

let userBookings = JSON.parse(localStorage.getItem('userBookings')) || [];

function openBookingModal(service) {
    currentBooking.service = service;
    currentBooking.date = null;
    currentBooking.time = null;
    
    const modal = document.getElementById('bookingModal');
    const providerName = document.getElementById('bookingProviderName');
    const serviceTitle = document.getElementById('bookingServiceTitle');
    
    providerName.textContent = service.provider;
    serviceTitle.textContent = service.title;
    
    // Show date selection
    document.getElementById('dateSelection').classList.remove('hidden');
    document.getElementById('timeSelection').classList.add('hidden');
    document.getElementById('confirmSelection').classList.add('hidden');
    
    generateCalendar();
    modal.classList.remove('hidden');
}

function generateCalendar() {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    
    const today = new Date();
    const daysToShow = 14; // Show 2 weeks
    
    for (let i = 0; i < daysToShow; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const dateEl = document.createElement('div');
        dateEl.className = 'calendar-date';
        dateEl.innerHTML = `
            <div class="date-day">${date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div class="date-number">${date.getDate()}</div>
            <div class="date-month">${date.toLocaleDateString('en-US', { month: 'short' })}</div>
        `;
        dateEl.dataset.date = date.toISOString().split('T')[0];
        
        dateEl.addEventListener('click', () => selectDate(date, dateEl));
        grid.appendChild(dateEl);
    }
}

function selectDate(date, element) {
    // Remove previous selection
    document.querySelectorAll('.calendar-date').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    
    currentBooking.date = date;
    
    // Show time selection
    document.getElementById('dateSelection').classList.add('hidden');
    document.getElementById('timeSelection').classList.remove('hidden');
    
    const dateDisplay = document.getElementById('selectedDateDisplay');
    dateDisplay.textContent = `Selected: ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`;
    
    generateTimeSlots();
}

function generateTimeSlots() {
    const container = document.getElementById('timeSlots');
    container.innerHTML = '';
    
    // Generate times from 10:00 AM to 5:00 PM with 30-minute intervals
    const startHour = 10;
    const endHour = 17;
    
    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            // Don't add 5:30 PM
            if (hour === endHour && minute > 0) break;
            
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            
            const period = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour > 12 ? hour - 12 : hour;
            const displayMinute = minute.toString().padStart(2, '0');
            const timeString = `${displayHour}:${displayMinute} ${period}`;
            
            timeSlot.textContent = timeString;
            timeSlot.dataset.time = timeString;
            
            timeSlot.addEventListener('click', () => selectTime(timeString, timeSlot));
            container.appendChild(timeSlot);
        }
    }
}

function selectTime(time, element) {
    // Remove previous selection
    document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    
    currentBooking.time = time;
    
    // Show confirmation
    document.getElementById('timeSelection').classList.add('hidden');
    document.getElementById('confirmSelection').classList.remove('hidden');
    
    const confirmDate = document.getElementById('confirmDate');
    const confirmTime = document.getElementById('confirmTime');
    
    confirmDate.textContent = currentBooking.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    confirmTime.textContent = currentBooking.time;
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('hidden');
    currentBooking = {
        service: null,
        date: null,
        time: null
    };
}

// Setup booking modal event listeners
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('bookingModal');
    const confirmBtn = document.getElementById('confirmBookingBtn');
    
    // Close when clicking outside the panel
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBookingModal();
        }
    });
    
    // Confirm booking button
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            // Save booking
            const booking = {
                id: Date.now(),
                provider: currentBooking.service.provider,
                service: currentBooking.service.title,
                date: currentBooking.date.toISOString().split('T')[0],
                dateFormatted: currentBooking.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
                time: currentBooking.time
            };
            
            userBookings.push(booking);
            localStorage.setItem('userBookings', JSON.stringify(userBookings));
            
            alert(`Booking confirmed!\n\nProvider: ${currentBooking.service.provider}\nService: ${currentBooking.service.title}\nDate: ${currentBooking.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}\nTime: ${currentBooking.time}`);
            
            updateBookingsDisplay();
            closeBookingModal();
        });
    }
    
    // Initialize bookings display
    updateBookingsDisplay();
    
    // Clear all bookings button
    const clearAllBtn = document.getElementById('clearAllBookingsBtn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            if (userBookings.length > 0) {
                if (confirm('Are you sure you want to clear all bookings?')) {
                    userBookings = [];
                    localStorage.setItem('userBookings', JSON.stringify(userBookings));
                    updateBookingsDisplay();
                }
            }
        });
    }
});

function updateBookingsDisplay() {
    const bookingsList = document.getElementById('bookingsList');
    
    if (!bookingsList) return;
    
    if (userBookings.length === 0) {
        bookingsList.innerHTML = '<div class="no-bookings">No Bookings Available</div>';
    } else {
        bookingsList.innerHTML = userBookings.map(booking => `
            <div class="booking-item">
                <div class="booking-provider">${escapeHtml(booking.provider)}</div>
                <div class="booking-details">
                    <div class="booking-date">📅 ${booking.dateFormatted}</div>
                    <div class="booking-time">🕐 ${booking.time}</div>
                </div>
            </div>
        `).join('');
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

// ==============================
// Upload post feature
// ==============================

let userPosts = [];
let editingPostId = null;

function loadUserPosts() {
    try {
        const saved = localStorage.getItem('userPosts');
        userPosts = saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.warn('Could not load user posts', e);
        userPosts = [];
    }
}

function saveUserPosts() {
    try {
        localStorage.setItem('userPosts', JSON.stringify(userPosts));
    } catch (e) {
        console.warn('Could not save user posts', e);
    }
}

function openUploadModal(post = null) {
    const uploadModal = document.getElementById('uploadModal');
    if (!uploadModal) return;
    const form = document.getElementById('uploadForm');
    if (post) {
        editingPostId = post.id;
        if (form) {
            document.getElementById('postCategory').value = post.category || '';
            document.getElementById('postProvider').value = post.provider || '';
            document.getElementById('postTitle').value = post.title || '';
            document.getElementById('postDescription').value = post.preview || '';
            document.getElementById('postPrice').value = post.price || '';
            document.getElementById('postAddress').value = post.time || '';
            const imagesField = document.getElementById('postImages');
            const imgs = (post.images && Array.isArray(post.images)) ? post.images : (post.image ? [post.image] : []);
            if (imagesField) imagesField.value = imgs.join('\n');
        }
    } else {
        editingPostId = null;
        if (form) form.reset();
    }
    uploadModal.classList.remove('hidden');
}

function closeUploadModal() {
    const uploadModal = document.getElementById('uploadModal');
    if (!uploadModal) return;
    uploadModal.classList.add('hidden');
    editingPostId = null;
}

function handleUploadSubmit(e) {
    e.preventDefault();

    const category = document.getElementById('postCategory').value;
    const provider = document.getElementById('postProvider').value;
    const title = document.getElementById('postTitle').value;
    const preview = document.getElementById('postDescription').value;
    const price = document.getElementById('postPrice').value;
    const time = document.getElementById('postAddress').value;
    const imagesRaw = document.getElementById('postImages') ? document.getElementById('postImages').value : '';
    const images = imagesRaw.split('\n').map(s => s.trim()).filter(s => s.length > 0);

    if (editingPostId) {
        const updateArr = (arr) => {
            const idx = arr.findIndex(p => p.id === editingPostId);
            if (idx !== -1) {
                arr[idx] = Object.assign({}, arr[idx], {
                    category,
                    provider,
                    title,
                    preview,
                    price,
                    time,
                    images,
                    image: images[0] || null
                });
            }
        };

        updateArr(userPosts);
        updateArr(posts);
        updateArr(SAMPLE_POSTS);
        saveUserPosts();
        sortPosts(currentSort || 'hot');
        editingPostId = null;
        closeUploadModal();
        return;
    }

    const newId = Math.max(0, ...SAMPLE_POSTS.map(p => p.id), ...posts.map(p => p.id), ...userPosts.map(p => p.id)) + 1;
    const newPost = {
        id: newId,
        category,
        provider,
        time,
        title,
        preview,
        images: images,
        image: images[0] || null,
        rating: 5.0,
        reviews: 0,
        price,
        isUserPost: true,
        uploadedAt: new Date().toISOString()
    };

    userPosts.unshift(newPost);
    saveUserPosts();

    SAMPLE_POSTS.unshift(newPost);
    posts.unshift(newPost);

    currentSort = 'hot';
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
    const hotBtn = document.querySelector('.sort-btn[data-sort="hot"]');
    if (hotBtn) hotBtn.classList.add('active');
    sortPosts('hot');

    closeUploadModal();
}

function initializeUploadFunctionality() {
    loadUserPosts();

    const uploadPostBtn = document.getElementById('uploadPostBtn');
    const listBusinessBtn = document.getElementById('listBusinessBtn');
    const closeUploadBtn = document.getElementById('closeUploadBtn');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const uploadModal = document.getElementById('uploadModal');
    const uploadForm = document.getElementById('uploadForm');

    if (uploadPostBtn) uploadPostBtn.addEventListener('click', () => openUploadModal(null));
    if (listBusinessBtn) listBusinessBtn.addEventListener('click', () => openUploadModal(null));
    if (closeUploadBtn) closeUploadBtn.addEventListener('click', closeUploadModal);
    if (cancelUploadBtn) cancelUploadBtn.addEventListener('click', closeUploadModal);
    if (uploadModal) uploadModal.addEventListener('click', (e) => { if (e.target === uploadModal) closeUploadModal(); });
    if (uploadForm) uploadForm.addEventListener('submit', handleUploadSubmit);
}

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

function getCurrentUser() {
    return sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');
}

function setCurrentUser(username, remember) {
    if (remember) {
        localStorage.setItem('currentUser', username);
        sessionStorage.removeItem('currentUser');
    } else {
        sessionStorage.setItem('currentUser', username);
        localStorage.removeItem('currentUser');
    }
}

function clearCurrentUser() {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
}

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
    const currentUser = getCurrentUser();
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
        setCurrentUser(username, true);
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
    const currentUser = getCurrentUser();
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

// Initialize modal on page load
initializeAccountModal();
initializeLoginModal();
updateUserUI();

// ==================== LOGIN SYSTEM ====================

function initializeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (!loginModal) return;

    const loginForm = document.getElementById('loginForm');
    const closeLoginBtn = document.getElementById('closeLoginBtn');
    const showSignupLink = document.getElementById('showSignupLink');
    const userBtn = document.querySelector('.btn-user');
    const loginError = document.getElementById('loginError');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const identifierInput = document.getElementById('loginIdentifier');
    const passwordInput = document.getElementById('loginPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    const loginPanel = document.getElementById('loginPanel');
    const forgotPanel = document.getElementById('forgotPanel');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const backToLoginLink = document.getElementById('backToLoginLink');
    const forgotForm = document.getElementById('forgotForm');
    const forgotEmail = document.getElementById('forgotEmail');
    const forgotError = document.getElementById('forgotError');
    const forgotMessage = document.getElementById('forgotMessage');

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

    if (rememberMeCheckbox) {
        rememberMeCheckbox.checked = localStorage.getItem('rememberMe') === 'true';
    }

    function setInputError(input, hasError) {
        if (!input) return;
        input.classList.toggle('input-error', hasError);
        input.setAttribute('aria-invalid', hasError ? 'true' : 'false');
    }

    function setLoginError(message) {
        if (loginError) loginError.textContent = message;
    }

    function clearLoginErrors() {
        setLoginError('');
        setInputError(identifierInput, false);
        setInputError(passwordInput, false);
    }

    function showForgotPanel() {
        if (loginPanel) loginPanel.classList.add('hidden');
        if (forgotPanel) forgotPanel.classList.remove('hidden');
        if (forgotError) forgotError.textContent = '';
        if (forgotMessage) forgotMessage.textContent = '';
        if (forgotEmail) forgotEmail.value = '';
    }

    function showLoginPanel() {
        if (forgotPanel) forgotPanel.classList.add('hidden');
        if (loginPanel) loginPanel.classList.remove('hidden');
    }

    function getPasswordStrength(password) {
        if (!password) return { label: '-', key: '' };

        let score = 0;
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        if (score <= 2) return { label: 'Weak', key: 'weak' };
        if (score <= 4) return { label: 'Okay', key: 'okay' };
        return { label: 'Strong', key: 'strong' };
    }

    function updatePasswordStrength() {
        if (!passwordStrength || !passwordInput) return;
        const strength = getPasswordStrength(passwordInput.value);
        passwordStrength.textContent = `Strength: ${strength.label}`;
        passwordStrength.dataset.strength = strength.key;
    }

    // User button click handler
    if (userBtn) {
        userBtn.addEventListener('click', () => {
            const currentUser = getCurrentUser();
            if (currentUser) {
                showUserMenu();
            } else {
                showLoginModal();
            }
        });
    }

    // Close login modal
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', () => {
            loginModal.classList.add('hidden');
            clearLoginForm();
            clearLoginErrors();
            showLoginPanel();
        });
    }

    // Show signup from login
    if (showSignupLink) {
        showSignupLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('hidden');
            clearLoginForm();
            clearLoginErrors();
            showLoginPanel();

            const accountModal = document.getElementById('accountModal');
            accountModal.classList.remove('hidden');
            document.getElementById('step1').classList.remove('hidden');
            document.getElementById('step2').classList.add('hidden');
            document.getElementById('step3').classList.add('hidden');
        });
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', () => {
            showForgotPanel();
        });
    }

    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', () => {
            showLoginPanel();
        });
    }

    // Toggle password visibility
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            if (!passwordInput) return;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePasswordBtn.textContent = 'Hide';
            } else {
                passwordInput.type = 'password';
                togglePasswordBtn.textContent = 'Show';
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', updatePasswordStrength);
    }

    if (identifierInput) {
        identifierInput.addEventListener('input', () => {
            setInputError(identifierInput, false);
            setLoginError('');
        });
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearLoginErrors();

            const identifier = identifierInput ? identifierInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value : '';

            if (!identifier) {
                setInputError(identifierInput, true);
                setLoginError('Enter your username or email.');
                return;
            }

            if (identifier.includes('@')) {
                if (!EMAIL_REGEX.test(identifier)) {
                    setInputError(identifierInput, true);
                    setLoginError('Enter a valid email address.');
                    return;
                }
            } else if (!USERNAME_REGEX.test(identifier)) {
                setInputError(identifierInput, true);
                setLoginError('Usernames are 3-20 characters and can include letters, numbers, and underscores.');
                return;
            }

            if (!password) {
                setInputError(passwordInput, true);
                setLoginError('Enter your password.');
                return;
            }

            const storedAccount = localStorage.getItem('userAccount');
            if (!storedAccount) {
                setLoginError('No account found. Please create an account first.');
                return;
            }

            const account = JSON.parse(storedAccount);
            const matchesEmail = identifier.includes('@');

            if (matchesEmail && account.email !== identifier) {
                setLoginError('Invalid username/email or password.');
                return;
            }

            if (!matchesEmail && account.username !== identifier) {
                setLoginError('Invalid username/email or password.');
                return;
            }

            const hashed = await hashString(password);
            if (account.password === hashed) {
                const remember = rememberMeCheckbox && rememberMeCheckbox.checked;
                setCurrentUser(account.username, remember);
                localStorage.setItem('rememberMe', remember ? 'true' : 'false');
                loginModal.classList.add('hidden');
                clearLoginForm();
                updateUserUI();
            } else {
                setLoginError('Invalid username/email or password.');
            }
        });
    }

    if (forgotForm) {
        forgotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (forgotError) forgotError.textContent = '';
            if (forgotMessage) forgotMessage.textContent = '';

            const email = forgotEmail ? forgotEmail.value.trim() : '';
            if (!EMAIL_REGEX.test(email)) {
                setInputError(forgotEmail, true);
                if (forgotError) forgotError.textContent = 'Enter a valid email address.';
                return;
            }

            setInputError(forgotEmail, false);
            if (forgotMessage) {
                forgotMessage.textContent = 'If an account exists for that email, a reset link has been sent.';
            }
        });
    }

    // Click outside modal to close
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.add('hidden');
            clearLoginForm();
            clearLoginErrors();
            showLoginPanel();
        }
    });

    updatePasswordStrength();
}

function showLoginModal() {
    const loginModal = document.getElementById('loginModal');
    const loginPanel = document.getElementById('loginPanel');
    const forgotPanel = document.getElementById('forgotPanel');
    loginModal.classList.remove('hidden');
    if (loginPanel) loginPanel.classList.remove('hidden');
    if (forgotPanel) forgotPanel.classList.add('hidden');
}

function clearLoginForm() {
    const identifierInput = document.getElementById('loginIdentifier');
    const passwordInput = document.getElementById('loginPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    const loginError = document.getElementById('loginError');
    const forgotError = document.getElementById('forgotError');
    const forgotMessage = document.getElementById('forgotMessage');
    const forgotEmail = document.getElementById('forgotEmail');

    if (identifierInput) identifierInput.value = '';
    if (passwordInput) passwordInput.value = '';
    if (loginError) loginError.textContent = '';
    if (forgotError) forgotError.textContent = '';
    if (forgotMessage) forgotMessage.textContent = '';
    if (forgotEmail) forgotEmail.value = '';

    if (passwordStrength) {
        passwordStrength.textContent = 'Strength: -';
        passwordStrength.dataset.strength = '';
    }

    if (identifierInput) {
        identifierInput.classList.remove('input-error');
        identifierInput.removeAttribute('aria-invalid');
    }

    if (passwordInput) {
        passwordInput.classList.remove('input-error');
        passwordInput.removeAttribute('aria-invalid');
    }
}

function showUserMenu() {
    const currentUser = getCurrentUser();
    const userAccount = localStorage.getItem('userAccount');
    
    let accountInfo = '';
    if (userAccount) {
        const account = JSON.parse(userAccount);
        accountInfo = `\n\nUniversity: ${account.universityName || 'Not set'}\nQuad: ${account.quad || 'Not set'}`;
    }
    
    const logout = confirm(`Logged in as: ${currentUser}${accountInfo}\n\nWould you like to log out?`);
    
    if (logout) {
        clearCurrentUser();
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
        rater: getCurrentUser() || 'Anonymous'
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
