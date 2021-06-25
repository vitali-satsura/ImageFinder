import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { Image } from '../../types/image';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  images$!: Observable<Image[]>;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {}

  getImages(searchValue: string) {
    this.images$ = this.imageService.getImages(searchValue);
  }
}
