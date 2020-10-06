import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-layot',
  templateUrl: './admin-layot.component.html',
  styleUrls: ['./admin-layot.component.scss']
})
export class AdminLayotComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(event: Event): void {
    event.preventDefault();

    this.router.navigate(['/admin', 'login']);
  }
}
