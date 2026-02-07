// details.js - populate service details and reviews

function qs(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

function renderStars(rating) {
    const full = Math.floor(rating);
    return '⭐'.repeat(full) + (rating % 1 >= 0.5 ? '✶' : '');
}

function formatDate(iso) {
    try {
        return new Date(iso).toLocaleString();
    } catch (e) {
        return iso;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const id = parseInt(qs('id'), 10);
    const serviceDetailEl = document.getElementById('serviceDetail');
    const reviewsListEl = document.getElementById('reviewsList');
    const backBtn = document.getElementById('backBtn');

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    let posts = [];
    try {
        posts = JSON.parse(localStorage.getItem('postsData') || '[]');
    } catch (e) {
        posts = [];
    }

    const post = posts.find(p => p.id === id);
    if (!post) {
        serviceDetailEl.innerHTML = '<p>Service not found.</p>';
        reviewsListEl.textContent = '';
        return;
    }

    serviceDetailEl.innerHTML = `
        <div class="post">
            ${post.image ? `<img src="${post.image}" alt="${post.provider}" class="post-image" onerror="this.style.display='none'">` : ''}
            <div style="padding:12px;">
                <h2 class="post-title">${escapeHtml(post.title)}</h2>
                <div class="post-provider">${escapeHtml(post.provider)} • ${post.time}</div>
                <div class="post-rating" style="margin:8px 0;">
                    <span class="rating-stars">${renderStars(post.rating)}</span>
                    <span style="margin-left:8px;">${post.rating} • ${post.reviews} reviews</span>
                    <span style="margin-left:8px;">${post.price}</span>
                </div>
                <p style="margin-top:12px;">${escapeHtml(post.preview)}</p>
                <p style="margin-top:8px; color:var(--text-secondary);">Category: ${escapeHtml(post.category)}</p>
            </div>
        </div>
    `;

    // Load reviews from localStorage userReviews (keyed by provider name)
    let userReviews = {};
    try {
        userReviews = JSON.parse(localStorage.getItem('userReviews') || '{}');
    } catch (e) {
        userReviews = {};
    }

    const providerKey = post.provider;
    const reviews = userReviews[providerKey] || [];

    if (reviews.length === 0) {
        reviewsListEl.innerHTML = '<p>No reviews yet. Be the first to review this service.</p>';
    } else {
        reviewsListEl.innerHTML = reviews.map(r => `
            <div class="review-item" style="border-bottom:1px solid #eee; padding:8px 0;">
                <div style="font-weight:600;">${renderStars(r.rating)} <span style="font-weight:400; margin-left:8px; color:var(--text-secondary);">by ${escapeHtml(r.rater || 'Anonymous')} • ${formatDate(r.timestamp)}</span></div>
                ${r.comment ? `<div style="margin-top:6px;">${escapeHtml(r.comment)}</div>` : ''}
            </div>
        `).join('');
    }
});

// Minimal escapeHtml (same logic used in main script)
function escapeHtml(text) {
    const element = document.createElement('div');
    element.textContent = text;
    return element.innerHTML;
}
