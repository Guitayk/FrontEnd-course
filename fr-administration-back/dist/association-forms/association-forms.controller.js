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
exports.AssociationFormsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const association_forms_service_1 = require("./association-forms.service");
let AssociationFormsController = class AssociationFormsController {
    constructor(service) {
        this.service = service;
    }
    async create() {
        return this.service.create();
    }
    async getAll() {
        return this.service.getAll();
    }
    async get(parameters) {
        return this.service.get(parameters.id);
    }
    async update(parameters, input) {
        return this.service.update(parameters.id, input.financialValidation, input.legalValidation);
    }
    async delete(parameters) {
        return this.service.delete(parameters.id);
    }
};
__decorate([
    common_1.Post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssociationFormsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssociationFormsController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationFormsController.prototype, "get", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AssociationFormsController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationFormsController.prototype, "delete", null);
AssociationFormsController = __decorate([
    swagger_1.ApiTags('association-forms'),
    common_1.Controller('association-forms'),
    __metadata("design:paramtypes", [association_forms_service_1.AssociationFormsService])
], AssociationFormsController);
exports.AssociationFormsController = AssociationFormsController;
//# sourceMappingURL=association-forms.controller.js.map