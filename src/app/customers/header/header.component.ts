import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authService: AuthService) { }

  onLogOut() {
    this.authService.signOut()
  }
}
