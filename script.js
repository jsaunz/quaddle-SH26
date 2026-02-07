// Sample services data for beauty and small business marketplace
const SAMPLE_SERVICES = [
    {
        id: 1,
        category: "nails",
        provider: "Sarah's Nails",
        providerAvatar: "👩",
        time: "2 hours ago",
        title: "💅 Luxury Gel Nails - Custom Designs",
        description: "Professional gel manicures with custom designs. We offer ombré, glitter, French tips, and more. All supplies are premium quality.",
        image: "https://via.placeholder.com/600x300?text=Gel+Nails",
        price: 45,
        rating: 4.9,
        reviews: 156,
        likes: 342
    },
    {
        id: 2,
        category: "hair",
        provider: "Braid Gang",
        providerAvatar: "💇",
        time: "3 hours ago",
        title: "🧵 Professional Hair Braiding - All Styles",
        description: "Expert braiding services including box braids, cornrows, goddess braids, and protective styles. We use quality extensions and are efficient.",
        image: "https://via.placeholder.com/600x300?text=Hair+Braiding",
        price: 75,
        rating: 4.8,
        reviews: 203,
        likes: 287
    },
    {
        id: 3,
        category: "makeup",
        provider: "Glam by Maya",
        providerAvatar: "💄",
        time: "4 hours ago",
        title: "💄 Professional Makeup - Events & Everyday",
        description: "Experienced makeup artist offering services for events, photoshoots, and everyday glam. I specialize in bridal makeup and artistic designs.",
        image: "https://via.placeholder.com/600x300?text=Makeup+Service",
        price: 60,
        rating: 5.0,
        reviews: 124,
        likes: 421
    },
    {
        id: 4,
        category: "lashes",
        provider: "Lash Lounge",
        providerAvatar: "👁️",
        time: "5 hours ago",
        title: "👁️ Luxury Lash Extensions - Mink & Silk",
        description: "Beautiful lash extensions that last 4-6 weeks. Offering mink, silk, and volume lashes. Professional application with premium products.",
        image: "https://via.placeholder.com/600x300?text=Lash+Extensions",
        price: 85,
        rating: 4.7,
        reviews: 89,
        likes: 156
    },
    {
        id: 5,
        category: "braids",
        provider: "Creative Strands",
        providerAvatar: "🧵",
        time: "6 hours ago",
        title: "🎨 Custom Braids & Hair Art",
        description: "Unique braiding styles with beads, colors, and intricate patterns. Fast turnaround and affordable prices. Perfect for any occasion.",
        image: "https://via.placeholder.com/600x300?text=Creative+Braids",
        price: 55,
        rating: 4.6,
        reviews: 178,
        likes: 234
    },
    {
        id: 6,
        category: "photography",
        provider: "Creative Lens",
        providerAvatar: "📸",
        time: "7 hours ago",
        title: "📸 Professional Photography - Portraits & Events",
        description: "High-quality photography for portraits, headshots, and events. Fast editing and digital delivery. Let's capture your best moments!",
        image: "https://via.placeholder.com/600x300?text=Photography",
        price: 150,
        rating: 5.0,
        reviews: 95,
        likes: 512
    },
    {
        id: 7,
        category: "tutoring",
        provider: "Math Genius Tutoring",
        providerAvatar: "📚",
        time: "8 hours ago",
        title: "📚 Math Tutoring - All Levels",
        description: "Experienced tutor offering help with algebra, geometry, calculus, and test prep (SAT/ACT). Online or in-person sessions available.",
        image: "https://via.placeholder.com/600x300?text=Tutoring",
        price: 35,
        rating: 4.9,
        reviews: 67,
        likes: 189
    },
    {
        id: 8,
        category: "other",
        provider: "Chic Fashion",
        providerAvatar: "👗",
        time: "9 hours ago",
        title: "✨ Personal Styling & Wardrobe Consultation",
        description: "Professional stylist offering personal shopping, wardrobe organization, and fashion advice to boost your confidence and style.",
        image: "https://via.placeholder.com/600x300?text=Fashion+Styling",
        price: 50,
        rating: 4.8,
        reviews: 112,
        likes: 267
    },
    {
        id: 9,
        category: "makeup",
        provider: "Brows & Lashes Studio",
        providerAvatar: "😍",
        time: "10 hours ago",
        title: "😍 Eyebrow Design & Shaping",
        description: "Professional eyebrow services including threading, shaping, tinting, and microblading. Customized to your face shape and style.",
        image: null,
        price: 25,
        rating: 4.7,
        reviews: 203,
        likes: 178
    },
    {
        id: 10,
        category: "hair",
        provider: "Hair Transformation Studio",
        providerAvatar: "💫",
        time: "11 hours ago",
        title: "💫 Hair Coloring & Treatments",
        description: "Expert hair coloring, highlights, balayage, and at-home maintenance treatments. Using professional-grade products for healthy, gorgeous results.",
        image: "https://via.placeholder.com/600x300?text=Hair+Color",
        price: 80,
        rating: 4.9,
        reviews: 198,
        likes: 345
    }
];

