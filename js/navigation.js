/**
 * ナビゲーション管理
 * - プログレスバー更新
 * - アクティブセクション検知
 * - スムーススクロール
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================
    // 要素取得
    // ========================================
    const progressBar = document.getElementById('progress-bar');
    const navLinks = document.querySelectorAll('.progress-nav a');
    const sections = document.querySelectorAll('.content-section');
    
    
    // ========================================
    // プログレスバー更新
    // ========================================
    function updateProgressBar() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // スクロール進捗率を計算
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        progressBar.style.width = `${scrollPercent}%`;
    }
    
    
    // ========================================
    // アクティブセクション検知
    // ========================================
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 150; // ヘッダー高さ考慮
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // 現在のスクロール位置がセクション内にあるか判定
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // すべてのリンクからactiveクラスを削除
                navLinks.forEach(link => link.classList.remove('active'));
                
                // 該当するリンクにactiveクラスを追加
                const activeLink = document.querySelector(`.progress-nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    
    // ========================================
    // スムーススクロール(フォールバック)
    // ========================================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 100; // ヘッダー分のオフセット
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ========================================
    // スクロールイベント(throttle処理)
    // ========================================
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateProgressBar();
                updateActiveSection();
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    
    // ========================================
    // 初期実行
    // ========================================
    updateProgressBar();
    updateActiveSection();
    
    
    // ========================================
    // リサイズ時も更新
    // ========================================
    window.addEventListener('resize', () => {
        updateProgressBar();
        updateActiveSection();
    });
    
});
