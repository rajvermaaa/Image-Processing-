const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let img = new Image();
let originalImageData;

document.getElementById('upload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        img.src = e.target.result;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        };
    };
    reader.readAsDataURL(file);
});

document.getElementById('crop').addEventListener('click', () => {
    const cropWidth = prompt("Enter crop width:");
    const cropHeight = prompt("Enter crop height:");
    if (cropWidth && cropHeight) {
        const croppedImage = ctx.getImageData(0, 0, cropWidth, cropHeight);
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        ctx.putImageData(croppedImage, 0, 0);
    }
});

document.getElementById('resize').addEventListener('click', () => {
    const resizeWidth = prompt("Enter new width:");
    const resizeHeight = prompt("Enter new height:");
    if (resizeWidth && resizeHeight) {
        canvas.width = resizeWidth;
        canvas.height = resizeHeight;
        ctx.drawImage(img, 0, 0, resizeWidth, resizeHeight);
    }
});

document.getElementById('brightness').addEventListener('input', (event) => {
    const brightness = event.target.value;
    ctx.putImageData(originalImageData, 0, 0);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] * brightness;     // Red
        data[i + 1] = data[i + 1] * brightness; // Green
        data[i + 2] = data[i + 2] * brightness; // Blue
    }

    ctx.putImageData(imageData, 0, 0);
});
