import { UserDetails } from './../service.service';
import { Component, OnInit } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../service.service'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent  implements OnInit{
  credentials: TokenPayload = {
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }
errorMsg=""

elegantForm: FormGroup;

  constructor(private auth: AuthenticationService, private router: Router,private fb: FormBuilder) {
    document.getElementById("mainbar").hidden=true
    this.elegantForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    
  }
  ngOnInit(): void {


  }

  login() {
    
    this.auth.login(this.elegantForm.value).subscribe(
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