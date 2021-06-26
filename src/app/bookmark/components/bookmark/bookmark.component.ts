import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bookmark } from '../../types/bookmark';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
})
export class BookmarkComponent implements OnInit {
  @Input() bookmark!: Bookmark;
  @Output() removeFromBookmarks = new EventEmitter<Bookmark>();

  constructor() {}

  ngOnInit(): void {}

  removeBookmark(bookmark: Bookmark): void {
    this.removeFromBookmarks.emit(bookmark);
  }
}
