/**
 * Aditya Home Furniture - Main Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Sticky Header ---
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            if (window.scrollY > lastScrollY) {
                // Scrolling down
                header.classList.add('scrolled-down');
                header.classList.remove('scrolled-up');
            } else {
                // Scrolling up
                header.classList.remove('scrolled-down');
                header.classList.add('scrolled-up');
            }
        } else {
            // Top of page
            header.classList.remove('scrolled-down');
            header.classList.remove('scrolled-up');
        }
        lastScrollY = window.scrollY;
    }, { passive: true });

    // --- 2. Parallax Hero ---
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            heroImg.style.transform = `translateY(${scrollPos * 0.3}px)`;
        }, { passive: true });
    }

    // --- 3. Fade-Up Animations (Intersection Observer) ---
    const fadeElements = document.querySelectorAll('.fade-up');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // --- 4. Lightbox Gallery ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const galleryTriggers = document.querySelectorAll('.gallery-trigger');

        galleryTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const imgSrc = trigger.getAttribute('data-src');
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
                // Accessibility: Set focus to close button
                setTimeout(() => closeBtn.focus(), 100);
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

        function closeLightbox() {
            lightbox.classList.remove('active');
            setTimeout(() => { lightboxImg.src = ''; }, 300);
        }
    }

    // --- 5. Testimonial Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const testimonialItems = document.querySelectorAll('.testimonial-item');

    if (filterBtns.length > 0 && testimonialItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('btn-primary'));
                filterBtns.forEach(b => b.classList.add('btn-outline'));
                btn.classList.remove('btn-outline');
                btn.classList.add('btn-primary');

                const filter = btn.getAttribute('data-filter');

                testimonialItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-region') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => item.style.opacity = '1', 50);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // --- 6. Dynamic Cart Logic ---
    const cartLink = document.querySelectorAll('#nav-cart-link');
    let cart = JSON.parse(localStorage.getItem('aditya_cart')) || [];

    function saveCart() {
        localStorage.setItem('aditya_cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartLink.forEach(link => {
            link.innerText = `Cart (${count})`;
        });
    }

    // Initialize cart count
    updateCartCount();

    // Add to cart functionality
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const sizeSelect = document.getElementById('size-select');
            // Parse price from option text: "72\" (Seats 6) - ₹1,95,000"
            const optionText = sizeSelect.options[sizeSelect.selectedIndex].text;
            const priceStr = optionText.split(' - ₹')[1].replace(/,/g, '');
            const price = parseInt(priceStr, 10);
            
            const product = {
                id: 'oak-dining-' + sizeSelect.value,
                name: 'Classic European Oak Dining Table',
                size: sizeSelect.options[sizeSelect.selectedIndex].text.split(' -')[0],
                price: price,
                image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=200&q=80',
                quantity: 1
            };

            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(product);
            }

            saveCart();
            updateCartCount();
            
            // Visual feedback
            const originalText = addToCartBtn.innerText;
            addToCartBtn.innerText = 'Added to Cart!';
            addToCartBtn.style.backgroundColor = 'var(--oak-600)';
            setTimeout(() => {
                addToCartBtn.innerText = originalText;
                addToCartBtn.style.backgroundColor = 'var(--teak-700)';
            }, 2000);
        });
    }

    // Render cart page
    const cartContainer = document.getElementById('cart-items-container');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');

    function formatINR(amount) {
        return '₹' + amount.toLocaleString('en-IN');
    }

    // Attach to global window for onclick access
    window.updateCartQuantity = function(id, delta) {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== id);
            }
            saveCart();
            updateCartCount();
            renderCart();
        }
    };

    window.removeFromCart = function(id) {
        cart = cart.filter(i => i.id !== id);
        saveCart();
        updateCartCount();
        renderCart();
    };

    function renderCart() {
        if (!cartContainer) return;

        cartContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p><a href="products.html" class="btn btn-outline" style="margin-top: 1rem;">Continue Shopping</a>';
            cartSubtotal.innerText = '₹0';
            cartTotal.innerText = '₹0';
            return;
        }

        cart.forEach(item => {
            total += item.price * item.quantity;
            
            const itemHTML = `
            <div style="display: flex; gap: 1rem; border-bottom: 1px solid var(--oak-300); padding-bottom: 1rem; margin-bottom: 1rem;">
                <img src="${item.image}" alt="${item.name}" style="width: 120px; height: 120px; object-fit: cover; border-radius: var(--radius-sm);">
                <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 style="margin-bottom: 0.2rem; font-size: 1.2rem;">${item.name}</h3>
                        <p class="text-muted" style="font-size: 0.9rem;">Size: ${item.size}</p>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <button onclick="updateCartQuantity('${item.id}', -1)" style="border: 1px solid var(--oak-300); width: 30px; height: 30px; border-radius: 4px;">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateCartQuantity('${item.id}', 1)" style="border: 1px solid var(--oak-300); width: 30px; height: 30px; border-radius: 4px;">+</button>
                        </div>
                        <span style="font-weight: 600; font-size: 1.1rem;">${formatINR(item.price * item.quantity)}</span>
                    </div>
                </div>
                <button onclick="removeFromCart('${item.id}')" style="color: var(--muted); align-self: flex-start; text-decoration: underline; background: none; border: none; cursor: pointer;">Remove</button>
            </div>
            `;
            cartContainer.insertAdjacentHTML('beforeend', itemHTML);
        });

        cartSubtotal.innerText = formatINR(total);
        cartTotal.innerText = formatINR(total);
    }

    if (cartContainer) {
        renderCart();
    }
    
    // Checkout Total (Optional dynamic render for checkout)
    const checkoutTotal = document.getElementById('checkout-total');
    if (checkoutTotal) {
        let total = 0;
        cart.forEach(item => total += item.price * item.quantity);
        checkoutTotal.innerText = formatINR(total);
        document.getElementById('checkout-subtotal').innerText = formatINR(total);
    }
});
