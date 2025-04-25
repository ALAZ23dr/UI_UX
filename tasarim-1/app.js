// NetScreen - Film ve Dizi İzleme Platformu JavaScript

document.addEventListener('DOMContentLoaded', function() {
  console.log('NetScreen - Film ve Dizi Platformu initialized');
  
  // Verileri başlat
  initializeMediaData();
  
  // Olay dinleyicilerini ekle
  addEventListeners();
  
  // Mobil menü için işlevsellik ekle
  setupMobileInteractions();
  
  // Duyarlı tasarım ayarları
  setupResponsiveDesign();
});

// Örnek film ve dizi verilerini başlat
function initializeMediaData() {
  // Gerçek bir uygulamada, bu fonksiyon API'den veri çekerdi
  console.log('Media data initialized');
  
  // Örnek veri yapıları
  const mediaData = {
    featured: {
      title: "Stranger Things",
      seasons: 4,
      year: "2016-2023",
      creator: "The Duffer Brothers",
      rating: 8.7,
      genres: ["Bilim Kurgu", "Korku", "Gerilim"],
      description: "1980'lerde geçen kült dizi, Indiana'daki Hawkins kasabasında yaşayan genç bir grup arkadaşın gizemli olaylar ve paralel bir boyutla karşılaşmalarını konu alıyor.",
      cast: ["Millie Bobby Brown", "Finn Wolfhard", "Noah Schnapp", "Caleb McLaughlin"],
      watchProgress: 0.72
    },
    popularMovies: [
      { id: 1, title: "Dune: Part Two", genre: "Bilim Kurgu", year: 2024, rating: 8.5, director: "Denis Villeneuve" },
      { id: 2, title: "Joker", genre: "Dram/Gerilim", year: 2019, rating: 8.4, director: "Todd Phillips" },
      { id: 3, title: "The Batman", genre: "Aksiyon/Gerilim", year: 2022, rating: 7.8, director: "Matt Reeves" },
      { id: 4, title: "Inception", genre: "Bilim Kurgu", year: 2010, rating: 8.8, director: "Christopher Nolan" },
      { id: 5, title: "Oppenheimer", genre: "Dram/Biyografi", year: 2023, rating: 8.9, director: "Christopher Nolan" }
    ],
    newShows: [
      { id: 101, title: "The Last of Us", genre: "Bilim Kurgu", year: 2023, rating: 8.7, seasons: 1 },
      { id: 102, title: "Wednesday", genre: "Komedi/Korku", year: 2022, rating: 8.2, seasons: 1 },
      { id: 103, title: "The Mandalorian", genre: "Bilim Kurgu", year: 2019, rating: 8.7, seasons: 3 },
      { id: 104, title: "Dark", genre: "Bilim Kurgu", year: 2017, rating: 8.7, seasons: 3 },
      { id: 105, title: "House of the Dragon", genre: "Fantastik", year: 2022, rating: 8.5, seasons: 1 }
    ],
    continueWatching: [
      { id: 201, title: "Breaking Bad", season: 3, episode: 8, timeLeft: "35 dk", progress: 0.75 },
      { id: 202, title: "Peaky Blinders", season: 4, episode: 3, timeLeft: "28 dk", progress: 0.45 },
      { id: 203, title: "The Witcher", season: 2, episode: 1, timeLeft: "42 dk", progress: 0.20 }
    ],
    topGenres: [
      { name: "Bilim Kurgu", count: 87 },
      { name: "Aksiyon", count: 125 },
      { name: "Dram", count: 156 },
      { name: "Komedi", count: 98 },
      { name: "Gerilim", count: 74 }
    ]
  };
  
  // Demo amaçlı olarak local storage'a kaydet
  localStorage.setItem('netscreenData', JSON.stringify(mediaData));
}

