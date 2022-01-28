import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { User } from '../dto/User';
import { ApiHelperService } from './api-helper.service';
import { UserCriteria } from './criteria/UserCriteria';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiHelper : ApiHelperService) { }

  public getUserById(userId : number) : Observable<User>{
    const endpoint = "/users/id/" + userId;
    return from(this.apiHelper.get({endpoint})).pipe(
      map(object =>{
        return <User> object;
      })
    )
  }

  public searchUsers(userCriteria? : UserCriteria) : Observable<User[]>{
    const endpoint = "/users";
    return from(this.apiHelper.get({endpoint})).pipe(
      map(object =>{
        return <User[]> object;
      }),
      map(users => {
        return users.filter(user => this.userInCriteria(user, userCriteria))
      })
    )
  }

  public deleteUser(userId : number) : Observable<void>{
    const endpoint = "/users/" + userId;
    return from(this.apiHelper.delete({endpoint})).pipe(
      map(object => {
        return object;
      })
    )
  }

  public updateUser(userId : number, user:User) : Observable<User>{
    const endpoint = "/users/" + userId;
    return from(this.apiHelper.put({endpoint, data : user})).pipe(
      map(object => {
        return <User> object;
      })
    )
  }

  private userInCriteria(user : User, criteria?: UserCriteria) : boolean{
    if(!criteria) return true;

    if(criteria.age){
      if(criteria.age != user.age) return false;
    }

    if(criteria.firstname){
      if(!user.firstname.includes(criteria.firstname)) return false;
    }

    if(criteria.lastname){
      if(!user.lastname.includes(criteria.lastname)) return false;
    }
    return true;
  }
}
