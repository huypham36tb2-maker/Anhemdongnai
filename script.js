// ============ DANH SÁCH MÓN ĂN ============
const menuItems = [
  { id: 1, name: "Cơm Chiên Dương Châu", desc: "Cơm chiên tôm, trứng, xúc xích", price: 35000, emoji: "🍚" },
  { id: 2, name: "Cơm Chiên Hải Sản", desc: "Tôm, mực, nghêu tươi ngon", price: 45000, emoji: "🦐" },
  { id: 3, name: "Cơm Chiên Gà Xé", desc: "Gà xé phô mai béo ngậy", price: 40000, emoji: "🍗" },
  { id: 4, name: "Mì Cay Cấp 3", desc: "Cay vừa, topping bò + cá viên", price: 55000, emoji: "🍜" },
  { id: 5, name: "Mì Cay Cấp 5", desc: "Cay xé lưỡi, topping hải sản", price: 65000, emoji: "🌶️" },
  { id: 6, name: "Mì Cay Cấp 7", desc: "Thử thách cho fan cay cứng!", price: 70000, emoji: "🔥" },
  { id: 7, name: "Cá Viên Chiên", desc: "10 viên giòn rụm, sốt tương ớt", price: 20000, emoji: "🐟" },
  { id: 8, name: "Cá Viên + Xúc Xích", desc: "Combo 5 cá viên + 2 xúc xích", price: 30000, emoji: "🌭" },
  { id: 9, name: "Combo Cá Viên Đặc Biệt", desc: "Cá viên, bò viên, tôm viên", price: 40000, emoji: "🍢" }
];

// ============ EMOJI LOGO GỢI Ý ============
const EMOJI_OPTIONS = [
  "🍜", "🍚", "🍲", "🍛", "🍝", "🔥", "🌶️", "🐟",
  "🍢", "🍗", "🍤", "🥘", "🍱", "🥢", "🍽️", "👩‍🍳"
];

// ============ MÀU CHỦ ĐẠO ============
const COLOR_OPTIONS = [
  "#ff5722", "#e91e63", "#9c27b0", "#3f51b5",
  "#2196f3", "#009688", "#4caf50", "#ff9800",
  "#795548", "#607d8b", "#f44336", "#ffc107"
];

// ============ CẤU HÌNH MẶC ĐỊNH ============
const DEFAULT_SETTINGS = {
  logoEmoji: "🍜",
  name: "Quán Ăn Vặt",
  slogan: "Ngon • Cay • Nóng Hổi",
  heroTitle: "Quán Ăn Vặt 🔥",
  heroSub: "Cơm chiên dậy mùi • Mì cay chuẩn Hàn • Cá viên chiên giòn rụm",
  color: "#ff5722",
  accent: "#ffb300",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  hotline: "0909 123 456"
};

// ============ LOAD / SAVE ============
function loadSettings() {
  try {
    const saved = localStorage.getItem("quan_settings");
    if (saved) {
      return Object.assign({}, DEFAULT_SETTINGS, JSON.parse(saved));
    }
    return Object.assign({}, DEFAULT_SETTINGS);
  } catch (e) {
    return Object.assign({}, DEFAULT_SETTINGS);
  }
}

let settings = loadSettings();

// ============ ÁP DỤNG CÀI ĐẶT ============
function applySettings() {
  document.documentElement.style.setProperty("--primary", settings.color);
  document.documentElement.style.setProperty("--accent", settings.accent);

  document.getElementById("logo-icon").textContent = settings.logoEmoji;
  document.getElementById("logo-name").textContent = settings.name;
  document.getElementById("logo-slogan").textContent = settings.slogan;
  document.getElementById("hero-title").textContent = settings.heroTitle;
  document.getElementById("hero-subtitle").textContent = settings.heroSub;
  document.getElementById("about-title").textContent = "Về " + settings.name;

  const contactHTML =
    "<p>📍 " + settings.address + "</p>" +
    "<p>📞 Hotline: <strong>" + settings.hotline + "</strong></p>" +
    "<p>🕐 Mở cửa: 10:00 - 23:00 (Hàng ngày)</p>";
  document.getElementById("contact-info").innerHTML = contactHTML;

  document.getElementById("footer-name").textContent = settings.name;
  document.title = settings.name + " | Đặt món online";
}

