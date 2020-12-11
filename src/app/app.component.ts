import { Component, OnInit } from '@angular/core'
import { AuthenticationService } from './service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent  implements OnInit{

  constructor(private auth: AuthenticationService) {
  

  }
  ngOnInit(): void {
document.getElementById("upload").hidden=true;
document.getElementById("logout").hidden=true;
    
  }

  
  
}