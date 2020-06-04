import { Component } from '@angular/core'
import { AuthenticationService } from './service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public auth: AuthenticationService) {}
}