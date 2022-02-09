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
exports.VerbalProcess = void 0;
const association_entity_1 = require("../associations/association.entity");
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
let VerbalProcess = class VerbalProcess {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], VerbalProcess.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToMany(type => user_entity_1.User),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], VerbalProcess.prototype, "voters", void 0);
__decorate([
    typeorm_1.ManyToOne(type => association_entity_1.Association),
    typeorm_1.JoinColumn(),
    __metadata("design:type", association_entity_1.Association)
], VerbalProcess.prototype, "association", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], VerbalProcess.prototype, "content", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], VerbalProcess.prototype, "date", void 0);
VerbalProcess = __decorate([
    typeorm_1.Entity()
], VerbalProcess);
exports.VerbalProcess = VerbalProcess;
//# sourceMappingURL=verbal-process.entity.js.map