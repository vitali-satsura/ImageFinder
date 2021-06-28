import { Component, HostListener, OnInit } from '@angular/core';
import { Bookmark } from '../../types/bookmark';
import { BookmarkService } from '../../services/bookmark.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  bookmarks$!: Observable<Bookmark[]>;

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.getBookmarks();
  }

  getBookmarks(): void {
    this.bookmarks$ = this.bookmarkService.getBookmarks();
  }

  removeBookmark(bookmark: Bookmark): void {
    this.bookmarkService.deleteBookmark(bookmark.id as string);
  }
}
