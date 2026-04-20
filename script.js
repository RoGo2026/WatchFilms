document.getElementById('searchButton').addEventListener('click', searchMovies);
document.getElementById('movieInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') searchMovies();
});

async function searchMovies() {
    const query = document.getElementById('movieInput').value.trim();
    if (!query) { showError('Пожалуйста, введите название фильма.'); return; }

    // Замените 'YOUR_API_KEY' на ваш реальный ключ от @kinopoiskdev_bot
    const API_KEY = 'YOUR_API_KEY'; 
    const url = `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=${encodeURIComponent(query)}`;
    
    const loading = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error');
    
    loading.classList.remove('hidden');
    resultsDiv.innerHTML = '';
    errorDiv.classList.add('hidden');

    try {
        const response = await fetch(url, { headers: { 'X-API-KEY': API_KEY } });
        if (!response.ok) throw new Error(`Ошибка API: ${response.status}`);
        
        const data = await response.json();
        if (data.docs.length === 0) { showError('Ничего не найдено. Попробуйте изменить запрос.'); return; }

        displayResults(data.docs);
    } catch (error) {
        console.error('Ошибка:', error);
        showError('Не удалось выполнить поиск. Проверьте API-ключ и попробуйте снова.');
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
        movieElement.onclick = () => openMovie(movie.id);
        
        const posterUrl = movie.poster?.previewUrl || 'https://via.placeholder.com/50x75?text=?';
        const year = movie.year ? ` (${movie.year})` : '';
        const rating = movie.rating?.kp ? `★ ${movie.rating.kp.toFixed(1)}` : '';
        
        movieElement.innerHTML = `
            <img class="movie-poster" src="${posterUrl}" alt="${movie.name}" onerror="this.src='https://via.placeholder.com/50x75?text=?'">
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
    const netUrl = `https://www.kinopoisk.net/film/${kinopoiskId}/`;
    window.open(netUrl, '_blank');
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}
