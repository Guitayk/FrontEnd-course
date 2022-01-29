import { User } from "./User";

export class Association {
    constructor(
      public name: string,
      public dateOfCreation: Date,
      public members: User[]
    ) {}
  }