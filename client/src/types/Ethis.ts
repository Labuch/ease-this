export type Ethis = {
    id:string;
    name:string;
    description:string;
    deadline?:Date;
    periodicity:Periodicity;
    count:number;
}

export enum Periodicity {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
  }
  