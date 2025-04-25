// Üretkenlik Uygulaması JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Sidebar toggle işlevi
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const mainContent = document.querySelector('.main-content');
  
  sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('sidebar-collapsed');
    mainContent.classList.toggle('sidebar-collapsed');
    
    // Toggle ikonu değiştir
    const icon = this.querySelector('i');
    if (sidebar.classList.contains('sidebar-collapsed')) {
      icon.classList.remove('fa-chevron-left');
      icon.classList.add('fa-chevron-right');
    } else {
      icon.classList.remove('fa-chevron-right');
      icon.classList.add('fa-chevron-left');
    }
  });
  
  // Karanlık/Aydınlık mod değiştirme
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    // Toggle ikonu değiştir
    const icon = this.querySelector('i');
    if (body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
    
    // Kullanıcı tercihini localStorage'a kaydet
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
  });
  
  // Sayfa yüklendiğinde kullanıcının tercihlerini kontrol et
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    body.classList.add('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
  
  // Mobil cihazlarda otomatik sidebar gizleme
  function handleResponsive() {
    if (window.innerWidth <= 768) {
      sidebar.classList.add('sidebar-collapsed');
      mainContent.classList.add('sidebar-collapsed');
      const icon = sidebarToggle.querySelector('i');
      icon.classList.remove('fa-chevron-left');
      icon.classList.add('fa-chevron-right');
    } else if (!localStorage.getItem('sidebarCollapsed')) {
      sidebar.classList.remove('sidebar-collapsed');
      mainContent.classList.remove('sidebar-collapsed');
      const icon = sidebarToggle.querySelector('i');
      icon.classList.remove('fa-chevron-right');
      icon.classList.add('fa-chevron-left');
    }
  }
  
  // Pencere boyutu değiştiğinde tepki ver
  window.addEventListener('resize', handleResponsive);
  
  // İlk yüklendiğinde responsive ayarları uygula
  handleResponsive();
  
  // Görev işaretleme fonksiyonları
  const taskCheckboxes = document.querySelectorAll('.task-checkbox input');
  taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const taskItem = this.closest('.task-item');
      
      if (this.checked) {
        taskItem.classList.add('task-completed');
        
        // Tamamlanan görevler widget güncelleme
        updateCompletedTasks();
        
        // Gerçek uygulamada burada API isteği yapılabilir
        console.log(`"${taskItem.querySelector('.task-title').textContent}" görevi tamamlandı olarak işaretlendi.`);
      } else {
        taskItem.classList.remove('task-completed');
        
        // Tamamlanan görevler widget güncelleme
        updateCompletedTasks();
        
        // Gerçek uygulamada burada API isteği yapılabilir
        console.log(`"${taskItem.querySelector('.task-title').textContent}" görevi tamamlanmadı olarak işaretlendi.`);
      }
    });
  });
  
  // Tamamlanan görevleri güncelleme
  function updateCompletedTasks() {
    const totalTasks = taskCheckboxes.length;
    const completedTasks = document.querySelectorAll('.task-item.task-completed').length;
    
    // Widget değerlerini güncelle
    const completedWidget = document.querySelector('.widget-card:nth-child(1)');
    const widgetValue = completedWidget.querySelector('.widget-value');
    const progressBar = completedWidget.querySelector('.progress-bar');
    const widgetDesc = completedWidget.querySelector('.widget-desc');
    
    widgetValue.textContent = `${completedTasks}/${totalTasks}`;
    
    const percentage = Math.round((completedTasks / totalTasks) * 100);
    progressBar.style.width = `${percentage}%`;
    
    widgetDesc.textContent = `Bu hafta ${totalTasks} görevden ${completedTasks}'ini tamamladın. Hedefine %${percentage} ulaştın.`;
    
    // Bugünkü görevler widget'ını da güncelle
    const todayWidget = document.querySelector('.widget-card:nth-child(3)');
    const todayWidgetValue = todayWidget.querySelector('.widget-value');
    const todayProgressBar = todayWidget.querySelector('.progress-bar');
    const todayWidgetDesc = todayWidget.querySelector('.widget-desc');
    
    // Bugünkü görevlerin tamamlanma durumu
    const todayCompletedTasks = document.querySelectorAll('.task-item.task-completed').length;
    
    todayProgressBar.style.width = `${(todayCompletedTasks / 5) * 100}%`;
    todayWidgetDesc.textContent = `Bugün için 5 görevin var, ${todayCompletedTasks}'sini tamamladın.`;
  }
  
  // Görev silme
  const deleteButtons = document.querySelectorAll('.task-action .fa-trash-alt');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const taskItem = this.closest('.task-item');
      const taskTitle = taskItem.querySelector('.task-title').textContent;
      
      // Basit onay iletişim kutusu
      if (confirm(`"${taskTitle}" görevini silmek istediğinize emin misiniz?`)) {
        // Animasyon ile kaldır
        taskItem.style.opacity = '0';
        taskItem.style.transform = 'translateX(20px)';
        taskItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
          taskItem.remove();
          updateCompletedTasks();
        }, 300);
        
        // Gerçek uygulamada burada API isteği yapılabilir
        console.log(`"${taskTitle}" görevi silindi.`);
      }
    });
  });
  
  // Görev düzenleme
  const editButtons = document.querySelectorAll('.task-action .fa-edit');
  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const taskItem = this.closest('.task-item');
      const taskTitle = taskItem.querySelector('.task-title').textContent;
      
      // Gerçek uygulamada burada düzenleme modal'ı açılabilir
      alert(`"${taskTitle}" görevini düzenleme özelliği henüz uygulanmadı. Bu gerçek bir uygulama olsaydı, burada bir düzenleme formu açılırdı.`);
      
      console.log(`"${taskTitle}" görevini düzenleme isteği.`);
    });
  });
  
  // Sidebar menü öğeleri tıklama işlevi
  const sidebarLinks = document.querySelectorAll('.sidebar-menu-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Aktif sınıfını kaldır
      sidebarLinks.forEach(item => {
        item.classList.remove('active');
      });
      
      // Tıklanan öğeye aktif sınıfı ekle
      this.classList.add('active');
      
      // Gerçek uygulamada burada sayfa değişikliği yapılabilir
      const pageName = this.querySelector('span').textContent;
      console.log(`${pageName} sayfasına gidiliyor...`);
    });
  });
});

