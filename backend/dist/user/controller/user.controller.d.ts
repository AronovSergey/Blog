import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(user: User): Observable<User> | Object;
    login(user: User): Observable<object> | Object;
    findOne(id: string): Observable<User>;
    findAll(page?: number, limit?: number): Observable<Pagination<User>>;
    deleteOne(id: string): Observable<User>;
    updateOne(id: string, user: User): Observable<any>;
    updateRoleOfUser(id: string, user: User): Observable<User>;
}
