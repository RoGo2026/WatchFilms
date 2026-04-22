// Дожидаемся загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const movieInput = document.getElementById('movieInput');

    if (searchButton) {
        searchButton.addEventListener('click', () => performSearch(movieInput.value.trim()));
    }
    if (movieInput) {
        movieInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                performSearch(movieInput.value.trim());
            }
        });
    }

    // Делегирование кликов по боковым постерам и легендарным элементам
    document.body.addEventListener('click', (e) => {
        const card = e.target.closest('[data-movie]');
        if (!card) return;
        const movieName = card.getAttribute('data-movie');
        if (movieName) {
            movieInput.value = movieName;
            performSearch(movieName);
            document.querySelector('.search-panel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});

const API_KEY = '3W9C8C5-2H1M85S-GEXEN27-S5DG27B';

async function performSearch(query) {
    if (!query) {
        showError('Пожалуйста, введите название фильма.');
        return;
    }

    const loadingDiv = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error');

    loadingDiv.classList.remove('hidden');
    resultsDiv.innerHTML = '';
    errorDiv.classList.add('hidden');

    try {
        const url = `https://api.poiskkino.dev/v1.4/movie/search?page=1&limit=10&query=${encodeURIComponent(query)}`;
        const response = await fetch(url, {
            headers: { 'X-API-KEY': API_KEY }
        });

        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status}`);
        }

        const data = await response.json();
        if (!data.docs || data.docs.length === 0) {
            showError('Ничего не найдено. Попробуйте изменить запрос.');
            return;
        }

        displayResults(data.docs);
    } catch (error) {
        console.error('Ошибка при поиске:', error);
        showError('Не удалось выполнить поиск. Проверьте API-ключ и попробуйте снова.');
    } finally {
        loadingDiv.classList.add('hidden');
    }
}

function displayResults(movies) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-item';
        movieElement.onclick = () => openMovie(movie.id);

        const posterUrl = movie.poster?.previewUrl || 'https://via.placeholder.com/60x88/2a1f40/ffb3b3?text=?';
        const year = movie.year ? ` (${movie.year})` : '';
        const rating = movie.rating?.kp ? `★ ${movie.rating.kp.toFixed(1)}` : '';

        movieElement.innerHTML = `
            <img class="movie-poster" src="${posterUrl}" alt="${movie.name}" onerror="this.src='https://via.placeholder.com/60x88/2a1f40/ffb3b3?text=?'">
            <div class="movie-info">
                <div class="movie-title">${movie.name}${year}</div>
                <div class="movie-details">
                    ${movie.alternativeName ? `${movie.alternativeName} • ` : ''}
                    ${movie.movieLength ? `${movie.movieLength} мин` : ''}
                    ${rating ? ` • ${rating}` : ''}
                </div>
            </div>
        `;
        resultsDiv.appendChild(movieElement);
    });
}

function openMovie(kinopoiskId) {
    window.open(`https://www.kinopoisk.wtf/film/${kinopoiskId}/`, '_blank');
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Функция копирования DNS-ссылки (вызывается из onclick)
function copyDnsLink() {
    const linkElement = document.getElementById('dnsLink');
    if (!linkElement) return;

    const linkText = linkElement.textContent;
    navigator.clipboard.writeText(linkText).then(() => {
        const originalText = linkElement.textContent;
        linkElement.textContent = '✅ Ссылка скопирована!';
        setTimeout(() => {
            linkElement.textContent = originalText;
        }, 2000);
    }).catch(err => {
        alert('Не удалось скопировать. Выделите ссылку вручную.');
    });
}

// Глобальная доступность для onclick
window.copyDnsLink = copyDnsLink;