// Learning Platform JavaScript

document.addEventListener('DOMContentLoaded', function() {
  console.log('Learning Platform Application initialized');
  
  // Initialize sidebar toggle
  initializeSidebar();
  
  // Toggle dark/light mode
  initializeThemeToggle();
  
  // Initialize course actions
  initializeCourseActions();
  
  // Load learning statistics
  loadLearningStatistics();
});

// Initialize sidebar toggle functionality
function initializeSidebar() {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
      sidebarToggle.classList.toggle('active');
      
      // Change icon direction
      const icon = sidebarToggle.querySelector('i');
      if (sidebar.classList.contains('active')) {
        icon.classList.remove('fa-chevron-left');
        icon.classList.add('fa-chevron-right');
      } else {
        icon.classList.remove('fa-chevron-right');
        icon.classList.add('fa-chevron-left');
      }
    });
  }
}

// Initialize theme toggle functionality
function initializeThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Update icon
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Save preference
      localStorage.setItem('theme', newTheme);
      document.body.setAttribute('data-theme', newTheme);
      
      // Update icon
      updateThemeIcon(newTheme);
    });
  }
}

// Update theme toggle icon
function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i');
  if (icon) {
    if (theme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }
}

// Initialize course actions
function initializeCourseActions() {
  // Add event listeners to course continue buttons
  const continueBtns = document.querySelectorAll('.course-continue-btn');
  continueBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const courseItem = this.closest('.course-item');
      const courseTitle = courseItem.querySelector('.course-title').textContent;
      
      console.log('Continue course:', courseTitle);
      // In a real app, navigate to the course viewing page
      alert(`${courseTitle} kursuna devam ediliyor...`);
    });
  });
  
  // Add event listeners to course cards
  const courseCards = document.querySelectorAll('.course-card');
  courseCards.forEach(card => {
    card.addEventListener('click', function() {
      const courseTitle = this.querySelector('.course-card-title').textContent;
      
      console.log('View course details:', courseTitle);
      // In a real app, navigate to the course details page
      alert(`${courseTitle} kurs detayları görüntüleniyor...`);
    });
  });
}

