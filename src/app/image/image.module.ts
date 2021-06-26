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
import { MatPaginatorModule } from '@angular/material/paginator';
import { BookmarkService } from '../bookmark/services/bookmark.service';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from '../bookmark/components/bookmarks/bookmarks.component';

const routes: Routes = [{ path: 'images', component: ImagesComponent }];

@NgModule({
  declarations: [SearchComponent, ImageComponent, ImagesComponent],
  exports: [ImagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FlexModule,
    MatChipsModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  providers: [FlickrService, ImageService, BookmarkService],
})
export class ImageModule {}
