import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Bookmark } from '../../bookmark/types/bookmark';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase';
import User = firebase.User;
import { AuthService } from '../../auth/services/auth.service';
import { NotifierService } from './notifier.service';

@Injectable()
export class FirebaseService {
  user!: User;

  constructor(
    private firestore: AngularFirestore,
    private notifier: NotifierService,
    private authService: AuthService,
  ) {
    this.authService.user$.subscribe((data) => {
      this.user = data;
    });
  }

  getBookmarks(): Observable<Bookmark[] | null> {
    if (this.user.uid) {
      return this.firestore
        .collection<Bookmark>(`bookmarks`, (ref) => ref.where('author', '==', `${this.user.uid}`))
        .snapshotChanges()
        .pipe(
          map((actions) =>
            actions.map((a) => {
              const data = a.payload.doc.data() as Bookmark;
              const id = a.payload.doc.id;
              return { id, ...data };
            }),
          ),
        );
    } else {
      return of(null);
    }
  }

  addBookmark(bookmark: Bookmark) {
    this.firestore.collection('bookmarks').add({
      flickrId: bookmark.flickrId,
      title: bookmark.title,
      imageUrl: bookmark.imageUrl,
      tags: bookmark.tags,
      author: bookmark.author,
    });
    this.notifier.showNotificationWithoutButton('Image is added to bookmarks.', 'success');
  }

  deleteBookmark(bookmarkId: string) {
    this.firestore.doc('bookmarks/' + bookmarkId).delete();
    this.notifier.showNotificationWithoutButton('Bookmark is deleted.', 'delete');
  }
}
