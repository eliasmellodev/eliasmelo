document.addEventListener('DOMContentLoaded', () => {
    // 1. Atualiza o ano no rodapé
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Funcionalidade de alternar tema
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    body.classList.add(savedTheme);
    if (themeToggleBtn) {
        themeToggleBtn.textContent = savedTheme === 'dark-theme' ? '🌙' : '☀️';
    }

    if (themeToggleBtn) { // Verifica se o botão existe antes de adicionar o listener
        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('light-theme')) {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark-theme');
                themeToggleBtn.textContent = '🌙';
            } else {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light-theme');
                themeToggleBtn.textContent = '☀️';
            }
        });
    }

    // 3. Funcionalidade do menu responsivo (mobile)
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                }
            });
        });
    }

    // 4. Funcionalidade de pesquisa e filtro de CONHECIMENTOS (anteriormente projetos)
    // Renomeado para knowledgeSearch e knowledge-card para evitar conflitos
    const knowledgeSearch = document.getElementById('knowledgeSearch');
    const knowledgeFilterBtns = document.querySelectorAll('#knowledge .filter-btn'); // Escopo para #knowledge
    const knowledgeCards = document.querySelectorAll('.knowledge-card');

    const filterKnowledge = () => {
        const searchTerm = knowledgeSearch.value.toLowerCase().trim();
        const activeFilter = document.querySelector('#knowledge .filter-btn.active')?.dataset.filter || 'all'; // Escopo

        knowledgeCards.forEach(card => {
            const tech = card.dataset.tech.toLowerCase();
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            const matchesSearch = searchTerm === '' || 
                                  title.includes(searchTerm) || 
                                  description.includes(searchTerm) || 
                                  tech.includes(searchTerm);
            
            const matchesFilter = activeFilter === 'all' || tech.includes(activeFilter);

            if (matchesSearch && matchesFilter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    };

    if (knowledgeSearch) {
        knowledgeSearch.addEventListener('keyup', filterKnowledge);
    }

    if (knowledgeFilterBtns.length > 0) {
        knowledgeFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                knowledgeFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterKnowledge();
            });
        });
    }

    // Inicializa os filtros de conhecimentos ao carregar a página
    filterKnowledge();

    // 5. Funcionalidade de rolagem suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 6. Ativar link de navegação ao rolar
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#main-nav a');

    const activateNavLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) { // Ajuste para ativar mais cedo
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', activateNavLink);
    window.addEventListener('load', activateNavLink); // Ativa ao carregar a página

    // Correção: Garante que a seção "Projetos" tenha um ID distinto para navegação
    // Isso já foi feito no HTML, mas é bom ter em mente para o JS.
});