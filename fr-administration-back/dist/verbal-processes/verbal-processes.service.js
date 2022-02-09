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
exports.VerbalProcessesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const association_entity_1 = require("../associations/association.entity");
const associations_service_1 = require("../associations/associations.service");
const user_entity_1 = require("../users/user.entity");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const verbal_process_entity_1 = require("./verbal-process.entity");
let VerbalProcessesService = class VerbalProcessesService {
    constructor(repository, associationsService, usersService) {
        this.repository = repository;
        this.associationsService = associationsService;
        this.usersService = usersService;
    }
    async create(idVoters, content, date) {
        const voters = await Promise.all(idVoters.map(id => this.usersService.getById(id)));
        return this.repository.save(this.repository.create({
            voters,
            content,
            date
        }));
    }
    async getByAssociationName(associationName, sort, order) {
        if(sort != null && order != null){
            return this.repository.find({
                where: {
                    association: await this.associationsService.get(associationName)
                },
                order: {
                    [sort]: [order]
                },
            });
        }else{
            return this.repository.find({
                where: {
                    association: await this.associationsService.get(associationName)
                }
            });
        }
        
    }
    async getAll() {
        return this.repository.find();
    }
    async get(verbalProcesssId) {
        return this.repository.findOne({ id: typeorm_2.Equal(verbalProcesssId) });
    }
    async update(verbalProcesssId, idVoters, associationName, content, date) {
        const verbalProcessToUpdate = await this.get(verbalProcesssId);
        verbalProcessToUpdate.voters = await Promise.all(idVoters.map(this.usersService.getById));
        verbalProcessToUpdate.association = await this.associationsService.get(associationName);
        verbalProcessToUpdate.content = content;
        verbalProcessToUpdate.date = date;
        return this.repository.save(verbalProcessToUpdate);
    }
    async updateAssociation(verbalProcesssId, association) {
        const verbalProcessToUpdate = await this.get(verbalProcesssId);
        verbalProcessToUpdate.association = association;
        return this.repository.save(verbalProcessToUpdate);
    }
    async delete(verbalProcesssId) {
        return this.repository.delete({ id: typeorm_2.Equal(verbalProcesssId) });
    }
};
VerbalProcessesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(verbal_process_entity_1.VerbalProcess)),
    __param(1, common_1.Inject(common_1.forwardRef(() => associations_service_1.AssociationsService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        associations_service_1.AssociationsService,
        users_service_1.UsersService])
], VerbalProcessesService);
exports.VerbalProcessesService = VerbalProcessesService;
//# sourceMappingURL=verbal-processes.service.js.map