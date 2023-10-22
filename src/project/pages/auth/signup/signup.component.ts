import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CustomValidators, IRegister } from '@project/models/auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  validationMapper = {
    minlength: 'This field must be at least 8 characters',
    hasNumber: 'This field must contain at least one Number.',
    hasCapitalCase: 'This field must contain at least one UpperCase Letter.',
    hasSmallCase: 'This field must contain at least one LowerCase Letter.',
    hasSpecialCharacters:
      'This field must contain at least one Special Character.',
    noSpaceAllowed: 'Space not allowed in password field ',
  };
  pwdErrors: string[] = [];
  constructor() {
    this.signupForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]{5,}$'),
          // this.usernameLengthValidation,
        ]),
        firstName: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]{5,}$'),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]{5,}$'),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          // Validators.pattern(
          //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@])\S{8,12}$/
          // ),
          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          CustomValidators.patternValidator(
            /[`!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~]/,
            { hasSpecialCharacters: true }
          ),
          Validators.minLength(8),
        ]),
        confirmPwd: new FormControl('', [Validators.required]),
      },
      {
        validators: this.mustMatch('password', 'confirmPwd') as any,
      }
    );
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  ngOnInit(): void {}

  signup(data: IRegister) {}

  pwdValidation() {
    let value = '';
    this.pwdErrors = [];
    if (this.signupForm.get('password')?.errors) {
      Object.keys(
        this.signupForm.get('password')?.errors as ValidationErrors
      ).forEach((key) => {
        if (key !== 'required') {
          value =
            this.validationMapper[key as keyof typeof this.validationMapper];
          this.pwdErrors.push(value);
        } else {
          this.pwdErrors = [];
          this.pwdErrors.push('This filed is required');
        }
      });
    }
  }

  usernameLengthValidation(control: AbstractControl): ValidationErrors | null {
    if (control.value != null && control.value.length < 5) {
      return { minLength: true };
    }
    return null;
  }

  required(control: AbstractControl): ValidationErrors | null {
    return !control.value ? { required: true } : null;
  }
}
