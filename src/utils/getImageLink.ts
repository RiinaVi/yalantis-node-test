import { Request } from 'express';

const getImageLink = (req: Request, fileName: string) => {
  return `${req.protocol}://${req.hostname}${
    process.env.NODE_ENV === 'dev' ? `:${process.env.PORT}` : ''
  }/image/${fileName}`;
};

export default getImageLink;
