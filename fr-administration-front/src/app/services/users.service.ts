import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { Role } from '../dto/Role';
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

  public getUserByUsername(userName : string) : Observable<User>{
    const endpoint = "/users";
    return this.searchUsers().pipe(
      map(users=>{
        const result = users.filter(user=> user.firstname.charAt(0) === userName.substring(0,1) && user.lastname === userName.substring(1)).pop()
        if(!result) throw new Error("Username not found")
        return result;
    }))
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

  public getUserRoles(userId : number) : Observable<Role>{
    const endpoint = "/users/" + userId;
    return from(this.apiHelper.get({endpoint})).pipe(
      map(res => res.map((_role: any) => new Role(res.association.associationName, res.name)))
    ) 
  }

  public createUser(user : User) : Observable<User>{
    const endpoint = "/users";
    return from(this.apiHelper.post({endpoint, data: user})).pipe(
      map(object => {
        return <User> object;
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

  public deleteUser(userId : number) : Observable<void>{
    const endpoint = "/users/" + userId;
    return from(this.apiHelper.delete({endpoint}))
  }

  private userInCriteria(user : User, criteria?: UserCriteria) : boolean{
    if(!criteria) return true;

    if(criteria.age && criteria.age != user.age) return false;

    if(criteria.firstname && !user.firstname.toLowerCase().includes(criteria.firstname.toLowerCase())) return false;

    if(criteria.lastname && !user.lastname.toLowerCase().includes(criteria.lastname.toLowerCase())) return false;

    return true;
  }
}
