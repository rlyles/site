document.addEventListener('DOMContentLoaded', function() {
    // Update welcome message based on time of day
    function updateWelcome() {
        const hour = new Date().getHours();
        const welcomeMsg = document.getElementById('welcome-message');
        
        if (hour < 12) {
            welcomeMsg.textContent = 'Good Morning:';
        } else if (hour < 18) {
            welcomeMsg.textContent = 'Good Afternoon:';
        } else {
            welcomeMsg.textContent = 'Good Evening:';
        }
    }
    
    // Update date and time
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        document.getElementById('datetime').textContent = now.toLocaleDateString(undefined, options);
    }
    
    // Initialize time-based elements
    updateWelcome();
    updateDateTime();
    setInterval(updateDateTime, 60000);
       
    // Bookmark data structure
    const bookmarkData = {
        folders: [
            {
                title: "e'erday",
                bookmarks: [
                    { title: "Reddit", uri: "https://www.reddit.com/" },
                    { title: "Reddit All", uri: "https://www.reddit.com/r/all/" },
                    { title: "Facebook", uri: "https://www.facebook.com/" },
                    { title: "Tildes", uri: "https://tildes.net/" },
                    { title: "FitGirl Repacks", uri: "https://fitgirl-repacks.site/" },
                    { title: "1337x", uri: "https://1337x.to/home/" },
                    { title: "IPTorrents", uri: "https://iptorrents.com/t" },
                    { title: "GazelleGames", uri: "https://gazellegames.net/torrents.php" },
                    { title: "AnimeBytes", uri: "https://animebytes.tv/torrents.php?action=advanced&search_type=title&sort=relevance&way=desc&hentai=2&showhidden=0&setdefault=Make+Default" },
                    { title: "Instrumentl", uri: "https://www.instrumentl.com/projects/90795#/matches" },
                    { title: "Gmail", uri: "https://mail.google.com/mail/u/0/#inbox" },
                    { title: "Blackbaud CRM", uri: "https://crm79525p.sky.blackbaud.com/79525p/webui/webshellpage.aspx?databasename=79525p#pageType=p&pageId=4bd0d07a-c1ad-49d4-b4a9-72114f1731d6&recordId=6f455b4e-239a-409e-9489-e3c0545aa57f" }
                ]
            },
        ],
        topBookmarks: [
            { title: "BoodleBox", uri: "https://box.boodle.ai/c/f0f24ab4-69b2-4e50-87bf-c378dc000283"},
            { title: "Portfolio", uri: "https://rlyles.com" }
        ]
    };
    
    // Function to get favicon
    function getFaviconUrl(uri) {
        try {
            const url = new URL(uri);
            return `https://www.google.com/s2/favicons?sz=64&domain=${url.hostname}`;
        } catch (e) {
            return null;
        }
    }
    
    // Function to create bookmark element
    function createBookmarkElement(bookmark) {
        const bookmarkEl = document.createElement('a');
        bookmarkEl.href = bookmark.uri;
        bookmarkEl.className = 'bookmark';
        bookmarkEl.target = '_blank';
        
        const iconContainer = document.createElement('div');
        iconContainer.className = 'bookmark-icon';
        
        const faviconUrl = getFaviconUrl(bookmark.uri);
        if (faviconUrl) {
            const img = document.createElement('img');
            img.src = faviconUrl;
            img.alt = '';
            img.onerror = function() {
                this.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'fallback';
                fallback.textContent = bookmark.title.charAt(0).toUpperCase();
                iconContainer.appendChild(fallback);
            };
            iconContainer.appendChild(img);
        } else {
            const fallback = document.createElement('div');
            fallback.className = 'fallback';
            fallback.textContent = bookmark.title.charAt(0).toUpperCase();
            iconContainer.appendChild(fallback);
        }
        
        // Create a shorter display title for very long URLs
        let displayTitle = bookmark.title;
        if (bookmark.title.length > 25) {
            displayTitle = bookmark.title.substring(0, 22) + '...';
        }
        
        const title = document.createElement('span');
        title.className = 'bookmark-title';
        title.textContent = displayTitle;
        title.title = bookmark.title; // Full title on hover
        
        bookmarkEl.appendChild(iconContainer);
        bookmarkEl.appendChild(title);
        
        return bookmarkEl;
    }
    
    // Function to create folder element
    function createFolderElement(folder) {
        const folderEl = document.createElement('div');
        folderEl.className = 'folder';
        
        const header = document.createElement('div');
        header.className = 'folder-header';
        header.innerHTML = `${folder.title} <i class="fas fa-chevron-down"></i>`;
        
        const content = document.createElement('div');
        content.className = 'folder-content';
        
        const grid = document.createElement('div');
        grid.className = 'bookmark-grid';
        
        folder.bookmarks.forEach(bookmark => {
            grid.appendChild(createBookmarkElement(bookmark));
        });
        
        content.appendChild(grid);
        folderEl.appendChild(header);
        folderEl.appendChild(content);
        
        // Add toggle functionality
        header.addEventListener('click', function() {
            this.classList.toggle('collapsed');
            content.classList.toggle('collapsed');
        });
        
        return folderEl;
    }
    
    // Render bookmarks
    function renderBookmarks() {
        const container = document.getElementById('bookmark-container');
        
        // Render top bookmarks if any
        if (bookmarkData.topBookmarks && bookmarkData.topBookmarks.length > 0) {
            const topSection = document.createElement('div');
            topSection.id = 'top-bookmarks';
            
            const topTitle = document.createElement('h2');
            topTitle.textContent = 'Quick Links';
            topSection.appendChild(topTitle);
            
            const topGrid = document.createElement('div');
            topGrid.className = 'bookmark-grid';
            
            bookmarkData.topBookmarks.forEach(bookmark => {
                topGrid.appendChild(createBookmarkElement(bookmark));
            });
            
            topSection.appendChild(topGrid);
            container.appendChild(topSection);
        }
        
        // Render folders
        bookmarkData.folders.forEach(folder => {
            container.appendChild(createFolderElement(folder));
        });
    }
    
    // Initialize bookmarks
    renderBookmarks();
    
    // Add search box to the page
    function addSearchBox() {
        const header = document.querySelector('header');
        
        // Create search container
        const searchContainer = document.createElement('div');
        searchContainer.id = 'search-container';
        
        // Create search form
        const searchForm = document.createElement('form');
        searchForm.id = 'search-form';
        searchForm.onsubmit = function() { return performSearch(); };
        
        // Create search input
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.id = 'search-box';
        searchInput.placeholder = 'Search...';
        searchInput.autocomplete = 'off';
        searchInput.autocapitalize = 'off';
        searchInput.autocorrect = 'off';
        searchInput.autofocus = true;
        
        // Append elements
        searchForm.appendChild(searchInput);
        searchContainer.appendChild(searchForm);
        
        // Insert after header
        header.parentNode.insertBefore(searchContainer, header.nextSibling);
        
        // Add CSS for search box
        const style = document.createElement('style');
        style.textContent = `
            #search-container {
                margin-bottom: 20px;
                padding: 0 15px;
            }
            
            #search-form {
                width: 100%;
            }
            
            #search-box {
                width: 100%;
                padding: 12px 15px;
                font-family: 'JetBrains Mono', 'Consolas', 'Courier New', monospace;
                font-size: 1rem;
                color: var(--text-primary);
                background-color: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 6px;
                outline: none;
                transition: border-color 0.2s, box-shadow 0.2s;
            }
            
            #search-box:focus {
                border-color: var(--accent-color);
                box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.2);
            }
        `;
        document.head.appendChild(style);
        
        // Focus the search box
        setTimeout(function() {
            searchInput.focus();
        }, 100);
    }
    
    // Add the search box
    addSearchBox();
    
    // Define the performSearch function
    window.performSearch = function() {
        const query = document.getElementById('search-box').value.trim();
        if (query) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            document.getElementById('search-box').value = '';
        }
        return false; // Prevent form submission
    };
    
    // Add event listener for the Enter key
    document.getElementById('search-box').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // Force focus on mobile devices
    function forceFocus() {
        const searchBox = document.getElementById('search-box');
        if (searchBox) {
            searchBox.focus();
            // For iOS devices
            searchBox.blur();
            searchBox.focus();
        }
    }
    
    // Call forceFocus on page load and after a short delay
    forceFocus();
    setTimeout(forceFocus, 500);
    
    // Also try to focus on visibility change (when user returns to the tab)
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            setTimeout(forceFocus, 100);
        }
    });
    
    // Add touch event listener for mobile devices
    document.addEventListener('touchstart', function() {
        setTimeout(forceFocus, 100);
    }, { once: true });
});