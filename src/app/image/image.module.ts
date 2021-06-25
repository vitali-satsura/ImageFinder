import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { MatInputModule } from '@angular/material/input';
import { ImageComponent } from './components/image/image.component';
import { ImagesComponent } from './components/images/images.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlickrService } from '../shared/services/flickr.service';
import { ImageService } from './services/image.service';
import { FlexModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SearchComponent, ImageComponent, ImagesComponent],
  exports: [ImagesComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FlexModule,
    MatChipsModule,
    MatIconModule,
  ],
  providers: [FlickrService, ImageService],
})
export class ImageModule {}