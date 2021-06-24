import { Body, Controller, Param, Post, Get, Delete, Put, UseGuards } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from '../models/user-role.enum';



@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    create(@Body() user: User): Observable<User> | Object {
        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError((err) => of({ error: err.message }))
        )
    }

    @Post('login')
    login(@Body() user: User): Observable<object> | Object {
        return this.userService.login(user).pipe(
            map((jwt: string) => ({ access_token: jwt })),
            catchError((err) => of({ error: err.message }))
        );
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<User> {
        return this.userService.findOne(Number(id))
    }

    @Get()
    findAll(): Observable<User[]> {
        return this.userService.findAll()
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<User> {
        return this.userService.deleteOne(Number(id))
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
        return this.userService.updateOne(Number(id), user)
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRoleOfUser(@Param('id') id: string, @Body() user: User): Observable<User> {
        return this.userService.updateRoleOfUser(Number(id), user);
    }
}
