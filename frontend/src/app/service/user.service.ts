import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<any>(null);

  constructor(private auth: AuthService) {
    auth.user$.subscribe((data) => this.setUser(data));
  }

  setUser(user: any): void {
    this.user.next(user);
  }

  getUser(): any {
    return this.user.getValue();
  }

  getUserRoles(): any {
    const user = this.user.getValue();
    return user ? user['http://cognizant.com/roles'] || [] : [];
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }
}
