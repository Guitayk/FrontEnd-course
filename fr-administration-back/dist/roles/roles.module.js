"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const role_entity_1 = require("./role.entity");
const roles_service_1 = require("./roles.service");
const roles_controller_1 = require("./roles.controller");
const associations_module_1 = require("../associations/associations.module");
let RolesModule = class RolesModule {
};
RolesModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => users_module_1.UsersModule),
            associations_module_1.AssociationsModule,
            typeorm_1.TypeOrmModule.forFeature([role_entity_1.Role])
        ],
        controllers: [roles_controller_1.RolesController],
        providers: [roles_service_1.RolesService],
        exports: [roles_service_1.RolesService]
    })
], RolesModule);
exports.RolesModule = RolesModule;
//# sourceMappingURL=roles.module.js.map