import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlickrService } from '../../shared/services/flickr.service';
import { Image } from '../types/image';
import { map, pluck } from 'rxjs/operators';
import { FlickrResponse } from '../../shared/types/flickrResponse';

@Injectable()
export class ImageService {
  constructor(private flickrService: FlickrService) {}

  getImages(searchValue: string): Observable<Image[]> {
    return this.flickrService.getImages(searchValue).pipe(
      map((flickrImages: FlickrResponse[]) => {
        const images: Image[] = [];
        flickrImages.forEach((flickrImage: FlickrResponse) => {
          const image = {
            id: flickrImage.id,
            title: flickrImage.title,
            imageUrl: `https://live.staticflickr.com/${flickrImage.server}-${flickrImage.id}/${flickrImage.id}_${flickrImage.secret}.jpg`,
          };
          images.push(image);
        });
        return images;
      }),
    );
  }
}
