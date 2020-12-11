import { AuthenticationService } from './../service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {


  constructor(private auth:AuthenticationService,private router: Router) 
  { 
      
  }

  ngOnInit(): void {

    
    const timer = JSON.parse(localStorage.getItem('timer'));
    if (timer && (Date.now() > timer)) {
      this.auth.logout();
      this.router.navigateByUrl('/login')
      
    }

    this.auth.logout();
    
    this.router.navigateByUrl('/login')
    
  }
  


}
