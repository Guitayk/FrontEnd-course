"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialServiceModule = void 0;
const common_1 = require("@nestjs/common");
const association_forms_module_1 = require("../association-forms/association-forms.module");
const financial_service_controller_1 = require("./financial-service.controller");
const financial_service_service_1 = require("./financial-service.service");
let FinancialServiceModule = class FinancialServiceModule {
};
FinancialServiceModule = __decorate([
    common_1.Module({
        controllers: [financial_service_controller_1.FinancialServiceController],
        providers: [financial_service_service_1.FinancialServiceService],
        imports: [association_forms_module_1.AssociationFormsModule]
    })
], FinancialServiceModule);
exports.FinancialServiceModule = FinancialServiceModule;
//# sourceMappingURL=financial-service.module.js.map