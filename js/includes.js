document.addEventListener('DOMContentLoaded', () => {
    // Calculate base path for GitHub Pages project sites
    // This handles both root deployments and subdirectory deployments
    const getBasePath = () => {
        const pathParts = window.location.pathname.split('/').filter(part => part.length);
        // Remove 'pages' from the path if present
        if (pathParts.includes('pages')) {
            const pagesIndex = pathParts.indexOf('pages');
            pathParts.splice(pagesIndex, 1);
        }
        // For GitHub Pages project sites, the repo name is the first part
        return pathParts.length > 0 ? `/${pathParts.join('/')}` : '';
    };

    const basePath = getBasePath();
    console.log('Base path detected:', basePath);

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
    
    // Load components with correct paths
    loadComponent('header', `${basePath}/includes/header.html`);
    loadComponent('navigation', `${basePath}/includes/navigation.html`, () => {
        setupNavigation();
        setupMobileNavigation();
    });
    loadComponent('footer', `${basePath}/includes/footer.html`);
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
            // Fallback content if includes fail to load
            if (elementId === 'header') {
                element.innerHTML = '<header class="site-header"><div class="container"><img src="images/logo.png" alt="Token Lebnani Logo"></div></header>';
            } else if (elementId === 'navigation') {
                element.innerHTML = `
                <nav>
                    <a href="home.html">Home</a>
                    <a href="value-proposition.html">Value Proposition</a>
                    <a href="investors-deck.html">Investors Deck</a>
                    <a href="home-business-plan.html">Home Business Plan</a>
                    <a href="legal-framework.html">Legal Framework</a>
                    <a href="go-to-market.html">Go to Market</a>
                    <a href="yaz-consult-pitch.html">Yaz Consult Pitch</a>
                </nav>
                `;
                if (callback) callback();
            } else if (elementId === 'footer') {
                element.innerHTML = '<footer class="site-footer"><div class="footer-divider"></div><p>Token Lebnani &copy; 2025 | ADGM Regulated Platform<br>Abu Dhabi Global Market, Al Maryah Island<br><a href="#" onclick="logout(); return false;">Logout</a></p></footer>';
            }
        });
}

function setupNavigation() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
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
        const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        
        mobileNav.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
