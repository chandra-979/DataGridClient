import { UserDetails } from './../service.service';
import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../service.service'
import { Router } from '@angular/router'

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }
errorMsg=""
  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(
      s => {
       if(s.error!=="User does not exist"){
        this.router.navigateByUrl('/profile')
       }
        else
       this.errorMsg="User name password wrong"
        
      },
      err => {
        console.error(err)
        
      }
    )
  }
}