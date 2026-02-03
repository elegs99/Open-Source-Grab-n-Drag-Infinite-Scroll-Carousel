/**
 * Setters tests for InfiniteScrollCarousel
 * Tests public setSpeed, setReverseDirection, setFadeColor, setFadeWidth methods
 */

const { createCarouselContainer, cleanup } = require('./helpers');

// InfiniteScrollCarousel is loaded globally via test/setup.js
const InfiniteScrollCarousel = global.InfiniteScrollCarousel;

describe('Setters', () => {
  let carousel;

  afterEach(() => {
    if (carousel) {
      try {
        carousel.destroy();
      } catch (e) {
        // Ignore errors if already destroyed
      }
    }
    cleanup();
  });

  describe('setSpeed', () => {
    test('updates options.speed', (done) => {
      const { container } = createCarouselContainer(5);
      carousel = new InfiniteScrollCarousel(container, { speed: 50 });
      setTimeout(() => {
        carousel.setSpeed(75);
        expect(carousel.options.speed).toBe(75);
        carousel.destroy();
        done();
      }, 100);
    });

    test('validateOptions runs: negative speed becomes positive and sets reverseDirection', (done) => {
      const { container } = createCarouselContainer(5);
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      carousel = new InfiniteScrollCarousel(container, { speed: 50 });
      setTimeout(() => {
        carousel.setSpeed(-30);
        expect(carousel.options.speed).toBe(30);
        expect(carousel.options.reverseDirection).toBe(true);
        consoleSpy.mockRestore();
        carousel.destroy();
        done();
      }, 100);
    });

    test('accepts setSpeed(0)', (done) => {
      const { container } = createCarouselContainer(5);
      carousel = new InfiniteScrollCarousel(container, { speed: 50 });
      setTimeout(() => {
        carousel.setSpeed(0);
        expect(carousel.options.speed).toBe(0);
        carousel.destroy();
        done();
      }, 100);
    });

    test('no-op when destroyed', (done) => {
      const { container } = createCarouselContainer(5);
      carousel = new InfiniteScrollCarousel(container, { speed: 50 });
      setTimeout(() => {
        carousel.destroy();
        carousel.setSpeed(100);
        expect(carousel.options.speed).toBe(50);
        done();
      }, 100);
    });
  });

  describe('setReverseDirection', () => {
    test('updates options.reverseDirection to true', (done) => {
      const { container } = createCarouselContainer(5);
      carousel = new InfiniteScrollCarousel(container, { reverseDirection: false });
      setTimeout(() => {
        carousel.setReverseDirection(true);
        expect(carousel.options.reverseDirection).toBe(true);
        carousel.destroy();
        done();
      }, 100);
    });

    test('updates options.reverseDirection to false', (done) => {
      const { container } = createCarouselContainer(5);
      carousel = new InfiniteScrollCarousel(container, { reverseDirection: true });
      setTimeout(() => {
        carousel.setReverseDirection(false);
        expect(carousel.options.reverseDirection).toBe(false);
        carousel.destroy();
        done();
      }, 100);
    });

    test('no-op when destroyed', (done) => {
      const { container } = createCarouselContainer(5);
      carousel = new InfiniteScrollCarousel(container, { reverseDirection: false });
      setTimeout(() => {
        carousel.destroy();
        carousel.setReverseDirection(true);
        expect(carousel.options.reverseDirection).toBe(false);
        done();
      }, 100);
    });
  });

  describe('setFadeColor', () => {
    test('updates options.fadeColor and applies fade to wrapper', (done) => {
      const { container, wrapper } = createCarouselContainer(5);
      carousel = new InfiniteScrollCarousel(container, { fadeColor: '#ffffff' });
      setTimeout(() => {
        carousel.setFadeColor('#ff0000');
        expect(carousel.options.fadeColor).toBe('#ff0000');
        if (wrapper) {
          const leftGradient = wrapper.style.getPropertyValue('--fade-gradient-left');
          expect(leftGradient).toBeTruthy();
          expect(leftGradient.indexOf('255') !== -1 || leftGradient.indexOf('ff') !== -1).toBe(true);
        }
        carousel.destroy();
        done();
      }, 100);
    });

    test('no-op when destroyed', (done) => {
      const { container } = createCarouselContainer(5);
      carousel = new InfiniteScrollCarousel(container, { fadeColor: '#ffffff' });
      setTimeout(() => {
        carousel.destroy();
        carousel.setFadeColor('#000000');
        expect(carousel.options.fadeColor).toBe('#ffffff');
        done();
      }, 100);
    });

    test('ignores non-string input', (done) => {
      const { container } = createCarouselContainer(5);
      carousel = new InfiniteScrollCarousel(container, { fadeColor: '#ffffff' });
      setTimeout(() => {
        carousel.setFadeColor(123);
        expect(carousel.options.fadeColor).toBe('#ffffff');
        carousel.destroy();
        done();
      }, 100);
    });
  });

  describe('setFadeWidth', () => {
    test('updates options.fadeWidth and applies to wrapper', (done) => {
      const { container, wrapper } = createCarouselContainer(5);
      carousel = new InfiniteScrollCarousel(container, { fadeWidth: 50 });
      setTimeout(() => {
        carousel.setFadeWidth(80);
        expect(carousel.options.fadeWidth).toBe(80);
        if (wrapper) {
          const fadeWidth = wrapper.style.getPropertyValue('--fade-width');
          expect(fadeWidth).toBe('80px');
        }
        carousel.destroy();
        done();
      }, 100);
    });

    test('no-op when destroyed', (done) => {
      const { container } = createCarouselContainer(5);
      carousel = new InfiniteScrollCarousel(container, { fadeWidth: 50 });
      setTimeout(() => {
        carousel.destroy();
        carousel.setFadeWidth(100);
        expect(carousel.options.fadeWidth).toBe(50);
        done();
      }, 100);
    });

    test('ignores non-finite number input', (done) => {
      const { container } = createCarouselContainer(5);
      carousel = new InfiniteScrollCarousel(container, { fadeWidth: 50 });
      setTimeout(() => {
        carousel.setFadeWidth('not a number');
        expect(carousel.options.fadeWidth).toBe(50);
        carousel.destroy();
        done();
      }, 100);
    });
  });
});
