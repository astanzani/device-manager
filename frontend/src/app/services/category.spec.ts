import { defer } from 'rxjs';

import { Category } from 'src/app/types';
import { CategoryService } from './category';

/** Create async observable that emits-once and completes
 *  after a JS engine turn */
function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('Category service', () => {
  let categoryService: CategoryService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    categoryService = new CategoryService(httpClientSpy as any);
  });

  it('fetchs categories', (done) => {
    const expectedCategories: Category[] = [
      { id: 0, name: 'Category 1' },
      { id: 1, name: 'Category 2' },
    ];

    httpClientSpy.get.and.returnValue(asyncData(expectedCategories));

    categoryService.getCategories().subscribe((categories) => {
      expect(categories).toEqual(expectedCategories);
      done();
    }, done.fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});
