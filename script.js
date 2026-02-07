// Sample posts data
const SAMPLE_POSTS = [
    {
        id: 1,
        subreddit: "r/webdev",
        author: "TechGuru",
        time: "2 hours ago",
        title: "How I Built a Production-Grade Web App in 3 Weeks",
        preview: "Recently completed a major project and learned so much about modern web development practices. Here's what worked and what didn't...",
        image: "https://via.placeholder.com/600x300?text=Web+Development",
        upvotes: 2847,
        comments: 342,
        shares: 156
    },
    {
        id: 2,
        subreddit: "r/javascript",
        author: "CodeNinja",
        time: "4 hours ago",
        title: "React 19 is a Game Changer - My Honest Opinion",
        preview: "Just upgraded to React 19 and I have to say, the new features are incredible. The server components and automatic renders optimization...",
        image: "https://via.placeholder.com/600x300?text=React+19",
        upvotes: 1523,
        comments: 287,
        shares: 94
    },
    {
        id: 3,
        subreddit: "r/programming",
        author: "DevMaster",
        time: "5 hours ago",
        title: "The Best JavaScript Frameworks of 2026",
        preview: "After 15 years of web development, here's my comprehensive breakdown of the top frameworks and what makes them stand out...",
        image: null,
        upvotes: 3421,
        comments: 523,
        shares: 287
    },
    {
        id: 4,
        subreddit: "r/design",
        author: "DesignThinking",
        time: "6 hours ago",
        title: "UI Design Trends We're Seeing in 2026",
        preview: "The design world is evolving rapidly. From glassmorphism to new typography trends, here's what's hot right now in the UI space...",
        image: "https://via.placeholder.com/600x300?text=UI+Design+Trends",
        upvotes: 892,
        comments: 156,
        shares: 67
    },
    {
        id: 5,
        subreddit: "r/technology",
        author: "TechNews",
        time: "7 hours ago",
        title: "New WebAssembly Features Show Promise for Frontend Performance",
        preview: "The latest WebAssembly proposals could revolutionize how we build complex applications. Early benchmarks are showing 40% performance improvements...",
        image: "https://via.placeholder.com/600x300?text=WebAssembly",
        upvotes: 2156,
        comments: 412,
        shares: 203
    },
    {
        id: 6,
        subreddit: "r/webdev",
        author: "CSSMaster",
        time: "8 hours ago",
        title: "CSS Grid vs Flexbox: When to Use Each",
        preview: "A lot of developers still struggle with choosing between Grid and Flexbox. Let me break down when each one shines and give you a decision tree...",
        image: null,
        upvotes: 1678,
        comments: 234,
        shares: 89
    },
    {
        id: 7,
        subreddit: "r/javascript",
        author: "AsyncGenius",
        time: "9 hours ago",
        title: "Understanding Async/Await: A Deep Dive",
        preview: "Many developers use async/await without truly understanding what's happening under the hood. This guide will change how you write asynchronous code...",
        image: "https://via.placeholder.com/600x300?text=Async+Await",
        upvotes: 3892,
        comments: 567,
        shares: 345
    },
    {
        id: 8,
        subreddit: "r/programming",
        author: "AlgorithmPro",
        time: "10 hours ago",
        title: "Why You Should Learn Data Structures and Algorithms",
        preview: "Even though there are libraries for everything, understanding the fundamentals makes you a better programmer. Here's why...",
        image: null,
        upvotes: 2234,
        comments: 389,
        shares: 156
    }
];

// Posts state
let posts = JSON.parse(JSON.stringify(SAMPLE_POSTS));
let currentSort = 'hot';
let userVotes = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    setupEventListeners();
});

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

