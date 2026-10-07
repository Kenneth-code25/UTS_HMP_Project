import { createAnimation, Animation } from '@ionic/angular';

export const customPageTransition = (baseEl: HTMLElement, opts?: any): Animation => {
  const DURATION = 300;
  const isBack = opts?.direction === 'back';

  const enteringEl = opts?.enteringEl;
  const leavingEl = opts?.leavingEl;

  const rootAnimation = createAnimation()
    .duration(DURATION)
    .easing('cubic-bezier(0.36, 0.66, 0.04, 1)');

  const enteringAnimation = createAnimation().addElement(enteringEl);
  const leavingAnimation = createAnimation().addElement(leavingEl);

  if (isBack) {
    enteringAnimation
      .fromTo('transform', 'translateX(-25%)', 'translateX(0%)')
      .fromTo('opacity', '0.5', '1');

    leavingAnimation
      .fromTo('transform', 'translateX(0%)', 'translateX(100%)')
      .fromTo('opacity', '1', '0');
  } else {
    enteringAnimation
      .fromTo('transform', 'translateX(100%)', 'translateX(0%)')
      .fromTo('opacity', '0.2', '1');

    leavingAnimation
      .fromTo('transform', 'translateX(0%)', 'translateX(-25%)')
      .fromTo('opacity', '1', '0.5');
  }

  return rootAnimation.addAnimation([enteringAnimation, leavingAnimation]);
};