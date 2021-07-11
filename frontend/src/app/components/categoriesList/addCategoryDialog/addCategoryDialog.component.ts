import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category';
import { Category } from 'src/app/types';

type CategoryData = Omit<Category, 'id'>;

@Component({
  selector: 'add-category-dialog',
  templateUrl: './addCategoryDialog.component.html',
  styleUrls: ['./addCategoryDialog.component.css'],
})
export class AddCategoryDialogCompoent {
  category: CategoryData = {
    name: '',
  };

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogCompoent>,
    private categoryService: CategoryService
  ) {}

  addCategory() {
    // if (this.category) {
    this.categoryService
      .addCategory(this.category)
      .subscribe((addedCategory) => {
        this.dialogRef.close(addedCategory);
      });
    // }
  }
}
