export interface Roles {
  subscriber?: boolean;
  admin?: boolean;
}

export interface User {
  email: string;
  uid: string;
  roles: Roles;
  username?: string;
}
