import { Injectable } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { HomeComponent } from '../home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ManagerHomeComponent } from '../manager-home/manager-home.component';
import { AuthGuard } from '../guard/auth.guard';
import { SavingAccountComponent } from '../saving-account/saving-account.component';
import { TermDepositAccountComponent } from '../term-deposit-account/term-deposit-account.component';
import { KycComponent } from '../kyc/kyc.component';
import { BeneficiaryComponent } from '../beneficiary/beneficiary.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { FundTransferComponent } from '../fund-transfer/fund-transfer.component';
import { ServiceRequestComponent } from '../service-request/service-request.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';

  /*The app routing file defines the routes of the application, each route contains a path and associated component. The home route is secured by passing the AuthGuard to the canActivate property of the route.*/
const appRoutes : Routes = [
  {path:'custHome',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'managerHome',component:ManagerHomeComponent,canActivate:[AuthGuard]},
  {path:'savingAccounts',component:SavingAccountComponent,canActivate:[AuthGuard]},
  {path:'termDepAccounts',component:TermDepositAccountComponent,canActivate:[AuthGuard]},
  {path:'beneficiary',component:BeneficiaryComponent,canActivate:[AuthGuard]},
  {path:'kycform',component:KycComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'fundTransfers',component:FundTransferComponent,canActivate:[AuthGuard]},
  {path:'serviceRequest',component:ServiceRequestComponent,canActivate:[AuthGuard]},
  {path:'transaction',component:TransactionComponent,canActivate:[AuthGuard]}, 
  {path:'login-success',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent},
  {path:'manage',component:AdminHomeComponent,canActivate:[AuthGuard]},
  {path:'',component:HomeComponent,canActivate: [AuthGuard] },
  {path: '**', redirectTo: ''}
  
];
export const routing = RouterModule.forRoot(appRoutes)

