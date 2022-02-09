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
exports.LegalServiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const association_form_entity_1 = require("../association-forms/association-form.entity");
const legal_service_service_1 = require("./legal-service.service");
let LegalServiceController = class LegalServiceController {
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
], LegalServiceController.prototype, "validate", null);
LegalServiceController = __decorate([
    swagger_1.ApiTags('other-service'),
    common_1.Controller('legal-service'),
    __metadata("design:paramtypes", [legal_service_service_1.LegalServiceService])
], LegalServiceController);
exports.LegalServiceController = LegalServiceController;
//# sourceMappingURL=legal-service.controller.js.map