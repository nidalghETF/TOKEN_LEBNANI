document.addEventListener('DOMContentLoaded', () => {
    // Get base path for GitHub Pages project sites
    const basePath = window.location.pathname.split('/').slice(0, -1).join('/') || '/';
    
    // Insert mobile menu button
    const headerContainer = document.getElementById('header');
    if (headerContainer) {
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = '☰';
        mobileMenuButton.setAttribute('aria-label', 'Menu');
        headerContainer.appendChild(mobileMenuButton);
        
        mobileMenuButton.addEventListener('click', () => {
            const mobileNav = document.querySelector('.mobile-nav');
            if (mobileNav) {
                mobileNav.classList.toggle('active');
            }
        });
    }
    
    // Load header - DYNAMIC PATH
    loadComponent('header', basePath + '/includes/header.html');
    
    // Load navigation - DYNAMIC PATH
    loadComponent('navigation', basePath + '/includes/navigation.html', () => {
        setupNavigation();
        setupMobileNavigation();
    });
    
    // Load footer - DYNAMIC PATH
    loadComponent('footer', basePath + '/includes/footer.html');
});

function loadComponent(elementId, filePath, callback = null) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
            if (callback) callback();
        })
        .catch(error => {
            console.error(`Error loading ${filePath}:`, error);
            element.innerHTML = `<p>Error loading component. Please refresh the page.</p>`;
        });
}

function setupNavigation() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    const navLinks = document.querySelectorAll('#navigation a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

function setupMobileNavigation() {
    // Clone desktop navigation for mobile
    const desktopNav = document.querySelector('#navigation nav');
    if (!desktopNav) return;
    
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
    
    // Insert mobile navigation after desktop navigation
    const navContainer = document.getElementById('navigation');
    navContainer.appendChild(mobileNav);
    
    // Update active class on mobile links when page changes
    window.addEventListener('pageshow', () => {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop();
        
        mobileNav.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
}
