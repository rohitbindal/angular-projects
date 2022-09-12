import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../constants/models/authorization.model';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  private readonly AUTHORIZATIONS = environment.authorizations;

  canRead(user: User): boolean {
    const allowed = this.AUTHORIZATIONS.read;
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = this.AUTHORIZATIONS.write;
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = this.AUTHORIZATIONS.write;
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;

    for (const role of allowedRoles) {
      if (role in user.roles) {
        return true;
      }
    }
    return false;
  }
}
