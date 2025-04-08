// Initialize users array if it doesn't exist
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}
// Sample data for products and courses
const sampleProducts = [
    {
        id: 1,
        name: "Homemade Chocolate Cake",
        description: "Delicious homemade chocolate cake with rich frosting. Made with love and finest ingredients.",
        price: 450,
        category: "Food & Cooking",
        stock: 10,
        seller: "Mrs. Sharma",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Handmade Cotton Kurti",
        description: "Beautiful handmade cotton kurti with traditional embroidery. Comfortable for daily wear.",
        price: 899,
        category: "Clothing & Tailoring",
        stock: 5,
        seller: "Mrs. Patel",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Handcrafted Wooden Jewelry Box",
        description: "Elegant wooden jewelry box with intricate carvings. Perfect for gifting.",
        price: 1200,
        category: "Handicrafts",
        stock: 3,
        seller: "Mrs. Gupta",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Custom Stitched Blouse",
        description: "Get your blouse stitched to your exact measurements with fabric of your choice.",
        price: 600,
        category: "Clothing & Tailoring",
        stock: 15,
        seller: "Mrs. Iyer",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
];

const sampleCourses = [
    {
        id: 1,
        title: "Traditional Indian Cooking Masterclass",
        description: "Learn to cook authentic Indian dishes from different regions of India. 10+ recipes included.",
        price: 1999,
        category: "Cooking",
        duration: 8,
        instructor: "Mrs. Kapoor",
        rating: 4.7,
        students: 42,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        title: "Basic to Advanced Tailoring",
        description: "From stitching basics to creating your own designs. Perfect for beginners.",
        price: 2499,
        category: "Sewing",
        duration: 12,
        instructor: "Mrs. Reddy",
        rating: 4.9,
        students: 28,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        title: "Handmade Jewelry Making",
        description: "Create beautiful jewelry pieces using beads, threads, and other materials.",
        price: 1499,
        category: "Crafts",
        duration: 6,
        instructor: "Mrs. Joshi",
        rating: 4.5,
        students: 35,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        title: "Home Baking Essentials",
        description: "Learn to bake cakes, cookies, and breads right in your home kitchen.",
        price: 1799,
        category: "Cooking",
        duration: 5,
        instructor: "Mrs. Nair",
        rating: 4.8,
        students: 56,
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
];

// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';
// App state
let currentUser = null;
let cart = [];
let sellerProducts = [];
let sellerCourses = [];
let sellerOrders = [];

// DOM Elements
const productsContainer = document.getElementById('productsContainer');
const coursesContainer = document.getElementById('coursesContainer');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutTotal = document.getElementById('checkoutTotal');
const sellerDashboardLink = document.getElementById('sellerDashboardLink');
const myOrdersLink = document.getElementById('myOrdersLink');
const logoutLink = document.getElementById('logoutLink');
const sellerProductsTable = document.getElementById('sellerProductsTable');
const sellerCoursesTable = document.getElementById('sellerCoursesTable');
const sellerOrdersTable = document.getElementById('sellerOrdersTable');
const paymentMethod = document.getElementById('paymentMethod');
const cardDetails = document.getElementById('cardDetails');
const upiDetails = document.getElementById('upiDetails');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadCourses();
    setupEventListeners();
    checkAuthState();
    updateCartCount();
});

// Setup event listeners
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleLogin(e);
    });
    
    // Registration form
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleRegister(e);
    });
    
    // Add product form
    document.getElementById('addProductForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleAddProduct(e);
    });
    
    // Add course form
    document.getElementById('addCourseForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleAddCourse(e);
    });
    
    // Checkout form
    document.getElementById('checkoutForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleCheckout(e);
    });
    
    // Payment method change
    paymentMethod?.addEventListener('change', togglePaymentDetails);
    
    // Cart and checkout buttons
    document.getElementById('checkoutBtn')?.addEventListener('click', openCheckoutModal);
    
    // Logout link
    logoutLink?.addEventListener('click', handleLogout);
    
    // Seller dashboard link
    sellerDashboardLink?.addEventListener('click', async (e) => {
        e.preventDefault();
        await openSellerDashboard(e);
    });
    
    // Add to cart button in details modal
    document.getElementById('addToCartBtn')?.addEventListener('click', addToCartFromModal);
    
    // Account link
    document.getElementById('accountLink')?.addEventListener('click', showAccountDetails);
}

