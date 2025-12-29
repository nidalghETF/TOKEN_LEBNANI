/* SIMPLE VERSION - No Dynamic Path Complexity */

// 1. Basic Load Function
async function loadComponent(elementId, filePath, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        // Try to fetch the file directly
        const response = await fetch(filePath);
        
        if (!response.ok) {
            // If it fails, log it but don't crash everything
            console.warn(`Could not load ${filePath}`);
            return;
        }
        
        const html = await response.text();
        element.innerHTML = html;
        
        if (callback) callback();

    } catch (error) {
        console.error(error);
    }
}

// 2. Navigation Logic
function setupNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('.mobile-nav');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
        });
    }
}

// 3. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    // If we are on GitHub and in a subfolder, we might need to adjust this.
    // But for now, let's try the direct relative path which works on Localhost.
    
    loadComponent('header', 'includes/header.html');
    loadComponent('footer', 'includes/footer.html');
    loadComponent('navigation', 'includes/navigation.html', setupNavigation);
});
