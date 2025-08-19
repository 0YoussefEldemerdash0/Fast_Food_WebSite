document.addEventListener('DOMContentLoaded', () => {
    const addBtns = document.querySelectorAll('.btn.cta');
    const modal = document.getElementById('confirmation-modal');
    const cartCountElement = document.getElementById('cart-count');
    const confirmBtn = modal ? modal.querySelector('#confirm-add') : null;
    const closeModalBtn = modal ? modal.querySelector('.close-btn') : null;
    const itemNameSpan = modal ? modal.querySelector('#item-name') : null;

    let currentItem = {};

    function isLoggedIn() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user && user.loggedIn;
    }

    function updateCartUI() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartCountElement) cartCountElement.textContent = cart.length;
    }

    updateCartUI();

    addBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isLoggedIn()) {
                alert('يرجى تسجيل الدخول أولاً لإضافة منتجات إلى سلة التسوق.');
                window.location.href = 'login.html';
                return;
            }

            const card = e.target.closest('.card');
            const itemName = card.querySelector('.title') ? card.querySelector('.title').textContent : '';
            const itemPrice = card.querySelector('.price .new, .meta .price') ? card.querySelector('.price .new, .meta .price').textContent : '';
            const itemDesc = card.querySelector('.desc') ? card.querySelector('.desc').textContent : '';

            currentItem = {
                name: itemName,
                price: itemPrice,
                desc: itemDesc
            };

            if (modal) {
                modal.style.display = 'block';
                if (itemNameSpan) itemNameSpan.textContent = itemName;
            } else {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(currentItem);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
                alert('تمت إضافة المنتج بنجاح!');
            }
        });
    });

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(currentItem);
            localStorage.setItem('cart', JSON.stringify(cart));
            if (modal) modal.style.display = 'none';
            updateCartUI();
            alert('تمت إضافة المنتج بنجاح!');
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) {
            modal.style.display = 'none';
        }
    });
});