// ============ MỞ / ĐÓNG MODAL ============
function openSettings() {
  document.getElementById("input-name").value = settings.name;
  document.getElementById("input-slogan").value = settings.slogan;
  document.getElementById("input-hero-title").value = settings.heroTitle;
  document.getElementById("input-hero-sub").value = settings.heroSub;
  document.getElementById("input-address").value = settings.address;
  document.getElementById("input-hotline").value = settings.hotline;

  renderEmojiPicker();
  renderColorPicker();

  document.getElementById("settings-overlay").classList.add("active");
}

function closeSettings() {
  document.getElementById("settings-overlay").classList.remove("active");
}

// ============ EMOJI PICKER ============
function renderEmojiPicker() {
  const picker = document.getElementById("emoji-picker");
  let html = "";
  for (let i = 0; i < EMOJI_OPTIONS.length; i++) {
    const e = EMOJI_OPTIONS[i];
    const selected = (e === settings.logoEmoji) ? " selected" : "";
    html += '<button class="emoji-option' + selected + '" onclick="selectEmoji(\'' + e + '\')">' + e + '</button>';
  }
  picker.innerHTML = html;
}

function selectEmoji(e) {
  settings.logoEmoji = e;
  renderEmojiPicker();
}

function setCustomEmoji() {
  const val = document.getElementById("custom-emoji-input").value.trim();
  if (val) {
    settings.logoEmoji = val;
    renderEmojiPicker();
    document.getElementById("custom-emoji-input").value = "";
  }
}

// ============ COLOR PICKER ============
function renderColorPicker() {
  const picker = document.getElementById("color-picker");
  let html = "";
  for (let i = 0; i < COLOR_OPTIONS.length; i++) {
    const c = COLOR_OPTIONS[i];
    const selected = (c === settings.color) ? " selected" : "";
    html += '<div class="color-option' + selected + '" style="background:' + c + '" onclick="selectColor(\'' + c + '\')"></div>';
  }
  picker.innerHTML = html;
}

function selectColor(c) {
  settings.color = c;
  renderColorPicker();
}

// ============ LƯU ============
function saveSettings() {
  settings.name = document.getElementById("input-name").value.trim() || DEFAULT_SETTINGS.name;
  settings.slogan = document.getElementById("input-slogan").value.trim() || DEFAULT_SETTINGS.slogan;
  settings.heroTitle = document.getElementById("input-hero-title").value.trim() || DEFAULT_SETTINGS.heroTitle;
  settings.heroSub = document.getElementById("input-hero-sub").value.trim() || DEFAULT_SETTINGS.heroSub;
  settings.address = document.getElementById("input-address").value.trim() || DEFAULT_SETTINGS.address;
  settings.hotline = document.getElementById("input-hotline").value.trim() || DEFAULT_SETTINGS.hotline;

  localStorage.setItem("quan_settings", JSON.stringify(settings));
  applySettings();
  closeSettings();
  showToast("✅ Đã lưu cài đặt!");
}

// ============ RESET ============
function resetSettings() {
  if (!confirm("Bạn có chắc muốn khôi phục cài đặt mặc định?")) return;
  settings = Object.assign({}, DEFAULT_SETTINGS);
  localStorage.removeItem("quan_settings");
  applySettings();
  openSettings();
  showToast("🔄 Đã khôi phục mặc định");
}

// ============ FORMAT TIỀN ============
function formatVND(n) {
  return n.toLocaleString("vi-VN") + "đ";
}

// ============ MENU ============
function renderMenu() {
  const grid = document.getElementById("menu-grid");
  let html = "";
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    html += '<div class="menu-card">';
    html += '<div class="dish-img">' + item.emoji + '</div>';
    html += '<div class="info">';
    html += '<h3>' + item.name + '</h3>';
    html += '<p class="desc">' + item.desc + '</p>';
    html += '<div class="price">' + formatVND(item.price) + '</div>';
    html += '<button class="btn-add" onclick="addToCart(' + item.id + ')">+ Thêm vào giỏ</button>';
    html += '</div></div>';
  }
  grid.innerHTML = html;
}

