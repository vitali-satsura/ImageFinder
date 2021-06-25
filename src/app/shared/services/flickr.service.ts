import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable()
export class FlickrService {
  constructor(private httpClient: HttpClient) {}

  getImages(searchValue: string, page: number, pageSize: number): Observable<any> {
    const url =
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${environment.flickrApiKey}` +
      `&text=${searchValue}&page=${page}&per_page=${pageSize}&format=json&nojsoncallback=1`;
    return this.httpClient.get(url).pipe(pluck('photos'));
  }
}
