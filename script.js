function simulateMode(mode) {
    const modeInfoElement = document.getElementById('mode-info');
    let infoText = `You selected ${mode} Mode. `;

    switch (mode) {
        case 'Hacker':
            infoText += "Tools like Metasploit, Burp Suite, Nmap are available.";
            break;
        case 'Student':
            infoText += "Tools like Tomato, Stretchly, Zettlr are available.";
            break;
        case 'Researcher':
            infoText += "Tools like Zotero, JabRef, Mendeley are available.";
            break;
        case 'Developer':
            infoText += "Tools like Git, Docker, VS Code are available.";
            break;
        case 'Guest':
            infoText += "Limited access with tools like PCManFM and LibreWolf. Restrictions apply.";
            break;
        case 'Child':
            infoText += "Child-friendly environment with tools like GCompris and TuxPaint. Parental controls are active.";
            break;
        default:
            infoText += "No specific information for this mode yet.";
    }

    modeInfoElement.textContent = infoText;
}

// Basic zoom and drag functionality
let zoomLevel = 1;
let isDragging = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;

const mermaidContainer = document.querySelector('.mermaid-container');

mermaidContainer.addEventListener('wheel', (event) => {
    event.preventDefault();

    const scaleFactor = event.deltaY < 0 ? 1.1 : 0.9;
    zoomLevel *= scaleFactor;
    zoomLevel = Math.max(0.5, Math.min(2, zoomLevel));

    // Apply scale and translation to zoom around the mouse cursor
    const rect = mermaidContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    translateX = (1 - scaleFactor) * offsetX + translateX * scaleFactor;
    translateY = (1 - scaleFactor) * offsetY + translateY * scaleFactor;

    applyTransform();
}, { passive: false });

mermaidContainer.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.clientX - translateX;
    startY = event.clientY - translateY;
    mermaidContainer.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    mermaidContainer.style.cursor = 'grab';
});

document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    translateX = event.clientX - startX;
    translateY = event.clientY - startY;
    applyTransform();
});

function applyTransform() {
    mermaidContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
}
