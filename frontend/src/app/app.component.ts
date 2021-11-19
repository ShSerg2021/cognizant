import { ChangeDetectorRef, Component, HostBinding, Inject, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '@auth0/auth0-angular';
import { User, UserService } from './service/user.service';
import { DOCUMENT } from '@angular/common';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { LocalStorageService } from './service/local-storage.service';
import { combineLatest } from 'rxjs';
import { WebSocketService } from './service/web-socket.service';
import { EventFeedService } from './service/event-feed.service';
import { EventFeed } from './domain/event-feed';

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

  user: User;

  events: EventFeed[] = [];

  toggleControl = new FormControl(this.localStorageService.getItem(this.themeKey) === 'darkMode');

  @HostBinding('class') className = '';

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private overlay: OverlayContainer,
    public auth: AuthService,
    public userService: UserService,
    webSocketService: WebSocketService,
    private eventFeedService: EventFeedService,
    private localStorageService: LocalStorageService,
    @Inject(DOCUMENT) public document: Document
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.toggleControl.valueChanges.subscribe((darkMode) => this.toggleTheme(darkMode));
    this.eventFeedService.eventsHandler.subscribe((data: EventFeed[]) => this.events = data);
    this.toggleTheme(this.toggleControl.value);
    combineLatest([this.auth.user$, this.auth.getAccessTokenSilently(), this.auth.isAuthenticated$]).subscribe(
      ([user, token, isAuthenticated]) => {
        this.buildMenu(user);
        if (isAuthenticated) {
          if (user && (!this.user || user.email !== this.user.email)) {
            this.eventFeedService.findAll();
            webSocketService.connect(user, token);
            this.user = user;
          }
        } else {
          webSocketService.disconnect();
        }
      }
    );
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
