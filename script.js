function convertToAscii(imageData) {
    // ASCII characters ordered by intensity
    const asciiCharacters = '@%#*+=-:. ';

    let asciiArt = '';

    for (let y = 0; y < imageData.height; y += 2) {
        for (let x = 0; x < imageData.width; x++) {
            const pixelIndex = (x + y * imageData.width) * 4;
            const r = imageData.data[pixelIndex];
            const g = imageData.data[pixelIndex + 1];
            const b = imageData.data[pixelIndex + 2];

            // Convert RGB to grayscale
            const intensity = Math.round((r + g + b) / 3);

            // Map intensity to ASCII character
            const asciiIndex = Math.round((intensity / 255) * (asciiCharacters.length - 1));

            asciiArt += asciiCharacters[asciiIndex];
        }
        asciiArt += '\n';
    }

    return asciiArt;
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const image = new Image();
        image.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;

            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, image.width, image.height);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const asciiArt = convertToAscii(imageData);

            const resultContainer = document.createElement('div');
            resultContainer.id = 'resultContainer';

            const imageResult = document.createElement('img');
            imageResult.src = event.target.result;

            const asciiResult = document.createElement('pre');
            asciiResult.textContent = asciiArt;

            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download ASCII Art';
            downloadButton.addEventListener('click', function () {
                const link = document.createElement('a');
                link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(asciiArt);
                link.download = 'ascii_art.txt';
                link.click();
            });

            resultContainer.appendChild(imageResult);
            resultContainer.appendChild(asciiResult);
            resultContainer.appendChild(downloadButton);

            const home = document.getElementById('home');
            home.innerHTML = '';
            home.appendChild(resultContainer);
        };

        image.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

