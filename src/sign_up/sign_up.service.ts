import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './entities/sign_up.entity';
@Injectable()
export class SignUpService {
  constructor(@InjectConnection() private connection: Connection) {}

  async check_old_or_new(userEntity: User) {
    const [check_in_users] = await this.connection.query(
      'select id,username from users where users.username = ?',[userEntity.username]
    )
    if(check_in_users){
      
    return [{
      "userType":"old",
      "user_id":check_in_users.id
    }];
  } else {
    return [{
      "userType":"new"
    }];
  }
}

async verifyOld(userEntity: User){
  const [check_password] = await this.connection.query(
    'select id,user_id from users where users.username = ? and users.password = ?',[userEntity.username,userEntity.password]
  )
  if(check_password){
    console.log(check_password,"------");
    
    return [{
      "messege":"password verified successfully",
      "patient_id":check_password.user_id,
      "user_details":await this.connection.query('select username,password from users where id = ?',[check_password.id])

    }]
  } else {
    return [{
      "messege":"password verified failed enter correct password",
    }]
  }
  
}

async createnew(userEntity: User){
  try {
    const user = await this.connection.query(
      `insert into users (username,password,role) values (?, ?, ?)`,[userEntity.username,userEntity.password,'patient']
    )
    return [{
      "messege":"data saved successfully",
      "user_details":await this.connection.query('select username,password from users where id = ?',[user.insertId])
    }]
  } catch (error) {
    return error
  }
 
}

 async findsettings(id: number) {
    const userSettings = await this.connection.query(
      `select users.notification_enabled,languages.language,users.has_mpin from 
      users join languages on languages.id = users.lang_id
        where users.id = ?`,[id]
    )
    return userSettings;
  }

async  updatePassword(id: number, userEntity: User) {
    const result = await this.connection.query('update users set users.password = ? where id = ?',
    [userEntity.password,id])
    return [{
    "status":"success",
    "message":"password updated successfully"
}]
  }

  async  updateStettings(id: number, userEntity: User) {
    const result = await this.connection.query('update users set users.has_mpin = ?,users.notification_enabled = ?,users.lang_id = ? where id = ?',
    [userEntity.has_mpin,userEntity.notification_enabled,userEntity.lang_id,id])
    return [{
    "status":"success",
    "message":"password updated successfully"
}]
  }

async  remove(id: number) {
    const result = await this.connection.query('DELETE FROM users WHERE id = ?', [id]);
    return [{
      "status":"success",
      "message":" id: "+ id+" deleted successfully"
    }
    ]; 
   } 
   }

