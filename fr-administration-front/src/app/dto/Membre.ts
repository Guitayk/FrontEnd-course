import { Association } from "./Association";
import { User } from "./User";

export class Membre{
    constructor(
    public user : User,
    public association : Association,
    public role : String){}
}