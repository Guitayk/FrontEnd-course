import { Association } from "./Association";
import { User } from "./User";

export class VerbalProcess{
    constructor(
        public id : number,
        public voters : User[],
        public content : String,
        public date : String,
        public association ?: Association
    ){}
}