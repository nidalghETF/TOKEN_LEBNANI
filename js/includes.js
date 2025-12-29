// 1. DYNAMIC BASE PATH DETECTION
function getBasePath() {
    const path = window.location.pathname;
    const pathParts = path.split('/');
    // Check if the first part is a repo name (usually length > 0 and not 'pages')
    if (pathParts.length > 1 && pathParts[1] !== "" && pathParts[1] !== "pages") {
        return "/" + pathParts[1];
    }
    return "";
}

// Define basePath globally
const basePath = getBasePath();
console.log("Detected Base Path:", basePath);

// 2. COMPONENT LOADER (Updated to use basePath)
function loadComponent(elementId, filePath, callback = null) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // START FIX: Always prepend basePath to the file path
    // We pass paths like "/includes/header.html" and this adds the repo name automatically
    const fullPath = basePath + filePath;
    // END FIX

    fetch(fullPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${fullPath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
            if (callback) callback();
        })
        .catch(error => {
            console.error(`Error loading ${fullPath}:`, error);
        });
}

// 3. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    // Load header (Note: We removed "/TOKEN_LEBNANI" from here)
    loadComponent('header', '/includes/header.html');
    
    // Load navigation
    loadComponent('navigation', '/includes/navigation.html', () => {
        setupNavigation();
        setupMobileNavigation();
    });
    
    // Load footer
    loadComponent('footer', '/includes/footer.html');
});

// 4. NAVIGATION SETUP
function setupNavigation() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    const navLinks = document.querySelectorAll('#navigation a');
    navLinks.forEach(link => {
        // Fix links to use basePath if they don't already
        let href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith(basePath)) {
             link.setAttribute('href', basePath + href);
        }

        if (href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

// 5. MOBILE NAVIGATION
function setupMobileNavigation() {
    const headerContainer = document.getElementById('header');
    const desktopNav = document.querySelector('#navigation nav');
    
    if (!desktopNav || !headerContainer) return;
    
    // Create Button
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '☰';
    headerContainer.appendChild(mobileMenuButton); // Add button to Header
    
    // Create Menu Container
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    // Clone links
    const links = desktopNav.querySelectorAll('a');
    links.forEach(link => {
        const mobileLink = link.cloneNode(true);
        mobileLink.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
        mobileNav.appendChild(mobileLink);
    });
    
    // Add Menu to Header
    headerContainer.appendChild(mobileNav);

    // Toggle Click
    mobileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileNav.classList.toggle('active');
    });
    
    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && e.target !== mobileMenuButton) {
            mobileNav.classList.remove('active');
        }
    });
}

// 6. LOGOUT FUNCTION
window.logout = function() {
    console.log("Logging out...");
    localStorage.removeItem("siteAccess");
    window.location.href = basePath + "/index.html";
};
