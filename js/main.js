// Main JavaScript functionality for My Resin Corner
$(document).ready(function() {
    console.log('My Resin Corner website initialized');
    
    // Initialize components
    initLoader();
    initNavigation();
    initAnimations();
    initGalleryModal();
    initCounters();
    initContactForm();
    initTiltEffects();
    
    // Loader functionality
    function initLoader() {
        console.log('Initializing loader');
        
        const loader = $('#loader');
        const progressFill = $('.progress-fill');
        
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                
                setTimeout(() => {
                    loader.fadeOut(500, function() {
                        $(this).remove();
                        console.log('Loader removed, page fully loaded');
                        
                        // Initialize AOS animations after loader
                        AOS.init({
                            duration: 1000,
                            easing: 'ease-in-out',
                            once: true,
                            offset: 100
                        });
                        
                        // Trigger any entrance animations
                        triggerEntranceAnimations();
                    });
                }, 500);
            }
            
            progressFill.css('width', progress + '%');
        }, 100);
    }
    
    // Navigation functionality
    function initNavigation() {
        console.log('Initializing navigation');
        
        const navbar = $('.custom-navbar');
        
        // Navbar scroll effect
        $(window).scroll(function() {
            if ($(this).scrollTop() > 50) {
                navbar.addClass('scrolled');
            } else {
                navbar.removeClass('scrolled');
            }
        });
        
        // Smooth scrolling for anchor links
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            
            const target = $(this.getAttribute('href'));
            if (target.length) {
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 80
                }, 1000, 'easeInOutCubic');
            }
        });
        
        // Mobile menu auto-close
        $('.navbar-nav .nav-link').on('click', function() {
            if ($('.navbar-toggler').is(':visible')) {
                $('.navbar-collapse').collapse('hide');
            }
        });
    }
    
    // Animation triggers
    function initAnimations() {
        console.log('Initializing animations');
        
        // Parallax scrolling
        $(window).scroll(function() {
            const scrolled = $(this).scrollTop();
            const parallaxElements = $('.parallax');
            
            parallaxElements.each(function() {
                const speed = $(this).data('speed') || 0.5;
                const yPos = -(scrolled * speed);
                $(this).css('transform', `translateY(${yPos}px)`);
            });
        });
        
        // Scroll indicator
        $('.scroll-indicator').on('click', function() {
            $('html, body').animate({
                scrollTop: $(window).height()
            }, 1000);
        });
    }
    
    // Gallery modal functionality
    function initGalleryModal() {
        console.log('Initializing gallery modal');
        
        // Create modal if it doesn't exist
        if (!$('.gallery-modal').length) {
            $('body').append(`
                <div class="gallery-modal">
                    <div class="modal-content">
                        <button class="modal-close">
                            <i class="fas fa-times"></i>
                        </button>
                        <img class="modal-image" src="" alt="">
                        <div class="modal-info">
                            <h3 class="modal-title"></h3>
                            <p class="modal-price"></p>
                            <p class="modal-description"></p>
                            <div class="modal-buttons">
                                <button class="btn btn-primary">Inquire Now</button>
                                <button class="btn btn-outline-primary">Add to Wishlist</button>
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
        
        // Open modal when gallery item is clicked
        $(document).on('click', '.gallery-item, .product-card', function(e) {
            e.preventDefault();
            console.log('Gallery item clicked');
            
            const imageSrc = $(this).find('img').attr('src') || $(this).data('image');
            const title = $(this).data('title') || $(this).find('.product-title').text();
            const price = $(this).data('price') || $(this).find('.product-price').text();
            const description = $(this).data('description') || $(this).find('.product-description').text();
            
            modalImage.attr('src', imageSrc);
            modalTitle.text(title);
            modalPrice.text(price);
            modalDescription.text(description);
            
            modal.fadeIn(300).css('display', 'flex');
            $('body').addClass('modal-open').css('overflow', 'hidden');
        });
        
        // Close modal
        $('.modal-close, .gallery-modal').on('click', function(e) {
            if (e.target === this) {
                console.log('Modal closing');
                modal.fadeOut(300);
                $('body').removeClass('modal-open').css('overflow', 'auto');
            }
        });
        
        // Close with escape key
        $(document).keyup(function(e) {
            if (e.keyCode === 27) { // ESC key
                modal.fadeOut(300);
                $('body').removeClass('modal-open').css('overflow', 'auto');
            }
        });
    }
    
    // Counter animations
    function initCounters() {
        console.log('Initializing counters');
        
        $('.stat-number').each(function() {
            const $this = $(this);
            const countTo = parseInt($this.attr('data-count'));
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(countTo + (countTo < 100 ? '+' : ''));
                }
            });
        });
    }
    
    // Contact form functionality
    function initContactForm() {
        console.log('Initializing contact form');
        
        $('.contact-form').on('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted');
            
            const form = $(this);
            const submitBtn = form.find('button[type="submit"]');
            const originalText = submitBtn.html();
            
            // Show loading state
            submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...').prop('disabled', true);
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Reset form
                form[0].reset();
                
                // Reset button
                submitBtn.html(originalText).prop('disabled', false);
                
                console.log('Contact form submission completed');
            }, 2000);
        });
    }
    
    // Tilt effects for cards
    function initTiltEffects() {
        console.log('Initializing tilt effects');
        
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
                max: 15,
                speed: 400,
                scale: 1.05,
                glare: true,
                "max-glare": 0.2
            });
        }
    }
    
    // Entrance animations
    function triggerEntranceAnimations() {
        console.log('Triggering entrance animations');
        
        // Animate hero elements
        $('.hero-content').addClass('animate__animated animate__fadeInLeft');
        $('.hero-visual').addClass('animate__animated animate__fadeInRight');
        
        // Animate floating cards with delay
        $('.floating-card').each(function(index) {
            $(this).delay(index * 200).queue(function() {
                $(this).addClass('animate__animated animate__bounceIn').dequeue();
            });
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        console.log('Showing notification:', message, type);
        
        const notification = $(`
            <div class="notification notification-${type}">
                <div class="notification-content">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
                    ${message}
                </div>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `);
        
        $('body').append(notification);
        
        // Show notification
        setTimeout(() => {
            notification.addClass('show');
        }, 100);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        // Close button functionality
        notification.find('.notification-close').on('click', function() {
            hideNotification(notification);
        });
    }
    
    function hideNotification(notification) {
        notification.removeClass('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
    
    // Gallery filter functionality (for gallery page)
    function initGalleryFilters() {
        console.log('Initializing gallery filters');
        
        $('.filter-btn').on('click', function() {
            const filter = $(this).data('filter');
            
            // Update active filter
            $('.filter-btn').removeClass('active');
            $(this).addClass('active');
            
            // Filter gallery items
            $('.gallery-item').each(function() {
                const category = $(this).data('category');
                
                if (filter === 'all' || category === filter) {
                    $(this).fadeIn(300);
                } else {
                    $(this).fadeOut(300);
                }
            });
            
            console.log('Gallery filtered by:', filter);
        });
    }
    
    // Initialize gallery filters if on gallery page
    if ($('.gallery-filters').length) {
        initGalleryFilters();
    }
    
    // Smooth scroll to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('.scroll-top').fadeIn();
        } else {
            $('.scroll-top').fadeOut();
        }
    });
    
    $('.scroll-top').on('click', function() {
        $('html, body').animate({scrollTop: 0}, 1000);
        return false;
    });
    
    // Image lazy loading
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }
    
    initLazyLoading();
    
    console.log('My Resin Corner website fully initialized');
});

// Additional CSS for notifications
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 1rem 1.5rem;
    z-index: 10001;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left: 4px solid #10b981;
}

.notification-info {
    border-left: 4px solid #3b82f6;
}

.notification-content {
    display: flex;
    align-items: center;
    color: #1f2937;
    margin-bottom: 0;
}

.notification-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification-close:hover {
    color: #374151;
}

.scroll-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(30, 58, 138, 0.3);
    transition: all 0.3s ease;
    z-index: 1000;
}

.scroll-top:hover {
    background: var(--accent-color);
    transform: translateY(-2px);
}

.lazy {
    opacity: 0;
    transition: opacity 0.3s;
}

.lazy.loaded {
    opacity: 1;
}

body.modal-open {
    overflow: hidden;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);
