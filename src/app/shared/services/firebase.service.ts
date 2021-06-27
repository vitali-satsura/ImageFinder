import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Bookmark } from '../../bookmark/types/bookmark';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import User = firebase.User;

@Injectable()
export class FirebaseService {
  user!: User;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  getBookmarks(): Observable<Bookmark[]> {
    this.afAuth.authState.subscribe((tempUser) => {
      this.user = tempUser as User;
    });

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
  }

  addBookmark(bookmark: Bookmark) {
    this.firestore.collection('bookmarks').add({
      flickrId: bookmark.flickrId,
      title: bookmark.title,
      imageUrl: bookmark.imageUrl,
      tags: bookmark.tags,
      author: bookmark.author,
    });
  }

  deleteBookmark(bookmarkId: string) {
    this.firestore.doc('bookmarks/' + bookmarkId).delete();
  }
}