// Services state
let services = JSON.parse(JSON.stringify(SAMPLE_SERVICES));
let currentCategory = 'all';
let userLikes = {};
let currentSort = 'newest';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    setupEventListeners();
    initializeAccountModal();
    updateUserUI();
});

// Setup event listeners
function setupEventListeners() {
    // Category filter
    document.querySelectorAll('.sidebar-item[data-category]').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.sidebar-item[data-category]').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            currentCategory = item.dataset.category;
            renderServices();
        });
    });

    // Sort filter
    document.querySelectorAll('.sidebar-item[data-sort]').forEach(item => {
        item.addEventListener('click', () => {
            currentSort = item.dataset.sort;
            sortServices(currentSort);
            renderServices();
        });
    });

    // Price filter
    const priceFilter = document.getElementById('priceFilter');
    const priceDisplay = document.getElementById('priceDisplay');
    if (priceFilter) {
        priceFilter.addEventListener('input', (e) => {
            priceDisplay.textContent = e.target.value;
            renderServices();
        });
    }
}

// Sort services
function sortServices(sortType) {
    const maxPrice = parseInt(document.getElementById('priceFilter')?.value || 500);
    
    switch(sortType) {
        case 'newest':
            services.sort((a, b) => b.id - a.id);
            break;
        case 'popular':
            services.sort((a, b) => b.likes - a.likes);
            break;
        case 'rating':
            services.sort((a, b) => b.rating - a.rating);
            break;
        case 'price-low':
            services.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            services.sort((a, b) => b.price - a.price);
            break;
    }
}

// Render services
function renderServices() {
    const container = document.getElementById('postsContainer');
    container.innerHTML = '';

    const maxPrice = parseInt(document.getElementById('priceFilter')?.value || 500);
    const filtered = services.filter(service => {
        const categoryMatch = currentCategory === 'all' || service.category === currentCategory;
        const priceMatch = service.price <= maxPrice;
        return categoryMatch && priceMatch;
    });

    if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-secondary);">No services found matching your filters. Try adjusting your search!</div>';
        return;
    }

    filtered.forEach(service => {
        const serviceEl = createServiceElement(service);
        container.appendChild(serviceEl);
    });
}

// Create service element
function createServiceElement(service) {
    const serviceDiv = document.createElement('div');
    serviceDiv.className = 'post';
    serviceDiv.dataset.serviceId = service.id;

    const userLike = userLikes[service.id] || false;
    const displayLikes = service.likes + (userLike ? 1 : 0);

    serviceDiv.innerHTML = `
        <div class="post-votes">
            <button class="vote-btn like-btn" data-like="true" title="Like" style="border: none; background: none; font-size: 20px; cursor: pointer;">
                <span class="${userLike ? 'liked' : ''}">♥️</span>
            </button>
            <div class="vote-count">${formatNumber(displayLikes)}</div>
        </div>
        <div class="post-content">
            <div class="post-header">
                <span class="post-author">${service.providerAvatar} ${service.provider}</span>
                <span>•</span>
                <span class="post-time">${service.time}</span>
                <span class="post-rating" style="margin-left: auto;">⭐ ${service.rating} (${service.reviews} reviews)</span>
            </div>
            <h3 class="post-title">${escapeHtml(service.title)}</h3>
            <p class="post-preview">${escapeHtml(service.description)}</p>
            ${service.image ? `<img src="${service.image}" alt="Service image" class="post-image" onerror="this.style.display='none'">` : ''}
            <div class="post-footer">
                <div class="service-price" style="font-weight: bold; color: var(--secondary-color); font-size: 18px;">
                    $${service.price}
                </div>
                <div class="post-action">
                    <span class="post-action-icon">❤️</span>
                    <span>${formatNumber(displayLikes)}</span>
                </div>
                <div class="post-action">
                    <span class="post-action-icon">💬</span>
                    <span>Message</span>
                </div>
                <div class="post-action">
                    <span class="post-action-icon">📱</span>
                    <span>Contact</span>
                </div>
            </div>
        </div>
    `;

    // Add like button handler
    const likeBtn = serviceDiv.querySelector('.like-btn');
    likeBtn.addEventListener('click', () => handleLike(service.id));

    // Add click handlers
    const title = serviceDiv.querySelector('.post-title');
    const author = serviceDiv.querySelector('.post-author');
    
    title.addEventListener('click', () => handleServiceClick(service, 'title'));
    author.addEventListener('click', (e) => {
        e.stopPropagation();
        handleServiceClick(service, 'author');
    });

    // Message button
    const messageAction = [...serviceDiv.querySelectorAll('.post-action')][1];
    messageAction.addEventListener('click', () => handleServiceClick(service, 'message'));

    return serviceDiv;
}

