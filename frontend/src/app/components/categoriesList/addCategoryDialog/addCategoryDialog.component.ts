import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Category } from 'src/app/types';

type CategoryData = Omit<Category, 'id'>;

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'add-category-dialog',
  templateUrl: './addCategoryDialog.component.html',
  styleUrls: ['./addCategoryDialog.component.css'],
})
export class AddCategoryDialogCompoent {
  category: CategoryData = {
    name: '',
  };
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(16),
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogCompoent>,
    private categoryService: CategoryService
  ) {}

  addCategory() {
    this.categoryService
      .addCategory(this.category)
      .subscribe((addedCategory) => {
        this.dialogRef.close(addedCategory);
      });
  }
}
