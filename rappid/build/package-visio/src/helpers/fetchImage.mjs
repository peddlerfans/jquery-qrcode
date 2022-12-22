export default async function fetchImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = function() {
            resolve(img);
        }

        img.onerror = function() {
            reject('Could not load image with given URL.', url);
        }

        img.src = url;
    });
}
