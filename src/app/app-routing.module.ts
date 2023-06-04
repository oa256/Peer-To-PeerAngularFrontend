import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { TransferComponent } from './components/transfer/transfer/transfer.component';
import { FundaccountComponent } from './components/fundaccount/fundaccount/fundaccount.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'profile',component:ProfileComponent},
  {path:'transfer',component:TransferComponent},
  {path:'fundaccount',component:FundaccountComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

 
}