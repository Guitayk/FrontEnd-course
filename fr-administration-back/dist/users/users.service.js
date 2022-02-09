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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("../roles/role.entity");
const roles_service_1 = require("../roles/roles.service");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(repository, rolesService) {
        this.repository = repository;
        this.rolesService = rolesService;
    }
    async create(firstname, lastname, age) {
        const password = 'password';
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return this.repository.save(this.repository.create({
            password: hash,
            firstname,
            lastname,
            age
        }));
    }
    async getUsersWithRole(role) {
        return (await this.rolesService.getByRoleName(role)).map(role => role.user);
    }
    async getRolesById(idToFind) {
        return this.rolesService.getByUser(idToFind);
    }
    async getAll() {
        return this.repository.find();
    }
    async getById(idToFind) {
        return this.repository.findOne({ id: typeorm_2.Equal(idToFind) });
    }
    async updateById(input, idToFind) {
        const user = await this.getById(idToFind);
        if (user !== undefined) {
            user.firstname = input.firstname;
            user.lastname = input.lastname;
            user.age = input.age;
        }
        return this.repository.save(user);
    }
    async deleteById(id) {
        this.repository.delete(await this.getById(id));
    }
    async getAgeAverageById(ids) {
        return (await this.repository.find({ id: typeorm_2.In(ids) }))
            .reduce(function (acc, user) { return acc + user.age; }, 0) / ids.length;
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(1, common_1.Inject(common_1.forwardRef(() => roles_service_1.RolesService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        roles_service_1.RolesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map