
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  user:UserDetails;
  msg:boolean;

  constructor(private auth:AuthenticationService,private fb: FormBuilder,private router:Router) { 

    this.editForm= fb.group({
      first_name: ['NA', [Validators.required]],
      last_name: ['NA', Validators.required],
    });
  }

  ngOnInit(): void {
document.getElementById("mainbar").hidden=true;
    
  }

  update()
  {
    
    this.auth.update(this.editForm.value).subscribe(result=>{
      console.log(result)
      this.msg=true
      this.router.navigateByUrl('/profile')
      
    },
    error=>
    {
      this.msg=false;
      this.router.navigateByUrl('/profile')
    })
  }

}
