function buildWinnerBox(winner = 'Draw') {
    let winnerPlayer;
    let winnerText;
    
    if (winner == 'Draw') {
        winnerPlayer = '';
        winnerText = winner;
    }

    else {
        winnerPlayer = winner;
        winnerText = 'Wins!';
    }

    const winnerBox = document.createElement('div');
    winnerBox.classList.add('winner-box');
    
    const cancel = document.createElement('div');
    cancel.classList.add('cancel');
    const cancelIcon = document.createElement('i');
    cancelIcon.classList.add('icon', 'fa-solid', 'fa-x');

    cancel.appendChild(cancelIcon);
    cancel.onclick = function () {
        cancel.parentElement.remove();
    }

    winnerBox.appendChild(cancel);
    
    const row1 = document.createElement('div');
    row1.classList.add('row');

    const winnerContainer = document.createElement('div');
    winnerContainer.classList.add('winner');
    winnerContainer.innerHTML = winnerPlayer;
    row1.appendChild(winnerContainer);
    
    const isWinner = document.createElement('div');
    isWinner.classList.add('is-winner');
    isWinner.appendChild(document.createTextNode(winnerText));
    row1.appendChild(isWinner);
    winnerBox.appendChild(row1);

    const row2 = document.createElement('div');
    row2.classList.add('row');

    const icon1Container = document.createElement('div');
    const icon1 = document.createElement('i');
    icon1.classList.add('icon', 'fa-solid', 'fa-rotate-left');
    icon1.onclick = gameReset;

    icon1Container.appendChild(icon1);
    row2.appendChild(icon1Container);

    const icon2Container = document.createElement('div');
    const icon2 = document.createElement('i');
    icon2.classList.add('icon', 'fa-solid', 'fa-house-chimney');
    icon2.onclick = home;

    icon2Container.appendChild(icon2);
    row2.appendChild(icon2Container);

    winnerBox.appendChild(row2);

    return winnerBox;
}

