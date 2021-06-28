import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { fromEvent, interval, Observable, Subject, Subscription } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import firebase from 'firebase';
import User = firebase.User;
import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'image-finder';

  user!: User;

  userActions$!: Observable<any>;
  counter$ = interval(1000);
  active$ = new Subject<boolean>();

  userActionsSubscription!: Subscription;

  constructor(private authService: AuthService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.getUser();
    this.monitorActivity();
  }

  ngOnDestroy() {
    if (this.userActionsSubscription) {
      this.userActionsSubscription.unsubscribe();
    }
  }

  getUser() {
    this.user = this.localStorageService.get('user');
    if (this.user) {
      this.authService.user$.next(this.user);
      this.authService.isLoggedIn$.next(true);
    }
  }

  monitorActivity(): void {
    this.userActions$ = fromEvent(document, 'mousemove').pipe(
      map((mouseMove) => ({ mouseMove })),
      switchMap((action) =>
        this.counter$.pipe(
          tap((x) => {
            if (x === 60) {
              this.active$.next(false);
              this.authService.logout();
              alert('You are now logged out.');
            }
          }),
        ),
      ),
      takeUntil(this.active$),
    );

    this.userActionsSubscription = this.userActions$.subscribe();
  }
}