// Etkileşimli öğeler için olay dinleyicileri ekle
function addEventListeners() {
  // Sidebar menü öğeleri
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      // Aktif öğeyi güncelle
      menuItems.forEach(mi => mi.classList.remove('active'));
      this.classList.add('active');
      
      // Menü tıklamasını günlüğe kaydet
      const menuText = this.textContent.trim();
      console.log(`Navigating to: ${menuText}`);
    });
  });
  
  // Film ve dizi kartları
  const mediaCards = document.querySelectorAll('.media-card, .continue-card');
  mediaCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Fare üzerine gelince animasyon
      this.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
      // Fare ayrıldığında normale dön
      this.style.transform = 'scale(1)';
    });
    
    card.addEventListener('click', function() {
      // İçindeki başlık öğesini bul
      const mediaTitle = this.querySelector('.media-title, .continue-title').textContent;
      showMediaDetails(mediaTitle);
    });
  });
  
  // Oynat düğmeleri
  const playButtons = document.querySelectorAll('.btn-primary, .media-action-btn');
  playButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation(); // Kartın tıklama olayını engelle
      
      // En yakın başlığı bul
      let mediaTitle;
      if (this.closest('.hero-content')) {
        mediaTitle = document.querySelector('.hero-title').textContent;
      } else if (this.closest('.media-card')) {
        mediaTitle = this.closest('.media-card').querySelector('.media-title').textContent;
      } else if (this.closest('.continue-card')) {
        mediaTitle = this.closest('.continue-card').querySelector('.continue-title').textContent;
      }
      
      if (mediaTitle) {
        playMedia(mediaTitle);
      }
    });
  });
  
  // Bildirim ikonu
  const notificationIcon = document.querySelector('.notification-icon');
  if (notificationIcon) {
    notificationIcon.addEventListener('click', function(e) {
      e.preventDefault();
      showNotifications();
    });
  }
  
  // Kullanıcı profili
  const userProfile = document.querySelector('.user-profile');
  if (userProfile) {
    userProfile.addEventListener('click', function() {
      showUserMenu();
    });
  }
  
  // Arama çubuğu
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
    searchInput.addEventListener('focus', function() {
      this.parentNode.style.boxShadow = '0 0 0 2px rgba(229, 9, 20, 0.3)';
    });
    
    searchInput.addEventListener('blur', function() {
      this.parentNode.style.boxShadow = 'none';
    });
    
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        searchMedia(this.value);
      }
    });
  }
}

// Mobil etkileşimler
function setupMobileInteractions() {
  // Mobil menü öğeleri
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  mobileNavItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Aktif sınıfını güncelle
      mobileNavItems.forEach(navItem => navItem.classList.remove('active'));
      this.classList.add('active');
      
      // Menü öğesini günlüğe kaydet
      const navText = this.querySelector('span').textContent.trim();
      console.log(`Mobile navigation: ${navText}`);
    });
  });
}

// Duyarlı tasarım ayarları
function setupResponsiveDesign() {
  // Ekran boyutunu kontrol et
  checkScreenSize();
  
  // Ekran boyutu değiştiğinde kontrol et
  window.addEventListener('resize', checkScreenSize);
}

// Ekran boyutunu kontrol et ve uygun düzenlemeleri yap
function checkScreenSize() {
  const screenWidth = window.innerWidth;
  
  // Mobil cihazlar için
  if (screenWidth < 768) {
    console.log('Mobile view activated');
    
    // Kenar çubuğunu gizle
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.style.transform = 'translateX(-100%)';
    }
    
    // Ana içeriği genişlet
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.style.marginLeft = '0';
    }
    
    // Mobil gezinmeyi göster
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav) {
      mobileNav.style.display = 'flex';
    }
  } else {
    console.log('Desktop view activated');
    
    // Kenar çubuğunu göster
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.style.transform = 'translateX(0)';
    }
    
    // Ana içeriği kenar çubuğunun genişliğine göre ayarla
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.style.marginLeft = 'var(--sidebar-width)';
    }
    
    // Mobil gezinmeyi gizle
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav) {
      mobileNav.style.display = 'none';
    }
  }
}

// Bir film veya diziyi oynat
function playMedia(title) {
  console.log(`Playing: ${title}`);
  
  // Gerçek bir uygulamada, oynatıcıya yönlendirme yapılır
  // Demo amaçlı bildirim
  showToast(`${title} oynatılıyor...`);
}

