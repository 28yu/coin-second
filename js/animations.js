/**
 * スクロールアニメーション
 * - 要素のフェードイン
 * - カウントアップ
 * - バーグラフのアニメーション
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================
    // Intersection Observer設定
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 10%表示されたら発火
    };
    
    
    // ========================================
    // フェードインアニメーション
    // ========================================
    const fadeElements = document.querySelectorAll('.equipment-card, .comparison-card, .point');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 順番に遅延させて表示
                setTimeout(() => {
                    entry.target.classList.add('fade-in', 'visible');
                }, index * 100);
                
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });
    
    
    // ========================================
    // バーグラフアニメーション
    // ========================================
    const barFills = document.querySelectorAll('.bar-fill');
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                
                // 一旦0にしてからアニメーション
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
                
                barObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    barFills.forEach(bar => {
        barObserver.observe(bar);
    });
    
    
    // ========================================
    // タイムラインバーアニメーション
    // ========================================
    const yearBars = document.querySelectorAll('.year-bar');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetHeight = bar.style.height;
                
                bar.style.height = '0%';
                
                setTimeout(() => {
                    bar.style.height = targetHeight;
                }, 200);
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    yearBars.forEach(bar => {
        timelineObserver.observe(bar);
    });
    
    
    // ========================================
    // カウントアップアニメーション(オプション)
    // ========================================
    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16); // 60fps想定
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current).toLocaleString('ja-JP');
        }, 16);
    }
    
    // 使用例: 必要に応じて特定の数値要素に適用
    const countElements = document.querySelectorAll('[data-countup]');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-countup'));
                
                animateValue(target, 0, endValue, 2000);
                countObserver.unobserve(target);
            }
        });
    }, observerOptions);
    
    countElements.forEach(el => {
        countObserver.observe(el);
    });
    
});
