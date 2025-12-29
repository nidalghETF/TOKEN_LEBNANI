/* js/includes.js - The "Try Everything" Loader */

async function fetchFile(filename) {
    // List of places to look for the file
    const pathsToTry = [
        `includes/${filename}`,           // 1. Try relative to current folder
        `../includes/${filename}`,        // 2. Try one folder up (for pages inside folders)
        `/Token-Lebnani/includes/${filename}`, // 3. Try GitHub repo path
        `Token-Lebnani/includes/${filename}`   // 4. Try GitHub repo path (relative)
    ];

    for (let path of pathsToTry) {
        try {
            const response = await fetch(path);
            if (response.ok) {
                console.log(`Found ${filename} at: ${path}`);
                return await response.text();
            }
        } catch (e) {
            // Keep trying next path
        }
    }
    console.error(`Gave up. Could not find ${filename} in any known location.`);
    return null; // Failed
}

async function loadComponent(elementId, filename) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const html = await fetchFile(filename);
    if (html) {
        element.innerHTML = html;
        
        // If this is the navigation, run the setup logic
        if (elementId === 'navigation') setupNavigation();
    }
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a, .mobile-nav a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        // Highlight active link
        if (currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });

    // Mobile Menu Button Logic
    const menuBtn = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (menuBtn && mobileNav) {
        // Remove old listeners to avoid duplicates
        const newBtn = menuBtn.cloneNode(true);
        menuBtn.parentNode.replaceChild(newBtn, menuBtn);
        
        newBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            newBtn.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
        });
    }
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', 'header.html');
    loadComponent('footer', 'footer.html');
    loadComponent('navigation', 'navigation.html');
});
