// ===== DATA =====
const products = [
  { id: 1, name: "Hunter X", price: 1265000, img: "images/r-1-143.png" },
  { id: 2, name: "Hunter Street", price: 999000, img: "images/r-220.png" },
  { id: 3, name: "Hunter Pro", price: 1876000, img: "images/oip-187.png" },
  { id: 4, name: "Hunter Lite", price: 1215000, img: "images/oip-4-267.png" },
];

// ===== VIEW DETAIL =====
function viewDetail(id) {
  localStorage.setItem("productId", id);
  window.location.href = "chitietsanpham.html";
}

// ===== ADD TO CART =====
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let exist = cart.find((item) => item.id === product.id);

  if (exist) {
    exist.qty += 1;
  } else {
    product.qty = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("Đã thêm vào giỏ 🛒");
}

// ===== RENDER CART =====
function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let el = document.getElementById("cart");

  if (!el) return;

  let total = 0;

  el.innerHTML = cart
    .map((item) => {
      total += item.price * item.qty;
      return `
      <div class="cart-item">
        <img src="../${item.img}">
        <div>
          <h4>${item.name}</h4>
          <p>${item.price.toLocaleString()} x ${item.qty}</p>
        </div>
      </div>
    `;
    })
    .join("");

  el.innerHTML += `<h3>Tổng: ${total.toLocaleString()} VND</h3>`;
}

// ===== LOGIN =====
function login() {
  let user = document.getElementById("l-user").value;
  let pass = document.getElementById("l-pass").value;

  let data = JSON.parse(localStorage.getItem("user"));

  if (data && data.user === user && data.pass === pass) {
    localStorage.setItem("isLogin", true);
    showToast("Đăng nhập thành công");
    setTimeout(() => (window.location.href = "../index.html"), 1000);
  } else {
    showToast("Sai tài khoản ❌");
  }
}

// ===== REGISTER =====
function register() {
  let user = document.getElementById("r-user").value;
  let pass = document.getElementById("r-pass").value;

  localStorage.setItem("user", JSON.stringify({ user, pass }));
  showToast("Đăng ký thành công 🎉");
}

// ===== NAV =====
function goCart() {
  window.location.href = "chucnang/cart.html";
}

function goLogin() {
  window.location.href = "chucnang/login.html";
}

// ===== TOAST =====
function showToast(msg) {
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = msg;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => toast.remove(), 2500);
}
