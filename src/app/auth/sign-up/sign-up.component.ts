import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_core/services';
import {
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH
} from '../../_core/config';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public nameMinLength: number = NAME_MIN_LENGTH;
  public nameMaxLength: number = NAME_MAX_LENGTH;

  public emailMinLength: number = EMAIL_MIN_LENGTH;
  public emailMaxLength: number = EMAIL_MAX_LENGTH;

  public passwordMinLength: number = PASSWORD_MIN_LENGTH;
  public passwordMaxLength: number = PASSWORD_MAX_LENGTH;

  public form: FormGroup;

  public loading: boolean = false;

  public errorMessage;
  public errorMessages: string[] = [];

  private returnUrl: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.buildForm();
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  }

  public buildForm() {
    this.form = this.formBuilder.group({
      'name': [{
        value: null,
        disabled: false
      }, [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      'email': [{
        value: null,
        disabled: false
      }, [Validators.required, Validators.minLength(this.emailMinLength), Validators.maxLength(this.emailMaxLength), Validators.email]],
      'password': [{
        value: null, disabled: false
      }, [Validators.required, Validators.minLength(this.passwordMinLength), Validators.maxLength(this.passwordMaxLength)]]
    });
  }

  public onSignUp() {
    if (this.form.valid) {
      this.signUp(this.form);
    } else {
      this.form.markAsTouched();
    }
  }

  public signUp(form: FormGroup) {
    this.errorMessage = null;
    this.errorMessages = [];
    this.loading = true;
    this.authService.signUp(form.controls['name'].value, form.controls['email'].value, form.controls['password'].value).toPromise()
      .then(
        (res) => {
          if (this.returnUrl) {
            this.router.navigate([this.returnUrl]);
          }
        },
        (err) => {
          try {
            this.errorMessages.push(err.code);
          } catch (e) {
            console.error(e);
          } finally {
            form.setErrors({'somethingWentWrong': true});
          }
          this.loading = false;
        }
      );
  }

}
