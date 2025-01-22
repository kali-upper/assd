const fileInput = document.getElementById('file-input');
const fileContainer = document.getElementById('file-container');

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    fileContainer.innerHTML = ''; // Clear the container for new uploads

    Array.from(files).forEach(file => {
        const fileCard = document.createElement('div');
        fileCard.classList.add('file-card');

        const fileName = document.createElement('h3');
        fileName.textContent = file.name;
        fileCard.appendChild(fileName);

        const fileType = document.createElement('p');
        fileType.textContent = `Type: ${file.type || 'Unknown'}`;
        fileCard.appendChild(fileType);

        const fileSize = document.createElement('p');
        fileSize.textContent = `Size: ${(file.size / 1024).toFixed(2)} KB`;
        fileCard.appendChild(fileSize);

        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.style.width = '100%';
            img.style.borderRadius = '8px';
            img.style.marginTop = '10px';
            fileCard.appendChild(img);
        } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.controls = true;
            video.src = URL.createObjectURL(file);
            video.style.width = '100%';
            video.style.marginTop = '10px';
            fileCard.appendChild(video);
        } else if (file.type.startsWith('text/')) {
            const reader = new FileReader();
            reader.onload = () => {
                const textPreview = document.createElement('pre');
                textPreview.textContent = reader.result;
                textPreview.style.background = '#ddd';
                textPreview.style.padding = '10px';
                textPreview.style.borderRadius = '5px';
                textPreview.style.marginTop = '10px';
                fileCard.appendChild(textPreview);
            };
            reader.readAsText(file);
        } else {
            const unsupported = document.createElement('p');
            unsupported.textContent = 'Preview not available for this file type.';
            unsupported.style.color = '#ff0000';
            unsupported.style.marginTop = '10px';
            fileCard.appendChild(unsupported);
        }

        fileContainer.appendChild(fileCard);
    });
});
const backToTop = document.getElementById('back-to-top');
backToTop.addEventListener('click', () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
});
