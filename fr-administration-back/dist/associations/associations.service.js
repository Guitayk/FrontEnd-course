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
exports.AssociationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const association_form_entity_1 = require("../association-forms/association-form.entity");
const association_forms_service_1 = require("../association-forms/association-forms.service");
const role_entity_1 = require("../roles/role.entity");
const roles_service_1 = require("../roles/roles.service");
const user_entity_1 = require("../users/user.entity");
const users_service_1 = require("../users/users.service");
const verbal_processes_service_1 = require("../verbal-processes/verbal-processes.service");
const typeorm_2 = require("typeorm");
const association_dto_1 = require("./association.dto");
const association_entity_1 = require("./association.entity");
const member_association_1 = require("./member.association");
let AssociationsService = class AssociationsService {
    constructor(repository, usersService, associationFormsService, verbalProcessesService, rolesService) {
        this.repository = repository;
        this.usersService = usersService;
        this.associationFormsService = associationFormsService;
        this.verbalProcessesService = verbalProcessesService;
        this.rolesService = rolesService;
    }
    async create(name, idUsers, roles, associationFormId, verbalProcessId) {
        const associationForm = await this.associationFormsService.get(associationFormId);
        if (!associationForm.financialValidation || !associationForm.financialValidation) {
            return undefined;
        }
        const association = await this.repository.save(this.repository.create({ name, dateOfCreation: new Date().toString() }));
        const users = await Promise.all(idUsers.map(id => this.usersService.getById(id)));
        roles.map(role => this.rolesService.create(role, users[roles.indexOf(role)], association));
        await this.verbalProcessesService.updateAssociation(verbalProcessId, association);
        return this.repository.save(association);
    }
    async getAllDTO() {
        const associations = await this.getAll();
        return Promise.all(associations.map(association => this.buildDTO(association)));
    }
    async getAll() {
        return this.repository.find();
    }
    async getMembers(name) {
        const roles = await this.rolesService.getByAssociation(name);
        return roles.map(role => new member_association_1.Member(role.user.id, role.user.lastname, role.user.firstname, role.user.age, role.name));
    }
    async getDTO(name) {
        const association = await this.get(name);
        return this.buildDTO(association);
    }
    async buildDTO(association) {
        const members = await this.getMembers(association.name);
        return new association_dto_1.AssociationDTO(association.name, association.dateOfCreation, members);
    }
    async get(name) {
        return this.repository.findOne({ name: typeorm_2.Equal(name) });
    }
    async update(input, name) {
        const association = await this.get(name);
        if (association !== undefined) {
            association.name = input.name;
        }
        return this.repository.save(association);
    }
    async delete(name) {
        this.repository.delete({ name: name });
    }
};
AssociationsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(association_entity_1.Association)),
    __param(4, common_1.Inject(common_1.forwardRef(() => roles_service_1.RolesService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        association_forms_service_1.AssociationFormsService,
        verbal_processes_service_1.VerbalProcessesService,
        roles_service_1.RolesService])
], AssociationsService);
exports.AssociationsService = AssociationsService;
//# sourceMappingURL=associations.service.js.map