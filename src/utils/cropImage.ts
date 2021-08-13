import { createCanvas, loadImage } from 'canvas';

const IMAGE_WIDTH = 200;
const IMAGE_HEIGHT = 200;

const cropImage = async (rawImage: Buffer) => {
  const canvas = createCanvas(IMAGE_WIDTH, IMAGE_HEIGHT);
  const ctx = canvas.getContext('2d');

  const img = await loadImage(rawImage);
  const x = (img.width - IMAGE_WIDTH) / 2;
  const y = (img.height - IMAGE_HEIGHT) / 2;
  ctx.drawImage(
    img,
    x,
    y,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    0,
    0,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
  );

  return canvas.toBuffer();
};

export default cropImage;
