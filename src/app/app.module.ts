import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ImageModule } from './image/image.module';
import { HttpClientModule } from '@angular/common/http';
import { BookmarkModule } from './bookmark/bookmark.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ImageModule,
    HttpClientModule,
    BookmarkModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
