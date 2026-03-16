import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';
import { getElement } from '../../utilities/tests/utilities';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  describe('Input', () => {
    beforeEach(() => {
      component.pageCount = 5;
      component.pageIndex = 0;
      component.paginationAriaLabel = 'Test pagination navigation';
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have the correct id and aria-label', () => {
      const pagination: HTMLElement = fixture.nativeElement.querySelector('nav');

      const ariaLabel = pagination.getAttribute('aria-label');

      const id = pagination.getAttribute('id');

      expect(ariaLabel).toEqual('Pagination: Test pagination navigation');
      expect(id).toEqual('fudis-pagination-1');
    });

    it('should render correct number of page items', () => {
      const pageItems = fixture.debugElement.queryAll(By.css('.fudis-pagination-list-item'));
      expect(pageItems.length).toBe(5);
    });

    it('should have autoFocusOnPageChange set to true by default', () => {
      expect(component.autoFocusOnPageChange).toBe(true);
    });

    it('should mark the correct page as active', () => {
      component.pageIndex = 2;
      fixture.detectChanges();

      const activeItem = getElement(fixture, '.fudis-pagination-list-item--active');
      expect(activeItem.getAttribute('aria-current')).toEqual('page');
      expect(activeItem.getAttribute('aria-label')).toEqual('3, current page');
      expect(activeItem.textContent).toEqual(' 3 ');
    });

    it('should set pageIndex as first or last item if given pageIndex is out of pageCount scope', () => {
      component.pageIndex = -1;
      fixture.detectChanges();

      const activeFirstItem = getElement(fixture, '.fudis-pagination-list-item--active');
      expect(activeFirstItem.textContent).toEqual(' 1 ');

      // Fifth item should have pageIndex 4
      component.pageIndex = 5;
      fixture.detectChanges();

      const activeLastItem = getElement(fixture, '.fudis-pagination-list-item--active');
      expect(activeLastItem.textContent).toEqual(' 5 ');
    });

    it('should generate correct href id for list item links', () => {
      const pageItems = fixture.debugElement.queryAll(By.css('.fudis-pagination-list-item-link'));

      // The first link item starts with href 2, since current active page href is set to 1
      pageItems.forEach((item, index) => {
        const newIndex = index + 2;
        expect(item.attributes['href']).toEqual(`#${newIndex}`);
      });
    });

    it('should emit pageChange when a page is clicked', () => {
      jest.spyOn(component.pageChange, 'emit');
      const secondPage = fixture.debugElement.queryAll(By.css('.fudis-pagination-list-item'))[1];
      secondPage.nativeElement.click();
      fixture.detectChanges();
      expect(component.pageChange.emit).toHaveBeenCalledWith(1);
    });

    it('should not allow pageIndex greater than pageCount - 1', () => {
      jest.spyOn(component.pageChange, 'emit');
      component.goToPage(5);
      expect(component.pageChange.emit).not.toHaveBeenCalled();
    });

    it('should have the correct aria-labels and aria-live announcement after page changed', () => {
      const thirdPage = fixture.debugElement.queryAll(By.css('.fudis-pagination-list-item'))[2];
      thirdPage.nativeElement.click();
      fixture.detectChanges();

      const ariaLive = getElement(fixture, '.fudis-visually-hidden');
      expect(ariaLive.textContent).toEqual(' Opened page 3 ');

      const prevButton = getElement(fixture, '#fudis-pagination-1-button-prev');
      const nextButton = getElement(fixture, '#fudis-pagination-1-button-next');
      const currentPage = getElement(fixture, '.fudis-pagination-list-item--active');

      expect(prevButton.getAttribute('aria-label')).toEqual('Previous, page 2');
      expect(nextButton.getAttribute('aria-label')).toEqual('Next, page 4');
      expect(currentPage.getAttribute('aria-label')).toEqual('3, current page');
    });
  });

  describe('Focus management', () => {
    beforeEach(() => {
      component.id = 'test-id';
      component.pageCount = 5;
      component.pageIndex = 0;
      component.paginationAriaLabel = 'Test pagination navigation';
      fixture.detectChanges();
    });

    it('should set pagination page item as active when autoFocusOnPageChange is true', () => {
      component.goToPage(2);
      fixture.detectChanges();

      const activeItem = getElement(fixture, '.fudis-pagination-list-item--active');
      expect(document.activeElement).toBe(activeItem);
    });

    it('should not set pagination page item as active when autoFocusOnPageChange is false', () => {
      component.autoFocusOnPageChange = false;
      component.goToPage(2);
      fixture.detectChanges();

      const activeItem = getElement(fixture, '.fudis-pagination-list-item--active');
      expect(document.activeElement).not.toBe(activeItem);
    });

    it('should keep focus on next button when autoFocusOnPageChange is true', () => {
      // Using undefined for pointer event
      component.goToPage(2, undefined, true, 'next');
      fixture.detectChanges();

      const nextButton = getElement(fixture, '#test-id-button-next');
      expect(document.activeElement).toBe(nextButton);
    });

    it('should not set focus on next button when autoFocusOnPageChange is false', () => {
      component.autoFocusOnPageChange = false;
      // Using undefined for pointer event
      component.goToPage(2, undefined, true, 'next');
      fixture.detectChanges();

      const nextButton = getElement(fixture, '#test-id-button-next');
      expect(document.activeElement).not.toBe(nextButton);
    });
  });
});
