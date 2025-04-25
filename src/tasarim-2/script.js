/**
 * ELEGANTE - Modern Moda & Aksesuar E-ticaret JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Hero slider fonksiyonu
  initHeroSlider();
  
  // Tab sistemi
  initTabSystem();
  
  // Ürün sayacı
  initProductCounters();
  
  // Mobile menu
  initMobileMenu();
  
  // Sepete ürün ekleme işlemleri
  initAddToCart();
  
  // Header'ın scroll edildiğinde küçültülmesi
  initStickyHeader();
});

/**
 * Hero slider işlemleri
 */
function initHeroSlider() {
  const dots = document.querySelectorAll('.hero-dots .dot');
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  let slideInterval;

  // Otomatik slider başlat
  startSlideTimer();

  // Noktalara tıklanınca slider değiştir
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateSlider();
      resetSlideTimer();
    });
  });

  // Slider'ı güncelle
  function updateSlider() {
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.style.display = 'flex';
      } else {
        slide.style.display = 'none';
      }
    });
    
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Timer'ı resetle
  function resetSlideTimer() {
    clearInterval(slideInterval);
    startSlideTimer();
  }

  // Timer'ı başlat
  function startSlideTimer() {
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }, 5000);
  }

  // İlk slide'ı göster
  updateSlider();
}

/**
 * Tab sistemi
 */
function initTabSystem() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Aktif butonun classını kaldır
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // Tıklanan butona aktif classını ekle
      button.classList.add('active');
      
      // İlgili tab panelini göster
      const targetPanel = document.getElementById(button.getAttribute('data-target'));
      
      tabPanels.forEach(panel => {
        if (panel.id === button.getAttribute('data-target')) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/**
 * Ürün sayacı
 */
function initProductCounters() {
  const counters = document.querySelectorAll('.quantity-counter');
  
  counters.forEach(counter => {
    const decrementBtn = counter.querySelector('.decrement');
    const incrementBtn = counter.querySelector('.increment');
    const input = counter.querySelector('input');
    
    decrementBtn.addEventListener('click', () => {
      let value = parseInt(input.value);
      if (value > 1) {
        input.value = value - 1;
      }
    });
    
    incrementBtn.addEventListener('click', () => {
      let value = parseInt(input.value);
      input.value = value + 1;
    });
    
    input.addEventListener('change', () => {
      let value = parseInt(input.value);
      if (isNaN(value) || value < 1) {
        input.value = 1;
      }
    });
  });
}

/**
 * Mobile menu
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Ekran boyutu değişince menüyü kapat
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && mainNav.classList.contains('active')) {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}

/**
 * Sepete ürün ekleme işlemleri
 */
function initAddToCart() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Sepete eklendiğinde animasyon
      button.classList.add('added');
      
      // Sepet sayacını güncelle
      updateCartCount(1);
      
      // Bildirim göster
      showNotification('Ürün sepete eklendi!');
      
      // Butonun durumunu resetle
      setTimeout(() => {
        button.classList.remove('added');
      }, 1500);
    });
  });
  
  // Sepet sayacını güncelle
  function updateCartCount(value) {
    const cartBadge = document.querySelector('.cart-count');
    if (cartBadge) {
      let count = parseInt(cartBadge.textContent) || 0;
      cartBadge.textContent = count + value;
      
      // Animasyon ekle
      cartBadge.classList.add('update');
      setTimeout(() => {
        cartBadge.classList.remove('update');
      }, 300);
    }
  }
  
  // Bildirim göster
  function showNotification(message) {
    // Eğer bildirim elementi yoksa oluştur
    let notification = document.querySelector('.notification');
    
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'notification';
      document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
}

/**
 * Header'ın scroll edildiğinde küçültülmesi
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 200) {
      header.classList.add('sticky');
      
      if (scrollTop > lastScrollTop) {
        // Aşağı scroll
        header.classList.add('hide');
      } else {
        // Yukarı scroll
        header.classList.remove('hide');
      }
    } else {
      header.classList.remove('sticky');
    }
    
    lastScrollTop = scrollTop;
  });
}

/**
 * Görüntüyü ilk açıldığında yükle
 */
function lazyLoadImages() {
  const lazyImages = document.querySelectorAll('.lazy-image');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-image');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback olarak tüm resimleri yükle
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy-image');
    });
  }
}

