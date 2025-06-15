document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const mobileSearchToggle = document.querySelector('.mobile-search-toggle');
    const searchArea = document.querySelector('.search-area');
    const mobileSidebarToggle = document.querySelector('.mobile-sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    // 모바일 햄버거 메뉴 토글 기능
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('open');
            // 메뉴 토글 시 검색창은 닫음
            if (searchArea.classList.contains('active')) {
                searchArea.classList.remove('active');
                mobileSearchToggle.classList.remove('active');
            }
        });
    }

    // 모바일 검색 토글 기능
    if (mobileSearchToggle && searchArea) {
        mobileSearchToggle.addEventListener('click', function() {
            searchArea.classList.toggle('active');
            this.classList.toggle('active');
            // 검색창 토글 시 메뉴는 닫음
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('open');
            }
        });
    }

    // 모바일 사이드바 토글 (서브 페이지 전용)
    if (mobileSidebarToggle && sidebar) {
        mobileSidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // --- 모바일 퀵 메뉴 토글 기능 추가 시작 ---
    const quickMenu = document.querySelector('.quick-menu');
    const quickMenuToggle = document.querySelector('.quick-menu-toggle');

    if (quickMenu && quickMenuToggle) {
        quickMenuToggle.addEventListener('click', function() {
            quickMenu.classList.toggle('active');
            quickMenuToggle.classList.toggle('open');
        });
    }
    // --- 모바일 퀵 메뉴 토글 기능 추가 끝 ---

    // 'TOP' 버튼 클릭 시 부드러운 스크롤 (퀵 메뉴)
    const topButton = document.querySelector('.top-button');
    if (topButton) {
        topButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 홈 화면 검색 기능 (키워드 기반 리다이렉션)
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchMessage = document.getElementById('searchMessage');

    if (searchButton && searchInput && searchMessage) {
        function performSearch() {
            const query = searchInput.value.trim().toLowerCase();
            searchMessage.textContent = '';
            searchMessage.classList.add('hidden');

            if (query === '입양' || query.includes('강아지 입양') || query.includes('입양 가이드')) {
                window.location.href = 'adoption-guide.html';
            } else if (query === '양육' || query.includes('강아지 양육') || query.includes('양육 정보')) {
                window.location.href = 'parenting-info.html';
            } else if (query === '견종' || query.includes('강아지 견종') || query.includes('개 종류') || query.includes('견종 정보')) {
                window.location.href = 'breed-info.html';
            }
            else {
                searchMessage.textContent = '일치하는 가이드 또는 정보가 없습니다. 다른 키워드로 검색해보세요.';
                searchMessage.classList.remove('hidden');
            }
        }

        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // 목차 클릭 시 부드러운 스크롤 이동 (서브 페이지용)
    const guideTocLinks = document.querySelectorAll('.guide-toc a');

    guideTocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (this.classList.contains('category-toggle')) {
                e.preventDefault();
                const targetListId = this.dataset.target;
                const targetList = document.getElementById(targetListId);
                if (targetList) {
                    targetList.classList.toggle('hidden');
                    this.classList.toggle('open');
                }
            } else {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 150,
                        behavior: 'smooth'
                    });

                    guideTocLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');

                    // 사이드바가 모바일에서 열려있다면 닫기
                    if (sidebar && sidebar.classList.contains('active') && window.innerWidth <= 768) {
                        sidebar.classList.remove('active');
                        mobileSidebarToggle.classList.remove('active');
                    }
                }
            }
        });
    });

    // 스크롤 시 목차 활성화 업데이트 (서브 페이지용)
    const sections = document.querySelectorAll('.sub-page-main .content section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        guideTocLinks.forEach(link => {
            link.classList.remove('active');
        });

        if (current) {
            const activeLink = document.querySelector(`.guide-toc a[href="#${current}"]`);
            if (activeLink) {
                activeLink.classList.add('active');

                let parentCategoryToggle = activeLink.closest('.collapsible-list')?.previousElementSibling;
                if (parentCategoryToggle && parentCategoryToggle.classList.contains('category-toggle')) {
                    if (parentCategoryToggle.classList.contains('hidden')) {
                        document.getElementById(parentCategoryToggle.dataset.target)?.classList.remove('hidden');
                    }
                    parentCategoryToggle.classList.add('open');
                }
            }
        }
    });

    // 견종 정보 페이지 - 카테고리 토글 초기 설정
    const categoryToggles = document.querySelectorAll('.guide-toc .category-toggle');
    categoryToggles.forEach((toggle, index) => {
        const targetListId = toggle.dataset.target;
        const targetList = document.getElementById(targetListId);
        if (targetList) {
            if (index === 0) {
                targetList.classList.remove('hidden');
                toggle.classList.add('open');
            } else {
                targetList.classList.add('hidden');
                toggle.classList.remove('open');
            }
        }
    });
});
