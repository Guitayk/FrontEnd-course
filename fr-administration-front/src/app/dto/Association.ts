import { Membre } from "./Membre";

export class Association {
    constructor(
      public name: string,
      public dateOfCreation: Date,
      public members: Membre[]
    ) {}
  }