// Popup ürün görüntüleme
document.querySelectorAll('.quick-view').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Ürün ID'sini al
    const productId = btn.getAttribute('data-product-id');
    
    // Burada normalde API'den ürün verileri çekilir, simulasyon olarak bir ürün verisi oluşturuyoruz
    const productData = {
      id: productId,
      name: 'Örnek Ürün ' + productId,
      price: '199,99 ₺',
      oldPrice: '299,99 ₺',
      description: 'Bu ürün yüksek kaliteli kumaştan üretilmiştir. Mevsimlik ve rahat bir tasarıma sahiptir.',
      images: [
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=500',
        'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?q=80&w=500',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=500'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['#000000', '#ffffff', '#d5a26f']
    };
    
    showProductModal(productData);
  });
});

function showProductModal(product) {
  // Modal HTML oluştur
  const modal = document.createElement('div');
  modal.className = 'product-modal';
  
  // Modal içeriği
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <button class="modal-close"><i class="fas fa-times"></i></button>
      <div class="modal-body">
        <div class="product-modal-left">
          <div class="product-modal-images">
            <div class="main-image">
              <img src="${product.images[0]}" alt="${product.name}">
            </div>
            <div class="thumbnail-images">
              ${product.images.map(img => `<div class="thumbnail"><img src="${img}" alt=""></div>`).join('')}
            </div>
          </div>
        </div>
        <div class="product-modal-right">
          <h2 class="product-modal-title">${product.name}</h2>
          <div class="product-modal-price">
            <span class="current">${product.price}</span>
            ${product.oldPrice ? `<span class="old">${product.oldPrice}</span>` : ''}
          </div>
          <div class="product-modal-rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
            <span class="rating-count">(24 değerlendirme)</span>
          </div>
          <div class="product-modal-description">
            <p>${product.description}</p>
          </div>
          <div class="product-modal-options">
            <div class="option-colors">
              <h4>Renk Seçin:</h4>
              <div class="colors-list">
                ${product.colors.map(color => `<div class="color-option" style="background-color: ${color}"></div>`).join('')}
              </div>
            </div>
            <div class="option-sizes">
              <h4>Beden Seçin:</h4>
              <div class="sizes-list">
                ${product.sizes.map(size => `<div class="size-option">${size}</div>`).join('')}
              </div>
            </div>
            <div class="option-quantity">
              <h4>Adet:</h4>
              <div class="quantity-counter">
                <button class="decrement">-</button>
                <input type="text" value="1" min="1">
                <button class="increment">+</button>
              </div>
            </div>
          </div>
          <div class="product-modal-actions">
            <button class="btn btn-primary add-to-cart"><i class="fas fa-shopping-cart"></i> Sepete Ekle</button>
            <button class="btn btn-outline add-to-wishlist"><i class="far fa-heart"></i> Favorilere Ekle</button>
          </div>
          <div class="product-modal-meta">
            <div class="meta-item">
              <span class="label">Kategori:</span>
              <span class="value">Kadın, Giyim, Üst Giyim</span>
            </div>
            <div class="meta-item">
              <span class="label">Etiketler:</span>
              <span class="value">moda, trend, yaz</span>
            </div>
            <div class="meta-item">
              <span class="label">SKU:</span>
              <span class="value">ELG-${product.id}-TR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Modal'ı sayfaya ekle
  document.body.appendChild(modal);
  
  // Sayacı başlat
  initProductCounters();
  
  // Modal'ı göster (gecikmeli olarak animasyon için)
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
  
  // Modal kapatma butonuna tıklama olayı ekle
  modal.querySelector('.modal-close').addEventListener('click', () => {
    closeModal(modal);
  });
  
  // Overlay'e tıklama olayı ekle
  modal.querySelector('.modal-overlay').addEventListener('click', () => {
    closeModal(modal);
  });
  
  // Thumbnail'e tıklama olayı ekle
  modal.querySelectorAll('.thumbnail').forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      modal.querySelector('.main-image img').src = product.images[index];
    });
  });
  
  // Esc tuşuna basıldığında kapat
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal(modal);
    }
  });
}

function closeModal(modal) {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.remove();
  }, 300);
}

// Newsletter formunu gönderme
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (validateEmail(email)) {
      // Burada normalde form verileri backend'e gönderilir
      showNotification('Bültenimize başarıyla abone oldunuz!');
      emailInput.value = '';
    } else {
      showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
    }
  });
}

// E-posta doğrulama
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Bildirim göster
function showNotification(message, type = 'success') {
  // Eğer bildirim elementi yoksa oluştur
  let notification = document.querySelector('.notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);
  }
  
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
} 