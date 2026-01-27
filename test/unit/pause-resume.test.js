/**
 * Pause and Resume tests for InfiniteScrollCarousel
 * Tests public pause() and resume() methods
 */

const { createCarouselContainer, cleanup, waitForReady } = require('./helpers');

// InfiniteScrollCarousel is loaded globally via test/setup.js
const InfiniteScrollCarousel = global.InfiniteScrollCarousel;

describe('Pause and Resume', () => {
  let carousel;

  beforeEach(async () => {
    cleanup();
    const { container } = createCarouselContainer(5);
    
    carousel = new InfiniteScrollCarousel(container, {
      speed: 50,
      onReady: () => {}
    });
    
    // Wait for initialization
    await new Promise(resolve => setTimeout(resolve, 100));
  });

  afterEach(() => {
    if (carousel) {
      carousel.destroy();
    }
    cleanup();
  });

  test('pause() invokes onPause callback', (done) => {
    const { container } = createCarouselContainer(5);
    
    const onPauseSpy = jest.fn();
    carousel = new InfiniteScrollCarousel(container, {
      speed: 50,
      onPause: onPauseSpy
    });
    
    setTimeout(() => {
      carousel.pause();
      expect(onPauseSpy).toHaveBeenCalled();
      carousel.destroy();
      done();
    }, 200);
  });

  test('resume() invokes onResume callback', (done) => {
    const { container } = createCarouselContainer(5);
    
    const onResumeSpy = jest.fn();
    carousel = new InfiniteScrollCarousel(container, {
      speed: 50,
      onResume: onResumeSpy
    });
    
    setTimeout(() => {
      carousel.pause();
      carousel.resume();
      expect(onResumeSpy).toHaveBeenCalled();
      carousel.destroy();
      done();
    }, 200);
  });

  test('pause() can be called multiple times safely', (done) => {
    const { container } = createCarouselContainer(5);
    
    carousel = new InfiniteScrollCarousel(container, {
      speed: 50
    });
    
    setTimeout(() => {
      carousel.pause();
      carousel.pause();
      carousel.pause();
      // Should not throw
      expect(carousel.isPaused).toBe(true);
      carousel.destroy();
      done();
    }, 200);
  });

  test('resume() restarts animation when paused', (done) => {
    const { container } = createCarouselContainer(5);
    
    carousel = new InfiniteScrollCarousel(container, {
      speed: 50
    });
    
    setTimeout(() => {
      const initialPosition = carousel.currentPosition;
      carousel.pause();
      
      setTimeout(() => {
        const pausedPosition = carousel.currentPosition;
        carousel.resume();
        
        setTimeout(() => {
          // Position should have changed after resume
          expect(carousel.isPaused).toBe(false);
          expect(carousel.isScrolling).toBe(true);
          carousel.destroy();
          done();
        }, 100);
      }, 100);
    }, 200);
  });

  test('resume() when not paused does nothing', (done) => {
    const { container } = createCarouselContainer(5);
    
    const onResumeSpy = jest.fn();
    carousel = new InfiniteScrollCarousel(container, {
      speed: 50,
      onResume: onResumeSpy
    });
    
    setTimeout(() => {
      // Resume without pausing first
      carousel.resume();
      // onResume should not be called if not paused
      expect(onResumeSpy).not.toHaveBeenCalled();
      carousel.destroy();
      done();
    }, 200);
  });
});