// ============ GIỎ HÀNG ============
let cart = [];

function addToCart(id) {
  const item = menuItems.find(function (m) { return m.id === id; });
  const existing = cart.find(function (c) { return c.id === id; });
  if (existing) {
    existing.qty++;
  } else {
    cart.push(Object.assign({}, item, { qty: 1 }));
  }
  updateCart();
  showToast('Đã thêm "' + item.name + '" 🎉');
}

function changeQty(id, delta) {
  const item = cart.find(function (c) { return c.id === id; });
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(function (c) { return c.id !== id; });
  }
  updateCart();
}

function removeItem(id) {
  cart = cart.filter(function (c) { return c.id !== id; });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  let totalQty = 0;
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQty += cart[i].qty;
    totalPrice += cart[i].qty * cart[i].price;
  }

  cartCount.textContent = totalQty;
  cartTotal.textContent = formatVND(totalPrice);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Giỏ hàng đang trống</p>';
    return;
  }

  let html = "";
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    html += '<div class="cart-item">';
    html += '<div class="dish-img-sm">' + item.emoji + '</div>';
    html += '<div class="cart-item-info">';
    html += '<h4>' + item.name + '</h4>';
    html += '<div class="item-price">' + formatVND(item.price) + '</div>';
    html += '<div class="qty-control">';
    html += '<button onclick="changeQty(' + item.id + ', -1)">−</button>';
    html += '<span>' + item.qty + '</span>';
    html += '<button onclick="changeQty(' + item.id + ', 1)">+</button>';
    html += '</div></div>';
    html += '<button class="remove-btn" onclick="removeItem(' + item.id + ')">🗑️</button>';
    html += '</div>';
  }
  cartItems.innerHTML = html;
}

function toggleCart() {
  document.getElementById("cart-sidebar").classList.toggle("active");
  document.getElementById("cart-overlay").classList.toggle("active");
}

function checkout() {
  if (cart.length === 0) {
    showToast("Giỏ hàng trống, vui lòng chọn món! 🛒");
    return;
  }
  let total = 0;
  let summary = "";
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].qty * cart[i].price;
    summary += "• " + cart[i].name + " x" + cart[i].qty + "\n";
  }
  alert(
    "🎉 ĐẶT HÀNG THÀNH CÔNG!\n\n" +
    "📍 " + settings.name + "\n\n" +
    "Chi tiết đơn:\n" + summary + "\n" +
    "Tổng: " + formatVND(total) + "\n\n" +
    "Quán sẽ liên hệ xác nhận trong 5 phút. Cảm ơn bạn! ❤️"
  );
  cart = [];
  updateCart();
  toggleCart();
}

// ============ TOAST ============
function showToast(msg) {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.style.position = "fixed";
  toast.style.bottom = "30px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#2c2c2c";
  toast.style.color = "#fff";
  toast.style.padding = "12px 24px";
  toast.style.borderRadius = "50px";
  toast.style.fontWeight = "600";
  toast.style.zIndex = "999";
  toast.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
  toast.style.fontFamily = "'Be Vietnam Pro', sans-serif";
  toast.style.fontSize = "14px";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s, bottom 0.3s";

  document.body.appendChild(toast);
  setTimeout(function () {
    toast.style.opacity = "1";
    toast.style.bottom = "50px";
  }, 10);

  setTimeout(function () {
    toast.style.opacity = "0";
    toast.style.bottom = "30px";
    setTimeout(function () { toast.remove(); }, 300);
  }, 2000);
}

// ============ ĐÓNG MODAL KHI CLICK OVERLAY ============
document.getElementById("settings-overlay").addEventListener("click", function (e) {
  if (e.target.id === "settings-overlay") closeSettings();
});

// ============ KHỞI TẠO ============
applySettings();
renderMenu();
updateCart();
