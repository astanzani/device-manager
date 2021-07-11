import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { CategoryService } from '../../services/category';
import { Category } from '../../types';
import { AddCategoryDialogCompoent } from './addCategoryDialog/addCategoryDialog.component';

@Component({
  selector: 'categories-list',
  templateUrl: './categoriesList.component.html',
  styleUrls: ['./categoriesList.component.css'],
})
export class CategoriesListComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'delete'];

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.fetchCategories();
  }

  delete(category: Category) {
    this.categories = this.categories.filter((c) => c.id !== category.id);
    this.categoryService.deleteCategory(category.id).subscribe();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddCategoryDialogCompoent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((addedCategory: Category) => {
      this.categories.push(addedCategory);
      this.table.renderRows();
    });
  }

  private fetchCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.table.renderRows();
    });
  }
}
