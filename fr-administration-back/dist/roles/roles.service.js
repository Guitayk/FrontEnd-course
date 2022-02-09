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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const association_entity_1 = require("../associations/association.entity");
const associations_service_1 = require("../associations/associations.service");
const user_entity_1 = require("../users/user.entity");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./role.entity");
let RolesService = class RolesService {
    constructor(repository, associationsService, usersService) {
        this.repository = repository;
        this.associationsService = associationsService;
        this.usersService = usersService;
    }
    async create(name, user, association) {
        const role = await this.repository.create({
            name,
            user,
            association
        });
        const roleSaved = await this.repository.save(role);
        return roleSaved;
    }
    async getByUser(userId) {
        return this.repository.find({
            where: [
                {
                    user: await this.usersService.getById(userId)
                }
            ]
        });
    }
    async getByRoleName(rolename) {
        return this.repository.find({
            where: [
                {
                    name: rolename
                }
            ]
        });
    }
    async getByAssociation(associationName) {
        return this.repository.find({
            where: [
                {
                    association: await this.associationsService.get(associationName)
                }
            ]
        });
    }
    async getByUserAndAssociation(userId, associationName) {
        return this.repository.findOne({
            where: [
                {
                    association: await this.associationsService.get(associationName),
                    user: await this.usersService.getById(userId)
                }
            ]
        });
    }
    async update(userId, associationName, name) {
        const roleToUpdate = await this.getByUserAndAssociation(userId, associationName);
        roleToUpdate.name = name;
        return this.repository.save(roleToUpdate);
    }
    async delete(userId, associationName) {
        return this.repository.delete({
            user: await this.usersService.getById(userId),
            association: await this.associationsService.get(associationName)
        });
    }
};
RolesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(role_entity_1.Role)),
    __param(1, common_1.Inject(common_1.forwardRef(() => associations_service_1.AssociationsService))),
    __param(2, common_1.Inject(common_1.forwardRef(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        associations_service_1.AssociationsService,
        users_service_1.UsersService])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map