import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-layot',
  templateUrl: './admin-layot.component.html',
  styleUrls: ['./admin-layot.component.scss']
})
export class AdminLayotComponent implements OnInit {

  constructor(private router: Router,
              public auth: AuthService) {
  }

  ngOnInit(): void {
  }

  logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'login']);
  }
}
