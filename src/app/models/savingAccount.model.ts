import { Customer } from './customer.model';

export class SavingAccount{
    acct_id:number;
    user: Customer;
    acct_type:string;
    int_rate: number;
    acct_banance: number;
    account_created_date: Date;
    account_updated_date:Date;
    acct_status:string;
}