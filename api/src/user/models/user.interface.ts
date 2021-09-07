import { UserRole } from './user-role.enum';

export interface User {
    id?: number;
    name?: string;
    username?: string;
    password?: string;
    email?: string;
    role?: UserRole;
}