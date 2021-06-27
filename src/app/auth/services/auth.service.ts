import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  isLoggedIn$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  email$: Subject<string> = new BehaviorSubject<string>('');

  constructor(private auth: AngularFireAuth, private router: Router) {}

  login(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password).then((user) => {
      this.isLoggedIn$.next(true);
      this.email$.next(user.user?.email as string);
      this.router.navigate(['']);
    });
  }

  register(email: string, password: string): void {
    this.auth.createUserWithEmailAndPassword(email, password).then((user) => {
      this.isLoggedIn$.next(true);
      console.log('register ', user);
      this.router.navigate(['']);
    });
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    this.auth.signOut();
    this.router.navigate(['']);
  }
}
