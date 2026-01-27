/**
 * Test helpers for InfiniteScrollCarousel unit tests
 */

/**
 * Creates a complete DOM structure for carousel testing
 * @param {number} itemCount - Number of items to create
 * @param {Object} options - Additional options
 * @param {boolean} options.withWrapper - Whether to include wrapper element
 * @returns {Object} Object with wrapper, container, and items
 */
function createCarouselContainer(itemCount = 5, options = {}) {
  const { withWrapper = true } = options;
  
  // Create wrapper
  const wrapper = document.createElement('div');
  if (withWrapper) {
    wrapper.className = 'infinite-scroll-wrapper';
    wrapper.style.width = '800px';
    wrapper.style.height = '100px';
  }
  
  // Create container
  const container = document.createElement('div');
  container.className = 'infinite-scroll-container';
  container.id = 'test-carousel';
  
  // Create items
  const items = [];
  for (let i = 0; i < itemCount; i++) {
    const item = document.createElement('div');
    item.className = 'infinite-scroll-item';
    item.textContent = `Item ${i + 1}`;
    item.style.width = '150px';
    item.style.height = '80px';
    item.style.marginRight = '20px';
    item.style.backgroundColor = '#e9ecef';
    container.appendChild(item);
    items.push(item);
  }
  
  if (withWrapper) {
    wrapper.appendChild(container);
    document.body.appendChild(wrapper);
  } else {
    document.body.appendChild(container);
  }
  
  return {
    wrapper: withWrapper ? wrapper : null,
    container,
    items
  };
}

/**
 * Waits for carousel to be ready (onReady callback fired)
 * @param {Object} carousel - Carousel instance
 * @param {number} timeout - Maximum wait time in ms
 * @returns {Promise} Promise that resolves when carousel is ready
 */
function waitForReady(carousel, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    // Check if already ready by checking if animation is running
    const checkReady = () => {
      if (carousel.isScrolling || carousel.resetPosition !== null) {
        resolve();
        return;
      }
      
      if (Date.now() - startTime > timeout) {
        reject(new Error('Carousel did not become ready within timeout'));
        return;
      }
      
      setTimeout(checkReady, 50);
    };
    
    // Use onReady callback if available
    if (carousel.options && typeof carousel.options.onReady === 'function') {
      const originalOnReady = carousel.options.onReady;
      carousel.options.onReady = function() {
        originalOnReady.apply(this, arguments);
        resolve();
      };
    } else {
      // Fallback: poll for ready state
      checkReady();
    }
  });
}

/**
 * Triggers a mouse or touch event on an element
 * @param {HTMLElement} element - Element to trigger event on
 * @param {string} eventType - Event type (mousedown, mousemove, mouseup, touchstart, touchmove, touchend)
 * @param {Object} options - Event options
 * @param {number} options.clientX - X coordinate
 * @param {number} options.clientY - Y coordinate
 * @returns {Event} The created event
 */
function triggerEvent(element, eventType, options = {}) {
  const { clientX = 100, clientY = 50 } = options;
  
  let event;
  if (eventType.startsWith('touch')) {
    event = new TouchEvent(eventType, {
      bubbles: true,
      cancelable: true,
      touches: [{
        clientX,
        clientY,
        identifier: 0,
        target: element
      }],
      targetTouches: [{
        clientX,
        clientY,
        identifier: 0,
        target: element
      }],
      changedTouches: [{
        clientX,
        clientY,
        identifier: 0,
        target: element
      }]
    });
  } else {
    event = new MouseEvent(eventType, {
      bubbles: true,
      cancelable: true,
      clientX,
      clientY,
      button: 0
    });
  }
  
  element.dispatchEvent(event);
  return event;
}

/**
 * Simulates a drag operation
 * @param {HTMLElement} element - Element to drag
 * @param {Object} options - Drag options
 * @param {number} options.startX - Starting X coordinate
 * @param {number} options.endX - Ending X coordinate
 * @param {number} options.steps - Number of steps in drag
 * @returns {Promise} Promise that resolves when drag is complete
 */
function simulateDrag(element, options = {}) {
  const { startX = 100, endX = 300, steps = 5 } = options;
  const stepSize = (endX - startX) / steps;
  
  return new Promise((resolve) => {
    // Start drag
    triggerEvent(element, 'mousedown', { clientX: startX });
    
    // Move steps
    let currentStep = 0;
    const moveStep = () => {
      if (currentStep < steps) {
        const x = startX + (stepSize * (currentStep + 1));
        triggerEvent(element, 'mousemove', { clientX: x });
        currentStep++;
        setTimeout(moveStep, 10);
      } else {
        // End drag
        triggerEvent(element, 'mouseup', { clientX: endX });
        setTimeout(resolve, 50);
      }
    };
    
    setTimeout(moveStep, 10);
  });
}

/**
 * Cleans up test DOM by removing all test elements
 */
function cleanup() {
  // Remove all elements with test IDs or classes
  const testElements = document.querySelectorAll('#test-carousel, .infinite-scroll-wrapper, .infinite-scroll-container');
  testElements.forEach(el => {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });
  
  // Also clean up by removing from body
  const bodyChildren = Array.from(document.body.children);
  bodyChildren.forEach(child => {
    if (child.id === 'test-carousel' || 
        child.classList.contains('infinite-scroll-wrapper') ||
        child.classList.contains('infinite-scroll-container')) {
      document.body.removeChild(child);
    }
  });
}

/**
 * Advances timers and requestAnimationFrame
 * Useful for testing time-dependent behavior
 * @param {number} ms - Milliseconds to advance
 */
function advanceTimers(ms) {
  jest.advanceTimersByTime(ms);
  // Process any pending requestAnimationFrame callbacks
  for (let i = 0; i < Math.ceil(ms / 16); i++) {
    jest.runOnlyPendingTimers();
  }
}

module.exports = {
  createCarouselContainer,
  waitForReady,
  triggerEvent,
  simulateDrag,
  cleanup,
  advanceTimers
};
