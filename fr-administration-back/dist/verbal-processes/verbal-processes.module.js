"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerbalProcessesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const associations_module_1 = require("../associations/associations.module");
const users_module_1 = require("../users/users.module");
const verbal_process_entity_1 = require("./verbal-process.entity");
const verbal_processes_controller_1 = require("./verbal-processes.controller");
const verbal_processes_service_1 = require("./verbal-processes.service");
let VerbalProcessesModule = class VerbalProcessesModule {
};
VerbalProcessesModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => users_module_1.UsersModule),
            common_1.forwardRef(() => associations_module_1.AssociationsModule),
            typeorm_1.TypeOrmModule.forFeature([verbal_process_entity_1.VerbalProcess])
        ],
        controllers: [verbal_processes_controller_1.VerbalProcessesController],
        providers: [verbal_processes_service_1.VerbalProcessesService],
        exports: [verbal_processes_service_1.VerbalProcessesService]
    })
], VerbalProcessesModule);
exports.VerbalProcessesModule = VerbalProcessesModule;
//# sourceMappingURL=verbal-processes.module.js.map