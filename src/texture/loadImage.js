const loadImage = url =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve(image);
    };

    image.src = url;
  });

module.exports = loadImage;
