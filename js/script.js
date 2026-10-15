const targetDate = new Date('2127-01-09T00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    // 計算式の崩れを修正
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// =========================================
// ローディング画面の制御
// =========================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    // 2.5秒後に.hiddenクラスを付与してフェードアウト
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2500);
});

// =========================================
// 地図と現在地の取得 (SF風マップ)
// =========================================
const map = L.map('map', {
    zoomControl: false,
    dragging: false,
    touchZoom: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false
}).setView([35.1709, 136.8815], 16); // デフォルトは名古屋駅

// 無料のOpenStreetMapデータを読み込み
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 位置情報を取得して現在地に移動＆マーカー表示
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            map.setView([lat, lng], 17);

            L.circleMarker([lat, lng], {
                color: '#0ff',
                radius: 8,
                weight: 2,
                fillColor: '#0ff',
                fillOpacity: 0.8
            }).addTo(map);
        },
        (error) => {
            console.error("位置情報の取得エラー:", error);
        }
    );
}