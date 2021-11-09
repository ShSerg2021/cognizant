import { ChangeDetectorRef, Component, HostBinding, Inject, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '@auth0/auth0-angular';
import { User, UserService } from './service/user.service';
import { DOCUMENT } from '@angular/common';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { LocalStorageService } from './service/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private readonly themeKey = 'theme';

  private readonly mobileQueryListener: () => void;

  mobileQuery: MediaQueryList;

  menuTabs: any = [];

  toggleControl = new FormControl(this.localStorageService.getItem(this.themeKey) === 'darkMode');

  @HostBinding('class') className = '';

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private overlay: OverlayContainer,
    public auth: AuthService,
    public userService: UserService,
    private localStorageService: LocalStorageService,
    @Inject(DOCUMENT) public document: Document
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.auth.user$.subscribe((user) => this.buildMenu(user));
    this.toggleControl.valueChanges.subscribe((darkMode) => this.toggleTheme(darkMode));
    this.toggleTheme(this.toggleControl.value);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  buildMenu(user: User) {
    this.menuTabs = [
      {
        label: 'Main',
        routerLink: '/main',
      },
      this.userService.hasUserRole(user, 'Admin') && {
        label: 'Patients',
        routerLink: '/patients',
      },
    ];
  }

  private toggleTheme(darkMode: boolean): void {
    const darkClassName = 'darkMode';
    this.className = darkMode ? darkClassName : '';
    this.localStorageService.setItem(this.themeKey, this.className);
    if (darkMode) {
      this.overlay.getContainerElement().classList.add(darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
    }
  }
}
