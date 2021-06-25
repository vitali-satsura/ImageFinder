import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getImages(searchValue: string): Observable<any> {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${environment.flickrApiKey}`+
      `&text=${searchValue}&format=json&nojsoncallback`;
    return this.httpClient.get(url).pipe(
      pluck('photo')
    );
  }
}
