import { User } from "./User";

export class Association {
    constructor(
      public name: string,
      public creationDate: Date,
      public members: User[]
    ) {}
  }