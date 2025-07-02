// Gallery-specific JavaScript functionality
$(document).ready(function() {
    console.log('Gallery page JavaScript initialized');
    
    // Gallery filter functionality
    initGalleryFilters();
    
    // Enhanced gallery modal
    initEnhancedGalleryModal();
    
    // Load more functionality
    initLoadMore();
    
    // Image lazy loading for gallery
    initGalleryLazyLoading();
    
    function initGalleryFilters() {
        console.log('Initializing gallery filters');
        
        $('.filter-btn').on('click', function() {
            const filter = $(this).data('filter');
            const $this = $(this);
            
            // Update active filter
            $('.filter-btn').removeClass('active');
            $this.addClass('active');
            
            // Filter gallery items with animation
            $('.gallery-item').each(function() {
                const $item = $(this).parent();
                const category = $(this).data('category');
                
                if (filter === 'all' || category === filter) {
                    $item.fadeIn(300).css('display', 'block');
                } else {
                    $item.fadeOut(300);
                }
            });
            
            // Update URL hash for bookmarking
            if (filter !== 'all') {
                window.location.hash = `filter-${filter}`;
            } else {
                window.location.hash = '';
            }
            
            console.log('Gallery filtered by:', filter);
        });
        
        // Check for filter in URL on page load
        const hash = window.location.hash;
        if (hash.startsWith('#filter-')) {
            const filter = hash.replace('#filter-', '');
            $(`.filter-btn[data-filter="${filter}"]`).click();
        }
    }
    
    function initEnhancedGalleryModal() {
        console.log('Initializing enhanced gallery modal');
        
        // Create enhanced modal if it doesn't exist
        if (!$('.gallery-modal').length) {
            $('body').append(`
                <div class="gallery-modal">
                    <div class="modal-content">
                        <button class="modal-close">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="modal-image-container">
                            <img class="modal-image" src="" alt="">
                            <div class="image-loading">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-info">
                            <div class="modal-header">
                                <h3 class="modal-title"></h3>
                                <div class="modal-colors"></div>
                            </div>
                            <p class="modal-price"></p>
                            <p class="modal-description"></p>
                            <div class="modal-features">
                                <div class="feature-item">
                                    <i class="fas fa-hand-holding-heart"></i>
                                    <span>Handcrafted</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-shipping-fast"></i>
                                    <span>Free Shipping</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-award"></i>
                                    <span>Quality Guaranteed</span>
                                </div>
                            </div>
                            <div class="modal-buttons">
                                <button class="btn btn-primary btn-lg inquire-btn">
                                    <i class="fas fa-envelope me-2"></i>
                                    Inquire Now
                                </button>
                                <button class="btn btn-outline-primary btn-lg wishlist-btn">
                                    <i class="fas fa-heart me-2"></i>
                                    Add to Wishlist
                                </button>
                            </div>
                            <div class="modal-footer">
                                <p class="text-muted">
                                    <i class="fas fa-info-circle me-1"></i>
                                    Each piece is unique and may vary slightly from the image shown.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
        
        const modal = $('.gallery-modal');
        const modalImage = $('.modal-image');
        const modalTitle = $('.modal-title');
        const modalPrice = $('.modal-price');
        const modalDescription = $('.modal-description');
        const modalColors = $('.modal-colors');
        const imageLoading = $('.image-loading');
        
        // Open modal when gallery item is clicked
        $(document).on('click', '.gallery-item, .product-card', function(e) {
            e.preventDefault();
            console.log('Gallery item clicked for modal');
            
            const $item = $(this);
            const imageSrc = $item.find('img').attr('src');
            const title = $item.data('title');
            const price = $item.data('price');
            const description = $item.data('description');
            const colors = $item.find('.color-dot');
            
            // Show loading state
            imageLoading.show();
            modalImage.hide();
            
            // Set modal content
            modalTitle.text(title);
            modalPrice.text(price);
            modalDescription.text(description);
            
            // Clone color dots
            modalColors.empty();
            colors.each(function() {
                const colorClone = $(this).clone();
                modalColors.append(colorClone);
            });
            
            // Load image
            const img = new Image();
            img.onload = function() {
                modalImage.attr('src', imageSrc).show();
                imageLoading.hide();
            };
            img.src = imageSrc;
            
            // Show modal
            modal.addClass('show').fadeIn(300);
            $('body').addClass('modal-open').css('overflow', 'hidden');
            
            // Add entrance animation
            $('.modal-content').addClass('animate__animated animate__zoomIn');
        });
        
        // Close modal functionality
        $('.modal-close, .gallery-modal').on('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
        
        // Inquire button functionality
        $(document).on('click', '.inquire-btn', function() {
            const title = modalTitle.text();
            const price = modalPrice.text();
            
            // Redirect to contact page with pre-filled info
            const contactUrl = `contact.html?product=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`;
            window.location.href = contactUrl;
        });
        
        // Wishlist functionality
        $(document).on('click', '.wishlist-btn', function() {
            const $btn = $(this);
            const title = modalTitle.text();
            
            // Toggle wishlist state
            if ($btn.hasClass('wishlisted')) {
                removeFromWishlist(title);
                $btn.removeClass('wishlisted')
                   .html('<i class="fas fa-heart me-2"></i>Add to Wishlist');
                showNotification('Removed from wishlist', 'info');
            } else {
                addToWishlist(title);
                $btn.addClass('wishlisted')
                   .html('<i class="fas fa-heart-broken me-2"></i>Remove from Wishlist');
                showNotification('Added to wishlist!', 'success');
            }
        });
        
        function closeModal() {
            console.log('Closing gallery modal');
            modal.removeClass('show').fadeOut(300);
            $('body').removeClass('modal-open').css('overflow', 'auto');
            $('.modal-content').removeClass('animate__animated animate__zoomIn');
        }
        
        // Close with escape key
        $(document).keyup(function(e) {
            if (e.keyCode === 27 && modal.hasClass('show')) {
                closeModal();
            }
        });
    }
    
    function initLoadMore() {
        console.log('Initializing load more functionality');
        
        let currentPage = 1;
        const itemsPerPage = 8;
        
        $('#load-more').on('click', function() {
            const $btn = $(this);
            const originalText = $btn.html();
            
            // Show loading state
            $btn.html('<i class="fas fa-spinner fa-spin me-2"></i>Loading More...').prop('disabled', true);
            
            // Simulate loading more items
            setTimeout(() => {
                loadMoreItems();
                $btn.html(originalText).prop('disabled', false);
                currentPage++;
                
                // Hide button after certain number of loads
                if (currentPage > 3) {
                    $btn.fadeOut(300, function() {
                        $btn.parent().append('<p class="text-muted text-center">You\'ve seen all our amazing pieces! Check back soon for new additions.</p>');
                    });
                }
            }, 1500);
        });
        
        function loadMoreItems() {
            const moreItems = [
                {
                    category: 'home-decor',
                    title: 'Sunset Serving Board',
                    price: '$38',
                    description: 'Wooden serving board with stunning sunset resin pour',
                    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
                    colors: ['#ff6b6b', '#ffa726', '#fff59d']
                },
                {
                    category: 'jewelry',
                    title: 'Ocean Wave Ring',
                    price: '$42',
                    description: 'Sterling silver ring with blue resin wave design',
                    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
                    colors: ['#1976d2', '#ffffff', '#90caf9']
                },
                {
                    category: 'accessories',
                    title: 'Galaxy Phone Case',
                    price: '$25',
                    description: 'Protective phone case with cosmic resin design',
                    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop',
                    colors: ['#673ab7', '#000000', '#9c27b0']
                }
            ];
            
            moreItems.forEach((item, index) => {
                const colorDots = item.colors.map(color => `<span class="color-dot" style="background: ${color};"></span>`).join('');
                
                const itemHtml = `
                    <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${index * 100}">
                        <div class="gallery-item product-card" 
                             data-category="${item.category}"
                             data-title="${item.title}"
                             data-price="${item.price}"
                             data-description="${item.description}"
                             data-image="${item.image}">
                            <div class="product-image">
                                <img src="${item.image}" alt="${item.title}">
                                <div class="product-overlay">
                                    <div class="overlay-content">
                                        <i class="fas fa-search-plus"></i>
                                        <p>Click to view details</p>
                                    </div>
                                </div>
                                <span class="product-badge">${item.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                            </div>
                            <div class="product-info">
                                <h4 class="product-title">${item.title}</h4>
                                <p class="product-description">${item.description}</p>
                                <div class="product-colors">
                                    ${colorDots}
                                </div>
                                <div class="product-footer">
                                    <span class="product-price">${item.price}</span>
                                    <button class="btn btn-sm btn-outline-primary">Inquire</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                $('#gallery-grid').append(itemHtml);
            });
            
            // Reinitialize AOS for new items
            AOS.refresh();
            
            console.log('Loaded more gallery items');
        }
    }
    
    function initGalleryLazyLoading() {
        console.log('Initializing gallery lazy loading');
        
        const lazyImages = document.querySelectorAll('.product-image img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Add loading animation
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.3s ease';
                        
                        const tempImg = new Image();
                        tempImg.onload = function() {
                            img.style.opacity = '1';
                        };
                        tempImg.src = img.src;
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
    
    // Wishlist functionality
    function addToWishlist(itemTitle) {
        let wishlist = JSON.parse(localStorage.getItem('resinWishlist')) || [];
        if (!wishlist.includes(itemTitle)) {
            wishlist.push(itemTitle);
            localStorage.setItem('resinWishlist', JSON.stringify(wishlist));
        }
        console.log('Added to wishlist:', itemTitle);
    }
    
    function removeFromWishlist(itemTitle) {
        let wishlist = JSON.parse(localStorage.getItem('resinWishlist')) || [];
        wishlist = wishlist.filter(item => item !== itemTitle);
        localStorage.setItem('resinWishlist', JSON.stringify(wishlist));
        console.log('Removed from wishlist:', itemTitle);
    }
    
    function checkWishlistStatus(itemTitle) {
        const wishlist = JSON.parse(localStorage.getItem('resinWishlist')) || [];
        return wishlist.includes(itemTitle);
    }
    
    // Search functionality (can be expanded)
    function initGallerySearch() {
        const searchInput = $('#gallery-search');
        
        searchInput.on('input', function() {
            const searchTerm = $(this).val().toLowerCase();
            
            $('.gallery-item').each(function() {
                const $item = $(this).parent();
                const title = $(this).data('title').toLowerCase();
                const description = $(this).data('description').toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    $item.show();
                } else {
                    $item.hide();
                }
            });
        });
    }
    
    // Add search input if it exists
    if ($('#gallery-search').length) {
        initGallerySearch();
    }
    
    console.log('Gallery JavaScript fully initialized');
});

// Additional modal styles
const modalEnhancementStyles = `
<style>
.modal-image-container {
    position: relative;
    background: #f8f9fa;
}

.image-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.modal-colors {
    display: flex;
    gap: 0.5rem;
}

.modal-features {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--charcoal);
    font-size: 0.9rem;
}

.feature-item i {
    color: var(--accent-color);
}

.modal-footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #e9ecef;
}

.wishlist-btn.wishlisted {
    background: var(--accent-color);
    border-color: var(--accent-color);
    color: white;
}

@media (max-width: 768px) {
    .modal-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .modal-colors {
        margin-top: 0.5rem;
    }
    
    .modal-features {
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', modalEnhancementStyles);
