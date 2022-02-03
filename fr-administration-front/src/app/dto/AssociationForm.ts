export class AssociationForm {
    constructor(
      public id: number,
      public validationLegalService: boolean,
      public validationFinancialService: boolean
    ) {}
}