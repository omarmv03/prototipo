import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private authService: UserService) {}

  canActivate() {
    return this.authService.isAuthenticated();
  }
}