// Load learning statistics data
function loadLearningStatistics() {
  console.log('Loading learning statistics...');
  
  // In a real app, this would fetch data from an API
  const chartPlaceholder = document.querySelector('.chart-placeholder');
  if (chartPlaceholder) {
    chartPlaceholder.innerHTML = createWeeklyLearningChart();
  }
}

// Create a weekly learning chart
function createWeeklyLearningChart() {
  // Sample data - in a real app, this would come from the backend
  const weeklyData = [
    { day: 'Pazartesi', hours: 1.5 },
    { day: 'Salı', hours: 2.0 },
    { day: 'Çarşamba', hours: 2.5 },
    { day: 'Perşembe', hours: 1.0 },
    { day: 'Cuma', hours: 3.0 },
    { day: 'Cumartesi', hours: 1.5 },
    { day: 'Pazar', hours: 0.5 }
  ];
  
  const maxHours = Math.max(...weeklyData.map(d => d.hours));
  
  let chartHTML = '<div class="learning-chart">';
  
  // Create the bars
  chartHTML += '<div class="chart-bars">';
  weeklyData.forEach(day => {
    const heightPercentage = (day.hours / maxHours) * 100;
    chartHTML += `
      <div class="chart-bar-column">
        <div class="chart-bar-value">${day.hours}s</div>
        <div class="chart-bar-wrapper">
          <div class="chart-bar" style="height: ${heightPercentage}%"></div>
        </div>
        <div class="chart-bar-label">${day.day.substring(0, 3)}</div>
      </div>
    `;
  });
  chartHTML += '</div>';
  
  // Add some stats
  const totalHours = weeklyData.reduce((sum, day) => sum + day.hours, 0);
  const averageHours = totalHours / weeklyData.length;
  
  chartHTML += `
    <div class="chart-stats">
      <div class="chart-stat">
        <div class="chart-stat-label">Toplam</div>
        <div class="chart-stat-value">${totalHours} saat</div>
      </div>
      <div class="chart-stat">
        <div class="chart-stat-label">Günlük Ort.</div>
        <div class="chart-stat-value">${averageHours.toFixed(1)} saat</div>
      </div>
      <div class="chart-stat">
        <div class="chart-stat-label">En Verimli Gün</div>
        <div class="chart-stat-value">${weeklyData.reduce((max, day) => day.hours > max.hours ? day : max, weeklyData[0]).day}</div>
      </div>
    </div>
  `;
  
  chartHTML += '</div>';
  
  // Add CSS styles
  chartHTML += `
    <style>
      .learning-chart {
        padding: 20px;
      }
      
      .chart-bars {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        height: 180px;
        margin-bottom: 30px;
      }
      
      .chart-bar-column {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 12%;
      }
      
      .chart-bar-value {
        font-size: 12px;
        margin-bottom: 5px;
        color: var(--learning-gray-500);
      }
      
      .chart-bar-wrapper {
        width: 100%;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
      
      .chart-bar {
        width: 70%;
        background: linear-gradient(to top, var(--learning-primary), var(--learning-accent));
        border-radius: 4px 4px 0 0;
        transition: height 0.3s ease;
      }
      
      .chart-bar-label {
        margin-top: 8px;
        font-size: 12px;
        font-weight: 600;
      }
      
      .chart-stats {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        border-top: 1px solid var(--learning-gray-200);
        padding-top: 15px;
      }
      
      .chart-stat {
        text-align: center;
      }
      
      .chart-stat-label {
        font-size: 12px;
        color: var(--learning-gray-500);
        margin-bottom: 5px;
      }
      
      .chart-stat-value {
        font-size: 16px;
        font-weight: 600;
        color: var(--learning-primary);
      }
    </style>
  `;
  
  return chartHTML;
}

// Add event listener for sidebar menu items
document.addEventListener('DOMContentLoaded', function() {
  const sidebarMenuLinks = document.querySelectorAll('.sidebar-menu-link');
  
  sidebarMenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      sidebarMenuLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Get menu item text
      const menuItem = this.querySelector('span').textContent;
      console.log(`Navigating to: ${menuItem}`);
      
      // In a real app, this would navigate to the appropriate page
      // For now, show a simple alert
      alert(`${menuItem} sayfasına yönlendiriliyorsunuz...`);
    });
  });
});

