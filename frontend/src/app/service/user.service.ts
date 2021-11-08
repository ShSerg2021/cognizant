import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { User as AuthUser } from '@auth0/auth0-spa-js';
import { map } from 'rxjs/operators';

export type User = AuthUser | null | undefined;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: AuthService) {}

  getUserRoles(user: User): string[] {
    return user ? user['http://cognizant.com/roles'] || [] : [];
  }

  hasRole(role: string): Observable<boolean> {
    return this.auth.user$.pipe(map((user) => this.getUserRoles(user).includes(role)));
  }
}
