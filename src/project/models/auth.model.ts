import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
}
export interface IRegister {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPwd: string;
}
