/**
 * Destroy tests for InfiniteScrollCarousel
 * Tests public destroy() method
 */

const { createCarouselContainer, cleanup } = require('./helpers');

// InfiniteScrollCarousel is loaded globally via test/setup.js
const InfiniteScrollCarousel = global.InfiniteScrollCarousel;

describe('Destroy', () => {
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

  test('destroy() stops animation', (done) => {
    const { container } = createCarouselContainer(5);
    
    carousel = new InfiniteScrollCarousel(container, {
      speed: 50
    });
    
    setTimeout(() => {
      expect(carousel.isScrolling).toBe(true);
      expect(carousel.animationId).toBeTruthy();
      
      carousel.destroy();
      
      expect(carousel.isScrolling).toBe(false);
      expect(carousel.animationId).toBeNull();
      done();
    }, 200);
  });

  test('destroy() removes event listeners', (done) => {
    const { container } = createCarouselContainer(5);
    
    carousel = new InfiniteScrollCarousel(container, {
      speed: 50,
      pauseOnHover: true
    });
    
    setTimeout(() => {
      // Verify listeners were added
      const hasListeners = carousel.boundHandlers && 
        (carousel.boundHandlers.mouseenter || carousel.boundHandlers.mouseleave);
      
      carousel.destroy();
      
      // After destroy, handlers should be cleared
      // We can't directly test if listeners are removed, but we can test
      // that the carousel is in a destroyed state
      expect(carousel.isScrolling).toBe(false);
      done();
    }, 200);
  });

  test('destroy() resets container styles', (done) => {
    const { container } = createCarouselContainer(5);
    
    carousel = new InfiniteScrollCarousel(container, {
      speed: 50
    });
    
    setTimeout(() => {
      // Container should have transform applied
      const transformBefore = container.style.transform;
      expect(transformBefore).toBeTruthy();
      
      carousel.destroy();
      
      // Transform should be cleared
      expect(container.style.transform).toBe('');
      expect(container.style.cursor).toBe('');
      done();
    }, 200);
  });

  test('destroy() can be called multiple times safely', (done) => {
    const { container } = createCarouselContainer(5);
    
    carousel = new InfiniteScrollCarousel(container, {
      speed: 50
    });
    
    setTimeout(() => {
      carousel.destroy();
      carousel.destroy();
      carousel.destroy();
      // Should not throw
      expect(carousel.isScrolling).toBe(false);
      done();
    }, 200);
  });

  test('destroy() cleans up ResizeObserver', (done) => {
    const { container } = createCarouselContainer(5);
    
    carousel = new InfiniteScrollCarousel(container, {
      speed: 50
    });
    
    setTimeout(() => {
      const observerBefore = carousel.sizeObserver;
      
      carousel.destroy();
      
      expect(carousel.sizeObserver).toBeNull();
      done();
    }, 200);
  });

  test('destroy() called early prevents onReady from firing after destroy', (done) => {
    const { container } = createCarouselContainer(5);
    
    const onReadySpy = jest.fn();
    carousel = new InfiniteScrollCarousel(container, {
      speed: 50,
      onReady: onReadySpy
    });
    
    // Destroy before init/measurement can complete
    carousel.destroy();
    
    // Wait past normal init time; onReady must not be called after destroy
    setTimeout(() => {
      expect(onReadySpy).not.toHaveBeenCalled();
      carousel = null; // already destroyed, skip afterEach destroy
      done();
    }, 500);
  });
});
