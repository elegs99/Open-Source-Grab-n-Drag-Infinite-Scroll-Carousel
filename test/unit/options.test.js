/**
 * Options tests for InfiniteScrollCarousel
 * Tests configuration options validation and behavior
 */

const { createCarouselContainer, cleanup } = require('./helpers');

// InfiniteScrollCarousel is loaded globally via test/setup.js
const InfiniteScrollCarousel = global.InfiniteScrollCarousel;

describe('Configuration Options', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Speed option', () => {
    test('validates and accepts valid speed', () => {
      const { container } = createCarouselContainer(5);
      
      const carousel = new InfiniteScrollCarousel(container, {
        speed: 75
      });
      
      expect(carousel.options.speed).toBe(75);
      carousel.destroy();
    });

    test('clamps negative speed to positive and sets reverseDirection', () => {
      const { container } = createCarouselContainer(5);
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const carousel = new InfiniteScrollCarousel(container, {
        speed: -30
      });
      
      expect(carousel.options.speed).toBe(30);
      expect(carousel.options.reverseDirection).toBe(true);
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
      carousel.destroy();
    });

    test('accepts speed of 0', () => {
      const { container } = createCarouselContainer(5);
      
      const carousel = new InfiniteScrollCarousel(container, {
        speed: 0
      });
      
      expect(carousel.options.speed).toBe(0);
      carousel.destroy();
    });
  });

  describe('MomentumDecay option', () => {
    test('validates and accepts valid momentumDecay', () => {
      const { container } = createCarouselContainer(5);
      
      const carousel = new InfiniteScrollCarousel(container, {
        momentumDecay: 0.1
      });
      
      expect(carousel.options.momentumDecay).toBe(0.1);
      carousel.destroy();
    });

    test('clamps momentumDecay below 0.01 to 0.01', () => {
      const { container } = createCarouselContainer(5);
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const carousel = new InfiniteScrollCarousel(container, {
        momentumDecay: 0.005
      });
      
      expect(carousel.options.momentumDecay).toBe(0.01);
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
      carousel.destroy();
    });

    test('clamps momentumDecay above 0.5 to 0.5', () => {
      const { container } = createCarouselContainer(5);
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const carousel = new InfiniteScrollCarousel(container, {
        momentumDecay: 0.8
      });
      
      expect(carousel.options.momentumDecay).toBe(0.5);
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
      carousel.destroy();
    });
  });

  describe('MaxMomentumSpeed option', () => {
    test('validates and accepts valid maxMomentumSpeed', () => {
      const { container } = createCarouselContainer(5);
      
      const carousel = new InfiniteScrollCarousel(container, {
        maxMomentumSpeed: 5.0
      });
      
      expect(carousel.options.maxMomentumSpeed).toBe(5.0);
      carousel.destroy();
    });

    test('clamps maxMomentumSpeed below 0.5 to 0.5', () => {
      const { container } = createCarouselContainer(5);
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const carousel = new InfiniteScrollCarousel(container, {
        maxMomentumSpeed: 0.3
      });
      
      expect(carousel.options.maxMomentumSpeed).toBe(0.5);
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
      carousel.destroy();
    });

    test('clamps maxMomentumSpeed above 25 to 25', () => {
      const { container } = createCarouselContainer(5);
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const carousel = new InfiniteScrollCarousel(container, {
        maxMomentumSpeed: 30
      });
      
      expect(carousel.options.maxMomentumSpeed).toBe(25);
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
      carousel.destroy();
    });
  });

  describe('Copies option', () => {
    test('validates and accepts valid copies', () => {
      const { container } = createCarouselContainer(5);
      
      const carousel = new InfiniteScrollCarousel(container, {
        copies: 5
      });
      
      expect(carousel.options.copies).toBe(5);
      carousel.destroy();
    });

    test('clamps copies below 3 to 3', () => {
      const { container } = createCarouselContainer(5);
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const carousel = new InfiniteScrollCarousel(container, {
        copies: 1
      });
      
      expect(carousel.options.copies).toBeGreaterThanOrEqual(3);
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
      carousel.destroy();
    });

    test('clamps copies above 100 to 100', () => {
      const { container } = createCarouselContainer(5);
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const carousel = new InfiniteScrollCarousel(container, {
        copies: 200
      });
      
      expect(carousel.options.copies).toBe(100);
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
      carousel.destroy();
    });
  });

  describe('FadeColor option', () => {
    test('applies fadeColor correctly', () => {
      const { container, wrapper } = createCarouselContainer(5, { withWrapper: true });
      
      const carousel = new InfiniteScrollCarousel(container, {
        fadeColor: '#ff0000'
      });
      
      expect(carousel.options.fadeColor).toBe('#ff0000');
      carousel.destroy();
    });

    test('accepts rgb color format', () => {
      const { container } = createCarouselContainer(5);
      
      const carousel = new InfiniteScrollCarousel(container, {
        fadeColor: 'rgb(255, 0, 0)'
      });
      
      expect(carousel.options.fadeColor).toBe('rgb(255, 0, 0)');
      carousel.destroy();
    });

    test('accepts rgba color format', () => {
      const { container } = createCarouselContainer(5);
      
      const carousel = new InfiniteScrollCarousel(container, {
        fadeColor: 'rgba(255, 0, 0, 0.5)'
      });
      
      expect(carousel.options.fadeColor).toBe('rgba(255, 0, 0, 0.5)');
      carousel.destroy();
    });
  });

  describe('FadeWidth option', () => {
    test('applies fadeWidth correctly', () => {
      const { container } = createCarouselContainer(5);
      
      const carousel = new InfiniteScrollCarousel(container, {
        fadeWidth: 100
      });
      
      expect(carousel.options.fadeWidth).toBe(100);
      carousel.destroy();
    });
  });

  describe('Interactable option', () => {
    test('enables interaction when true', () => {
      const { container } = createCarouselContainer(5);
      
      const carousel = new InfiniteScrollCarousel(container, {
        interactable: true
      });
      
      expect(carousel.options.interactable).toBe(true);
      expect(container.style.cursor).not.toBe('default');
      carousel.destroy();
    });

    test('disables interaction when false', () => {
      const { container } = createCarouselContainer(5);
      
      const carousel = new InfiniteScrollCarousel(container, {
        interactable: false
      });
      
      expect(carousel.options.interactable).toBe(false);
      expect(container.style.cursor).toBe('default');
      carousel.destroy();
    });
  });

  describe('ReverseDirection option', () => {
    test('sets reverseDirection correctly', () => {
      const { container } = createCarouselContainer(5);
      
      const carousel = new InfiniteScrollCarousel(container, {
        reverseDirection: true
      });
      
      expect(carousel.options.reverseDirection).toBe(true);
      carousel.destroy();
    });

    test('defaults to undefined when options not provided', () => {
      const { container } = createCarouselContainer(5);
      
      const carousel = new InfiniteScrollCarousel(container);
      
      // reverseDirection is undefined when options is undefined
      // The code does: options && options.reverseDirection === true
      // When options is undefined, this evaluates to undefined
      expect(carousel.options.reverseDirection).toBeUndefined();
      carousel.destroy();
    });
  });

  describe('PauseOnHover option', () => {
    test('enables pauseOnHover when true', () => {
      const { container } = createCarouselContainer(5);
      
      const carousel = new InfiniteScrollCarousel(container, {
        pauseOnHover: true
      });
      
      expect(carousel.options.pauseOnHover).toBe(true);
      carousel.destroy();
    });

    test('disables pauseOnHover when false', () => {
      const { container } = createCarouselContainer(5);
      
      const carousel = new InfiniteScrollCarousel(container, {
        pauseOnHover: false
      });
      
      expect(carousel.options.pauseOnHover).toBe(false);
      carousel.destroy();
    });
  });
});
