import { Image } from '../../image/types/image';

export class Bookmark {
  id?: string;
  flickrId: string;
  title: string;
  imageUrl: string;
  tags: string[];
  author: string;

  constructor(image: Image, tags: string[], author: string) {
    this.flickrId = image.id;
    this.title = image.title;
    this.imageUrl = image.imageUrl;
    this.tags = tags;
    this.author = author;
  }
}
