import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

class CustomValidators {
  static passwordContainsNumber(control: AbstractControl): ValidationErrors | null {
    const regex = /\d/;

    if (!control.value || !regex.test(control.value)) {
      return { passwordInvalid: true };
    }
    return null;
  }

  static passwordMatches(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if (!password || !passwordConfirm || password !== passwordConfirm) {
      return { passwordsNotMatching: true };
    }
    return null;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    username: [null, [Validators.required]],
    email: [null, [
      Validators.required,
      Validators.email,
      Validators.minLength(6),
    ]],
    password: [null, [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.passwordContainsNumber,
    ]],
    passwordConfirm: [null, [Validators.required]],
  }, {
    validators: CustomValidators.passwordMatches
  }
  )

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).pipe(
      map(user => this.router.navigate(['login']))
    ).subscribe();
  }

}
