// js/script.js - Enhanced with multiple data points
class ApiHandler {
    constructor() {
        this.currentDataType = 'posts'; // Default data type
        this.init();
    }

    init() {
        this.setupEventListeners();
        // Load default data (posts)
        this.fetchData('posts');
    }

    setupEventListeners() {
        // Navigation button clicks
        document.querySelectorAll('.nav-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const dataType = e.target.getAttribute('data-type');
                this.switchDataType(dataType);
            });
        });

        // Global event listeners for dynamic buttons
        document.addEventListener('click', (e) => {
            if (e.target.id === 'sort-btn') {
                this.sortData();
            }
            if (e.target.id === 'refresh-btn') {
                this.fetchData(this.currentDataType);
            }
        });
    }

    switchDataType(dataType) {
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-type="${dataType}"]`).classList.add('active');
        
        // Update current data type and fetch new data
        this.currentDataType = dataType;
        this.fetchData(dataType);
    }

    async fetchData(dataType) {
        const output = document.getElementById('output');
        
        // Show loading state
        output.innerHTML = `<div class="loading">Loading ${this.getDataTypeName(dataType)}...</div>`;

        try {
            const apiUrl = this.getApiUrl(dataType);
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.displayData(dataType, data);
            console.log(`API Success (${dataType}):`, data);
            
        } catch (error) {
            this.handleError(error);
        }
    }

    getApiUrl(dataType) {
        const baseUrl = 'https://jsonplaceholder.typicode.com';
        
        switch(dataType) {
            case 'posts':
                return `${baseUrl}/posts`;
            case 'users':
                return `${baseUrl}/users`;
            case 'comments':
                return `${baseUrl}/comments`;
            default:
                return `${baseUrl}/posts`;
        }
    }

    getDataTypeName(dataType) {
        const names = {
            'posts': 'blog posts',
            'users': 'users', 
            'comments': 'comments'
        };
        return names[dataType] || 'data';
    }

    displayData(dataType, data) {
        const output = document.getElementById('output');
        const displayData = data.slice(0, 6); // Show first 6 items

        let html = `
            <div class="api-header">
                <h3>${this.getDisplayTitle(dataType)}</h3>
                <p>Showing ${displayData.length} of ${data.length} available items</p>
                <div class="controls">
                    <button id="sort-btn" class="btn">Sort Data</button>
                    <button id="refresh-btn" class="btn">Refresh Data</button>
                </div>
            </div>
            <div class="data-container">
        `;

        // Use different display methods for different data types
        switch(dataType) {
            case 'posts':
                html += this.displayPosts(displayData);
                break;
            case 'users':
                html += this.displayUsers(displayData);
                break;
            case 'comments':
                html += this.displayComments(displayData);
                break;
        }

        html += `</div>`;
        output.innerHTML = html;
    }

    getDisplayTitle(dataType) {
        const titles = {
            'posts': '📝 Recent Blog Posts',
            'users': '👥 User Directory', 
            'comments': '💬 Recent Comments'
        };
        return titles[dataType] || 'API Data';
    }

    displayPosts(posts) {
        let html = '<div class="posts-grid">';
        
        posts.forEach(post => {
            html += `
                <div class="api-post" data-item-id="${post.id}">
                    <div class="post-header">
                        <span class="post-id">Post #${post.id}</span>
                        <h4 class="post-title">${this.capitalizeFirst(post.title)}</h4>
                    </div>
                    <p class="post-body">${post.body}</p>
                    <div class="post-actions">
                        <button class="action-btn" onclick="apiHandler.toggleItem('posts', ${post.id})">Toggle</button>
                        <button class="action-btn" onclick="apiHandler.showDetails('posts', ${post.id})">Details</button>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }

    displayUsers(users) {
        let html = '<div class="users-grid">';
        
        users.forEach(user => {
            html += `
                <div class="user-card" data-item-id="${user.id}">
                    <div class="user-header">
                        <span class="user-id">User #${user.id}</span>
                        <h4 class="user-name">${user.name}</h4>
                        <p class="user-username">@${user.username}</p>
                    </div>
                    <div class="user-info">
                        <p><strong>📧 Email:</strong> ${user.email}</p>
                        <p><strong>📞 Phone:</strong> ${user.phone}</p>
                        <p><strong>🌐 Website:</strong> ${user.website}</p>
                        <p><strong>🏢 Company:</strong> ${user.company.name}</p>
                        <p><strong>📍 Address:</strong> ${user.address.street}, ${user.address.city}</p>
                    </div>
                    <div class="user-actions">
                        <button class="action-btn" onclick="apiHandler.toggleItem('users', ${user.id})">Toggle Info</button>
                        <button class="action-btn" onclick="apiHandler.showDetails('users', ${user.id})">Full Profile</button>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }

    displayComments(comments) {
        let html = '<div class="comments-grid">';
        
        comments.forEach(comment => {
            html += `
                <div class="comment-card" data-item-id="${comment.id}">
                    <div class="comment-header">
                        <span class="comment-id">Comment #${comment.id}</span>
                        <h4 class="comment-name">${this.capitalizeFirst(comment.name)}</h4>
                        <p class="comment-email">📧 ${comment.email}</p>
                    </div>
                    <p class="comment-body">${comment.body}</p>
                    <div class="comment-meta">
                        <p><strong>Post ID:</strong> ${comment.postId}</p>
                    </div>
                    <div class="comment-actions">
                        <button class="action-btn" onclick="apiHandler.toggleItem('comments', ${comment.id})">Toggle</button>
                        <button class="action-btn" onclick="apiHandler.showDetails('comments', ${comment.id})">Details</button>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }

    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    toggleItem(dataType, itemId) {
        const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);
        itemElement.classList.toggle('item-collapsed');
    }

    showDetails(dataType, itemId) {
        // In a real app, you might fetch detailed info here
        alert(`Details for ${dataType} #${itemId}\n\nThis would show more detailed information in a real application.`);
    }

    sortData() {
        // This is a simplified sort - in a real app you'd implement proper sorting
        alert(`Sorting ${this.currentDataType}...\n\nIn a full implementation, this would sort the current data.`);
    }

    handleError(error) {
        const output = document.getElementById('output');
        output.innerHTML = `
            <div class="api-error">
                <h3>🚨 API Connection Failed</h3>
                <p><strong>Error:</strong> ${error.message}</p>
                <p>Please check your internet connection and try again.</p>
                <button onclick="apiHandler.fetchData(apiHandler.currentDataType)" class="btn">Retry</button>
            </div>
        `;
        console.error('API Error:', error);
    }
}

// Initialize the API handler
const apiHandler = new ApiHandler();
