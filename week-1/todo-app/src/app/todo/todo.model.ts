export enum STATUS {
  PENDING = 'Pending',
  INPROGRESS = 'In Progress',
  COMPLETED = 'Completed'
}
export class TODO {
  constructor(public text: string,
    public createdAt: string,
    public status: STATUS,
    public id: number) {
  }
}
