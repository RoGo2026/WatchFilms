// script.js
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const movieInput = document.getElementById('movieInput');
    
    if (searchButton) {
        searchButton.addEventListener('click', searchMovies);
    }
    
    if (movieInput) {
        movieInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchMovies();
            }
        });
    }
});

async function searchMovies() {
    const query = document.getElementById('movieInput').value.trim();
    
    if (!query) {
        showError('Пожалуйста, введите название фильма.');
        return;
    }

    // Твой новый рабочий ключ
    const API_KEY = '22482d11-bce8-45d8-8bed-0628cd955284'; 
    // Эндпоинт для поиска по ключевым словам
    const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(query)}&page=1`;

    const loading = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error');

    loading.classList.remove('hidden');
    resultsDiv.innerHTML = '';
    errorDiv.classList.add('hidden');

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-API-KEY': API_KEY,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status}`);
        }

        const data = await response.json();
        
        // У этого API данные поиска лежат в поле 'films'
        if (!data.films || data.films.length === 0) {
            showError('Ничего не найдено. Попробуйте другое название.');
            return;
        }

        displayResults(data.films);
    } catch (error) {
        console.error('Ошибка при поиске:', error);
        showError('Не удалось выполнить поиск. Проверьте лимиты вашего API-ключа.');
    } finally {
        loading.classList.add('hidden');
    }
}

function displayResults(movies) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-item';
        // Для этого API используем filmId
        movieElement.onclick = () => openMovie(movie.filmId);

        const posterUrl = movie.posterUrlPreview || 'https://via.placeholder.com/50x75?text=?';
        const year = movie.year ? ` (${movie.year})` : '';
        // Обработка названия (Ru или En)
        const title = movie.nameRu || movie.nameEn || 'Без названия';
        // Обработка рейтинга
        const ratingVal = (movie.rating && movie.rating !== 'null') ? movie.rating : '0.0';

        movieElement.innerHTML = `
            <img class="movie-poster" src="${posterUrl}" alt="${title}" onerror="this.src='https://via.placeholder.com/50x75?text=?'">
            <div class="movie-info">
                <div class="movie-title">${title}${year}</div>
                <div class="movie-details">
                    ${movie.genres ? movie.genres.map(g => g.genre).slice(0, 2).join(', ') : ''} • ★ ${ratingVal}
                </div>
            </div>
        `;
        
        resultsDiv.appendChild(movieElement);
    });
}

function openMovie(kinopoiskId) {
    // Открываем через рабочее зеркало
    const camUrl = `https://kinopoisk.gg/film/${kinopoiskId}/`;
    window.open(camUrl, '_blank');
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Функция копирования ссылки (оставляем как была в index.html)
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
        alert('Не удалось скопировать.');
    });
}
