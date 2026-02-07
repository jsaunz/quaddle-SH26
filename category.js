// category.js - render posts filtered by category

function qs(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

function escapeHtml(text) {
    const element = document.createElement('div');
    element.textContent = text;
    return element.innerHTML;
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.dataset.postId = post.id;

    const userFavorites = JSON.parse(localStorage.getItem('userFavorites') || '{}');
    const isFavorited = userFavorites[post.id] || false;
    const stars = '⭐'.repeat(Math.floor(post.rating));

    postDiv.innerHTML = `
        <div class="post-content">
            ${post.image ? `<img src="${post.image}" alt="${post.provider}" class="post-image" onerror="this.style.display='none'">` : ''}
            <div class="post-header">
                <span class="post-subreddit">${post.category}</span>
                <span>•</span>
                <span class="post-time">${post.time}</span>
            </div>
            <h3 class="post-title">${escapeHtml(post.title)}</h3>
            <div class="post-provider">${escapeHtml(post.provider)}</div>
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
                <button class="post-action details-btn">
                    <span class="post-action-icon">ℹ️</span>
                    <span>Details</span>
                </button>
            </div>
        </div>
    `;

    const title = postDiv.querySelector('.post-title');
    const bookBtn = postDiv.querySelector('.book-btn');
    const favoriteBtn = postDiv.querySelector('.favorite-btn');
    const detailsBtn = postDiv.querySelector('.details-btn');

    title.addEventListener('click', () => {
        alert(`Opening: ${post.provider}\n\nService: ${post.title}`);
    });
    bookBtn.addEventListener('click', () => {
        alert(`Book an appointment at ${post.provider}!`);
    });
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const favs = JSON.parse(localStorage.getItem('userFavorites') || '{}');
        favs[post.id] = !favs[post.id];
        localStorage.setItem('userFavorites', JSON.stringify(favs));
        // Update icon
        const icon = favoriteBtn.querySelector('.post-action-icon');
        if (favs[post.id]) {
            favoriteBtn.classList.add('favorited');
            icon.textContent = '❤️';
        } else {
            favoriteBtn.classList.remove('favorited');
            icon.textContent = '🤍';
        }
    });
    detailsBtn.addEventListener('click', () => {
        window.location.href = `details.html?id=${post.id}`;
    });

    return postDiv;
}

document.addEventListener('DOMContentLoaded', () => {
    const categoryParam = qs('category') || '';
    const titleEl = document.getElementById('categoryTitle');
    const container = document.getElementById('postsContainer');
    const backBtn = document.getElementById('backBtn');

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    titleEl.textContent = categoryParam;

    let posts = [];
    try {
        posts = JSON.parse(localStorage.getItem('postsData') || '[]');
    } catch (e) {
        posts = [];
    }

    const filtered = posts.filter(p => p.category === categoryParam);

    if (filtered.length === 0) {
        container.innerHTML = '<p>No services found for this category.</p>';
        return;
    }

    filtered.forEach(post => {
        const el = createPostElement(post);
        container.appendChild(el);
    });
});
