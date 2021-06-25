import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { MatInputModule } from '@angular/material/input';
import { ImageComponent } from './components/image/image.component';
import { ImagesComponent } from './components/images/images.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    SearchComponent,
    ImageComponent,
    ImagesComponent,
  ],
  exports: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ImageModule { }