// Check authentication state
async function checkAuthState() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            currentUser = await response.json();
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateAuthUI();
            
            if (currentUser.accountType === 'seller') {
                await loadSellerData();
            }
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    }
}


// Update UI based on authentication state
function updateAuthUI() {
    if (currentUser) {
        // Show logout and dashboard links
        logoutLink.style.display = 'block';
        myOrdersLink.style.display = 'block';
        
        // Show seller dashboard link if user is a seller
        if (currentUser.accountType === 'seller') {
            sellerDashboardLink.style.display = 'block';
        } else {
            sellerDashboardLink.style.display = 'none';
        }
        
        // Close auth modals
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        if (loginModal) loginModal.hide();
        if (registerModal) registerModal.hide();
    } else {
        // Hide logout and dashboard links
        logoutLink.style.display = 'none';
        myOrdersLink.style.display = 'none';
        sellerDashboardLink.style.display = 'none';
    }
}

// Handle login
// Handle login
async function handleLogin(e) {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const { token, user } = await response.json();
        
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUser = user;
        updateAuthUI();
        
        alert('Login successful!');
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        
        if (currentUser.accountType === 'seller') {
            await loadSellerData();
        }
    } catch (error) {
        console.error('Login error:', error);
        alert(error.message || 'Login failed. Please try again.');
    }
}

// Handle registration
// Handle registration
async function handleRegister(e) {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const accountType = document.querySelector('input[name="accountType"]:checked').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, accountType })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }

        alert('Registration successful! Please login.');
        bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
        e.target.reset();
        
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    } catch (error) {
        console.error('Registration error:', error);
        alert(error.message || 'Registration failed. Please try again.');
    }
}

// Handle logout
function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateAuthUI();
    alert('You have been logged out.');
}

