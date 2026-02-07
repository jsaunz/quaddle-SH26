// Profile page functionality

let currentUser = null;

// Initialize profile page
function initializeProfile() {
    currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        document.getElementById('notLoggedIn').style.display = 'block';
        document.getElementById('profileView').style.display = 'none';
        document.getElementById('authForms').style.display = 'none';
    } else {
        document.getElementById('notLoggedIn').style.display = 'none';
        document.getElementById('profileView').style.display = 'block';
        document.getElementById('authForms').style.display = 'none';
        loadProfileData();
    }

    setupFormListeners();
}

// Load and display profile data
function loadProfileData() {
    const userAccount = localStorage.getItem('userAccount');
    if (!userAccount) return;

    const account = JSON.parse(userAccount);
    const userInitial = account.username.charAt(0).toUpperCase();

    document.getElementById('profileUsername').textContent = account.username;
    document.getElementById('profileEmail').textContent = account.email;
    document.getElementById('profileAvatar').textContent = userInitial;

    loadUserPosts();
    loadUserReviews();
}

// Load and display user's posts
function loadUserPosts() {
    const userPosts = getUserPosts(currentUser);
    const postsSection = document.getElementById('postsSection');

    if (userPosts.length === 0) {
        postsSection.innerHTML = `
            <div class="empty-state">
                <p>You haven't posted any services yet.</p>
                <button class="btn-create-post" onclick="showCreatePostModal()">Create Your First Post</button>
            </div>
        `;
    } else {
        const postsList = document.createElement('div');
        postsList.className = 'posts-list';

        userPosts.forEach(post => {
            const postItem = document.createElement('div');
            postItem.className = 'post-item';
            postItem.innerHTML = `
                <div class="post-item-info">
                    <div class="post-item-title">${escapeHtml(post.title)}</div>
                    <div class="post-item-provider">${escapeHtml(post.provider)} • ${post.category}</div>
                    <div class="post-item-preview">${escapeHtml(post.preview)}</div>
                </div>
                <div class="post-item-actions">
                    <button class="btn-edit" onclick="editPost(${post.id})">Edit</button>
                    <button class="btn-delete" onclick="deletePost(${post.id})">Delete</button>
                </div>
            `;
            postsList.appendChild(postItem);
        });

        postsSection.innerHTML = '';
        postsSection.appendChild(postsList);
    }

    document.getElementById('postCount').textContent = userPosts.length;
}

// Load and display user's reviews
function loadUserReviews() {
    const userReviews = getUserReviewsReceived(currentUser);
    const reviewsSection = document.getElementById('reviewsSection');
    const reviewCount = userReviews.length;

    document.getElementById('reviewCount').textContent = reviewCount;

    if (reviewCount === 0) {
        reviewsSection.innerHTML = '<div class="no-reviews">No reviews yet</div>';
        document.getElementById('ratingDisplay').textContent = 'N/A';
    } else {
        const avgRating = calculateAverageRating(userReviews);
        document.getElementById('ratingDisplay').textContent = avgRating.toFixed(1);

        let html = '';
        userReviews.forEach(review => {
            const date = new Date(review.timestamp).toLocaleDateString();
            const stars = '⭐'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            html += `
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-author">${escapeHtml(review.rater)}</span>
                        <div>
                            <span class="review-rating">${stars}</span>
                            <span class="review-time">${date}</span>
                        </div>
                    </div>
                    ${review.comment ? `<div class="review-comment">${escapeHtml(review.comment)}</div>` : ''}
                </div>
            `;
        });

        reviewsSection.innerHTML = html;
    }
}

// Show login form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('authForms').style.display = 'block';
    document.getElementById('notLoggedIn').style.display = 'none';
}

// Show signup form
function showSignupForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('authForms').style.display = 'block';
    document.getElementById('notLoggedIn').style.display = 'none';
}

// Hide auth forms
function hideAuthForms() {
    document.getElementById('authForms').style.display = 'none';
    document.getElementById('notLoggedIn').style.display = 'block';
}

// Handle login
function handleLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }

    const userAccount = localStorage.getItem('userAccount');
    if (!userAccount) {
        alert('No account found. Please create an account first.');
        return;
    }

    const account = JSON.parse(userAccount);
    if (account.username !== username || account.password !== password) {
        alert('Invalid username or password');
        return;
    }

    localStorage.setItem('currentUser', username);
    currentUser = username;
    
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('authForms').style.display = 'none';
    
    initializeProfile();
}

// Handle signup
function handleSignup() {
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirm').value;

    if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const existingAccount = localStorage.getItem('userAccount');
    if (existingAccount) {
        const existing = JSON.parse(existingAccount);
        if (existing.username === username) {
            alert('Username already taken');
            return;
        }
    }

    const account = {
        username: username,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };

    localStorage.setItem('userAccount', JSON.stringify(account));
    localStorage.setItem('currentUser', username);

    document.getElementById('signupUsername').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupConfirm').value = '';
    document.getElementById('authForms').style.display = 'none';
    
    currentUser = username;
    initializeProfile();

    alert('Account created successfully!');
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('currentUser');
        currentUser = null;
        initializeProfile();
    }
}

// Show create post modal
function showCreatePostModal() {
    document.getElementById('createPostModal').classList.add('active');
    document.getElementById('createPostForm').reset();
}

// Close create post modal
function closeCreatePostModal() {
    document.getElementById('createPostModal').classList.remove('active');
}

// Setup form listeners
function setupFormListeners() {
    const createPostForm = document.getElementById('createPostForm');
    if (createPostForm) {
        createPostForm.addEventListener('submit', handleCreatePost);
    }

    // Close modal when clicking outside
    document.getElementById('createPostModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCreatePostModal();
        }
    });
}

// Handle create post
function handleCreatePost(e) {
    e.preventDefault();

    const post = {
        id: generatePostId(),
        category: document.getElementById('postCategory').value,
        provider: document.getElementById('postProvider').value,
        time: document.getElementById('postDistance').value,
        title: document.getElementById('postTitle').value,
        preview: document.getElementById('postDescription').value,
        image: document.getElementById('postImage').value,
        rating: 5.0,
        reviews: 0,
        price: document.getElementById('postPrice').value,
        createdBy: currentUser
    };

    saveUserPost(post);
    closeCreatePostModal();
    loadUserPosts();
    alert('Post created successfully!');
}

// Delete post
function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        const userPosts = getUserPosts(currentUser);
        const filtered = userPosts.filter(p => p.id !== postId);
        localStorage.setItem(`userPosts_${currentUser}`, JSON.stringify(filtered));
        loadUserPosts();
    }
}

// Edit post
function editPost(postId) {
    alert('Edit functionality coming soon!');
}

// Utility functions

function escapeHtml(text) {
    const element = document.createElement('div');
    element.textContent = text;
    return element.innerHTML;
}

function generatePostId() {
    return Date.now();
}

function getUserPosts(username) {
    const saved = localStorage.getItem(`userPosts_${username}`);
    return saved ? JSON.parse(saved) : [];
}

function saveUserPost(post) {
    const userPosts = getUserPosts(currentUser);
    userPosts.push(post);
    localStorage.setItem(`userPosts_${currentUser}`, JSON.stringify(userPosts));
}

function getUserReviewsReceived(username) {
    const allReviews = localStorage.getItem('userReviews');
    if (!allReviews) return [];
    
    const reviews = JSON.parse(allReviews);
    return reviews[username] || [];
}

function calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeProfile);
