import { Injectable } from '@angular/core';
import { Bookmark } from '../types/bookmark';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Observable } from 'rxjs';

@Injectable()
export class BookmarkService {
  bookmarks: Bookmark[] = [];

  constructor(private firebaseService: FirebaseService) {}

  // addToBookmarks(bookmark: Bookmark): Bookmark[] {
  //   let isBookmarkAlreadyExists: boolean = false;
  //   let existingBookmark: Bookmark | undefined = undefined;
  //
  //   if (this.bookmarks.length > 0) {
  //     existingBookmark = this.bookmarks.find((b) => b.flickrId === bookmark.flickrId);
  //   }
  //
  //   isBookmarkAlreadyExists = existingBookmark !== undefined;
  //   if (!isBookmarkAlreadyExists) {
  //     this.bookmarks.push(bookmark);
  //   }
  //
  //   return this.bookmarks;
  // }
  //
  // removeBookmark(bookmark: Bookmark): Bookmark[] {
  //   const bookmarkIndex = this.bookmarks.findIndex((b) => b.flickrId === bookmark.flickrId);
  //
  //   if (bookmarkIndex > -1) {
  //     this.bookmarks.splice(bookmarkIndex, 1);
  //   }
  //   return this.bookmarks;
  // }
  //
  // saveBookmarks() {
  //   this.localStorageService.set('bookmarks', this.bookmarks);
  // }

  getBookmarks(): Observable<Bookmark[]> {
    return this.firebaseService.getBookmarks();
  }

  addBookmark(bookmark: Bookmark): void {
    this.getBookmarks().subscribe((data) => {
      this.bookmarks = data;
    });

    let isBookmarkAlreadyExists: boolean = false;
    let existingBookmark: Bookmark | undefined = undefined;

    if (this.bookmarks.length > 0) {
      existingBookmark = this.bookmarks.find((b) => b.flickrId === bookmark.flickrId);
    }

    isBookmarkAlreadyExists = existingBookmark !== undefined;
    if (!isBookmarkAlreadyExists) {
      this.firebaseService.addBookmark(bookmark);
    }
  }

  deleteBookmark(bookmarkId: string): void {
    this.firebaseService.deleteBookmark(bookmarkId);
  }
}
