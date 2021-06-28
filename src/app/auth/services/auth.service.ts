import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Injectable()
export class AuthService {
  isLoggedIn$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  user$: Subject<any> = new BehaviorSubject<any>(null);

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {}

  login(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password).then((data) => {
      this.isLoggedIn$.next(true);
      this.user$.next(data.user);
      this.localStorageService.set('user', data.user);
      this.router.navigate(['']);
    });
  }

  register(email: string, password: string): void {
    this.auth.createUserWithEmailAndPassword(email, password).then((data) => {
      this.isLoggedIn$.next(true);
      this.user$.next(data.user);
      this.localStorageService.set('user', data.user);
      this.router.navigate(['']);
    });
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    this.user$.next(null);
    this.auth.signOut();
    this.localStorageService.remove('user');
    this.router.navigate(['']);
  }
}