function buildGame(len) {
    // Create the main content div
    const content = document.createElement('div');
    content.className = 'content';
    content.id = 'content';

    // Create header
    const header = document.createElement('header');

    const headerIcon1 = document.createElement('div');
    const icon1 = document.createElement('i');
    icon1.className = 'icon fa-solid fa-rotate-left';
    icon1.onclick = gameReset;
    headerIcon1.appendChild(icon1);

    const headerIcon2 = document.createElement('div');
    const icon2 = document.createElement('i');
    icon2.className = 'icon fa-solid fa-list';
    icon2.onclick = openList;
    headerIcon2.appendChild(icon2);

    header.appendChild(headerIcon1);
    header.appendChild(headerIcon2);
    content.appendChild(header);

    // Create list section
    const list = document.createElement('div');
    list.className = 'list';

    // Create icons-container row
    const iconsContainer = document.createElement('div');
    iconsContainer.className = 'icons-container row';

    const iconContainer1 = document.createElement('div');
    iconContainer1.className = 'icon-container';
    const icon3 = document.createElement('i');
    icon3.className = 'icon fa-solid fa-rotate-left';
    icon3.onclick = gameReset;
    iconContainer1.appendChild(icon3);

    const iconContainer2 = document.createElement('div');
    iconContainer2.className = 'icon-container';
    const icon4 = document.createElement('i');
    icon4.className = 'icon fa-solid fa-house-chimney';
    icon4.onclick = home;
    iconContainer2.appendChild(icon4);

    iconsContainer.appendChild(iconContainer1);
    iconsContainer.appendChild(iconContainer2);
    list.appendChild(iconsContainer);

    // Create sound settings row
    const soundSettings = document.createElement('div');
    soundSettings.className = 'sound-settings row';

    const soundIconContainer1 = document.createElement('div');
    soundIconContainer1.className = 'icon-container';
    const soundIcon1 = document.createElement('i');
    if (localStorage.getItem('volume') == 0) {
        soundIcon1.className = 'fa-solid fa-volume-xmark';
    }
    else {
        soundIcon1.className = 'fa-solid fa-volume-high';
    }

    const volumeInput = document.createElement('input');
    volumeInput.type = 'range';
    volumeInput.min = '0';
    volumeInput.max = '1';
    volumeInput.step = '0.01';
    volumeInput.value = localStorage.getItem('volume') || '1';
    volumeInput.id = 'volume';
    volumeInput.addEventListener('input', function () {
        document.getElementById('writeXSound').volume = volumeInput.value;
        document.getElementById('writeOSound').volume = volumeInput.value;
        localStorage.setItem('volume', volumeInput.value);
    });
    soundIcon1.onclick = function() {
        if (soundIcon1.classList.contains('fa-volume-xmark')) {
            soundIcon1.classList.toggle('fa-volume-xmark');
            soundIcon1.classList.toggle('fa-volume-high');
            volumeInput.value = 1;
            document.getElementById('writeXSound').volume = 1;
            document.getElementById('writeOSound').volume = 1;
            localStorage.setItem('volume', 1);
        }
        else {
            soundIcon1.classList.toggle('fa-volume-high');
            soundIcon1.classList.toggle('fa-volume-xmark');
            volumeInput.value = 0;
            document.getElementById('writeXSound').volume = 0;
            document.getElementById('writeOSound').volume = 0;
            localStorage.setItem('volume', 0);
        }
    };

    soundIconContainer1.appendChild(soundIcon1);
    soundIconContainer1.appendChild(volumeInput);

    const soundIconContainer2 = document.createElement('div');
    soundIconContainer2.className = 'icon-container';
    const soundIcon2 = document.createElement('i');
    soundIcon2.className = 'fa-solid fa-music';
    const musicInput = document.createElement('input');
    musicInput.type = 'range';
    musicInput.min = '0';
    musicInput.max = '1';
    musicInput.step = '0.01';
    musicInput.value = localStorage.getItem('music') || '1';
    musicInput.id = 'music';
    musicInput.addEventListener('input', function () {
        document.getElementById('bgMusic').volume = musicInput.value;
        localStorage.setItem('music', musicInput.value);
    });
    soundIconContainer2.appendChild(soundIcon2);
    soundIconContainer2.appendChild(musicInput);

    soundSettings.appendChild(soundIconContainer1);
    soundSettings.appendChild(soundIconContainer2);
    list.appendChild(soundSettings);
    content.appendChild(list);

    // Create game container
    const container = document.createElement('div');
    container.className = 'container';

    const gameBox = document.createElement('div');
    gameBox.style.gap = `calc(2% / ${len - 1})`;
    gameBox.className = 'gameBox';

    // Create 3 rows with 3 tiles each
    for (let i = 0; i < len; i++) {
        const row = document.createElement('div');
        row.style.height = `calc(98% / ${len})`;
        row.style.gap = `calc(2% / ${len - 1})`;
        row.className = 'row';

        for (let j = 0; j < len; j++) {
            const tile = document.createElement('div');
            tile.style.width = `calc(98% / ${len})`;
            tile.style.fontSize = `${(-10 * len) + 100}px`;
            tile.className = 'tile';
            row.appendChild(tile);
        }

        gameBox.appendChild(row);
    }

    container.appendChild(gameBox);
    content.appendChild(container);

    return content;
}

function buildLevelsList() {
    // Create the main content div
    const content = document.createElement('div');
    content.className = 'content';
    content.id = 'content';
    
    // Create header
    const header = document.createElement('header');
    header.style.justifyContent = 'left';
    
    const headerIcon = document.createElement('div');
    const icon = document.createElement('i');
    icon.className = 'icon fa-solid fa-arrow-left';
    icon.onclick = home;
    headerIcon.appendChild(icon);
    
    header.appendChild(headerIcon);
    content.appendChild(header);
    
    // Create container
    const container = document.createElement('div');
    container.className = 'container';
    
    // Create links div
    const links = document.createElement('div');
    links.className = 'links';
    
    // Create 5 link divs with onclick handlers and text
    const gridSizes = [3, 4, 5, 6, 7];
    gridSizes.forEach(size => {
        const link = document.createElement('div');
        link.className = 'link';
        link.onclick = function() { 
            document.getElementById('bgMusic').src = `assets/music/epic-and-magic-mood.mp3`;
            changeContent(buildGame(size)); 
            intialize();
        }
        
        const linkText = document.createElement('p');
        linkText.textContent = `${size}×${size}`;
        link.appendChild(linkText);
        
        links.appendChild(link);
    });
    
    container.appendChild(links);
    content.appendChild(container);
    
    return content;
}