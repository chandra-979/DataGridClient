import { Component, OnInit } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../service.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{
  credentials: TokenPayload = {
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }
 
  failure=""
  err;
  waitingFlag;
  registerForm: FormGroup;
  constructor(private auth: AuthenticationService, private router: Router,private fb: FormBuilder) {
document.getElementById("mainbar").hidden=true
    this.registerForm = fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', Validators.required],
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    document.getElementById("upload").hidden=true;
    document.getElementById("logout").hidden=true;
      }

  register() {
    this.waitingFlag=false
    console.log(this.registerForm.value)
    this.auth.register(this.registerForm.value).subscribe(
      s => {
        if(s.error!=="User already exists")
        {
        this.router.navigateByUrl('/profile')
        this.waitingFlag=true
        }
        else
        {
        this.failure="User already exists"
        this.waitingFlag=true
        }
      },
      err => {
        this.err=err
        console.log(this.err)
        this.waitingFlag=true
      }
    )
  }
}
