import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FlickrService } from '../../shared/services/flickr.service';
import { Image } from '../types/image';
import { map, pluck } from 'rxjs/operators';
import { FlickrResponse } from '../../shared/types/flickrResponse';

@Injectable()
export class ImageService {
  totalImages$: Subject<number> = new BehaviorSubject<number>(0);
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private flickrService: FlickrService) {}

  getImages(searchValue: string, page: number, pageSize: number): Observable<Image[]> {
    this.isLoading$.next(true);
    return this.flickrService.getImages(searchValue, page, pageSize).pipe(
      map((image) => {
        this.totalImages$.next(image.total);
        return image;
      }),
      pluck('photo'),
      map((flickrImages: FlickrResponse[]) => {
        const images: Image[] = [];
        flickrImages.forEach((flickrImage: FlickrResponse) => {
          const image = {
            id: flickrImage.id,
            title: flickrImage.title,
            imageUrl: `https://live.staticflickr.com/${flickrImage.server}/${flickrImage.id}_${flickrImage.secret}.jpg`,
          };
          images.push(image);
        });
        this.isLoading$.next(false);
        return images;
      }),
    );
  }
}
