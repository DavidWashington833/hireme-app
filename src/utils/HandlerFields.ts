import { FormGroup } from '@angular/forms';

export class HandlerFields {
  public static markAsTouchedFields(formGroup: FormGroup) {
    const fields = new Array<string>();
    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        fields.push(key);
      }
    }
    fields.forEach((field) => formGroup.controls[field].markAsTouched());
  }
}
