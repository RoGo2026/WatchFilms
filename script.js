// script.js
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const movieInput = document.getElementById('movieInput');
    if (searchButton) searchButton.addEventListener('click', searchMovies);
    if (movieInput) {
        movieInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); searchMovies(); }
        });
    }
});

const VIEW_DOMAIN = 'www.kinopoisk.sbs';

// === Старый API (kinopoiskapiunofficial.tech) — не удалять, может заработать снова ===
// const LEGACY_API_KEY = '22482d11-bce8-45d8-8bed-0628cd955284';
// async function searchMoviesLegacy() {
//     const query = document.getElementById('movieInput').value.trim();
//     if (!query) return;
//     const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(query)}&page=1`;
//     const loading = document.getElementById('loading');
//     const resultsDiv = document.getElementById('results');
//     loading.classList.remove('hidden');
//     resultsDiv.innerHTML = '';
//     try {
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'X-API-KEY': LEGACY_API_KEY,
//                 'Content-Type': 'application/json',
//             },
//         });
//         const data = await response.json();
//         if (data.films) displayResultsLegacy(data.films);
//     } catch (error) {
//         console.error('Ошибка:', error);
//     } finally {
//         loading.classList.add('hidden');
//     }
// }
// function displayResultsLegacy(movies) {
//     const resultsDiv = document.getElementById('results');
//     movies.forEach(movie => {
//         const movieElement = document.createElement('div');
//         movieElement.className = 'movie-item';
//         movieElement.onclick = () => openMovie(movie.filmId);
//         const poster = movie.posterUrlPreview || '';
//         const title = movie.nameRu || movie.nameEn || 'Без названия';
//         movieElement.innerHTML = `
//             <img class="movie-poster" src="${poster}">
//             <div class="movie-info">
//                 <div class="movie-title">${title} (${movie.year || ''})</div>
//                 <div class="movie-details">★ ${movie.rating || '0.0'}</div>
//             </div>
//         `;
//         resultsDiv.appendChild(movieElement);
//     });
// }

// === Текущий API (poiskkino.dev) ===
const POISKKINO_API_KEY = '27SWCTP-AP3MRP5-QHKV3QE-3APP7B5';

async function searchMovies() {
    const query = document.getElementById('movieInput').value.trim();
    if (!query) return;

    const url = `https://api.poiskkino.dev/v1.4/movie/search?page=1&limit=20&query=${encodeURIComponent(query)}`;

    const loading = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error');
    loading.classList.remove('hidden');
    if (errorDiv) { errorDiv.textContent = ''; errorDiv.classList.add('hidden'); }
    resultsDiv.innerHTML = '';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-API-KEY': POISKKINO_API_KEY,
                'accept': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('HTTP ' + response.status);
        }
        const data = await response.json();
        if (data.docs) displayResults(data.docs);
    } catch (error) {
        console.error('Ошибка:', error);
        if (errorDiv) {
            errorDiv.textContent = 'Не удалось выполнить поиск. Попробуйте позже.';
            errorDiv.classList.remove('hidden');
        }
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

        const poster = (movie.poster && (movie.poster.previewUrl || movie.poster.url)) || '';
        const title = movie.name || movie.alternativeName || movie.enName || 'Без названия';
        const year = movie.year || '';
        let rating = '0.0';
        if (movie.rating) {
            const val = movie.rating.kp ?? movie.rating.imdb;
            if (val !== null && val !== undefined && val !== 0) {
                rating = typeof val === 'number' ? (Math.round(val * 10) / 10).toString() : String(val);
            }
        }

        movieElement.innerHTML = `
            <img class="movie-poster" src="${poster}">
            <div class="movie-info">
                <div class="movie-title">${title} (${year})</div>
                <div class="movie-details">★ ${rating}</div>
            </div>
        `;
        resultsDiv.appendChild(movieElement);
    });
}

function openMovie(id) {
    // ID
    const finalUrl = `https://${VIEW_DOMAIN}/film/${id}/`;
    window.open(finalUrl, '_blank');
}

function copyDnsLink() {
    const linkElement = document.getElementById('dnsLink');
    navigator.clipboard.writeText(linkElement.textContent);
}