// Handle like
function handleLike(serviceId) {
    userLikes[serviceId] = !userLikes[serviceId];
    localStorage.setItem('userLikes', JSON.stringify(userLikes));
    renderServices();
}

// Handle service interactions
function handleServiceClick(service, action) {
    let message = '';
    switch(action) {
        case 'title':
            message = `You viewed: "${service.title}"`;
            break;
        case 'author':
            message = `You clicked on: ${service.provider}'s profile`;
            break;
        case 'message':
            message = `Opening message with ${service.provider}`;
            break;
    }
    console.log(message);
    alert(message);
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

// Load user likes from localStorage
function loadUserLikes() {
    const saved = localStorage.getItem('userLikes');
    if (saved) {
        userLikes = JSON.parse(saved);
}

// Load likes on startup
loadUserLikes();

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
    
    let selectedAccountType = null;
    let selectedCategory = null;
    
    // Check if user has already created an account
    const userAccount = localStorage.getItem('userAccount');
    if (userAccount) {
        accountModal.classList.add('hidden');
        return;
    }
    
    // Show the modal on load
    accountModal.classList.remove('hidden');
    
    // Step 1: Move to account type selection
    nextStep1Btn.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (username && email && password) {
            localStorage.setItem('tempUsername', username);
            localStorage.setItem('tempEmail', email);
            localStorage.setItem('tempPassword', password);
            
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
        }
    });
    
    // Step 2: Account type selection
    const accountTypeItems = document.querySelectorAll('#accountTypeList .selection-item');
    accountTypeItems.forEach(item => {
        item.addEventListener('click', () => {
            accountTypeItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            selectedAccountType = item.dataset.type;
            
            if (selectedAccountType === 'customer') {
                finishAccountCreation();
            } else {
                setTimeout(() => {
                    step2.classList.add('hidden');
                    step3.classList.remove('hidden');
                }, 100);
            }
        });
    });
    
    // Step 3: Category selection (for providers)
    const categoryItems = document.querySelectorAll('#categoryList .selection-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            selectedCategory = item.dataset.category;
            finishAccountCreation();
        });
    });
    
    // Back buttons
    backBtn1.addEventListener('click', () => {
        step2.classList.add('hidden');
        step1.classList.remove('hidden');
        selectedAccountType = null;
    });
    
    backBtn2.addEventListener('click', () => {
        step3.classList.add('hidden');
        step2.classList.remove('hidden');
        selectedCategory = null;
    });
    
    // Skip button
    skipBtn1.addEventListener('click', () => {
        accountModal.classList.add('hidden');
        localStorage.setItem('skippedAccount', 'true');
    });
    
    // Finish account creation
    function finishAccountCreation() {
        const username = localStorage.getItem('tempUsername');
        const email = localStorage.getItem('tempEmail');
        const password = localStorage.getItem('tempPassword');
        
        const account = {
            username,
            email,
            accountType: selectedAccountType || 'customer',
            serviceCategory: selectedCategory,
            createdAt: new Date().toISOString()
        };
        localStorage.setItem('userAccount', JSON.stringify(account));
        localStorage.setItem('currentUser', username);
        
        localStorage.removeItem('tempUsername');
        localStorage.removeItem('tempEmail');
        localStorage.removeItem('tempPassword');
        
        accountModal.classList.add('hidden');
        updateUserUI();
    }
}

// Update user UI with account info
function updateUserUI() {
    const currentUser = localStorage.getItem('currentUser');
    const userBtn = document.querySelector('.btn-user');
    if (currentUser && userBtn) {
        userBtn.textContent = currentUser.substring(0, 1).toUpperCase();
        userBtn.title = currentUser;
    }
}