// Game Store App.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initializeSidebar();
  initializeTheme();
  initializeGameActions();
  loadGameStatistics();
  
  // Sample game data
  const gameData = {
    library: [
      { 
        id: 1, 
        title: "Cyberpunk 2077", 
        developer: "CD Projekt Red", 
        image: "https://via.placeholder.com/80x60/1a1a1a/00f5a0?text=CP2077",
        playtime: 45,
        completion: 32,
        lastPlayed: "2 gün önce"
      },
      { 
        id: 2, 
        title: "The Witcher 3", 
        developer: "CD Projekt Red", 
        image: "https://via.placeholder.com/80x60/1a1a1a/00f5a0?text=Witcher3",
        playtime: 120,
        completion: 89,
        lastPlayed: "1 hafta önce"
      },
      { 
        id: 3, 
        title: "Red Dead Redemption 2", 
        developer: "Rockstar Games", 
        image: "https://via.placeholder.com/80x60/1a1a1a/00f5a0?text=RDR2",
        playtime: 78,
        completion: 65,
        lastPlayed: "3 gün önce"
      }
    ],
    newReleases: [
      { 
        id: 4, 
        title: "Elden Ring", 
        developer: "FromSoftware", 
        image: "https://via.placeholder.com/240x160/1a1a1a/00f5a0?text=EldenRing",
        price: 499.99,
        originalPrice: 599.99,
        rating: 4.8,
        releaseDate: "25 Şubat 2022",
        platforms: ["PC", "PS5", "XSX"]
      },
      { 
        id: 5, 
        title: "God of War Ragnarök", 
        developer: "Santa Monica Studio", 
        image: "https://via.placeholder.com/240x160/1a1a1a/00f5a0?text=GoW",
        price: 699.99,
        originalPrice: 699.99,
        rating: 4.9,
        releaseDate: "9 Kasım 2022",
        platforms: ["PS5", "PS4"]
      },
      { 
        id: 6, 
        title: "Starfield", 
        developer: "Bethesda", 
        image: "https://via.placeholder.com/240x160/1a1a1a/00f5a0?text=Starfield",
        price: 599.99,
        originalPrice: 699.99,
        rating: 4.5,
        releaseDate: "6 Eylül 2023",
        platforms: ["PC", "XSX"]
      }
    ],
    statistics: {
      weeklyPlaytime: [2.5, 4, 1.5, 3, 5, 3.5, 6],
      totalGames: 42,
      achievements: 156,
      completedGames: 18,
      totalPlaytime: "412.5"
    }
  };

  // Initialize sidebar toggle
  function initializeSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        this.classList.toggle('active');
      });
    }
    
    // Handle sidebar menu item clicks
    const menuLinks = document.querySelectorAll('.sidebar-menu-link');
    menuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Remove active class from all links
        menuLinks.forEach(item => item.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // For demo purposes, prevent default behavior
        e.preventDefault();
        showFeedback(`"${this.textContent.trim()}" sayfası yükleniyor...`);
      });
    });
  }

  // Initialize theme toggle
  function initializeTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.querySelector('body');
    
    // Check if dark mode is enabled in localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply theme based on localStorage
    if (isDarkMode) {
      body.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      body.removeAttribute('data-theme');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Theme toggle click handler
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        if (body.getAttribute('data-theme') === 'dark') {
          body.removeAttribute('data-theme');
          localStorage.setItem('darkMode', 'false');
          this.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
          body.setAttribute('data-theme', 'dark');
          localStorage.setItem('darkMode', 'true');
          this.innerHTML = '<i class="fas fa-sun"></i>';
        }
      });
    }
  }

  // Initialize game actions
  function initializeGameActions() {
    // Game item click handlers
    const gameItems = document.querySelectorAll('.game-item');
    gameItems.forEach(item => {
      item.addEventListener('click', function() {
        const gameTitle = this.querySelector('.game-title').textContent;
        showGameDetails(gameTitle);
      });
      
      // Buy button click handler
      const buyBtn = item.querySelector('.game-buy-btn');
      if (buyBtn) {
        buyBtn.addEventListener('click', function(e) {
          e.stopPropagation(); // Prevent triggering game item click
          const gameTitle = item.querySelector('.game-title').textContent;
          showFeedback(`"${gameTitle}" sepete eklendi!`);
        });
      }
    });
    
    // Game card click handlers
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
      card.addEventListener('click', function() {
        const gameTitle = this.querySelector('.game-card-title').textContent;
        showGameDetails(gameTitle);
      });
    });
  }

  // Load game statistics and create chart
  function loadGameStatistics() {
    // Update statistics values
    document.querySelector('.achievements-value').textContent = gameData.statistics.achievements;
    document.querySelector('.total-games-value').textContent = gameData.statistics.totalGames;
    document.querySelector('.completed-games-value').textContent = gameData.statistics.completedGames;
    document.querySelector('.total-playtime-value').textContent = gameData.statistics.totalPlaytime;
    
    // Create weekly playtime chart
    createWeeklyPlaytimeChart();
  }

  // Create weekly playtime chart
  function createWeeklyPlaytimeChart() {
    const chartElement = document.getElementById('weekly-playtime-chart');
    
    if (!chartElement) return;
    
    // Chart data and options
    const weeklyData = gameData.statistics.weeklyPlaytime;
    const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
    
    // Simple chart drawing with CSS
    chartElement.innerHTML = '';
    
    // Create chart container
    const chartContainer = document.createElement('div');
    chartContainer.className = 'playtime-chart-container';
    chartContainer.style.display = 'flex';
    chartContainer.style.alignItems = 'flex-end';
    chartContainer.style.height = '150px';
    chartContainer.style.padding = '10px 0';
    chartContainer.style.gap = '8px';
    
    // Find max value for scaling
    const maxValue = Math.max(...weeklyData);
    
    // Create bars for each day
    weeklyData.forEach((value, index) => {
      // Create bar container
      const barContainer = document.createElement('div');
      barContainer.className = 'playtime-bar-container';
      barContainer.style.flex = '1';
      barContainer.style.display = 'flex';
      barContainer.style.flexDirection = 'column';
      barContainer.style.alignItems = 'center';
      barContainer.style.gap = '8px';
      
      // Create bar
      const bar = document.createElement('div');
      bar.className = 'playtime-bar';
      const height = (value / maxValue) * 100;
      bar.style.height = `${height}%`;
      bar.style.width = '16px';
      bar.style.background = 'linear-gradient(to top, var(--game-primary), var(--game-accent))';
      bar.style.borderRadius = '4px';
      bar.dataset.value = value;
      
      // Create day label
      const dayLabel = document.createElement('div');
      dayLabel.className = 'playtime-day';
      dayLabel.textContent = days[index];
      dayLabel.style.fontSize = '10px';
      dayLabel.style.color = 'var(--game-text-light)';
      
      // Tooltip on hover
      bar.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = `${value} saat`;
        tooltip.style.position = 'absolute';
        tooltip.style.bottom = '100%';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.background = 'var(--game-primary)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '4px 8px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.marginBottom = '4px';
        tooltip.style.zIndex = '1000';
        
        e.target.style.position = 'relative';
        e.target.appendChild(tooltip);
      });
      
      bar.addEventListener('mouseleave', (e) => {
        const tooltip = e.target.querySelector('.tooltip');
        if (tooltip) {
          tooltip.remove();
        }
      });
      
      // Append elements to container
      barContainer.appendChild(bar);
      barContainer.appendChild(dayLabel);
      chartContainer.appendChild(barContainer);
    });
    
    // Append chart container to chart element
    chartElement.appendChild(chartContainer);
  }

  // Show feedback message
  function showFeedback(message) {
    const feedbackElement = document.createElement('div');
    feedbackElement.className = 'feedback-message';
    feedbackElement.textContent = message;
    feedbackElement.style.position = 'fixed';
    feedbackElement.style.bottom = '20px';
    feedbackElement.style.left = '50%';
    feedbackElement.style.transform = 'translateX(-50%)';
    feedbackElement.style.background = 'var(--game-primary)';
    feedbackElement.style.color = 'white';
    feedbackElement.style.padding = '10px 20px';
    feedbackElement.style.borderRadius = '4px';
    feedbackElement.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    feedbackElement.style.zIndex = '1000';
    
    document.body.appendChild(feedbackElement);
    
    // Remove after 3 seconds
    setTimeout(() => {
      feedbackElement.style.opacity = '0';
      feedbackElement.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        document.body.removeChild(feedbackElement);
      }, 500);
    }, 3000);
  }

  // Show game details
  function showGameDetails(gameTitle) {
    showFeedback(`"${gameTitle}" detayları görüntüleniyor...`);
    // For demo purposes, actual implementation would load game details page
  }
}); 