// Load products to marketplace
async function loadProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to sample data if API fails
        renderProducts(sampleProducts);
    }
    productsContainer.innerHTML = '';
    
    sampleProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-6 col-lg-3';
        productCard.innerHTML = `
            <div class="card product-card" data-id="${product.id}">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <div class="rating">
                        ${generateStarRating(product.rating)}
                        <small class="text-muted">(${product.rating})</small>
                    </div>
                    <p class="card-text text-success fw-bold">₹${product.price}</p>
                    <p class="card-text text-muted small">Sold by ${product.seller}</p>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
    
    // Add click event to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const product = sampleProducts.find(p => p.id === productId);
            openProductDetails(product);
        });
    });
}

// Load courses to skills section
async function loadCourses() {
    try {
        const response = await fetch(`${API_BASE_URL}/courses`);
        if (!response.ok) throw new Error('Failed to fetch courses');
        
        const courses = await response.json();
        renderCourses(courses);
    } catch (error) {
        console.error('Error loading courses:', error);
        // Fallback to sample data if API fails
        renderCourses(sampleCourses);
    }
    coursesContainer.innerHTML = '';
    
    sampleCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'col-md-6 col-lg-3';
        courseCard.innerHTML = `
            <div class="card course-card" data-id="${course.id}">
                <img src="${course.image}" class="card-img-top" alt="${course.title}">
                <div class="card-body">
                    <h5 class="card-title">${course.title}</h5>
                    <div class="rating">
                        ${generateStarRating(course.rating)}
                        <small class="text-muted">(${course.rating})</small>
                    </div>
                    <p class="card-text text-success fw-bold">₹${course.price}</p>
                    <p class="card-text text-muted small">${course.duration} hrs • ${course.students} students</p>
                </div>
            </div>
        `;
        coursesContainer.appendChild(courseCard);
    });
    
    // Add click event to course cards
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', function() {
            const courseId = parseInt(this.getAttribute('data-id'));
            const course = sampleCourses.find(c => c.id === courseId);
            openCourseDetails(course);
        });
    });
}

// Update auth UI to show account link
function updateAuthUI() {
    if (currentUser) {
        // Show account-related links
        document.getElementById('accountLink').style.display = 'block';
        document.getElementById('logoutLink').style.display = 'block';
        document.getElementById('myOrdersLink').style.display = 'block';
        
        // Show seller dashboard link if user is a seller
        if (currentUser.accountType === 'seller') {
            document.getElementById('sellerDashboardLink').style.display = 'block';
        } else {
            document.getElementById('sellerDashboardLink').style.display = 'none';
        }
        
        // Hide login/register links
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('registerLink').style.display = 'none';
        
        // Set up account link
        document.getElementById('accountLink').textContent = `Hi, ${currentUser.name}`;
        document.getElementById('accountLink').addEventListener('click', showAccountDetails);
    } else {
        // Show login/register links
        document.getElementById('loginLink').style.display = 'block';
        document.getElementById('registerLink').style.display = 'block';
        
        // Hide account-related links
        document.getElementById('accountLink').style.display = 'none';
        document.getElementById('logoutLink').style.display = 'none';
        document.getElementById('myOrdersLink').style.display = 'none';
        document.getElementById('sellerDashboardLink').style.display = 'none';
    }
}

// Show account details
async function showAccountDetails(e) {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch account details');
        
        const userData = await response.json();
        const accountDetails = document.getElementById('accountDetails');
        accountDetails.innerHTML = `
        <div class="text-center mb-4">
            <div class="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                <span class="text-white h4">${currentUser.name.charAt(0)}</span>
            </div>
            <h4 class="mt-3">${currentUser.name}</h4>
            <p class="text-muted">${currentUser.email}</p>
            <span class="badge bg-${currentUser.accountType === 'seller' ? 'success' : 'primary'}">
                ${currentUser.accountType === 'seller' ? 'Seller' : 'Customer'}
            </span>
        </div>
        <div class="list-group">
            <div class="list-group-item">
                <strong>Account Type:</strong> ${currentUser.accountType === 'seller' ? 'Seller' : 'Customer'}
            </div>
            <div class="list-group-item">
                <strong>Registered Email:</strong> ${currentUser.email}
            </div>
            <div class="list-group-item">
                <strong>Member Since:</strong> ${new Date().toLocaleDateString()}
            </div>
        </div>
    `;
    const accountModal = new bootstrap.Modal(document.getElementById('accountModal'));
    accountModal.show();}
    catch (error) {
        console.error('Error loading account details:', error);
        alert('Failed to load account details');
    }
    

}

// Add this to setupEventListeners()
document.getElementById('accountLink')?.addEventListener('click', showAccountDetails);

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Open product details modal
function openProductDetails(product) {
    const modalTitle = document.getElementById('detailsModalTitle');
    const modalBody = document.getElementById('detailsModalBody');
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    modalTitle.textContent = product.name;
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${product.image}" class="img-fluid rounded mb-3" alt="${product.name}">
            </div>
            <div class="col-md-6">
                <h5>${product.name}</h5>
                <div class="rating mb-2">
                    ${generateStarRating(product.rating)}
                    <small class="text-muted">(${product.rating})</small>
                </div>
                <p class="text-success fw-bold h4">₹${product.price}</p>
                <p><strong>Seller:</strong> ${product.seller}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Available:</strong> ${product.stock} in stock</p>
                <p>${product.description}</p>
                <div class="mb-3">
                    <label for="productQuantity" class="form-label">Quantity</label>
                    <input type="number" class="form-control" id="productQuantity" min="1" max="${product.stock}" value="1">
                </div>
            </div>
        </div>
    `;
    
    // Set data attribute for add to cart button
    addToCartBtn.setAttribute('data-type', 'product');
    addToCartBtn.setAttribute('data-id', product.id);
    
    // Show modal
    const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
    detailsModal.show();
}

