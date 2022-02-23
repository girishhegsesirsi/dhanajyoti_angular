import { Address } from './address.model';
import { Customer } from './customer.model';
import { SavingAccount } from './savingAccount.model';
import { Beneficiary } from './beneficiary.model';


export class FundTransfer{ 
    ben: Beneficiary;
    fromAccount:SavingAccount;
    amount:number;
}