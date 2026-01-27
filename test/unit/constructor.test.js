/**
 * Constructor tests for InfiniteScrollCarousel
 * Tests initialization and option validation
 */

const { createCarouselContainer, cleanup } = require('./helpers');

// InfiniteScrollCarousel is loaded globally via test/setup.js
const InfiniteScrollCarousel = global.InfiniteScrollCarousel;

afterEach(() => {
  cleanup();
});

describe('Constructor', () => {
  test('creates carousel with HTMLElement', () => {
    const { container } = createCarouselContainer(3);
    
    const carousel = new InfiniteScrollCarousel(container);
    
    expect(carousel).toBeDefined();
    expect(carousel.container).toBe(container);
  });

  test('creates carousel with string selector', () => {
    const { container } = createCarouselContainer(3);
    container.id = 'test-selector';
    
    const carousel = new InfiniteScrollCarousel('#test-selector');
    
    expect(carousel).toBeDefined();
    expect(carousel.container).toBe(container);
  });

  test('throws error for invalid container (null)', () => {
    expect(() => {
      new InfiniteScrollCarousel(null);
    }).toThrow('Container element not found');
  });

  test('throws error for invalid container (non-existent selector)', () => {
    expect(() => {
      new InfiniteScrollCarousel('#non-existent-element');
    }).toThrow('Container element not found');
  });

  test('validates default options', () => {
    const { container } = createCarouselContainer(3);
    
    const carousel = new InfiniteScrollCarousel(container);
    
    expect(carousel.options.speed).toBe(50);
    // reverseDirection is undefined when options is undefined (only set to true if explicitly true)
    // The code does: options && options.reverseDirection === true
    // When options is undefined, this evaluates to undefined
    expect(carousel.options.reverseDirection).toBeUndefined();
    expect(carousel.options.pauseOnHover).toBe(true);
    expect(carousel.options.momentumDecay).toBe(0.05);
    expect(carousel.options.maxMomentumSpeed).toBe(2.0);
    expect(carousel.options.fadeColor).toBe('#ffffff');
    expect(carousel.options.fadeWidth).toBe(50);
    expect(carousel.options.interactable).toBe(true);
    expect(carousel.options.copies).toBe(3);
  });

  test('validates custom options', () => {
    const { container } = createCarouselContainer(3);
    
    const carousel = new InfiniteScrollCarousel(container, {
      speed: 100,
      reverseDirection: true,
      pauseOnHover: false,
      momentumDecay: 0.1,
      maxMomentumSpeed: 5.0,
      fadeColor: '#000000',
      fadeWidth: 100,
      interactable: false,
      copies: 5
    });
    
    expect(carousel.options.speed).toBe(100);
    expect(carousel.options.reverseDirection).toBe(true);
    expect(carousel.options.pauseOnHover).toBe(false);
    expect(carousel.options.momentumDecay).toBe(0.1);
    expect(carousel.options.maxMomentumSpeed).toBe(5.0);
    expect(carousel.options.fadeColor).toBe('#000000');
    expect(carousel.options.fadeWidth).toBe(100);
    expect(carousel.options.interactable).toBe(false);
    expect(carousel.options.copies).toBe(5);
  });

  test('clamps negative speed and sets reverseDirection', () => {
    const { container } = createCarouselContainer(3);
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    const carousel = new InfiniteScrollCarousel(container, {
      speed: -50
    });
    
    expect(carousel.options.speed).toBe(50);
    expect(carousel.options.reverseDirection).toBe(true);
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  test('clamps speed to minimum 0', () => {
    const { container } = createCarouselContainer(3);
    
    const carousel = new InfiniteScrollCarousel(container, {
      speed: -10
    });
    
    expect(carousel.options.speed).toBeGreaterThanOrEqual(0);
  });

  test('clamps momentumDecay to valid range', () => {
    const { container } = createCarouselContainer(3);
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    const carousel = new InfiniteScrollCarousel(container, {
      momentumDecay: 0.8 // Should be clamped to 0.5
    });
    
    expect(carousel.options.momentumDecay).toBe(0.5);
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  test('clamps maxMomentumSpeed to valid range', () => {
    const { container } = createCarouselContainer(3);
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    const carousel = new InfiniteScrollCarousel(container, {
      maxMomentumSpeed: 30 // Should be clamped to 25
    });
    
    expect(carousel.options.maxMomentumSpeed).toBe(25);
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  test('clamps copies to minimum 3', () => {
    const { container } = createCarouselContainer(3);
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    const carousel = new InfiniteScrollCarousel(container, {
      copies: 1 // Should be clamped to 3
    });
    
    expect(carousel.options.copies).toBeGreaterThanOrEqual(3);
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
});
