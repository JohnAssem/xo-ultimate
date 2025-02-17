let loadedPercentage = 0;
const loadingText = document.querySelector('.loading-text');
const loadingBar = document.getElementById('loadingBar');

function updateLoadingScreen() {
    loadedPercentage += Math.floor(Math.random() * 10) + 20; // Increment by random values

    if (loadedPercentage >= 100) {
        loadedPercentage = 100; // Cap at 100%
        loadingText.innerHTML = `Loading... ${loadedPercentage}%`;
        loadingBar.style.width = `${loadedPercentage}%`;
        document.querySelector('.click-to-start').style.display = 'block';
        document.addEventListener('click', hideLoadingScreen);
    } else {
        loadingText.innerHTML = `Loading... ${loadedPercentage}%`;
        loadingBar.style.width = `${loadedPercentage}%`;
        setTimeout(updateLoadingScreen, 500); // Continue updating every 500ms
    }
}

function hideLoadingScreen() {
    document.getElementById('bgMusic').play();
    setTimeout(function () {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.remove();
        }
    }, 100);
}
updateLoadingScreen();