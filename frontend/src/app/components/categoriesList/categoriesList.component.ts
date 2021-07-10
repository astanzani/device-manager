import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTable } from '@angular/material/table';

import { CategoryService } from '../../services/category';
import { Category } from '../../types';

@Component({
  selector: 'categories-list',
  templateUrl: './categoriesList.component.html',
  styleUrls: ['./categoriesList.component.css'],
})
export class CategoriesListComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name'];

  constructor(private categoryService: CategoryService) {}

  ngAfterViewInit() {
    this.fetchDevices();
  }

  delete(category: Category) {
    console.log('delete category: ' + category.name);
  }

  private fetchDevices() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.table.renderRows();
    });
  }
}
