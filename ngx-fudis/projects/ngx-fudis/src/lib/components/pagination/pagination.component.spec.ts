import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { CommonModule } from '@angular/common';
import { NgxFudisModule } from '../../ngx-fudis.module';
import { By } from '@angular/platform-browser';
import { getElement } from '../../utilities/tests/utilities';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, NgxFudisModule, PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.pageCount = 5;
    component.pageIndex = 0;
    component.pageHref = (i) => '/products?page=' + (i + 1);
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

  it('should mark the correct page as active', () => {
    component.pageIndex = 2;
    fixture.detectChanges();

    const activeItem = getElement(fixture, '.fudis-pagination-list-item--active');
    expect(activeItem.getAttribute('aria-current')).toEqual('page');
    expect(activeItem.getAttribute('aria-label')).toEqual('3, current page');
    expect(activeItem.textContent).toEqual(' 3 ');
  });

  it('should generate correct href id for list item links', () => {
    const pageItems = fixture.debugElement.queryAll(By.css('.fudis-pagination-list-item-link'));

    pageItems.forEach((item, index) => {
      const newIndex = index + 2;
      expect(item.attributes['href']).toEqual(`/products?page=${newIndex}`);
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
