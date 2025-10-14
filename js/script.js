// js/script.js
// API call with fetch()
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Display actual data points: id, title, and body
        const posts = data.slice(0, 3); // Get first 3 posts
        let output = '<h3>Recent Posts from API:</h3>';
        
        posts.forEach(post => {
            output += `
                <div class="api-post">
                    <h4>${post.title}</h4>
                    <p><strong>ID:</strong> ${post.id}</p>
                    <p>${post.body}</p>
                </div>
            `;
        });
        
        // FIXED: Changed 'apiResponse' to 'output'
        document.getElementById('output').innerHTML = output;
        console.log('API Success:', data);
    })
    .catch(error => {
        console.error('API Error:', error);
        // FIXED: Changed 'apiResponse' to 'output'
        document.getElementById('output').innerHTML = 
            `<p class="api-error">API Error: ${error.message}</p>`;
    });
    