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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialServiceService = void 0;
const common_1 = require("@nestjs/common");
const association_form_entity_1 = require("../association-forms/association-form.entity");
const association_forms_service_1 = require("../association-forms/association-forms.service");
let FinancialServiceService = class FinancialServiceService {
    constructor(associationFormService) {
        this.associationFormService = associationFormService;
    }
    async validate(associationFormId) {
        return this.associationFormService.updateFinancialValidation(associationFormId, true);
    }
};
FinancialServiceService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [association_forms_service_1.AssociationFormsService])
], FinancialServiceService);
exports.FinancialServiceService = FinancialServiceService;
//# sourceMappingURL=financial-service.service.js.map