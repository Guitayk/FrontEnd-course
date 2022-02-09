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
exports.AssociationFormsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const association_form_entity_1 = require("./association-form.entity");
let AssociationFormsService = class AssociationFormsService {
    constructor(repository) {
        this.repository = repository;
    }
    async create() {
        return this.repository.save(this.repository.create());
    }
    async getAll() {
        return this.repository.find();
    }
    async get(idToFind) {
        return this.repository.findOne({ id: typeorm_2.Equal(idToFind) });
    }
    async update(idToFind, financialValidation, legalValidation) {
        const associationForm = await this.get(idToFind);
        associationForm.financialValidation = financialValidation;
        associationForm.legalValidation = legalValidation;
        return this.repository.save(associationForm);
    }
    async updateFinancialValidation(idToFind, financialValidation) {
        const associationForm = await this.get(idToFind);
        associationForm.financialValidation = financialValidation;
        return this.repository.save(associationForm);
    }
    async updateLegalValidation(idToFind, legalValidation) {
        const associationForm = await this.get(idToFind);
        associationForm.legalValidation = legalValidation;
        return this.repository.save(associationForm);
    }
    async delete(idToDelete) {
        return this.repository.delete({ id: typeorm_2.Equal(idToDelete) });
    }
};
AssociationFormsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(association_form_entity_1.AssociationForm)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AssociationFormsService);
exports.AssociationFormsService = AssociationFormsService;
//# sourceMappingURL=association-forms.service.js.map