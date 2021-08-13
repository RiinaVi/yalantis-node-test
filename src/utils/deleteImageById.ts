import fs from 'fs';
import path from 'path';

import { IMAGES_DIRECTORY } from './constants';

const deleteImageById = (id: string) => {
  fs.readdirSync(IMAGES_DIRECTORY).find((file) => {
    if (file.includes(id)) {
      fs.unlinkSync(path.join(IMAGES_DIRECTORY, file));
    }
  });
};

export default deleteImageById;
