import { Association } from "./Association";
import { User } from "./User";

export class VerbalProcess{
    constructor(
        id : number,
        voters : User[],
        content : String,
        date : String,
        association ?: Association
    ){}
}