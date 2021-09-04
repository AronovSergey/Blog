import { UserRole } from './user-role.enum';
export declare class UserEntity {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    emailToLowerCase(): void;
}
