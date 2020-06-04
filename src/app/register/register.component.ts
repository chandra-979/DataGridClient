import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../service.service'
import { Router } from '@angular/router'

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: TokenPayload = {
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }
 
  failure=""
  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(
      s => {
        if(s.error!=="User already exists")
        this.router.navigateByUrl('/profile')
        else
        this.failure="User already exists"
      },
      err => {
        console.error(err)
      }
    )
  }
}
