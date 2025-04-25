// E-ticaret Web Sitesi JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Favori ürün işlemleri
  const wishlistButtons = document.querySelectorAll('.product-wishlist');
  wishlistButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
      
      // Kalp ikonunu değiştir
      const heartIcon = this.querySelector('i');
      if (this.classList.contains('active')) {
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
      } else {
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
      }
      
      // Gerçek uygulamada burada API isteği yapılabilir
      const productName = this.closest('.product-card').querySelector('.product-name').textContent;
      console.log(`"${productName}" favorilere ${this.classList.contains('active') ? 'eklendi' : 'çıkarıldı'}`);
    });
  });
  
  // Sepete ekleme butonları
  const addToCartButtons = document.querySelectorAll('.product-action .btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('.product-name').textContent;
      const productPrice = productCard.querySelector('.current-price').textContent;
      
      // Sepete ekleme animasyonu
      this.textContent = 'Sepete Eklendi';
      this.style.backgroundColor = 'var(--color-success)';
      
      setTimeout(() => {
        this.textContent = 'Sepete Ekle';
        this.style.backgroundColor = '';
      }, 2000);
      
      // Sepet sayacını güncelle
      const cartBadge = document.querySelector('.header-action .badge');
      if (cartBadge) {
        const currentCount = parseInt(cartBadge.textContent);
        cartBadge.textContent = currentCount + 1;
      }
      
      // Gerçek uygulamada burada API isteği yapılabilir
      console.log(`"${productName}" (${productPrice}) sepete eklendi`);
    });
  });
  
  // Arama formu işlemleri
  const searchForm = document.querySelector('.search-form');
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchInput = this.querySelector('.search-input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
      // Gerçek uygulamada burada arama sonuçları sayfasına yönlendirme yapılabilir
      console.log(`"${searchTerm}" için arama yapılıyor...`);
      // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
      alert(`"${searchTerm}" için arama sonuçları gösteriliyor...`);
    }
  });
  
  // Kategori kartları hover efekti
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const overlay = this.querySelector('.category-overlay');
      overlay.style.background = 'linear-gradient(transparent, rgba(74, 144, 226, 0.7))';
    });
    
    card.addEventListener('mouseleave', function() {
      const overlay = this.querySelector('.category-overlay');
      overlay.style.background = 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))';
    });
  });
  
  // Responsive özellikleri
  function handleResponsive() {
    const windowWidth = window.innerWidth;
    const searchForm = document.querySelector('.search-form');
    
    if (windowWidth < 768) {
      searchForm.style.maxWidth = '100%';
    } else {
      searchForm.style.maxWidth = '500px';
    }
  }
  
  // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde responsive özellikleri güncelle
  handleResponsive();
  window.addEventListener('resize', handleResponsive);
}); 