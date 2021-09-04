import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.minLength(6),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).pipe(
      map(token => {
        this.router.navigate(['admin']);
      })
    ).subscribe();
  }

}
