/* js/includes.js - FIXED VERSION */

// 1. DYNAMIC BASE PATH DETECTION
function getBasePath() {
    // If we are on your PC (localhost or 127.0.0.1)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return ''; // Return empty string (Look in current folder)
    }
    
    // If we are on GitHub Pages (or any real server)
    // We grab the project name automatically from the URL
    const pathSegments = window.location.pathname.split('/');
    if (pathSegments.length > 1 && pathSegments[1] !== '') {
        return '/' + pathSegments[1];
    }
    
    return '';
}

const basePath = getBasePath();
console.log('Detected Base Path:', basePath); // Check console to see what it picked

// 2. LOAD COMPONENT FUNCTION
async function loadComponent(elementId, filePath, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        // Construct the path carefully to avoid double slashes
        // If basePath is empty, target is "includes/header.html"
        // If basePath is "/Repo", target is "/Repo/includes/header.html"
        
        const cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
        const finalPath = basePath ? `${basePath}/${cleanPath}` : cleanPath;

        const response = await fetch(finalPath);
        
        if (!response.ok) {
            throw new Error(`Failed to load ${finalPath}: ${response.status} ${response.statusText}`);
        }
        
        const html = await response.text();
        element.innerHTML = html;
        
        // Run the callback (usually for navigation highlighting)
        if (callback) callback();

    } catch (error) {
        console.error(error);
        // Optional: Show error on screen so you know it failed
        // element.innerHTML = `<div style="color:red">Error loading ${elementId}</div>`;
    }
}

// 3. NAVIGATION HIGHLIGHT LOGIC
function setupNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        // Handle links that might use absolute or relative paths
        const href = link.getAttribute('href');
        const linkPage = href.split('/').pop();
        
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
        
        // FIX: Ensure links in the menu point to the correct place
        // If the link doesn't start with http/https, prepend base path
        if (basePath && !href.startsWith('http') && !href.startsWith(basePath)) {
            const cleanHref = href.startsWith('/') ? href.substring(1) : href;
            link.setAttribute('href', `${basePath}/${cleanHref}`);
        }
    });
    
    // Mobile Menu Toggle Logic (Re-attach listener after nav loads)
    const menuBtn = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('.mobile-nav');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
        });
    }
}

// 4. INITIALIZATION (Run when page loads)
document.addEventListener('DOMContentLoaded', () => {
    // Note: We provide relative paths "includes/..."
    loadComponent('header', 'includes/header.html');
    loadComponent('footer', 'includes/footer.html');
    
    // Load Navigation, then run setupNavigation
    loadComponent('navigation', 'includes/navigation.html', setupNavigation);
});
