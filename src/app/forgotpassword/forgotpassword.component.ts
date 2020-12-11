import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../service.service';



@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  fgForm:FormGroup
  smsg:any;
  errmsg:any;
  waitingFlag;
  constructor(private fb:FormBuilder,private auth:AuthenticationService) 
  { 
    
    this.fgForm=fb.group({
      'email':['',[Validators.min(3),Validators.required]]
    })
  }


  ngOnInit(): void {
    
    

  }
  passwordReset()
  {
    this.waitingFlag=false
    this.auth.forgotPassword(this.fgForm.value).subscribe(result=>{
      this.smsg=result
            console.log(result)
            this.waitingFlag=true
    },
    error=>
    {
      this.errmsg=error
      console.log(this.errmsg)
      this.waitingFlag=true

    })
  }


}
