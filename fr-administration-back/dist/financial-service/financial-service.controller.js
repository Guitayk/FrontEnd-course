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
exports.FinancialServiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const association_form_entity_1 = require("../association-forms/association-form.entity");
const financial_service_service_1 = require("./financial-service.service");
let FinancialServiceController = class FinancialServiceController {
    constructor(service) {
        this.service = service;
    }
    async validate(input) {
        return this.service.validate(input.associationFormId);
    }
};
__decorate([
    common_1.Put('validate'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FinancialServiceController.prototype, "validate", null);
FinancialServiceController = __decorate([
    swagger_1.ApiTags('other-service'),
    common_1.Controller('financial-service'),
    __metadata("design:paramtypes", [financial_service_service_1.FinancialServiceService])
], FinancialServiceController);
exports.FinancialServiceController = FinancialServiceController;
//# sourceMappingURL=financial-service.controller.js.map