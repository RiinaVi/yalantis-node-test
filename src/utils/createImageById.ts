import { File } from 'formidable';
import path from 'path';
import fs from 'fs';

import { cropImage, IMAGES_DIRECTORY } from './index';

const createImageById = async (id: string, file: File) => {
  const extname = path.extname(file.name);
  const fileName = `${id}${extname}`;

  const rawData = fs.readFileSync(file.path);

  const filePath = path.join(IMAGES_DIRECTORY, fileName);

  const croppedImage = await cropImage(rawData);
  fs.writeFileSync(filePath, croppedImage);

  return fileName;
};

export default createImageById;
