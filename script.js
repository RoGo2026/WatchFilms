// Ждем загрузки
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const movieInput = document.getElementById('movieInput');
    if (searchButton) searchButton.addEventListener('click', searchMovies);
    if (movieInput) {
        movieInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') searchMovies(); });
    }
});

async function searchMovies() {
    const query = document.getElementById('movieInput').value.trim();
    if (!query) return;

    // Ипользуем стабильный домен api.kinopoisk.dev
    const API_KEY = '8VSHQ9V-W2GMRK6-QWPR0TE-ZY58XK1'; 
    const url = `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=${encodeURIComponent(query)}`;

    const loading = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    
    loading.classList.remove('hidden');
    resultsDiv.innerHTML = '';

    try {
        const response = await fetch(url, {
            headers: { 'X-API-KEY': API_KEY }
        });

        if (!response.ok) throw new Error('Ошибка ключа или лимитов');

        const data = await response.json();
        if (data.docs && data.docs.length > 0) {
            displayResults(data.docs);
        } else {
            resultsDiv.innerHTML = '<p>Ничего не найдено</p>';
        }
    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = '<p>Ошибка подключения к API</p>';
    } finally {
        loading.classList.add('hidden');
    }
}

function displayResults(movies) {
    const resultsDiv = document.getElementById('results');
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-item';
        // Используем универсальный обработчик
        movieElement.onclick = () => openMovie(movie.id);

        const poster = movie.poster?.previewUrl || 'https://via.placeholder.com/50x75';
        movieElement.innerHTML = `
            <img class="movie-poster" src="${poster}">
            <div class="movie-info">
                <div class="movie-title">${movie.name} (${movie.year || '?'})</div>
                <div class="movie-details">${movie.rating?.kp?.toFixed(1) || '0.0'} KP</div>
            </div>
        `;
        resultsDiv.appendChild(movieElement);
    });
}

function openMovie(id) {
    // Рабочее зеркало для просмотра (меняй домен здесь, если ляжет)
    const viewUrl = `https://kinopoisk.gg/film/${id}/`;
    window.open(viewUrl, '_blank');
}
