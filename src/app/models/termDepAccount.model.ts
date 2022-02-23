

import { Customer } from './customer.model';

export class TermDepAccount{

    user: Customer;
    acct_type:string;
    int_rate: number;
    acct_banance: number;
    account_created_date: Date;
    account_updated_date:Date;
    acct_status:string;
    deposit_tenure:string;
    maturity_amt:number;
    acct_id:number;
}