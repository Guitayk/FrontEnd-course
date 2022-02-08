import { Injectable } from '@angular/core';
import { concatMap, forkJoin, from, map, merge, mergeMap, Observable, switchMap, tap } from 'rxjs';
import { Association } from '../dto/Association';
import { AssociationForm } from '../dto/AssociationForm';
import { Membre } from '../dto/Membre';
import { User } from '../dto/User';
import { VerbalProcess } from '../dto/VerbalProcess';
import { ApiHelperService } from './api-helper.service';
import { AssociationCriteria } from './criteria/AssociationCriteria';
import { VerbalProcessService } from './verbal-process.service';

@Injectable({
  providedIn: 'root'
})
export class AssociationsService {

  constructor(private apiHelper : ApiHelperService, private verbalProcessService : VerbalProcessService) { }

  public getAssociationByName(associationName : string) : Observable<Association>{
    const endpoint = "/associations/" + associationName;
    return from(this.apiHelper.get({endpoint})).pipe(
      map(object =>{
        return <Association> object;
      })
    )
  }

  public searchAssociations(associationCriteria? : AssociationCriteria) : Observable<Association[]>{
    const endpoint = "/associations";
    return from(this.apiHelper.get({endpoint})).pipe(
      map(object =>{
        return <Association[]> object;
      }),
      map(associations => {
        return associations.filter(asso => this.associationInCriteria(asso, associationCriteria))
      })
    )
  }

  public createAssociation(name : String, idUsers : number[], roles : String[], associationFormId : number, verbalProcessId : number){
    const endpoint = "/associations";
    return from(this.apiHelper.post({endpoint, data : {name: name, idUsers: idUsers, roles: roles, associationFormId: associationFormId, verbalProcessId: verbalProcessId}})).pipe(
      map(object => {
        return <Association> object;
      })
    )
  }

  public createAssociationForm(): Observable<AssociationForm>{
    const endpoint = "/association-forms";
    return from(this.apiHelper.post({endpoint})).pipe(
      map(object => {
        return <AssociationForm> object;
      })
    )
  }

  public validationLegalService(form : AssociationForm):Observable<AssociationForm>{
    const endpoint = "/legal-service/validate";
    return from(this.apiHelper.put({endpoint, data : {associationFormId : form.id}})).pipe(
      map(object => <AssociationForm> object)
    )
  }

  public validationFinancialService(form : AssociationForm):Observable<AssociationForm>{
    const endpoint = "/financial-service/validate";
    return from(this.apiHelper.put({endpoint, data : {associationFormId : form.id}})).pipe(
      map(object => <AssociationForm> object)
    )
  }

  public updateAssociation(associationName : string, association : Association) : Observable<Association>{
    const endpoint = "/associations/" + associationName;
    return from(this.apiHelper.put({endpoint, data : association})).pipe(
      map(object => {
        return <Association> object;
      })
    )
  }

  public deleteAssociation(associationName : string) : Observable<void>{
    
    var observables : Observable<void>[] = []
    return this.verbalProcessService.deleteVerbalProcessesOfAssociation(associationName)
    .pipe(
      switchMap(() => this.getAssociationMembers(associationName)),
      map(members => {
        console.log(members)
        const membersArray = <Membre[]> members
        membersArray.forEach(member => {
          observables.push(this.deleteMember(associationName, member.id))
        })
        return observables
      }),
      switchMap(x => forkJoin(x)),
      switchMap(()=>{
        const endpoint = "/associations/" + associationName;
        return from(this.apiHelper.delete({endpoint}))
     })
    )
    
  }

  public addMember(associationName : String, userId : Number, name : String) : Observable<Membre>{
    const endpoint = "/roles"
    return from(this.apiHelper.post({endpoint, data:{associationName, userId, name}})).pipe(map(x => <Membre> x))
  }

  public getAssociationMembers(associationName : string) : Observable<Membre[]>{
    const endpoint = "/associations/" + associationName + "/members";
    return from(this.apiHelper.get({endpoint})).pipe(
      map(object=>{
        return <Membre[]> object;
      })
    )
  }

  public deleteMember(associationName : String, userId : number) : Observable<void>{
    const endpoint = "/roles";
    return from(this.apiHelper.delete({endpoint, queryParams:{associationName : associationName, userId : userId}}))
  }

  public updateRole(associationName : String, userId : number, name : String) : Observable<Membre>{
    const endpoint = "/roles";
    return from(this.apiHelper.put({endpoint, data:{associationName : associationName, userId : userId, name : name}}))
    .pipe(map(object =>{
      return new Membre(object.user.id, object.user.lastname, object.user.firstname, object.user.age, object.name)
    }))
  }

  private associationInCriteria(association : Association, criteria?: AssociationCriteria) : boolean{
    if(!criteria) return true;

    if(criteria.name){
      if(!association.name.includes(criteria.name)) return false;
    }

    if(criteria.creationDate){
      if(criteria.creationDate != association.dateOfCreation) return false;
    }

    return true;
  }
}
