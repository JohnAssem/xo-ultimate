let gameTheme = JSON.parse(localStorage.getItem('gameTheme')) || {
    "--main-bg-h": "url('../assets/img/vecteezy_light-brown-cartoon-H.jpg')",
    "--main-bg-v": "url('../assets/img/vecteezy_light-brown-cartoon-V.jpg')",
    "--main-color": "#AE4C28",
    "--secondary-color": "#ED7D31",
    "--text-color": "#fff",
    "--shadow-color": "#000",
    "--main-font": "roboto",
};

document.addEventListener('DOMContentLoaded', function () {
    applyTheme(gameTheme);
    document.getElementById('writeXSound').volume = localStorage.getItem('volume') || 1;
    document.getElementById('writeOSound').volume = localStorage.getItem('volume') || 1;
    document.getElementById('bgMusic').volume = localStorage.getItem('music') || 1;
});

function applyTheme(theme) {
    for (const [key, value] of Object.entries(theme)) {
        document.documentElement.style.setProperty(key, value);
    }
}

function createMatrix(range) {
    let matrix = [];
    for (let i = 0; i < range; i++) {
        let row = [];
        for (let j = 0; j < range; j++) {
            row.push(null);
        }
        matrix.push(row);
    }

    return matrix;
}

function gameReset() {
    if (document.querySelector('.winner-box')) {
        document.querySelector('.winner-box').remove();
    }
    intialize();
}

function home() {
    location.reload();
} 

function openList() {
    document.querySelector('.list').classList.toggle('open');
}

function changeContent(content) {
    document.getElementById('content').remove();
    document.body.prepend(content);

    const loadingScreenJS = document.querySelector('script[src="js/loading.js"]');
    if (loadingScreenJS) {
        loadingScreenJS.remove();
    }
}