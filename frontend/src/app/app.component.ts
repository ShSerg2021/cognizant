import { ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from './service/user.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  private readonly mobileQueryListener: () => void;

  menuTabs: any = [];

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public auth: AuthService,
    public userService: UserService,
    @Inject(DOCUMENT) public document: Document
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.buildMenu();
    this.auth.user$.subscribe(() => this.buildMenu());
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  buildMenu() {
    this.menuTabs = [
      {
        label: 'Main',
        routerLink: '/main',
      },
      this.userService.hasRole('Admin') && {
        label: 'Patients',
        routerLink: '/patients',
      },
    ];
  }
}
