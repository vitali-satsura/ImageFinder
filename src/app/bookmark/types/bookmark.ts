import { Image } from '../../image/types/image';

export class Bookmark {
  id: string;
  title: string;
  imageUrl: string;
  tags: string[];

  constructor(image: Image, tags: string[]) {
    this.id = image.id;
    this.title = image.title;
    this.imageUrl = image.imageUrl;
    this.tags = tags;
  }
}
