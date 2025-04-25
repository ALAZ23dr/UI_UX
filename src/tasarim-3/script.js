document.addEventListener('DOMContentLoaded', function() {
  // Tema değiştirme işlevi
  const themeToggleBtn = document.querySelector('.theme-toggle-btn');
  const body = document.body;
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function() {
      body.classList.toggle('light-theme');
      
      // Tema tercihini kaydet
      const isLightTheme = body.classList.contains('light-theme');
      localStorage.setItem('nexusTheme', isLightTheme ? 'light' : 'dark');
      
      // İkon değiştir
      const themeIcon = this.querySelector('i');
      if (isLightTheme) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    });
    
    // Kayıtlı tema tercihini uygula
    const savedTheme = localStorage.getItem('nexusTheme');
    if (savedTheme === 'light') {
      body.classList.add('light-theme');
      const themeIcon = themeToggleBtn.querySelector('i');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }
  
  // Oyun kartları hover animasyonu
  const gameCards = document.querySelectorAll('.game-card');
  
  gameCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const actions = this.querySelector('.game-card-actions');
      if (actions) {
        actions.style.opacity = '1';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const actions = this.querySelector('.game-card-actions');
      if (actions) {
        actions.style.opacity = '0';
      }
    });
  });
  
  // Arama işlevi
  const searchInput = document.querySelector('.search-bar input');
  
  if (searchInput) {
    searchInput.addEventListener('focus', function() {
      this.parentElement.style.boxShadow = '0 0 0 2px var(--accent-primary)';
    });
    
    searchInput.addEventListener('blur', function() {
      this.parentElement.style.boxShadow = 'none';
    });
    
    searchInput.addEventListener('input', function() {
      // Arama işlevi burada uygulanabilir
      console.log('Aranan:', this.value);
    });
  }
  
  // Bildirim ve sepet ikonları için popover efekti
  const notificationBtn = document.querySelector('.notification-btn');
  const cartBtn = document.querySelector('.cart-btn');
  
  [notificationBtn, cartBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', function() {
        // Popover içeriği burada oluşturulabilir
        alert('Bu özellik henüz geliştirme aşamasında!');
      });
    }
  });
  
  // İlerleme çubuklarını animasyonlu gösterme
  const progressBars = document.querySelectorAll('.progress');
  
  progressBars.forEach(bar => {
    const width = bar.dataset.progress || bar.style.width;
    bar.style.width = '0%';
    
    setTimeout(() => {
      bar.style.width = width;
      bar.style.transition = 'width 1s ease';
    }, 300);
  });
  
  // Arkadaş listesini filtreleme işlevi
  const friendsSearch = document.querySelector('.friends-search input');
  
  if (friendsSearch) {
    friendsSearch.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const friendItems = document.querySelectorAll('.friend-item');
      
      friendItems.forEach(item => {
        const friendName = item.querySelector('h5').textContent.toLowerCase();
        
        if (friendName.includes(searchTerm)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
  
  // Mobil menü toggle işlevi
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.nexus-sidebar');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('show-mobile');
      this.classList.toggle('active');
    });
  }
}); 