// Detayları göster
function showMediaDetails(title) {
  console.log(`Showing details for: ${title}`);
  
  // Veri deposundan filmi veya diziyi bul
  const mediaData = JSON.parse(localStorage.getItem('netscreenData')) || {};
  
  // Tüm listelerde ara
  let media = null;
  
  if (title === mediaData.featured.title) {
    media = mediaData.featured;
  } else {
    const allMedia = [
      ...mediaData.popularMovies,
      ...mediaData.newShows,
      ...mediaData.continueWatching.map(item => {
        return {
          title: item.title,
          type: 'continue',
          season: item.season,
          episode: item.episode,
          timeLeft: item.timeLeft
        };
      })
    ];
    
    media = allMedia.find(m => m.title === title);
  }
  
  if (media) {
    // Gerçek bir uygulamada, detay sayfası gösterilir
    // Demo amaçlı gösterim
    let details = '';
    
    if (media.type === 'continue') {
      details = `
        İzlemeye Devam Et:
        ${media.title}
        Sezon ${media.season}, Bölüm ${media.episode}
        Kalan süre: ${media.timeLeft}
      `;
    } else if (media.seasons) {
      details = `
        Dizi: ${media.title}
        ${media.year ? `Yıl: ${media.year}` : ''}
        ${media.rating ? `IMDB: ${media.rating}/10` : ''}
        ${media.seasons ? `Sezon: ${media.seasons}` : ''}
        ${media.genre ? `Tür: ${media.genre}` : ''}
      `;
    } else {
      details = `
        Film: ${media.title}
        ${media.year ? `Yıl: ${media.year}` : ''}
        ${media.rating ? `IMDB: ${media.rating}/10` : ''}
        ${media.genre ? `Tür: ${media.genre}` : ''}
        ${media.director ? `Yönetmen: ${media.director}` : ''}
      `;
    }
    
    showToast(details);
  } else {
    showToast(`${title} için detaylar bulunamadı.`);
  }
}

// Bildirimleri göster
function showNotifications() {
  const notifications = [
    "House of the Dragon'un yeni sezonu yayında!",
    "Deadpool & Wolverine platformumuza eklendi",
    "Geçen ay en çok izlenen filmler listesi yayınlandı"
  ];
  
  let notificationHTML = "<h3>Bildirimler</h3><ul>";
  notifications.forEach(notification => {
    notificationHTML += `<li>${notification}</li>`;
  });
  notificationHTML += "</ul>";
  
  showToast(notificationHTML);
}

// Kullanıcı menüsünü göster
function showUserMenu() {
  const menuItems = [
    "Profil Ayarları",
    "Hesap Bilgileri",
    "İzleme Geçmişi",
    "Yardım Merkezi",
    "Çıkış Yap"
  ];
  
  let menuHTML = "<h3>Kullanıcı Menüsü</h3><ul>";
  menuItems.forEach(item => {
    menuHTML += `<li>${item}</li>`;
  });
  menuHTML += "</ul>";
  
  showToast(menuHTML);
}

// Medya ara
function searchMedia(query) {
  if (!query.trim()) return;
  
  console.log(`Searching for: ${query}`);
  showToast(`"${query}" ile ilgili içerikler aranıyor...`);
}

// Toast bildirim göster
function showToast(message) {
  // Mevcut toast'ı kontrol et
  let toast = document.querySelector('.toast-notification');
  
  if (!toast) {
    // Toast yoksa oluştur
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
    
    // Stil ekle
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = 'rgba(31, 31, 31, 0.9)';
    toast.style.color = 'white';
    toast.style.padding = '15px 20px';
    toast.style.borderRadius = '5px';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
    toast.style.zIndex = '1000';
    toast.style.maxWidth = '300px';
    toast.style.transition = 'opacity 0.3s ease';
  }
  
  // İçeriği ayarla
  toast.innerHTML = message;
  toast.style.opacity = '1';
  
  // Belirli bir süre sonra gizle
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
} 