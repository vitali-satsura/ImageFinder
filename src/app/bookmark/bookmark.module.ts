import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { FlexModule } from '@angular/flex-layout';
import { BookmarkService } from './services/bookmark.service';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { FirebaseService } from '../shared/services/firebase.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from '../auth/services/auth.service';

const routes: Routes = [{ path: 'bookmarks', component: BookmarksComponent }];

@NgModule({
  declarations: [BookmarksComponent, BookmarkComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    AngularFirestoreModule,
  ],
  providers: [BookmarkService, LocalStorageService, FirebaseService, AuthService],
})
export class BookmarkModule {}
