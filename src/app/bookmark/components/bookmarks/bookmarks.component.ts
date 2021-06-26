import { Component, HostListener, OnInit } from '@angular/core';
import { Bookmark } from '../../types/bookmark';
import { BookmarkService } from '../../services/bookmark.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  bookmarks: Bookmark[] = [];

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.getBookmarks();
  }

  getBookmarks(): void {
    this.bookmarks = this.bookmarkService.bookmarks;
  }

  removeBookmark(bookmark: Bookmark): void {
    this.bookmarks = this.bookmarkService.removeBookmark(bookmark);
  }

  @HostListener('window:beforeunload')
  saveBookmarks() {
    this.bookmarkService.saveBookmarks();
  }
}