// Open course details modal
function openCourseDetails(course) {
    const modalTitle = document.getElementById('detailsModalTitle');
    const modalBody = document.getElementById('detailsModalBody');
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    modalTitle.textContent = course.title;
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${course.image}" class="img-fluid rounded mb-3" alt="${course.title}">
            </div>
            <div class="col-md-6">
                <h5>${course.title}</h5>
                <div class="rating mb-2">
                    ${generateStarRating(course.rating)}
                    <small class="text-muted">(${course.rating})</small>
                </div>
                <p class="text-success fw-bold h4">₹${course.price}</p>
                <p><strong>Instructor:</strong> ${course.instructor}</p>
                <p><strong>Duration:</strong> ${course.duration} hours</p>
                <p><strong>Students:</strong> ${course.students}</p>
                <p><strong>Category:</strong> ${course.category}</p>
                <p>${course.description}</p>
            </div>
        </div>
    `;
    
    // Set data attribute for add to cart button
    addToCartBtn.setAttribute('data-type', 'course');
    addToCartBtn.setAttribute('data-id', course.id);
    
    // Show modal
    const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
    detailsModal.show();
}

// Add item to cart from details modal
function addToCartFromModal() {
    const type = this.getAttribute('data-type');
    const id = parseInt(this.getAttribute('data-id'));
    let item, quantity = 1;
    
    if (type === 'product') {
        item = sampleProducts.find(p => p.id === id);
        quantity = parseInt(document.getElementById('productQuantity').value) || 1;
    } else {
        item = sampleCourses.find(c => c.id === id);
    }
    
    if (item) {
        addToCart(item, type, quantity);
        
        // Close the details modal
        const detailsModal = bootstrap.Modal.getInstance(document.getElementById('detailsModal'));
        detailsModal.hide();
        
        // Show success message
        alert(`${item.name || item.title} has been added to your cart!`);
    }
}

// Add item to cart
function addToCart(item, type, quantity = 1) {
    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => 
        cartItem.id === item.id && cartItem.type === type
    );
    
    if (existingItem) {
        // Update quantity if it's a product
        if (type === 'product') {
            existingItem.quantity += quantity;
        }
    } else {
        // Add new item to cart
        const cartItem = {
            id: item.id,
            type: type,
            name: item.name || item.title,
            price: item.price,
            image: item.image,
            quantity: type === 'product' ? quantity : 1
        };
        cart.push(cartItem);
    }
    
    // Update cart in localStorage
    saveCart();
    
    // Update UI
    updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
    
    // Save cart to localStorage
    saveCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Open cart modal
function openCartModal() {
    // Load cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty</td></tr>';
        document.getElementById('checkoutBtn').disabled = true;
    } else {
        let total = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" class="cart-item-img me-2" alt="${item.name}">
                        ${item.name}
                    </div>
                </td>
                <td>₹${item.price}</td>
                <td>
                    ${item.type === 'product' ? 
                        `<input type="number" min="1" value="${item.quantity}" class="form-control form-control-sm cart-quantity" data-index="${index}" style="width: 60px;">` : 
                        '1'}
                </td>
                <td>₹${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger remove-from-cart" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            cartItems.appendChild(row);
        });
        
        // Update total
        cartTotal.textContent = `₹${total.toFixed(2)}`;
        checkoutTotal.textContent = `₹${total.toFixed(2)}`;
        document.getElementById('checkoutBtn').disabled = false;
    }
    
    // Add event listeners to quantity inputs
    document.querySelectorAll('.cart-quantity').forEach(input => {
        input.addEventListener('change', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const newQuantity = parseInt(this.value) || 1;
            
            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
                saveCart();
                openCartModal(); // Refresh cart
            }
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            cart.splice(index, 1);
            saveCart();
            openCartModal(); // Refresh cart
        });
    });
    
    // Show modal
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Open checkout modal
function openCheckoutModal() {
    // Set checkout total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = `₹${total.toFixed(2)}`;
    

    if (!currentUser) {
        alert('Please login to proceed to checkout');
        const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        cartModal.hide();
        
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return;
    }
    // Pre-fill form if user is logged in
    if (currentUser) {
        document.getElementById('fullName').value = currentUser.name || '';
        document.getElementById('email').value = currentUser.email || '';
    }
    
    // Close cart modal
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    cartModal.hide();
    
    // Show checkout modal
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    checkoutModal.show();
}

// Toggle payment details based on selected method
function togglePaymentDetails() {
    const method = paymentMethod.value;
    
    cardDetails.style.display = 'none';
    upiDetails.style.display = 'none';
    
    if (method === 'credit_card' || method === 'debit_card') {
        cardDetails.style.display = 'block';
    } else if (method === 'upi') {
        upiDetails.style.display = 'block';
    }
}

// Handle checkout
async function handleCheckout(e) {
    if (!currentUser) {
        alert('Please login to complete your order.');
        return;
    }

    const orderData = {
        items: cart,
        shipping: {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value
        },
        paymentMethod: document.getElementById('paymentMethod').value
    };

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Checkout failed');
        }

        const order = await response.json();
        
        // Clear cart on success
        cart = [];
        saveCart();
        updateCartCount();
        
        alert(`Order #${order.id} placed successfully!`);
        bootstrap.Modal.getInstance(document.getElementById('checkoutModal')).hide();
    } catch (error) {
        console.error('Checkout error:', error);
        alert(error.message || 'Checkout failed. Please try again.');
    }
}


// Seller Dashboard Functions

