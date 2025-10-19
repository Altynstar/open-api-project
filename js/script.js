// js/script.js - Simplified version
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
        // Navigation button clicks only
        document.querySelectorAll('.nav-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const dataType = e.target.getAttribute('data-type');
                this.switchDataType(dataType);
            });
        });
        
        // REMOVED: Global event listeners for sort, refresh buttons
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
        
        // REMOVED: comments case
        if (dataType === 'posts') {
            return `${baseUrl}/posts`;
        } else if (dataType === 'users') {
            return `${baseUrl}/users`;
        } else {
            return `${baseUrl}/posts`;
        }
    }

    getDataTypeName(dataType) {
        // REMOVED: comments from the list
        if (dataType === 'posts') return 'blog posts';
        if (dataType === 'users') return 'users';
        return 'data';
    }

    displayData(dataType, data) {
        const output = document.getElementById('output');
        const displayData = data.slice(0, 6); // Show first 6 items

        let html = `
            <div class="api-header">
                <h3>${this.getDisplayTitle(dataType)}</h3>
                <p>Showing ${displayData.length} of ${data.length} available items</p>
                <!-- REMOVED: controls div with sort and refresh buttons -->
            </div>
            <div class="data-container">
        `;

        // REMOVED: comments case
        if (dataType === 'posts') {
            html += this.displayPosts(displayData);
        } else if (dataType === 'users') {
            html += this.displayUsers(displayData);
        }

        html += `</div>`;
        output.innerHTML = html;
    }

    getDisplayTitle(dataType) {
        // REMOVED: comments from the list
        if (dataType === 'posts') return '📝 Recent Blog Posts';
        if (dataType === 'users') return '👥 User Directory';
        return 'API Data';
    }

    displayPosts(posts) {
        let html = '<div class="posts-grid">';
        
        posts.forEach(post => {
            html += `
                <div class="api-post">
                    <div class="post-header">
                        <span class="post-id">Post #${post.id}</span>
                        <h4 class="post-title">${this.capitalizeFirst(post.title)}</h4>
                    </div>
                    <p class="post-body">${post.body}</p>
                    <!-- REMOVED: post-actions div with Toggle and Details buttons -->
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
                <div class="user-card">
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
                    </div>
                    <!-- REMOVED: user-actions div with Toggle Info and Full Profile buttons -->
                </div>
            `;
        });

        html += '</div>';
        return html;
    }

    // REMOVED: displayComments function entirely

    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // REMOVED: toggleItem function

    // REMOVED: showDetails function

    // REMOVED: sortData function

    handleError(error) {
        const output = document.getElementById('output');
        output.innerHTML = `
            <div class="api-error">
                <h3>🚨 API Connection Failed</h3>
                <p><strong>Error:</strong> ${error.message}</p>
                <p>Please check your internet connection and try again.</p>
                <!-- REMOVED: Retry button -->
            </div>
        `;
        console.error('API Error:', error);
    }
}

// Initialize the API handler
const apiHandler = new ApiHandler();
