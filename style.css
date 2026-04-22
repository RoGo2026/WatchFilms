/* ----- ОБНУЛЕНИЕ И БАЗА ----- */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', 'Segoe UI', sans-serif;
    background: radial-gradient(circle at 20% 30%, #1e1a2e, #0b0a12);
    min-height: 100vh;
    padding: 24px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f0eef7;
}

/* ТРЁХКОЛОНОЧНЫЙ ГРИД */
.cinema-grid {
    max-width: 1440px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1.2fr 1fr;
    gap: 24px;
    align-items: start;
}

/* БОКОВЫЕ ПАНЕЛИ (ПОСТЕРЫ) */
.poster-panel {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.panel-header {
    margin-bottom: 6px;
    padding-left: 6px;
}

.panel-header h2 {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    background: linear-gradient(145deg, #ff4d4d, #e63946);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    line-height: 1.1;
}

.panel-header p {
    color: #b9b3d4;
    font-size: 0.9rem;
    margin-top: 6px;
    font-weight: 400;
    opacity: 0.85;
}

/* КАРТОЧКА ФИЛЬМА */
.movie-card {
    background: rgba(22, 18, 38, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 70, 70, 0.15);
    border-radius: 24px;
    padding: 14px 14px 16px;
    transition: all 0.2s ease;
    cursor: pointer;
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.5);
}

.movie-card:hover {
    transform: translateY(-4px);
    border-color: rgba(230, 50, 50, 0.6);
    background: rgba(35, 28, 55, 0.8);
    box-shadow: 0 18px 30px -8px #00000080, 0 0 0 1px #e6394633 inset;
}

.poster-img {
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: 16px;
    background: #1e1830;
    box-shadow: 0 6px 14px #0000004d;
    margin-bottom: 14px;
    border: 1px solid #ffffff0d;
    transition: opacity 0.2s;
}

.movie-card h3 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 6px;
    color: #fff;
    letter-spacing: -0.01em;
    line-height: 1.2;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}

.rating {
    font-size: 1rem;
    font-weight: 600;
    color: #ffb347;
    background: #00000033;
    padding: 2px 8px;
    border-radius: 40px;
    border: 1px solid #ffb34733;
}

.movie-meta {
    font-size: 0.85rem;
    color: #b1a9d9;
    display: flex;
    gap: 12px;
    align-items: center;
}

.year {
    background: #2a2240;
    padding: 2px 8px;
    border-radius: 30px;
    font-weight: 500;
}

/* ЛЕГЕНДАРНЫЙ БЛОК */
.legend-block {
    margin-top: 20px;
    background: #0f0c1bb3;
    backdrop-filter: blur(10px);
    border-radius: 28px;
    padding: 20px 18px;
    border: 1px solid #e6394640;
}

.legend-block h3 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #ff8080;
    margin-bottom: 12px;
}

.legend-items {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 8px 0;
    border-bottom: 1px dashed #e6394633;
    cursor: pointer;
    transition: 0.1s;
}

.legend-item:hover {
    color: #ffb3b3;
}

.legend-poster {
    width: 50px;
    height: 70px;
    border-radius: 12px;
    background: #2a1f40;
    object-fit: cover;
}

.legend-title {
    font-weight: 700;
    font-size: 1.2rem;
}

/* ЦЕНТРАЛЬНАЯ ПАНЕЛЬ ПОИСКА */
.search-panel {
    background: rgba(18, 14, 30, 0.65);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 36px;
    padding: 28px 24px 32px;
    border: 1px solid #e6394640;
    box-shadow: 0 25px 40px -12px #000000b3, 0 0 0 1px #b3000026 inset;
}

.search-header {
    margin-bottom: 28px;
    text-align: center;
}

.search-header h1 {
    font-size: 2.6rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #ff6a6a, #c41e1e);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 6px;
}

.subhead {
    color: #cbc3e8;
    font-size: 1rem;
}

/* ПОИСКОВАЯ СТРОКА */
.search-box {
    display: flex;
    gap: 12px;
    margin-bottom: 28px;
}

#movieInput {
    flex: 1;
    padding: 18px 22px;
    background: #1c1630e6;
    border: 1.5px solid #e6394666;
    border-radius: 60px;
    font-size: 1.1rem;
    color: white;
    outline: none;
    backdrop-filter: blur(4px);
    transition: 0.2s;
}

#movieInput:focus {
    border-color: #ff4d4d;
    background: #231b3a;
    box-shadow: 0 0 0 4px #e6394640;
}

#movieInput::placeholder {
    color: #9a8fc0;
}

#searchButton {
    padding: 0 32px;
    background: linear-gradient(145deg, #e63946, #b81b2a);
    border: none;
    border-radius: 60px;
    font-weight: 700;
    font-size: 1.1rem;
    color: white;
    cursor: pointer;
    box-shadow: 0 8px 18px #b81b2a66;
    transition: 0.2s;
    border: 1px solid #ff8080;
}

#searchButton:hover {
    background: linear-gradient(145deg, #f24b5a, #cc1f2e);
    transform: scale(1.02);
    box-shadow: 0 10px 22px #cc1f2e;
}

/* РЕЗУЛЬТАТЫ */
.loading {
    text-align: center;
    padding: 28px;
    color: #ffa6a6;
    font-weight: 500;
}

.results {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 440px;
    overflow-y: auto;
    padding-right: 6px;
}

.results::-webkit-scrollbar {
    width: 6px;
}
.results::-webkit-scrollbar-thumb {
    background: #e63946;
    border-radius: 20px;
}

.movie-item {
    display: flex;
    gap: 18px;
    padding: 16px 18px;
    background: #1f1933cc;
    backdrop-filter: blur(4px);
    border-radius: 24px;
    border: 1px solid #e6394633;
    cursor: pointer;
    transition: 0.15s;
    align-items: center;
}

.movie-item:hover {
    background: #2d234acc;
    border-color: #e63946;
}

.movie-poster {
    width: 60px;
    height: 88px;
    border-radius: 14px;
    object-fit: cover;
    background: #2a1f40;
    box-shadow: 0 6px 10px #0000004d;
}

.movie-info {
    flex: 1;
}

.movie-title {
    font-weight: 700;
    font-size: 1.2rem;
    color: white;
    margin-bottom: 5px;
}

.movie-details {
    color: #bbafdf;
    font-size: 0.85rem;
}

.error {
    background: #e6394633;
    color: #ffb0b0;
    padding: 18px;
    border-radius: 20px;
    text-align: center;
    border-left: 6px solid #e63946;
}

.hidden {
    display: none !important;
}

/* DNS БЛОК */
.dns-note {
    margin-top: 32px;
    padding-top: 18px;
    border-top: 1px solid #e6394640;
    font-size: 0.9rem;
    color: #b9aed6;
    text-align: center;
}

.clickable-link {
    display: inline-block;
    background: #1c1630;
    padding: 12px 18px;
    border-radius: 40px;
    font-family: monospace;
    font-weight: 700;
    color: #ffa7a7;
    border: 1px dashed #e63946;
    cursor: pointer;
    margin-top: 10px;
    transition: 0.2s;
}

.clickable-link:hover {
    background: #2d1f42;
    color: #ffc2c2;
}

/* АДАПТИВ (скрываем боковые панели на узких экранах) */
@media (max-width: 900px) {
    .cinema-grid {
        grid-template-columns: 1fr;
        gap: 30px;
    }
    .poster-panel {
        display: none;
    }
    body {
        padding: 12px;
    }
}

@media (min-width: 901px) and (max-width: 1150px) {
    .cinema-grid {
        grid-template-columns: 1fr 1.5fr 1fr;
    }
}
