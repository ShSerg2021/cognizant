import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';
import { User as AuthUser } from '@auth0/auth0-spa-js';

export type User = AuthUser | null | undefined;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<User>(null);

  constructor(private auth: AuthService) {
    auth.user$.subscribe((data) => this.setUser(data));
  }

  setUser(user: User): void {
    this.user.next(user);
  }

  getUser(): User {
    return this.user.getValue();
  }

  getUserRoles(): string[] {
    const user = this.user.getValue();
    return user ? user['http://cognizant.com/roles'] || [] : [];
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }
}
