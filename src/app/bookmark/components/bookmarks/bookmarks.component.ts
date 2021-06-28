import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Bookmark } from '../../types/bookmark';
import { BookmarkService } from '../../services/bookmark.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit, OnDestroy {
  bookmarks: Bookmark[] = [];
  isLoggedIn: boolean = false;

  bookmarksSubscription!: Subscription;
  isLoggedInSubscription!: Subscription;

  constructor(private bookmarkService: BookmarkService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getBookmarks();
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data;
    });
  }

  ngOnDestroy(): void {
    if (this.bookmarksSubscription) {
      this.bookmarksSubscription.unsubscribe();
    }

    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
    }
  }

  getBookmarks(): void {
    this.bookmarksSubscription = this.bookmarkService.getBookmarks().subscribe((data) => {
      if (data) {
        this.bookmarks = data;
      }
    });
  }

  removeBookmark(bookmark: Bookmark): void {
    this.bookmarkService.deleteBookmark(bookmark.id as string);
  }
}