// Sort posts
function sortPosts(sortType) {
    switch(sortType) {
        case 'hot':
            posts.sort((a, b) => b.upvotes - a.upvotes);
            break;
        case 'new':
            posts.reverse();
            break;
        case 'top':
            posts.sort((a, b) => (b.upvotes + b.comments) - (a.upvotes + a.comments));
            break;
        case 'rising':
            posts.sort((a, b) => (b.upvotes + b.comments) * Math.random() - (a.upvotes + a.comments) * Math.random());
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

// Create post element
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.dataset.postId = post.id;

    const voteCount = parseInt(post.upvotes);
    const userVote = userVotes[post.id] || 0;
    const displayVotes = voteCount + userVote;

    postDiv.innerHTML = `
        <div class="post-votes">
            <button class="vote-btn upvote" data-vote="up" title="Upvote">▲</button>
            <div class="vote-count">${formatNumber(displayVotes)}</div>
            <button class="vote-btn downvote" data-vote="down" title="Downvote">▼</button>
        </div>
        <div class="post-content">
            <div class="post-header">
                <span class="post-subreddit">${post.subreddit}</span>
                <span>•</span>
                <span class="post-author">u/${post.author}</span>
                <span>•</span>
                <span class="post-time">${post.time}</span>
            </div>
            <h3 class="post-title">${escapeHtml(post.title)}</h3>
            ${post.preview ? `<p class="post-preview">${escapeHtml(post.preview)}</p>` : ''}
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image" onerror="this.style.display='none'">` : ''}
            <div class="post-footer">
                <div class="post-action">
                    <span class="post-action-icon">💬</span>
                    <span>${formatNumber(post.comments)}</span>
                </div>
                <div class="post-action">
                    <span class="post-action-icon">📤</span>
                    <span>${formatNumber(post.shares)}</span>
                </div>
                <div class="post-action">
                    <span class="post-action-icon">⋯</span>
                    <span>More</span>
                </div>
            </div>
        </div>
    `;

    // Add vote event listeners
    const upvote = postDiv.querySelector('.upvote');
    const downvote = postDiv.querySelector('.downvote');

    upvote.addEventListener('click', () => handleVote(post.id, 'up', upvote, downvote));
    downvote.addEventListener('click', () => handleVote(post.id, 'down', downvote, upvote));

    // Set initial vote state
    if (userVote === 1) {
        upvote.classList.add('upvoted');
    } else if (userVote === -1) {
        downvote.classList.add('downvoted');
    }

    // Add click handlers for title and subreddit
    const title = postDiv.querySelector('.post-title');
    const subreddit = postDiv.querySelector('.post-subreddit');
    const author = postDiv.querySelector('.post-author');

    title.addEventListener('click', () => handlePostClick(post, 'title'));
    subreddit.addEventListener('click', (e) => {
        e.stopPropagation();
        handlePostClick(post, 'subreddit');
    });
    author.addEventListener('click', (e) => {
        e.stopPropagation();
        handlePostClick(post, 'author');
    });

    // Comment button
    const commentAction = postDiv.querySelector('.post-action');
    commentAction.addEventListener('click', () => handlePostClick(post, 'comments'));

    return postDiv;
}

// Handle voting
function handleVote(postId, direction, button, oppositeButton) {
    const currentVote = userVotes[postId] || 0;
    let newVote = currentVote;

    if (direction === 'up') {
        newVote = currentVote === 1 ? 0 : 1;
    } else {
        newVote = currentVote === -1 ? 0 : -1;
    }

    userVotes[postId] = newVote;

    // Update UI
    button.classList.toggle('upvoted', newVote === 1);
    button.classList.toggle('downvoted', newVote === -1);
    oppositeButton.classList.remove('upvoted', 'downvoted');

    // Re-render vote count
    const post = posts.find(p => p.id === postId);
    const postEl = document.querySelector(`[data-post-id="${postId}"]`);
    const voteCount = postEl.querySelector('.vote-count');
    const displayVotes = parseInt(post.upvotes) + newVote;
    voteCount.textContent = formatNumber(displayVotes);

    // Save to localStorage
    localStorage.setItem('userVotes', JSON.stringify(userVotes));
}

// Handle post interactions
function handlePostClick(post, action) {
    let message = '';
    switch(action) {
        case 'title':
            message = `You clicked on: "${post.title}"`;
            break;
        case 'subreddit':
            message = `You clicked on: ${post.subreddit}`;
            break;
        case 'author':
            message = `You clicked on: u/${post.author}'s profile`;
            break;
        case 'comments':
            message = `Opening comments for: "${post.title}"`;
            break;
    }
    console.log(message);
    // In a real app, this would navigate or open a modal
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

// Load user votes from localStorage
function loadUserVotes() {
    const saved = localStorage.getItem('userVotes');
    if (saved) {
        userVotes = JSON.parse(saved);
    }
}

// Load votes on startup
loadUserVotes();
