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
exports.VerbalProcessesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const verbal_processes_service_1 = require("./verbal-processes.service");
let VerbalProcessesController = class VerbalProcessesController {
    constructor(service) {
        this.service = service;
    }
    async create(input) {
        return this.service.create(input.idVoters, input.content, input.date);
    }
    async getByAssociation(parameters, query) {
        return this.service.getByAssociationName(parameters.associationName, query.sort, query.order);
    }
    async getAll() {
        return this.service.getAll();
    }
    async get(parameters) {
        return this.service.get(parameters.id);
    }
    async update(parameters, input) {
        return this.service.update(parameters.id, input.idVoters, input.associationName, input.content, input.date);
    }
    async delete(parameters) {
        return this.service.delete(parameters.id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VerbalProcessesController.prototype, "create", null);
__decorate([
    common_1.Get(':associationName'),
    __param(0, common_1.Param()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VerbalProcessesController.prototype, "getByAssociation", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VerbalProcessesController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VerbalProcessesController.prototype, "get", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VerbalProcessesController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VerbalProcessesController.prototype, "delete", null);
VerbalProcessesController = __decorate([
    swagger_1.ApiTags('verbal-processes'),
    common_1.Controller('verbal-processes'),
    __metadata("design:paramtypes", [verbal_processes_service_1.VerbalProcessesService])
], VerbalProcessesController);
exports.VerbalProcessesController = VerbalProcessesController;
//# sourceMappingURL=verbal-processes.controller.js.map