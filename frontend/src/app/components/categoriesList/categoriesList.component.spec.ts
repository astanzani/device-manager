import { defer } from 'rxjs';
import { Category } from 'src/app/types';

import { CategoriesListComponent } from './categoriesList.component';

/** Create async observable that emits-once and completes
 *  after a JS engine turn */
function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('Categories List component', () => {
  let categoriesListComponent: CategoriesListComponent;
  let categoryServiceSpy: { getCategories: jasmine.Spy };
  let dialogSpy: { open: jasmine.Spy };
  let table: { renderRows: jasmine.Spy };

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', [
      'getCategories',
    ]);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    table = jasmine.createSpyObj('MatTable', ['renderRows']);

    categoriesListComponent = new CategoriesListComponent(
      categoryServiceSpy as any,
      dialogSpy as any
    );
    categoriesListComponent.table = table as any;
  });

  it('get categories on init', () => {
    const categories: Category[] = [{ id: 1, name: 'Category 1' }];

    categoryServiceSpy.getCategories.and.returnValue(asyncData(categories));

    categoriesListComponent.ngAfterViewInit();
    expect(categoryServiceSpy.getCategories).toHaveBeenCalled();
  });
});
