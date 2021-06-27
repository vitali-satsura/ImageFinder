import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Image } from '../../types/image';
import { Bookmark } from '../../../bookmark/types/bookmark';
import { BookmarkService } from '../../../bookmark/services/bookmark.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit, OnDestroy {
  @Input() image!: Image;

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  userUid: string = '';

  userUidSubscription!: Subscription;

  constructor(private bookmarkService: BookmarkService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userUidSubscription = this.authService.user$.subscribe((data) => {
      this.userUid = data.uid;
    });
  }

  ngOnDestroy(): void {
    if (this.userUidSubscription) {
      this.userUidSubscription.unsubscribe();
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addToBookmarks(image: Image, tags: string[]): void {
    const bookmark = new Bookmark(image, tags, this.userUid);
    this.bookmarkService.addBookmark(bookmark);
  }
}
