"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const user_service_1 = require("../service/user.service");
const roles_decorator_1 = require("../../auth/decorator/roles.decorator");
const jwt_guard_1 = require("../../auth/guards/jwt-guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const user_role_enum_1 = require("../models/user-role.enum");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(user) {
        return this.userService.create(user).pipe(operators_1.map((user) => user), operators_1.catchError((err) => rxjs_1.of({ error: err.message })));
    }
    login(user) {
        return this.userService.login(user).pipe(operators_1.map((jwt) => ({ access_token: jwt })), operators_1.catchError((err) => rxjs_1.of({ error: err.message })));
    }
    findOne(id) {
        return this.userService.findOne(Number(id));
    }
    findAll(page = 1, limit = 10) {
        limit = limit > 100 ? 100 : limit;
        return this.userService.paginate({ page: Number(page), limit: Number(limit), route: 'http://localhost:3000/users' });
    }
    deleteOne(id) {
        return this.userService.deleteOne(Number(id));
    }
    updateOne(id, user) {
        return this.userService.updateOne(Number(id), user);
    }
    updateRoleOfUser(id, user) {
        return this.userService.updateRoleOfUser(Number(id), user);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "create", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "login", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "findOne", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('page')), __param(1, common_1.Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "findAll", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "deleteOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "updateOne", null);
__decorate([
    roles_decorator_1.hasRoles(user_role_enum_1.UserRole.ADMIN),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Put(':id/role'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "updateRoleOfUser", null);
UserController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map