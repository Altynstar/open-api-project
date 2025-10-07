// script.js - Basic API testing
console.log("Open API Project loaded!");

// Test with a simple public API
const testAPI = async () => {
    try {
        console.log("Testing API connection...");
        
        // Using JSONPlaceholder - a free fake API for testing
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API Response:", data);
        
        // Display basic info on page
        const output = document.getElementById('output');
        output.innerHTML = `
            <h3>API Test Successful! ✅</h3>
            <p>Received data from: ${response.url}</p>
            <p>Status: ${response.status} ${response.statusText}</p>
            <details>
                <summary>View API Response Data</summary>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            </details>
        `;
        
    } catch (error) {
        console.error("API Error:", error);
        const output = document.getElementById('output');
        output.innerHTML = `<p style="color: red;">API Error: ${error.message}</p>`;
    }
};

// Run the test when page loads
document.addEventListener('DOMContentLoaded', testAPI);
