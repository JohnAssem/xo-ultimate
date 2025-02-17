function buildWinnerBox(winner = 'Draw') {
    let winnerPlayer;
    let winnerText;
    
    if (winner == 'Draw') {
        winnerPlayer = '';
        winnerText = winner;
    } else {
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
        winnerBox.remove();
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

    document.addEventListener('click', function (event) {
        if (!winnerBox.contains(event.target) && event.target !== cancelIcon) {
            winnerBox.remove();
        }
    });

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
    icon2.onclick = function () {
        document.querySelector('.list').classList.toggle('open');
        document.querySelector('.list').classList.toggle('closed');
        icon2.classList.toggle('rotated');
    };
    headerIcon2.appendChild(icon2);

    header.appendChild(headerIcon1);
    header.appendChild(headerIcon2);
    content.appendChild(header);

    // Create list section
    const list = document.createElement('div');
    list.classList.add('list', 'closed');

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
    soundIcon2.onclick = function () {
        if (soundIcon2.classList.contains('mute')) {
            musicInput.value = 1;
            soundIcon2.classList.toggle('mute');
            document.getElementById('bgMusic').volume = 1;
            localStorage.setItem('music', 1);
        }
        else {
            musicInput.value = 0;
            soundIcon2.classList.toggle('mute');
            document.getElementById('bgMusic').volume = 0;
            localStorage.setItem('music', 0);
        }
    }
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

function buildLevelsList(mdl = false) {
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
    
    model = mdl;
    return content;
}

function buildSettings() {
    // Create the main content div
    const content = document.createElement('div');
    content.className = 'content';
    content.id = 'content';

    // Create the header with back arrow
    const header = document.createElement('header');
    header.style.justifyContent = 'start';

    const backIconDiv = document.createElement('div');
    const backIcon = document.createElement('i');
    backIcon.className = 'icon fa-solid fa-arrow-left';
    backIcon.onclick = home; // Calls home() function on click

    backIconDiv.appendChild(backIcon);
    header.appendChild(backIconDiv);

    // Create the container div
    const container = document.createElement('div');
    container.className = 'container';

    // Create the top section with logo and title
    const top = document.createElement('div');
    top.className = 'top';

    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.textContent = 'XO';

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = 'ultimate';

    top.appendChild(logo);
    top.appendChild(title);

    // Create the bottom section for settings
    const bottom = document.createElement('div');
    bottom.className = 'bottom';

    // Helper function to create setting items
    function createSetting(iconClass, text, structure, isSymbol = false) {
        const setting = document.createElement('div');
        setting.className = 'setting';
        setting.onclick = () => changeContent(structure);

        const left = document.createElement('div');
        const icon = document.createElement('i');
        icon.className = isSymbol ? 'symbol-icon setting-icon' : `fa-solid ${iconClass} setting-icon`;
        if (isSymbol) icon.textContent = 'X';

        const p = document.createElement('p');
        p.textContent = text;

        left.appendChild(icon);
        left.appendChild(p);

        const arrow = document.createElement('i');
        arrow.className = 'fa-solid fa-greater-than';

        setting.appendChild(left);
        setting.appendChild(arrow);

        return setting;
    }

    // Append all settings to the bottom section
    bottom.appendChild(createSetting('fa-music', 'Sounds', buildSoundSettings()));
    bottom.appendChild(createSetting('fa-palette', 'Colors', buildColorSettings()));
    bottom.appendChild(createSetting('', 'Symbols', buildSymbolSettings(), true)); // Symbol 'X'
    bottom.appendChild(createSetting('fa-font', 'Fonts', buildFontSettings()));

    // Assemble all parts together
    container.appendChild(top);
    container.appendChild(bottom);
    content.appendChild(header);
    content.appendChild(container);

    return content;
}

function buildSoundSettings() {
    // Create the main content div
    const content = document.createElement('div');
    content.className = 'content';
    content.id = 'content';

    // Create the header with back arrow
    const header = document.createElement('header');
    header.style.justifyContent = 'start';

    const backIconDiv = document.createElement('div');
    const backIcon = document.createElement('i');
    backIcon.className = 'icon fa-solid fa-arrow-left';
    backIcon.onclick = () => changeContent(buildSettings());

    backIconDiv.appendChild(backIcon);
    header.appendChild(backIconDiv);

    // Create the container div
    const container = document.createElement('div');
    container.className = 'container';

    // Create the top section with logo and title
    const top = document.createElement('div');
    top.className = 'top';

    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.textContent = 'XO';

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = 'ultimate';

    top.appendChild(logo);
    top.appendChild(title);

    // Create the bottom section for sound settings
    const bottom = document.createElement('div');
    bottom.className = 'bottom';

    // Create the sounds section
    const sounds = document.createElement('div');
    sounds.className = 'sounds';

    const soundSettings = document.createElement('div');
    soundSettings.className = 'sound-settings';

    const soundLabel = document.createElement('p');
    soundLabel.textContent = 'Sounds';
    soundSettings.appendChild(soundLabel);

    // Create volume control
    function createSoundControl(iconClass, id, value, e1, e2) {
        const iconContainer = document.createElement('div');
        iconContainer.className = 'icon-container';

        const icon = document.createElement('i');
        icon.className = `fa-solid ${iconClass}`;

        icon.onclick = function () {
            if (id === 'volume') {
                if (icon.classList.contains('fa-volume-xmark')) {
                    icon.classList.toggle('fa-volume-xmark');
                    icon.classList.toggle('fa-volume-high');
                    input.value = 1;
                    document.getElementById('writeXSound').volume = 1;
                    document.getElementById('writeOSound').volume = 1;
                    localStorage.setItem('volume', 1);
                }
                else {
                    icon.classList.toggle('fa-volume-high');
                    icon.classList.toggle('fa-volume-xmark');
                    input.value = 0;
                    document.getElementById('writeXSound').volume = 0;
                    document.getElementById('writeOSound').volume = 0;
                    localStorage.setItem('volume', 0);
                }
            } 
            
            else {
                if (icon.classList.contains('mute')) {
                    input.value = 1;
                    icon.classList.toggle('mute');
                    document.getElementById('bgMusic').volume = 1;
                    localStorage.setItem('music', 1);
                }
                else {
                    input.value = 0;
                    icon.classList.toggle('mute');
                    document.getElementById('bgMusic').volume = 0;
                    localStorage.setItem('music', 0);
                }
            }
        };

        const input = document.createElement('input');
        input.type = 'range';
        input.min = 0;
        input.max = 1;
        input.step = 0.01;
        input.id = id;
        input.value = value;
        input.addEventListener('input', function () {
            document.getElementById(e1).volume = input.value;
            document.getElementById(e2).volume = input.value;
            localStorage.setItem(id, input.value);
        });

        iconContainer.appendChild(icon);
        iconContainer.appendChild(input);

        return iconContainer;
    }

    // Append sound controls to the sound settings
    soundSettings.appendChild(createSoundControl('fa-volume-high', 'volume', localStorage.getItem('volume') || 1, 'writeXSound', 'writeOSound'));
    soundSettings.appendChild(createSoundControl('fa-music', 'music', localStorage.getItem('music') || 1, 'bgMusic', 'bgMusic'));

    // Append sound settings to the sounds section
    sounds.appendChild(soundSettings);
    bottom.appendChild(sounds);

    // Assemble all parts together
    container.appendChild(top);
    container.appendChild(bottom);
    content.appendChild(header);
    content.appendChild(container);

    return content;
}

function buildSymbolSettings() {
    const content = document.createElement('div');
    content.className = 'content';
    content.id = 'content';
    return content;
}

function buildFontSettings() {
    const content = document.createElement('div');
    content.className = 'content';
    content.id = 'content';
    return content;
}




// Function to create theme boxes dynamically
function createThemeBox(theme) {
    if (theme["--main-bg-h"] == "url('../assets/img/vecteezy_light-brown-cartoon-H.jpg')") {
        theme['--main-bg-h'] = "url('assets/img/vecteezy_light-brown-cartoon-H.jpg')";
        theme['--main-bg-v'] = "url('assets/img/vecteezy_light-brown-cartoon-V.jpg')";
    }

    // Create the main theme box container
    const themeBox = document.createElement("div");
    themeBox.classList.add("theme-box");

    // Create row1
    const row1 = document.createElement("div");
    row1.classList.add("row", "row1");

    const mainColorContainer = document.createElement("div");
    mainColorContainer.classList.add("main-color-container");
    mainColorContainer.style.background = theme["--main-color"];

    const secondaryColorContainer = document.createElement("div");
    secondaryColorContainer.classList.add("secondary-color-container");
    secondaryColorContainer.style.background = theme["--secondary-color"];

    row1.append(mainColorContainer, secondaryColorContainer);

    // Create row2
    const row2 = document.createElement("div");
    row2.classList.add("row", "row2");

    const row2_inner1 = document.createElement("div");
    row2_inner1.classList.add("row");

    const mainBgHContainer = document.createElement("div");
    mainBgHContainer.classList.add("main-bg-h-container");
    mainBgHContainer.style.backgroundImage = theme["--main-bg-h"];
    mainBgHContainer.style.backgroundRepeat = "no-repeat";
    mainBgHContainer.style.backgroundSize = "cover";

    const mainBgVContainer = document.createElement("div");
    mainBgVContainer.classList.add("main-bg-v-container");
    mainBgVContainer.style.background = theme["--main-bg-v"];
    mainBgVContainer.style.backgroundRepeat = "no-repeat";
    mainBgVContainer.style.backgroundSize = "cover";

    row2_inner1.append(mainBgHContainer, mainBgVContainer);

    const row2_inner2 = document.createElement("div");
    row2_inner2.classList.add("row");

    const textColorContainer = document.createElement("div");
    textColorContainer.classList.add("text-color-container");
    textColorContainer.style.background = theme["--text-color"];

    const shadowColorContainer = document.createElement("div");
    shadowColorContainer.classList.add("shadow-color-container");
    shadowColorContainer.style.background = theme["--shadow-color"];

    row2_inner2.append(textColorContainer, shadowColorContainer);

    row2.append(row2_inner1, row2_inner2);

    // Append rows to the theme box
    themeBox.append(row1, row2);
    themeBox.classList.add("hidden");

    return themeBox;
}

// Function to build the full content
function buildColorSettings() {
    // Create the main content container
    const content = document.createElement("div");
    content.classList.add("content");
    content.id = "content";

    // Header section
    const header = document.createElement("header");
    header.style.justifyContent = "start";

    const backButton = document.createElement("div");
    const backIcon = document.createElement("i");
    backIcon.classList.add("icon", "fa-solid", "fa-arrow-left");
    backIcon.onclick = () => changeContent(buildSettings());
    backButton.appendChild(backIcon);
    header.appendChild(backButton);

    // Container for all content below the header
    const container = document.createElement("div");
    container.classList.add("container");

    // Colors section
    const colors = document.createElement("div");
    colors.classList.add("colors");

    // Left section
    const left = document.createElement("div");
    left.classList.add("left");

    const outputTheme = document.createElement("div");
    outputTheme.classList.add("output-theme");

    const top = document.createElement("div");
    top.classList.add("top");

    const logo = document.createElement("div");
    logo.classList.add("logo");
    logo.textContent = "XO";

    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = "ultimate";

    top.append(logo, title);

    const bottom = document.createElement("div");
    bottom.classList.add("bottom");

    ["1 Player", "2 Players", "Settings"].forEach(text => {
        const link = document.createElement("div");
        link.classList.add("link");
        const p = document.createElement("p");
        p.textContent = text;
        link.appendChild(p);
        bottom.appendChild(link);
    });

    outputTheme.append(top, bottom);
    left.appendChild(outputTheme);

    // Right section
    const right = document.createElement("div");
    right.classList.add("right");

    const slider = document.createElement("div");
    slider.classList.add("slider");

    const arrowUp = document.createElement("div");
    arrowUp.classList.add("arrow");
    const iconUp = document.createElement("i");
    iconUp.classList.add("fa-solid", "fa-chevron-up");
    arrowUp.appendChild(iconUp);
    arrowUp.onclick = scrollBack;

    const themesContainer = document.createElement("div");
    themesContainer.classList.add("themes-container");

    // Add theme boxes to the container
    themes.forEach((theme, i) => {
        const themeBox = createThemeBox(theme);
        if (i == (localStorage.getItem("appliedThemeIndex") || 0)) {
            themeBox.classList.remove("hidden");
            apply(themeBox, outputTheme);
        }

        themesContainer.appendChild(themeBox);
    });

    const arrowDown = document.createElement("div");
    arrowDown.classList.add("arrow");
    const iconDown = document.createElement("i");
    iconDown.classList.add("fa-solid", "fa-chevron-down");
    arrowDown.appendChild(iconDown);
    arrowDown.onclick = scrollFront;

    slider.append(arrowUp, themesContainer, arrowDown);
    right.appendChild(slider);

    colors.append(left, right);

    // Apply button section
    const applyContainer = document.createElement("div");
    const applyButton = document.createElement("div");
    applyButton.classList.add("apply");
    applyButton.textContent = "Apply";
    applyButton.onclick = applyAndSave;
    applyContainer.appendChild(applyButton);

    // Assemble container
    container.append(colors, applyContainer);

    // Assemble all parts into the main content
    content.append(header, container);

    return content;
}