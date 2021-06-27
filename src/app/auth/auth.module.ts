import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from '../shared/services/local-storage.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FlexModule,
  ],
  providers: [AuthService, LocalStorageService],
})
export class AuthModule {}
