// script.js - Clean and professional
document.addEventListener('DOMContentLoaded', function() {
    const postsBtn = document.getElementById('posts-btn');
    const usersBtn = document.getElementById('users-btn');
    const dataContainer = document.getElementById('data-container');

    function setActiveButton(activeBtn) {
        [postsBtn, usersBtn].forEach(btn => {
            btn.classList.toggle('active', btn === activeBtn);
        });
    }

    postsBtn.addEventListener('click', async () => {
        setActiveButton(postsBtn);
        await loadPosts();
    });

    usersBtn.addEventListener('click', async () => {
        setActiveButton(usersBtn);
        await loadUsers();
    });

    async function loadPosts() {
        dataContainer.innerHTML = '<div class="loading">Loading blog posts...</div>';
        
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const posts = await response.json();
            displayPosts(posts.slice(0, 6));
        } catch (error) {
            dataContainer.innerHTML = `<div class="error">Error loading posts: ${error.message}</div>`;
        }
    }

    async function loadUsers() {
        dataContainer.innerHTML = '<div class="loading">Loading users...</div>';
        
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await response.json();
            displayUsers(users.slice(0, 4));
        } catch (error) {
            dataContainer.innerHTML = `<div class="error">Error loading users: ${error.message}</div>`;
        }
    }

    function displayPosts(posts) {
        let html = '<div class="data-grid">';
        
        posts.forEach(post => {
            html += `
                <div class="card">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <p><small>Post ID: ${post.id}</small></p>
                </div>
            `;
        });
        
        html += '</div>';
        dataContainer.innerHTML = html;
    }

    function displayUsers(users) {
        let html = '<div class="data-grid">';
        
        users.forEach(user => {
            html += `
                <div class="card">
                    <h3>${user.name}</h3>
                    <p>📧 ${user.email}</p>
                    <p>📞 ${user.phone}</p>
                    <p>🌐 ${user.website}</p>
                    <p><small>@${user.username}</small></p>
                </div>
            `;
        });
        
        html += '</div>';
        dataContainer.innerHTML = html;
    }

    // Load posts by default
    loadPosts();
});
