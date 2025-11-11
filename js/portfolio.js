// Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initWorkCardInteractions();
    initSmoothScrolling();
    initNavbarEffects();
    initTypingEffect();
    initParallaxEffect();
    addScrollProgress();
    initEnhancedAnimations();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Add animation class based on element position
                if (element.classList.contains('about-card')) {
                    element.classList.add('fade-in-up');
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(40px)';
                    setTimeout(() => {
                        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 100);
                } else if (element.classList.contains('skill-card')) {
                    element.classList.add('fade-in-left');
                    element.style.opacity = '0';
                    element.style.transform = 'translateX(-40px)';
                    setTimeout(() => {
                        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                    }, 100);
                } else if (element.classList.contains('work-card')) {
                    element.classList.add('fade-in-right');
                    element.style.opacity = '0';
                    element.style.transform = 'translateX(40px)';
                    setTimeout(() => {
                        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                    }, 100);
                }

                // Remove observer after animation
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.about-card, .skill-card, .work-card').forEach(el => {
        observer.observe(el);
    });
}

// Work Card Interactions
function initWorkCardInteractions() {
    const workCards = document.querySelectorAll('.work-card');

    workCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger modal if clicking on links
            if (e.target.tagName === 'A' || e.target.closest('.work-links')) {
                return;
            }

            const workType = this.dataset.work;
            showWorkModal(workType);
        });

        // Add enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(61, 207, 194, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        });
    });
}

