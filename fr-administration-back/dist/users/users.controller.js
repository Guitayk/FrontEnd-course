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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_entity_1 = require("../roles/role.entity");
const user_input_1 = require("./user.input");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(service) {
        this.service = service;
    }
    async create(input) {
        return this.service.create(input.firstname, input.lastname, input.age);
    }
    async getAll() {
        return this.service.getAll();
    }
    async getUsersWithRole(parameter) {
        return this.service.getUsersWithRole(parameter.rolename);
    }
    async getRolesById(parameter) {
        return this.service.getRolesById(parameter.id);
    }
    async getById(parameter) {
        const user = await this.service.getById(parameter.id);
        if (user === undefined) {
            throw new common_1.HttpException(`Could not find user with id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            return user;
        }
    }
    async updateById(input, parameter) {
        const user = await this.service.updateById(input, parameter.id);
        if (user === undefined) {
            throw new common_1.HttpException(`Could not find user with id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            return user;
        }
    }
    async deleteById(parameter) {
        this.service.deleteById(parameter.id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    common_1.Get(':rolename'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsersWithRole", null);
__decorate([
    common_1.Get(':id/roles'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getRolesById", null);
__decorate([
    common_1.Get('id/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getById", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateById", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteById", null);
UsersController = __decorate([
    swagger_1.ApiTags('users'),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map