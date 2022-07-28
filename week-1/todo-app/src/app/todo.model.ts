export enum STATUS {
  PENDING = 'PENDING',
  INPROGRESS = 'INPROGRESS',
  COMPLETED = 'COMPLETED'
}
export class TODO {
  constructor(public text: string,
    public createdAt: string,
    public status: STATUS,
    public id: number) {
  }
}
