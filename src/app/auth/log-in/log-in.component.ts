import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_core/services';
import { EMAIL_MAX_LENGTH, EMAIL_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../../_core/config';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

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
      'email': [{
        value: this.route.snapshot.queryParamMap.get('email') || null,
        disabled: false
      }, [Validators.required, Validators.minLength(this.emailMinLength), Validators.maxLength(this.emailMaxLength), Validators.email]],
      'password': [{
        value: null, disabled: false
      }, [Validators.required, Validators.minLength(this.passwordMinLength), Validators.maxLength(this.passwordMaxLength)]]
    });
  }

  public onSignIn() {
    if (this.form.valid) {
      this.signIn(this.form);
    } else {
      this.form.markAsTouched();
    }
  }

  public signIn(form: FormGroup) {
    this.errorMessage = null;
    this.errorMessages = [];
    this.loading = true;
    this.authService.signIn(form.controls['email'].value, form.controls['password'].value).toPromise()
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
