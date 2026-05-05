// script.js
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const movieInput = document.getElementById('movieInput');
    if (searchButton) searchButton.addEventListener('click', searchMovies);
    if (movieInput) {
        movieInput.addEventListener('keypress', (e) => { 
            if (e.key === 'Enter') {
                e.preventDefault();
                searchMovies();
            }
        });
    }
});

async function searchMovies() {
    const query = document.getElementById('movieInput').value.trim();
    if (!query) return;

    // Твой ключ из бота
    const API_KEY = '27SWCTP-AP3MRP5-QHKV3QE-3APP7B5'; 
    
    // Используем техническое зеркало, так как основной домен poiskkino.dev выдает 503
    const url = `https://api.kp-dev.xyz/v1.4/movie/search?page=1&limit=10&query=${encodeURIComponent(query)}`;

    const loading = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error');

    loading.classList.remove('hidden');
    resultsDiv.innerHTML = '';
    errorDiv.classList.add('hidden');

    try {
        const response = await fetch(url, {
            headers: { 
                'X-API-KEY': API_KEY,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

        const data = await response.json();
        if (!data.docs || data.docs.length === 0) {
            showError('Ничего не найдено.');
            return;
        }
        displayResults(data.docs);
    } catch (error) {
        console.error('API Error:', error);
        showError('Сервис poiskkino.dev сейчас полностью недоступен (ошибка 503).');
    } finally {
        loading.classList.add('hidden');
    }
}

function displayResults(movies) {
    const resultsDiv = document.getElementById('results');
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-item';
        movieElement.onclick = () => openMovie(movie.id);

        const poster = movie.poster?.previewUrl || 'https://via.placeholder.com/50x75?text=?';
        movieElement.innerHTML = `
            <img class="movie-poster" src="${poster}" onerror="this.src='https://via.placeholder.com/50x75?text=?'">
            <div class="movie-info">
                <div class="movie-title">${movie.name} (${movie.year || '?'})</div>
                <div class="movie-details">★ ${movie.rating?.kp?.toFixed(1) || '0.0'} KP</div>
            </div>
        `;
        resultsDiv.appendChild(movieElement);
    });
}

function openMovie(id) {
    // Зеркало для просмотра
    window.open(`https://kinopoisk.gg/film/${id}/`, '_blank');
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}
