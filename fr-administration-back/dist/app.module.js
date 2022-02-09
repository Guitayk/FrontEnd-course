"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const associations_module_1 = require("./associations/associations.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./users/user.entity");
const association_entity_1 = require("./associations/association.entity");
const roles_module_1 = require("./roles/roles.module");
const association_forms_module_1 = require("./association-forms/association-forms.module");
const verbal_processes_module_1 = require("./verbal-processes/verbal-processes.module");
const role_entity_1 = require("./roles/role.entity");
const association_form_entity_1 = require("./association-forms/association-form.entity");
const verbal_process_entity_1 = require("./verbal-processes/verbal-process.entity");
const financial_service_module_1 = require("./financial-service/financial-service.module");
const legal_service_module_1 = require("./legal-service/legal-service.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db/mydatabase.db',
                entities: [association_form_entity_1.AssociationForm, user_entity_1.User, association_entity_1.Association, role_entity_1.Role, verbal_process_entity_1.VerbalProcess],
                synchronize: true,
            }),
            associations_module_1.AssociationsModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            association_forms_module_1.AssociationFormsModule,
            verbal_processes_module_1.VerbalProcessesModule,
            financial_service_module_1.FinancialServiceModule,
            legal_service_module_1.LegalServiceModule,
            auth_module_1.AuthModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map