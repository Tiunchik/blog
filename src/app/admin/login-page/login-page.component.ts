import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  submitted = false;
  message: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public auth: AuthService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.loginAgain) {
        this.message = 'Please, inter yor email and password again';
      } else if (params.authFailed) {
        this.message = 'Session is over, please login again';
      }
    });
    this.form = new FormGroup({
        email: new FormControl(null, [
          Validators.required,
          Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6)
        ])
      }
    );

  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, er => {
      this.submitted = false;
    });
  }
}