// Show Work Modal
function showWorkModal(workType) {
    const modal = document.getElementById('workModal');
    const modalTitle = document.getElementById('workModalLabel');
    const modalBody = document.getElementById('workModalBody');

    // Work details data
    const workDetails = {
        'svg-calendar': {
            title: 'SVGカレンダー',
            description: '拡大しても劣化しないベクター形式のカレンダーサービスです。',
            features: [
                '日本の祝日自動表示',
                'カスタマイズ可能な色設定',
                '過去の日付の斜線表示',
                'SVG形式で高品質な表示',
                'レスポンシブデザイン対応'
            ],
            technologies: ['HTML', 'CSS', 'JavaScript', 'SVG', 'API'],
            link: 'https://svg-calendar.com/',
            linkText: 'サイトを見る'
        },
        'dev-cabinet': {
            title: 'dev-cabinet',
            description: 'ゲームのステータス画面のようにエンジニアのスキルを紹介するサービスです。',
            features: [
                '視覚的なスキルマップ表示',
                'ゲーム風のUI/UX',
                'スキルレベルの可視化',
                'レスポンシブデザイン',
                'モダンなWeb技術'
            ],
            technologies: ['Vue.js', 'JavaScript', 'CSS3', 'HTML5'],
            link: 'https://dev-cabinet.com/',
            linkText: 'サイトを見る'
        },
        'notify-me': {
            title: 'Notify me!',
            description: '会議などの予定を見過ごさないためのChrome拡張機能です。',
            features: [
                '時間ベースの通知機能',
                'カスタマイズ可能な通知設定',
                'フロート表示のドラッグ移動',
                '通知画面のカスタマイズ',
                'Chrome Web Store対応'
            ],
            technologies: ['Chrome Extension API', 'JavaScript', 'HTML', 'CSS'],
            link: 'https://chromewebstore.google.com/detail/notify-me/mbdbpcheokpifdgllibffdcpefngijfk',
            linkText: 'Chrome Web Store'
        },
        'micro-note': {
            title: 'Micro Note',
            description: '数行程度のメモをTwitterのように保存して貼り付けられるデスクトップアプリです。',
            features: [
                '軽量で高速な動作',
                'Twitter風のメモ表示',
                '簡単なコピー&ペースト',
                'クロスプラットフォーム対応',
                'オープンソース'
            ],
            technologies: ['Rust', 'Vue.js', 'Tauri', 'TypeScript'],
            link: 'https://github.com/shinya/micro-note',
            linkText: 'GitHub'
        },
        'bokuchi': {
            title: 'Bokuchi',
            description: '軽くて高性能なMarkdownエディターです。',
            features: [
                'リアルタイムプレビュー',
                'シンタックスハイライト',
                '軽量で高速',
                'Markdownに特化',
                'シンプルなUI'
            ],
            technologies: ['Rust', 'Markdown', 'Desktop GUI'],
            link: 'https://github.com/shinya/md-editor',
            linkText: 'GitHub'
        },
        'github': {
            title: 'GitHub Profile',
            description: 'オープンソースプロジェクトの開発や貢献を行っています。',
            features: [
                '様々な技術スタックでの開発',
                'オープンソースへの貢献',
                'コードレビュー',
                'Issue管理',
                'コミュニティ活動'
            ],
            technologies: ['Git', 'GitHub', 'Open Source'],
            link: 'https://github.com/shinya',
            linkText: 'GitHub Profile'
        },
        'qiita': {
            title: 'Qiita',
            description: '技術的な知見や開発の過程で学んだことを記事として発信しています。',
            features: [
                '技術記事の執筆',
                '開発ノウハウの共有',
                'エンジニアコミュニティへの貢献',
                '実践的な内容',
                '日本語での発信'
            ],
            technologies: ['Technical Writing', 'Markdown', 'Community'],
            link: 'https://qiita.com/ssaita',
            linkText: 'Qiita Profile'
        }
    };

    const work = workDetails[workType];
    if (!work) return;

    // Update modal content
    modalTitle.textContent = work.title;

    modalBody.innerHTML = `
        <div class="work-modal-content">
            <div class="work-description mb-4">
                <p class="lead">${work.description}</p>
            </div>

            <div class="work-features mb-4">
                <h6 class="fw-bold mb-3">主な機能</h6>
                <ul class="list-unstyled">
                    ${work.features.map(feature => `<li><i class="fas fa-check text-success me-2"></i>${feature}</li>`).join('')}
                </ul>
            </div>

            <div class="work-technologies mb-4">
                <h6 class="fw-bold mb-3">使用技術</h6>
                <div class="d-flex flex-wrap gap-2">
                    ${work.technologies.map(tech => `<span class="badge bg-primary">${tech}</span>`).join('')}
                </div>
            </div>

            <div class="work-link text-center">
                <a href="${work.link}" target="_blank" class="btn btn-primary btn-lg">
                    <i class="fas fa-external-link-alt me-2"></i>${work.linkText}
                </a>
            </div>
        </div>
    `;

    // Show modal with enhanced animation
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    // Add entrance animation to modal content
    setTimeout(() => {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

        setTimeout(() => {
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 50);
    }, 100);
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar Effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 20px rgba(61, 207, 194, 0.1)';
            navbar.style.borderBottom = '1px solid rgba(61, 207, 194, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 2px 10px rgba(61, 207, 194, 0.05)';
            navbar.style.borderBottom = '1px solid rgba(61, 207, 194, 0.1)';
        }
    });

    // Active navigation highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-section h1');
    if (!heroTitle) return;

    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '0';

    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        } else {
            // Fade in the complete title
            heroTitle.style.transition = 'opacity 0.5s ease';
            heroTitle.style.opacity = '1';
        }
    };

    // Start typing effect after a short delay
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        typeWriter();
    }, 500);
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const rate = scrolled * -0.3;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Enhanced Animations
function initEnhancedAnimations() {
    // Add floating animation to skill badges
    const skillBadges = document.querySelectorAll('.skill-tags .badge');
    skillBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.1}s`;
        badge.classList.add('animate__animated', 'animate__fadeInUp');
    });

    // Add staggered animation to about cards
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Add pulse effect to contact links
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.3}s`;
    });
}

// Add loading animation to work cards
function addLoadingAnimation() {
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
        card.classList.add('loading');
        setTimeout(() => {
            card.classList.remove('loading');
        }, 1500);
    });
}

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add enhanced click effects
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add floating labels effect
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Add hover sound effect simulation (visual feedback)
    const interactiveElements = document.querySelectorAll('.btn, .work-card, .skill-card, .about-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// Utility function for smooth animations
function animateElement(element, animation, duration = 1000) {
    element.style.animation = `${animation} ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    setTimeout(() => {
        element.style.animation = '';
    }, duration);
}

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #3dcfc2, #00d4aa);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(61, 207, 194, 0.3);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Add cursor trail effect
function addCursorTrail() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(61, 207, 194, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
}

// Initialize cursor trail
addCursorTrail();

// Add page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
