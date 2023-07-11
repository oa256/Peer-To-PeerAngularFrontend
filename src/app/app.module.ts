import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { authGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { TransferComponent } from './components/transfer/transfer/transfer.component';
import { FundaccountComponent } from './components/fundaccount/fundaccount/fundaccount.component';
import { DataTablesModule} from "angular-datatables";
import { TransactionTableComponent } from './components/transactionTable/transaction-table/transaction-table.component';
import { ResetPasswordComponent } from './components/resetPassword/reset-password/reset-password.component'
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {NgIf, JsonPipe} from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import { NewdialogComponent } from './components/newdialog/newdialog.component';
import { AccountsComponent } from './components/Accounts/accounts/accounts.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ProfileComponent,
    TransferComponent,
    FundaccountComponent,
    TransactionTableComponent,
    ResetPasswordComponent,
    NewdialogComponent,
    AccountsComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatInputModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatButtonToggleModule,
    NgIf,
    JsonPipe,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
