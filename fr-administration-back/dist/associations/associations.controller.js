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
exports.AssociationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const associations_service_1 = require("./associations.service");
let AssociationsController = class AssociationsController {
    constructor(service) {
        this.service = service;
    }
    async create(input) {
        return this.service.create(input.name, input.idUsers, input.roles, input.associationFormId, input.verbalProcessId);
    }
    async getAll() {
        return this.service.getAllDTO();
    }
    async get(parameter) {
        const association = await this.service.getDTO(parameter.name);
        if (association === undefined) {
            throw new common_1.HttpException(`Could not find association with name ${parameter.name}`, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            return association;
        }
    }
    async getMembers(parameter) {
        return this.service.getMembers(parameter.name);
    }
    async update(input, parameter) {
        const association = await this.service.update(input, parameter.name);
        if (association === undefined) {
            throw new common_1.HttpException(`Could not find association with name ${parameter.name}`, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            return association;
        }
    }
    async delete(parameter) {
        this.service.delete(parameter.name);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getAll", null);
__decorate([
    common_1.Get(':name'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "get", null);
__decorate([
    common_1.Get(':name/members'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getMembers", null);
__decorate([
    common_1.Put(':name'),
    __param(0, common_1.Body()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "update", null);
__decorate([
    common_1.Delete(':name'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "delete", null);
AssociationsController = __decorate([
    swagger_1.ApiTags('associations'),
    common_1.Controller('associations'),
    __metadata("design:paramtypes", [associations_service_1.AssociationsService])
], AssociationsController);
exports.AssociationsController = AssociationsController;
//# sourceMappingURL=associations.controller.js.map