import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { Image } from '../../types/image';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit, OnDestroy {
  images$!: Observable<Image[]>;

  length: number = 100;
  pageIndex: number = 0;
  pageSize: number = 10;

  searchValue: string = '';

  isLoading: boolean = false;
  isImagesEmpty: boolean = false;

  lengthSubscription!: Subscription;
  isLoadingSubscription!: Subscription;
  imagesSubscription!: Subscription;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.lengthSubscription) {
      this.lengthSubscription.unsubscribe();
    }

    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }

    if (this.imagesSubscription) {
      this.imagesSubscription.unsubscribe();
    }
  }

  getSearchValue(value: string): void {
    this.searchValue = value;
    this.pageIndex = 0;
    this.getImages(this.searchValue, this.pageIndex + 1, this.pageSize);
  }

  getImages(searchValue: string, page: number, pageSize: number): void {
    this.isImagesEmpty = false;
    this.isLoadingSubscription = this.imageService.isLoading$.subscribe(
      (data) => (this.isLoading = data),
    );
    this.images$ = this.imageService.getImages(searchValue, page, pageSize);
    this.lengthSubscription = this.imageService.totalImages$.subscribe((data) => {
      this.length = data;
    });
    this.images$.subscribe((data) => {
      if (!data.length) {
        this.isImagesEmpty = true;
      }
    });
  }

  handlePage(event: PageEvent): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getImages(this.searchValue, this.pageIndex + 1, this.pageSize);
  }
}
