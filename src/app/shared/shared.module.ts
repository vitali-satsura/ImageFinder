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
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { NotifierComponent } from './components/notifier/notifier.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotifierService } from './services/notifier.service';

@NgModule({
  declarations: [HeaderComponent, NavbarComponent, FooterComponent, NotifierComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    ImageModule,
    MatListModule,
    RouterModule,
    MatSnackBarModule,
  ],
  exports: [HeaderComponent, NavbarComponent, FooterComponent],
  providers: [AuthService, NotifierService],
})
export class SharedModule {}
