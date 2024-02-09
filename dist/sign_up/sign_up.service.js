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
exports.SignUpService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let SignUpService = class SignUpService {
    constructor(connection) {
        this.connection = connection;
    }
    async check_old_or_new(userEntity) {
        const [check_in_users] = await this.connection.query('select id,username from users where users.username = ?', [userEntity.username]);
        if (check_in_users) {
            return [{
                    "userType": "old",
                    "user_id": check_in_users.id
                }];
        }
        else {
            return [{
                    "userType": "new"
                }];
        }
    }
    async verifyOld(userEntity) {
        const [check_password] = await this.connection.query('select id,user_id from users where users.username = ? and users.password = ?', [userEntity.username, userEntity.password]);
        if (check_password) {
            console.log(check_password, "------");
            return [{
                    "messege": "password verified successfully",
                    "patient_id": check_password.user_id,
                    "user_details": await this.connection.query('select username,password from users where id = ?', [check_password.id])
                }];
        }
        else {
            return [{
                    "messege": "password verified failed enter correct password",
                }];
        }
    }
    async createnew(userEntity) {
        try {
            const user = await this.connection.query(`insert into users (username,password,role) values (?, ?, ?)`, [userEntity.username, userEntity.password, 'patient']);
            return [{
                    "messege": "data saved successfully",
                    "user_details": await this.connection.query('select username,password from users where id = ?', [user.insertId])
                }];
        }
        catch (error) {
            return error;
        }
    }
    async findsettings(id) {
        const userSettings = await this.connection.query(`select users.notification_enabled,languages.language,users.has_mpin from 
      users join languages on languages.id = users.lang_id
        where users.id = ?`, [id]);
        return userSettings;
    }
    async updatePassword(id, userEntity) {
        const result = await this.connection.query('update users set users.password = ? where id = ?', [userEntity.password, id]);
        return [{
                "status": "success",
                "message": "password updated successfully"
            }];
    }
    async updateStettings(id, userEntity) {
        const result = await this.connection.query('update users set users.has_mpin = ?,users.notification_enabled = ?,users.lang_id = ? where id = ?', [userEntity.has_mpin, userEntity.notification_enabled, userEntity.lang_id, id]);
        return [{
                "status": "success",
                "message": "password updated successfully"
            }];
    }
    async remove(id) {
        const result = await this.connection.query('DELETE FROM users WHERE id = ?', [id]);
        return [{
                "status": "success",
                "message": " id: " + id + " deleted successfully"
            }
        ];
    }
};
exports.SignUpService = SignUpService;
exports.SignUpService = SignUpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], SignUpService);
//# sourceMappingURL=sign_up.service.js.map