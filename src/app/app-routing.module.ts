import { EditComponent } from './edit/edit.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ProfileComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardService } from './auth-guard.service'


const routes: Routes = [
  
  {path:'login', component:LoginComponent},
 
  {path:'register', component:RegisterComponent},

  {path:'profile',component:ProfileComponent,canActivate: [AuthGuardService]},

  {path:'upload',component:UploadComponent,canActivate: [AuthGuardService]},

  {path:'logout',component:LogoutComponent,canActivate: [AuthGuardService]},

  {path:'update',component:EditComponent,canActivate: [AuthGuardService]},

  {
    path:'forgotpassword',
    component:ForgotpasswordComponent,
  },
  {
    path:'reset/:token',
    component:ResetpasswordComponent
  
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
