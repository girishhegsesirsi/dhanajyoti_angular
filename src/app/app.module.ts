import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';
import { ManageCustComponent } from './manage-cust/manage-cust.component';
import { LoginComponent } from './login/login.component';
import { KycComponent } from './kyc/kyc.component';
import { HomeComponent } from './home/home.component'; 
import { routing } from './services/routing.service';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { AccountsComponent } from './accounts/accounts.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SavingAccountComponent } from './saving-account/saving-account.component';
import { TermDepositAccountComponent } from './term-deposit-account/term-deposit-account.component';
import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { TransactionComponent } from './transaction/transaction.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ViewDocsComponent } from './view-docs/view-docs.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ManageCustComponent,
    LoginComponent,
    KycComponent,
    HomeComponent,
    ManagerHomeComponent,
    AccountsComponent,
    BsNavbarComponent,
    SideNavComponent,
    NavBarComponent,
    SavingAccountComponent,
    TermDepositAccountComponent,
    BeneficiaryComponent,
    TransactionComponent,
    FundTransferComponent,
    ServiceRequestComponent,
    AdminHomeComponent,
    ViewDocsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
