import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormeditPage } from './formedit.page';

describe('FormeditPage', () => {
  let component: FormeditPage;
  let fixture: ComponentFixture<FormeditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormeditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