// Open seller dashboard
async function openSellerDashboard(e) {
    if (!currentUser || currentUser.accountType !== 'seller') {
        alert('Only sellers can access the dashboard.');
        return;
    }
    
    try {
        await loadSellerData();
        new bootstrap.Modal(document.getElementById('sellerDashboardModal')).show();
    } catch (error) {
        console.error('Error opening seller dashboard:', error);
        alert('Failed to load seller dashboard');
    }
}

// Load seller data
async function loadSellerData() {
    try {
        const token = localStorage.getItem('token');
        const [productsResponse, coursesResponse, ordersResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/products/seller`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            fetch(`${API_BASE_URL}/courses/seller`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            fetch(`${API_BASE_URL}/orders/seller`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        ]);

        if (!productsResponse.ok || !coursesResponse.ok || !ordersResponse.ok) {
            throw new Error('Failed to load seller data');
        }

        sellerProducts = await productsResponse.json();
        sellerCourses = await coursesResponse.json();
        sellerOrders = await ordersResponse.json();

        renderSellerData();
    } catch (error) {
        console.error('Error loading seller data:', error);
        // Fallback to local storage if API fails
        const savedData = localStorage.getItem(`sellerData_${currentUser.email}`);
        if (savedData) {
            const data = JSON.parse(savedData);
            sellerProducts = data.products || [];
            sellerCourses = data.courses || [];
            sellerOrders = data.orders || [];
            renderSellerData();
        }
    }
}


// Save seller data
function saveSellerData() {
    const data = {
        products: sellerProducts,
        courses: sellerCourses,
        orders: sellerOrders
    };
    localStorage.setItem(`sellerData_${currentUser.email}`, JSON.stringify(data));
}

// Render seller products
function renderSellerProducts() {
    sellerProductsTable.innerHTML = '';
    
    if (sellerProducts.length === 0) {
        sellerProductsTable.innerHTML = '<tr><td colspan="4" class="text-center">No products added yet</td></tr>';
    } else {
        sellerProducts.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>₹${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn btn-sm btn-danger delete-product" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            sellerProductsTable.appendChild(row);
        });
    }
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-product').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            sellerProducts.splice(index, 1);
            saveSellerData();
            renderSellerProducts();
        });
    });
}

// Render seller courses
function renderSellerCourses() {
    sellerCoursesTable.innerHTML = '';
    
    if (sellerCourses.length === 0) {
        sellerCoursesTable.innerHTML = '<tr><td colspan="4" class="text-center">No courses added yet</td></tr>';
    } else {
        sellerCourses.forEach((course, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course.title}</td>
                <td>₹${course.price}</td>
                <td>${course.students || 0}</td>
                <td>
                    <button class="btn btn-sm btn-danger delete-course" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            sellerCoursesTable.appendChild(row);
        });
    }
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-course').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            sellerCourses.splice(index, 1);
            saveSellerData();
            renderSellerCourses();
        });
    });
}

// Render seller orders
function renderSellerOrders() {
    sellerOrdersTable.innerHTML = '';
    
    if (sellerOrders.length === 0) {
        sellerOrdersTable.innerHTML = '<tr><td colspan="5" class="text-center">No orders yet</td></tr>';
    } else {
        sellerOrders.forEach(order => {
            order.items.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${item.name}</td>
                    <td>${order.customer.name}</td>
                    <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                        <span class="badge bg-primary">${order.status}</span>
                    </td>
                `;
                sellerOrdersTable.appendChild(row);
            });
        });
    }
}

// Handle add product
async function handleAddProduct(e) {
    const formData = new FormData(e.target);
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add product');
        }

        const newProduct = await response.json();
        sellerProducts.push(newProduct);
        renderSellerProducts();
        e.target.reset();
        alert('Product added successfully!');
    } catch (error) {
        console.error('Error adding product:', error);
        alert(error.message || 'Failed to add product');
    }
}


// Handle add course
async function handleAddCourse(e) {
    const formData = new FormData(e.target);
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/courses`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add course');
        }

        const newCourse = await response.json();
        sellerCourses.push(newCourse);
        renderSellerCourses();
        e.target.reset();
        alert('Course added successfully!');
    } catch (error) {
        console.error('Error adding course:', error);
        alert(error.message || 'Failed to add course');
    }
}

// Initialize cart from localStorage when page loads
loadCart();

// Make cart modal open when clicking cart icon
document.querySelector('a[href="#cart"]').addEventListener('click', function(e) {
    e.preventDefault();
    openCartModal();
});