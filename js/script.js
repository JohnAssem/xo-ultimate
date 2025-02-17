let gameTheme = JSON.parse(localStorage.getItem('gameTheme')) || wood;

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

function changeContent(content) {
    document.getElementById('content').remove();
    document.body.prepend(content);

    const loadingScreenJS = document.querySelector('script[src="js/loading.js"]');
    if (loadingScreenJS) {
        loadingScreenJS.remove();
    }
}

function workingCPU() {
    let lines = [];

    for (let i = 0; i < matrix.length; i++) {
        let row = [];
        for (let j = 0; j < matrix.length; j++) {
            row.push({value: matrix[i][j], coordinates: [i, j], coordinateX: i, coordinateY: j});
        }
        lines.push(row);
    }
    
    for (let i = 0; i < matrix.length; i++) {
        let col = [];
        for (let j = 0; j < matrix.length; j++) {
            col.push({value: matrix[j][i], coordinates: [j, i], coordinateX: j, coordinateY: i});
        }
        lines.push(col);
    }
    
    for (let start = 0; start <= matrix.length - 3; start++) {
        let diagonal1 = [], diagonal2 = [];
        for (let i = 0; i < matrix.length - start; i++) {
            if (start + i < matrix.length && i < matrix.length) {
                diagonal1.push({value: matrix[start + i][i], coordinates: [start + i, i], coordinateX: start + i, coordinateY: i});
                diagonal2.push({value: matrix[i][start + i], coordinates: [i, start + i], coordinateX: i, coordinateY: start + i});
            }
        }
        lines.push(diagonal1);
        lines.push(diagonal2);
    }
    
    for (let start = 0; start <= matrix.length - 3; start++) {
        let diagonal1 = [], diagonal2 = [];
        for (let i = 0; i < matrix.length - start; i++) {
            if (start + i < matrix.length && i < matrix.length) {
                diagonal1.push({value: matrix[start + i][matrix.length - 1 - i], coordinates: [start + i, matrix.length - 1 - i], coordinateX: start + i, coordinateY: matrix.length - 1 - i});
                diagonal2.push({value: matrix[i][matrix.length - 1 - start - i], coordinates: [i, matrix.length - 1 - start - i], coordinateX: i, coordinateY: matrix.length - 1 - start - i});
            }
        }
        lines.push(diagonal1);
        lines.push(diagonal2);
    }

    ai(lines);
}

function updateVolumeValue() {
    document.getElementById('writeXSound').volume = volumeInput.value;
    document.getElementById('writeOSound').volume = volumeInput.value;
    localStorage.setItem('volume', volumeInput.value);
}

function scrollBack() {
    const paletes = document.querySelectorAll('.theme-box');
    let currentTheme = parseInt(localStorage.getItem('currentThemeIndex')) || 0;
    if (currentTheme == 0) {
        return;
    }

    paletes.forEach(function (palete) {
        palete.classList.add('hidden');
    });

    const goalPalete = paletes[currentTheme - 1];
    goalPalete.classList.remove('hidden');
    localStorage.setItem('currentThemeIndex', currentTheme - 1);
    apply(goalPalete, document.querySelector('.output-theme'));
}

function scrollFront() {
    const paletes = document.querySelectorAll('.theme-box');
    let currentTheme = parseInt(localStorage.getItem('currentThemeIndex')) || 0;
    if (currentTheme == paletes.length - 1) {
        return;
    }
    
    paletes.forEach(function (palete) {
        palete.classList.add('hidden');
    });
    const goalPalete = paletes[currentTheme + 1];
    goalPalete.classList.remove('hidden');
    localStorage.setItem('currentThemeIndex', currentTheme + 1);
    apply(goalPalete, document.querySelector('.output-theme'));
}

function apply(goalPalete, outputTheme) {
    const theme = {
        "--main-bg-h": goalPalete.children[1].children[0].children[0].style.backgroundImage,
        "--main-bg-v": goalPalete.children[1].children[0].children[1].style.backgroundImage,
        "--main-color": goalPalete.children[0].children[0].style.background,
        "--secondary-color": goalPalete.children[0].children[1].style.background,
        "--text-color": goalPalete.children[1].children[1].children[0].style.background,
        "--shadow-color": goalPalete.children[1].children[1].children[1].style.background
    }

    if (theme["--main-bg-h"] == 'url("assets/img/vecteezy_light-brown-cartoon-H.jpg")') {
        theme['--main-bg-h'] = "url('../assets/img/vecteezy_light-brown-cartoon-H.jpg')";
        theme['--main-bg-v'] = "url('../assets/img/vecteezy_light-brown-cartoon-V.jpg')";
    }

    outputTheme.style = `--main-bg-h: ${theme['--main-bg-h']}; --main-bg-v: ${theme['--main-bg-v']}; --main-color: ${theme['--main-color']}; --secondary-color: ${theme['--secondary-color']}; --text-color: ${theme['--text-color']}; --shadow-color: ${theme['--shadow-color']};`;
}

function applyAndSave() {
    const paletes = document.querySelectorAll('.theme-box');    
    let currentTheme = parseInt(localStorage.getItem('currentThemeIndex')) || 0;
    const goalPalete = paletes[currentTheme];
    const theme = {
        "--main-bg-h": goalPalete.children[1].children[0].children[0].style.backgroundImage,
        "--main-bg-v": goalPalete.children[1].children[0].children[1].style.backgroundImage,
        "--main-color": goalPalete.children[0].children[0].style.background,
        "--secondary-color": goalPalete.children[0].children[1].style.background,
        "--text-color": goalPalete.children[1].children[1].children[0].style.background,
        "--shadow-color": goalPalete.children[1].children[1].children[1].style.background
    }

    if (theme["--main-bg-h"] == 'url("assets/img/vecteezy_light-brown-cartoon-H.jpg")') {
        theme['--main-bg-h'] = "url('../assets/img/vecteezy_light-brown-cartoon-H.jpg')";
        theme['--main-bg-v'] = "url('../assets/img/vecteezy_light-brown-cartoon-V.jpg')";
    }

    localStorage.setItem('gameTheme', JSON.stringify(theme));
    localStorage.setItem('appliedThemeIndex', currentTheme);
    applyTheme(theme);
}