import { Injectable } from '@angular/core';
import { Bookmark } from '../types/bookmark';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  bookmarks: Bookmark[] = [];

  constructor() {}

  addToBookmarks(bookmark: Bookmark): Bookmark[] {
    let isBookmarkAlreadyExists: boolean = false;
    let existingBookmark: Bookmark | undefined = undefined;

    if (this.bookmarks.length > 0) {
      existingBookmark = this.bookmarks.find((b) => b.id === bookmark.id);
    }

    isBookmarkAlreadyExists = existingBookmark !== undefined;
    if (!isBookmarkAlreadyExists) {
      this.bookmarks.push(bookmark);
    }

    return this.bookmarks;
  }

  removeBookmark(bookmark: Bookmark): Bookmark[] {
    const bookmarkIndex = this.bookmarks.findIndex((b) => b.id === bookmark.id);

    if (bookmarkIndex > -1) {
      this.bookmarks.splice(bookmarkIndex, 1);
    }
    return this.bookmarks;
  }
}
