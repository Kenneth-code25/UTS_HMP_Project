import { TestBed } from '@angular/core/testing';
import { customPageTransition } from './page-animations';

describe('customPageTransition', () => {
  let enteringEl: HTMLElement;
  let leavingEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    enteringEl = document.createElement('ion-page');
    leavingEl = document.createElement('ion-page');
  });

  it('should create a forward page transition', () => {
    const animation = customPageTransition(document.createElement('div'), {
      direction: 'forward',
      enteringEl,
      leavingEl,
    });

    expect(animation).toBeTruthy();
  });

  it('should create a back page transition', () => {
    const animation = customPageTransition(document.createElement('div'), {
      direction: 'back',
      enteringEl,
      leavingEl,
    });

    expect(animation).toBeTruthy();
  });
});
