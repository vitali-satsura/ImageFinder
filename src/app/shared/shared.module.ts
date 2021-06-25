import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ImageModule } from '../image/image.module';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [HeaderComponent, NavbarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    ImageModule,
    MatListModule,
  ],
  exports: [HeaderComponent, NavbarComponent],
})
export class SharedModule {}
