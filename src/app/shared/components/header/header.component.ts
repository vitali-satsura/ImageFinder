import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  username$!: Subject<any>;
  isLoggedIn: boolean = false;

  isLoggedInSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy() {
    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
    }
  }

  getUser(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (data) => (this.isLoggedIn = data),
    );
    this.username$ = this.authService.email$;
  }

  onLogout(): void {
    this.authService.logout();
  }
}
