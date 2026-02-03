/**
 * InfiniteScrollCarousel
 * 
 * A standalone, dependency-free infinite scrolling carousel component with
 * grab-and-drag interaction, momentum scrolling, and seamless looping.
 * 
 * @class InfiniteScrollCarousel
 */
(function(window) {
    'use strict';

    /**
     * Creates an infinite scrolling carousel instance
     * 
     * @param {HTMLElement|string} container - Container element or selector
     * @param {Object} options - Configuration options
     * @param {number} options.speed - Scroll speed in pixels per second, clamped to minimum 0 (default: 50)
     * @param {boolean} options.reverseDirection - Scroll in reverse direction (right to left) (default: false)
     * @param {boolean} options.pauseOnHover - Pause scrolling on hover (default: true)
     * @param {number} options.momentumDecay - Momentum decay factor, clamped to 0.01-0.5 (default: 0.05). Higher values decay quicker.
     * @param {number} options.maxMomentumSpeed - Max momentum speed in px/ms, clamped to 0.5-25 (default: 2.0)
     * @param {string} options.fadeColor - Color of the fade gradient in hex, rgb, or rgba format (default: #ffffff)
     * @param {number} options.fadeWidth - Width of the fade gradient in pixels (default: 50)
     * @param {boolean} options.interactable - Enable grab-and-drag interaction (default: true)
     * @param {number} options.copies - Number of item copies for seamless loop (default: 3)
     * @param {boolean} options.disableMomentum - Disable momentum after drag release (default: false)
     */
    function InfiniteScrollCarousel(container, options) {
        // Resolve container element
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container || !(container instanceof HTMLElement)) {
            throw new Error('InfiniteScrollCarousel: Container element not found');
        }
        
        this.container = container;
        // Build from defaults only; overwrite only with valid typed values from options
        this.options = {
            speed: 50,
            reverseDirection: false,
            pauseOnHover: true,
            momentumDecay: 0.05,
            maxMomentumSpeed: 2.0,
            fadeColor: '#ffffff',
            fadeWidth: 50,
            interactable: true,
            copies: 3,
            disableMomentum: false
        };
        if (options && typeof options === 'object') {
            var o = options;
            if (typeof o.speed === 'number' && Number.isFinite(o.speed)) { this.options.speed = o.speed; }
            if (typeof o.reverseDirection === 'boolean') { this.options.reverseDirection = o.reverseDirection; }
            if (typeof o.pauseOnHover === 'boolean') { this.options.pauseOnHover = o.pauseOnHover; }
            if (typeof o.momentumDecay === 'number' && Number.isFinite(o.momentumDecay)) { this.options.momentumDecay = o.momentumDecay; }
            if (typeof o.maxMomentumSpeed === 'number' && Number.isFinite(o.maxMomentumSpeed)) { this.options.maxMomentumSpeed = o.maxMomentumSpeed; }
            if (typeof o.fadeColor === 'string') { this.options.fadeColor = o.fadeColor; }
            if (typeof o.fadeWidth === 'number' && Number.isFinite(o.fadeWidth)) { this.options.fadeWidth = o.fadeWidth; }
            if (typeof o.interactable === 'boolean') { this.options.interactable = o.interactable; }
            if (typeof o.copies === 'number' && Number.isFinite(o.copies)) { this.options.copies = o.copies; }
            if (typeof o.disableMomentum === 'boolean') { this.options.disableMomentum = o.disableMomentum; }
            if (typeof o.onReady === 'function') { this.options.onReady = o.onReady; }
            if (typeof o.onDragStart === 'function') { this.options.onDragStart = o.onDragStart; }
            if (typeof o.onDrag === 'function') { this.options.onDrag = o.onDrag; }
            if (typeof o.onDragEnd === 'function') { this.options.onDragEnd = o.onDragEnd; }
            if (typeof o.onMomentumStart === 'function') { this.options.onMomentumStart = o.onMomentumStart; }
            if (typeof o.onMomentumEnd === 'function') { this.options.onMomentumEnd = o.onMomentumEnd; }
            if (typeof o.onPositionReset === 'function') { this.options.onPositionReset = o.onPositionReset; }
            if (typeof o.onPause === 'function') { this.options.onPause = o.onPause; }
            if (typeof o.onResume === 'function') { this.options.onResume = o.onResume; }
        }
        
        // Validate and clamp option values
        this.validateOptions();
        
        // Animation state
        this.isScrolling = false;
        this.isPaused = false;
        this.isDragging = false;
        this.isMomentumActive = false;
        this.currentPosition = 0;
        this.animationId = null;
        this.lastTimestamp = 0;
        
        // Measurement state
        this.resetPosition = null;
        this.totalSetWidth = null;
        this.isMeasuring = false;
        this.originalItemCount = 0;
        this.hasDuplicated = false;
        
        // Dragging state
        this.dragStartX = 0;
        this.dragStartPosition = 0;
        this.minDragBoundary = 0;
        this.maxDragBoundary = 0;
        
        // Momentum state
        this.velocity = 0;
        this.lastDragTime = 0;
        this.lastDragX = 0;
        
        // Size observer for dynamic content loading
        this.sizeObserver = null;
        this.sizeObserverTimeout = null;
        this.lastMeasurement = null;
        
        // Callback throttling state
        this.onDragCallbackFrame = null;
        
        // Event handler references for cleanup
        this.boundHandlers = {
            mouseenter: null,
            mouseleave: null,
            mousedown: null,
            mousemove: null,
            mouseup: null,
            mouseleaveWindow: null,
            touchstart: null,
            touchmove: null,
            touchend: null,
            selectstart: null
        };
        
        this.destroyed = false;
        
        this.init();
    }
    
    /**
     * Safely invoke a callback function if it exists
     * @param {string} name - Callback name
     * @param {...*} args - Arguments to pass to callback
     */
    InfiniteScrollCarousel.prototype.invokeCallback = function(name) {
        const callback = this.options[name];
        if (typeof callback === 'function') {
            try {
                const args = Array.prototype.slice.call(arguments, 1);
                callback.apply(null, args);
            } catch (error) {
                console.error('InfiniteScrollCarousel: Error in ' + name + ' callback:', error);
            }
        }
    };
    
    /**
     * Validate and clamp option values to valid ranges
     */
    InfiniteScrollCarousel.prototype.validateOptions = function() {
        // Validate and clamp speed: must be >= 0
        // If negative speed is provided, convert to positive and set reverseDirection
        if (this.options.speed < 0) {
            const originalValue = this.options.speed;
            this.options.speed = Math.abs(this.options.speed);
            this.options.reverseDirection = true;
            console.warn(
                'InfiniteScrollCarousel: Negative speed value ' + originalValue + 
                ' Speed updated to ' + this.options.speed + ' and reverseDirection set to true.'
            );
        }
        
        // Validate momentumDecay: must be between 0.01 and 0.5
        if (this.options.momentumDecay < 0.01 || this.options.momentumDecay > 0.5) {
            const originalValue = this.options.momentumDecay;
            this.options.momentumDecay = Math.max(0.01, Math.min(0.5, originalValue));
            console.warn(
                'InfiniteScrollCarousel: momentumDecay value ' + originalValue + 
                ' is outside valid range (0.01 - 0.5). Clamped to ' + this.options.momentumDecay + '.'
            );
        }
        
        // Validate maxMomentumSpeed: must be between 0.5 and 25
        if (this.options.maxMomentumSpeed < 0.5 || this.options.maxMomentumSpeed > 25) {
            const originalValue = this.options.maxMomentumSpeed;
            this.options.maxMomentumSpeed = Math.max(0.5, Math.min(25, this.options.maxMomentumSpeed));
            console.warn(
                'InfiniteScrollCarousel: maxMomentumSpeed value ' + originalValue + 
                ' is outside valid range (0.5 - 25). Clamped to ' + this.options.maxMomentumSpeed + '.'
            );
        }

        // Validate copies: must be between 3 and 100
        if (this.options.copies < 3 || this.options.copies > 100) {
            const originalValue = this.options.copies;
            this.options.copies = Math.max(3, Math.min(100, this.options.copies));
            console.warn(
                'InfiniteScrollCarousel: copies value ' + originalValue + 
                ' is outside valid range (3 - 100). Clamped to ' + this.options.copies + '.'
            );
        }
    };
    
    /**
     * Initialize the carousel
     */
    InfiniteScrollCarousel.prototype.init = function() {
        // Ensure DOM is ready and styles are applied
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.initialize.bind(this));
        } else {
            this.initialize();
        }
    };
    
    /**
     * Perform initialization after DOM is ready
     */
    InfiniteScrollCarousel.prototype.initialize = function() {
        // Apply fade color to wrapper
        this.applyFadeColor();
        
        // Duplicate items to create seamless loop
        this.duplicateItems();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Wait for resources (fonts, images) to load before calculating sizes
        this.waitForResources(function() {
            // Calculate distance first, then start scrolling after measurement completes
                this.calculateScrollDistance(function() {
                this.setInitialPosition();
                this.isPaused = false;
                this.isScrolling = true;
                this.lastTimestamp = 0; // Reset timestamp for accurate delta calculation
                if (!this.animationId && !this.isMomentumActive) {
                    this.animate();
                }
                // Setup ResizeObserver to monitor for size changes after initial load
                this.setupSizeObserver();
                // Fire onReady callback after initialization is complete
                this.invokeCallback('onReady');
            }.bind(this));
        }.bind(this));
    };
    
    /**
     * Convert color string to rgba format with opacity
     * @param {string} color - Color in hex, rgb, or rgba format
     * @param {number} opacity - Opacity value 0-1 (default: 0.3)
     * @returns {string} rgba color string
     */
    InfiniteScrollCarousel.prototype.colorToRgba = function(color, opacity) {
        if (opacity === undefined) opacity = 0.3;
        
        // If already rgba, extract rgb values and apply new opacity
        if (color.startsWith('rgba')) {
            const rgbaMatch = color.match(/rgba?\(([^)]+)\)/);
            if (rgbaMatch) {
                const values = rgbaMatch[1].split(',').map(function(v) { return v.trim(); });
                return 'rgba(' + values[0] + ', ' + values[1] + ', ' + values[2] + ', ' + opacity + ')';
            }
        }
        
        // If rgb, extract values and convert to rgba
        if (color.startsWith('rgb')) {
            const rgbMatch = color.match(/rgb\(([^)]+)\)/);
            if (rgbMatch) {
                const values = rgbMatch[1].split(',').map(function(v) { return v.trim(); });
                return 'rgba(' + values[0] + ', ' + values[1] + ', ' + values[2] + ', ' + opacity + ')';
            }
        }
        
        // If hex, convert to rgb then rgba
        if (color.startsWith('#')) {
            // Remove # if present
            color = color.replace('#', '');
            
            // Handle 3-digit hex
            if (color.length === 3) {
                color = color.split('').map(function(c) { return c + c; }).join('');
            }
            
            // Convert to rgb
            const r = parseInt(color.substring(0, 2), 16);
            const g = parseInt(color.substring(2, 4), 16);
            const b = parseInt(color.substring(4, 6), 16);
            
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
        }
        
        // Fallback: try to use the color as-is (for named colors, might not work)
        return color;
    };
    
    /**
     * Apply fade color to the wrapper element
     */
    InfiniteScrollCarousel.prototype.applyFadeColor = function() {
        // Find the wrapper element (parent of container with class infinite-scroll-wrapper)
        let wrapper = this.container.parentElement;
        
        // If parent doesn't have the wrapper class, try to find it
        if (!wrapper || !wrapper.classList || !wrapper.classList.contains('infinite-scroll-wrapper')) {
            // Look for wrapper in parent chain
            let current = this.container.parentElement;
            while (current && current !== document.body) {
                if (current.classList && current.classList.contains('infinite-scroll-wrapper')) {
                    wrapper = current;
                    break;
                }
                current = current.parentElement;
            }
        }
        
        if (!wrapper) {
            console.warn('InfiniteScrollCarousel: Could not find wrapper element');
            return;
        }
        
        // Convert fade color to rgba with opacity
        const fadeColorRgba = this.colorToRgba(this.options.fadeColor, 1.0);
        
        // Set CSS custom properties for left and right gradients
        wrapper.style.setProperty('--fade-gradient-left', 'linear-gradient(to right, ' + fadeColorRgba + ', transparent)');
        wrapper.style.setProperty('--fade-gradient-right', 'linear-gradient(to left, ' + fadeColorRgba + ', transparent)');
        
        // Set CSS custom property for fade width
        wrapper.style.setProperty('--fade-width', this.options.fadeWidth + 'px');
        
        // Add data attribute to activate the CSS rule
        wrapper.setAttribute('data-fade-color', '');
    };
    
    /**
     * Wait for resources (fonts, images) to load before calculating sizes
     * @param {Function} callback - Callback to execute after resources are ready
     */
    InfiniteScrollCarousel.prototype.waitForResources = function(callback) {
        const maxWaitTime = 3000; // Maximum 3 seconds
        const startTime = Date.now();
        let callbackCalled = false;
        
        // Guard to prevent multiple callback calls
        const safeCallback = function() {
            if (!callbackCalled) {
                callbackCalled = true;
                callback();
            }
        };
        
        // Check if fonts API is available
        const fontsReady = document.fonts && typeof document.fonts.ready !== 'undefined';
        
        // Get all images in the container
        const images = this.container.querySelectorAll('img');
        const imagePromises = [];
        
        // Create promises for each image
        images.forEach(function(img) {
            if (!img.complete) {
                const promise = new Promise(function(resolve, reject) {
                    img.addEventListener('load', resolve);
                    img.addEventListener('error', resolve); // Resolve even on error to not block
                    // Timeout after maxWaitTime
                    setTimeout(resolve, maxWaitTime);
                });
                imagePromises.push(promise);
            }
        });
        
        // Wait for fonts if available
        const fontPromise = fontsReady ? document.fonts.ready : Promise.resolve();
        
        // Wait for all resources with timeout
        Promise.all([fontPromise, Promise.all(imagePromises)])
            .then(function() {
                // Ensure minimum wait time for styles to apply (especially on mobile)
                const elapsed = Date.now() - startTime;
                const minWait = 50;
                const remainingWait = Math.max(0, minWait - elapsed);
                
                setTimeout(function() {
                    safeCallback();
                }, remainingWait);
            })
            .catch(function() {
                // Fallback: proceed after timeout even if resources fail
                const elapsed = Date.now() - startTime;
                const minWait = 50;
                const remainingWait = Math.max(0, minWait - elapsed);
                
                setTimeout(function() {
                    safeCallback();
                }, remainingWait);
            });
        
        // Safety timeout - always proceed after maxWaitTime
        setTimeout(function() {
            safeCallback();
        }, maxWaitTime);
    };
    
    /**
     * Setup ResizeObserver to monitor for size changes and recalculate when sizes stabilize
     */
    InfiniteScrollCarousel.prototype.setupSizeObserver = function() {
        // Check if ResizeObserver is available
        if (typeof ResizeObserver === 'undefined') {
            return; // Graceful fallback if not available
        }
        
        // Clear any existing observer
        if (this.sizeObserver) {
            this.sizeObserver.disconnect();
        }
        
        // Clear any pending timeout
        if (this.sizeObserverTimeout) {
            clearTimeout(this.sizeObserverTimeout);
            this.sizeObserverTimeout = null;
        }
        
        // Create observer to watch for size changes.
        // For future maintainers: recalculation is debounced (100ms after last change) and skipped when isMeasuring is true to avoid re-entry and redundant work during layout measurement.
        this.sizeObserver = new ResizeObserver(function(entries) {
            if (this.sizeObserverTimeout) {
                clearTimeout(this.sizeObserverTimeout);
            }
            
            this.sizeObserverTimeout = setTimeout(function() {
                if (!this.isMeasuring) {
                    this.calculateScrollDistance();
                }
                this.sizeObserverTimeout = null;
            }.bind(this), 100);
        }.bind(this));
        
        // Observe the container and all items
        this.sizeObserver.observe(this.container);
        const items = Array.from(this.container.children);
        items.forEach(function(item) {
            this.sizeObserver.observe(item);
        }.bind(this));
    };
    
    /**
     * Duplicate container children to create seamless infinite loop
     */
    InfiniteScrollCarousel.prototype.duplicateItems = function() {
        if (this.hasDuplicated) return;
        
        // Get original children
        const originalItems = Array.from(this.container.children);
        if (originalItems.length === 0) {
            console.warn('InfiniteScrollCarousel: No children found in container');
            this.originalItemCount = 0;
            return;
        }
        
        this.originalItemCount = originalItems.length;
        
        // Create copies
        const copies = this.options.copies || 3;
        for (let i = 1; i < copies; i++) {
            originalItems.forEach(function(item) {
                const clone = item.cloneNode(true);
                this.container.appendChild(clone);
            }.bind(this));
        }
        
        this.hasDuplicated = true;
    };
    
    /**
     * Calculate scroll distance for seamless looping
     * @param {Function} callback - Callback to execute after calculation
     */
    InfiniteScrollCarousel.prototype.calculateScrollDistance = function(callback) {
        if (this.destroyed) return;
        
        // Prevent concurrent measurements
        if (this.isMeasuring) {
            // If already measuring, queue the callback
            if (callback) {
                const checkInterval = setInterval(function() {
                    if (!this.isMeasuring) {
                        clearInterval(checkInterval);
                        if (!this.destroyed && callback) callback();
                    }
                }.bind(this), 10);
            }
            return;
        }
        this.isMeasuring = true;
        
        try {
            // Get all items (including duplicates)
            const items = Array.from(this.container.children);
            if (items.length === 0) {
                this.isMeasuring = false;
                if (!this.destroyed && callback) callback();
                return;
            }
            
            // Calculate item count per set (original items)
            // originalItemCount should be set by duplicateItems()
            if (!this.originalItemCount || this.originalItemCount === 0) {
                console.warn('InfiniteScrollCarousel: No items to scroll');
                this.isMeasuring = false;
                if (!this.destroyed && callback) callback();
                return;
            }
            
            const itemCount = this.originalItemCount;
            
            // Store current state to restore after measurement
            const wasScrolling = this.isScrolling;
            const savedPosition = this.currentPosition;
            const savedTransform = this.container.style.transform;
            const oldTotalSetWidth = this.totalSetWidth; // Store old width for proportional adjustment
            
            // Temporarily pause and reset to natural position for accurate measurement
            this.isScrolling = false;
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
            
            // Reset transform to measure natural layout
            this.container.style.transform = 'translateX(0px)';
            this.currentPosition = 0;
            
            // Force layout recalculation
            void this.container.offsetHeight;
            
            // Wait for next frame to ensure layout is settled
            requestAnimationFrame(function() {
                // Measure sizes across multiple frames to verify stability
                const measureSize = function() {
                    // Calculate total width by measuring actual rendered width of first set
                    // This is more accurate than summing individual items due to flexbox behavior
                    let totalSetWidth = 0;
                    
                    // Method 1: Measure the actual distance from first item to first item of second set
                    // This accounts for all margins, padding, and flexbox spacing correctly
                    if (items.length >= itemCount * 2) {
                        const firstItemRect = items[0].getBoundingClientRect();
                        const secondSetFirstItemRect = items[itemCount].getBoundingClientRect();
                        totalSetWidth = secondSetFirstItemRect.left - firstItemRect.left;
                    } else {
                        // Fallback: Sum item widths and margins (only between items, not after last)
                        const firstItemStyle = window.getComputedStyle(items[0]);
                        const marginRight = parseFloat(firstItemStyle.marginRight) || 0;
                        
                        for (let i = 0; i < itemCount; i++) {
                            const item = items[i];
                            if (!item) continue;
                            
                            // Get the actual rendered width (includes padding and border)
                            const itemWidth = item.offsetWidth;
                            totalSetWidth += itemWidth;
                            
                            // Add margin only between items (not after the last item)
                            if (i < itemCount - 1) {
                                totalSetWidth += marginRight;
                            }
                        }
                    }
                    
                    return totalSetWidth;
                };
                
                // Finalize calculation with the measured width
                const finalizeCalculation = function(totalSetWidth) {
                    if (this.destroyed) {
                        this.isMeasuring = false;
                        return;
                    }
                    // Round to avoid sub-pixel issues, but keep precision for smooth animation
                    const newTotalSetWidth = Math.round(totalSetWidth * 100) / 100;
                    
                    // Calculate the reset position
                    // Reset when we've scrolled exactly one set width
                    const finalResetPosition = -newTotalSetWidth;
                    
                    // Adjust position proportionally if dimensions changed
                    let adjustedPosition = savedPosition;
                    if (oldTotalSetWidth && oldTotalSetWidth !== newTotalSetWidth && savedPosition !== 0) {
                        // Calculate the ratio of change
                        const ratio = newTotalSetWidth / oldTotalSetWidth;
                        adjustedPosition = savedPosition * ratio;
                        
                        // Clamp position to valid bounds: resetPosition < position < 0
                        if (adjustedPosition >= 0) {
                            // Too far right, snap to appropriate position based on direction
                            adjustedPosition = this.options.reverseDirection ? finalResetPosition : 0;
                        } else if (adjustedPosition <= finalResetPosition) {
                            // Too far left, snap to reset position
                            adjustedPosition = finalResetPosition;
                        }
                    }
                    
                    // Store measurement for stability checking
                    this.lastMeasurement = newTotalSetWidth;
                    
                    // Update dimensions
                    this.totalSetWidth = newTotalSetWidth;
                    this.resetPosition = finalResetPosition;
                    
                    // Restore adjusted position
                    this.container.style.transform = 'translateX(' + adjustedPosition + 'px)';
                    this.currentPosition = adjustedPosition;
                    this.isScrolling = wasScrolling;
                    
                    // Force another layout recalculation
                    void this.container.offsetHeight;
                    
                    // Recalculate drag boundaries
                    this.calculateDragBoundaries();
                    
                    // Snap to valid position to ensure we're not at a boundary that would trigger immediate reset
                    this.snapToValidPosition();
                    
                    // If we were scrolling, restart animation
                    // Check if animation loop is actually running, if not, restart it
                    if (wasScrolling && !this.isPaused && !this.isDragging && !this.isMomentumActive) {
                        // Ensure animation loop is running
                        if (!this.animationId) {
                            this.lastTimestamp = 0; // Reset timestamp for accurate delta calculation
                            this.animate();
                        }
                    }
                    
                    this.isMeasuring = false;
                    
                    // Call callback if provided
                    if (!this.destroyed && callback) {
                        callback();
                    }
                }.bind(this);
                
                // First measurement
                let totalSetWidth = measureSize();
                
                // Verify stability by measuring again after another frame
                requestAnimationFrame(function() {
                    const secondMeasurement = measureSize();
                    
                    // If sizes differ significantly (more than 1px), wait another frame and retry
                    if (Math.abs(totalSetWidth - secondMeasurement) > 1) {
                        // Sizes are still changing, wait and retry
                        requestAnimationFrame(function() {
                            totalSetWidth = measureSize();
                            finalizeCalculation(totalSetWidth);
                        }.bind(this));
                    } else {
                        // Sizes are stable, use the average for precision
                        totalSetWidth = (totalSetWidth + secondMeasurement) / 2;
                        finalizeCalculation(totalSetWidth);
                    }
                }.bind(this));
            }.bind(this));
        } catch (error) {
            console.error('InfiniteScrollCarousel: Error calculating scroll distance:', error);
            this.isMeasuring = false;
            if (!this.destroyed && callback) callback();
        }
    };
    
    /**
     * Set initial position based on scroll direction
     * For reverse scrolling, start at the second copy position so items are visible on both sides
     */
    InfiniteScrollCarousel.prototype.setInitialPosition = function() {
        if (this.resetPosition === null) return;
        
        // For reverse scrolling, start at the second copy position
        // This ensures items are visible on both sides when scrolling right
        if (this.options.reverseDirection) {
            this.currentPosition = this.resetPosition; // -totalSetWidth
            this.container.style.transform = 'translateX(' + this.currentPosition + 'px)';
        } else {
            // For forward scrolling, start at 0 (first copy)
            this.currentPosition = 0;
            this.container.style.transform = 'translateX(0px)';
        }
    };
    
    /**
     * Calculate drag boundaries for infinite dragging
     */
    InfiniteScrollCarousel.prototype.calculateDragBoundaries = function() {
        if (this.resetPosition === null) return;
        
        // Boundaries are the same for both directions
        // Min boundary is reset position (left), max is 0 (right)
        // Valid range: resetPosition < position < 0 (exclusive boundaries to avoid seams)
        this.minDragBoundary = this.resetPosition;
        this.maxDragBoundary = 0;
    };
    
    /**
     * Setup event listeners for interaction
     */
    InfiniteScrollCarousel.prototype.setupEventListeners = function() {
        // Pause on hover
        if (this.options.pauseOnHover) {
            this.boundHandlers.mouseenter = function() {
                if (!this.isDragging && !this.isMomentumActive) {
                    this.pause();
                }
            }.bind(this);
            
            this.boundHandlers.mouseleave = function() {
                if (!this.isDragging && !this.isMomentumActive) {
                    this.resume();
                }
            }.bind(this);
            
            this.container.addEventListener('mouseenter', this.boundHandlers.mouseenter);
            this.container.addEventListener('mouseleave', this.boundHandlers.mouseleave);
        }
        
        // Set cursor based on interactable option
        if (!this.options.interactable) {
            this.container.style.cursor = 'default';
        }
        
        // Mouse events for dragging (only if interactable)
        if (this.options.interactable) {
            this.boundHandlers.mousedown = this.startDragging.bind(this);
            this.boundHandlers.mousemove = this.handleDrag.bind(this);
            this.boundHandlers.mouseup = this.endDragging.bind(this);
            
            this.container.addEventListener('mousedown', this.boundHandlers.mousedown);
            document.addEventListener('mousemove', this.boundHandlers.mousemove);
            document.addEventListener('mouseup', this.boundHandlers.mouseup);
            
            // Handle case where mouse leaves window during drag
            this.boundHandlers.mouseleaveWindow = function() {
                if (this.isDragging) {
                    this.endDragging();
                }
            }.bind(this);
            window.addEventListener('mouseleave', this.boundHandlers.mouseleaveWindow);
            
            // Touch events for mobile
            this.boundHandlers.touchstart = this.startDragging.bind(this);
            this.boundHandlers.touchmove = this.handleDrag.bind(this);
            this.boundHandlers.touchend = this.endDragging.bind(this);
            
            this.container.addEventListener('touchstart', this.boundHandlers.touchstart, { passive: false });
            document.addEventListener('touchmove', this.boundHandlers.touchmove, { passive: false });
            document.addEventListener('touchend', this.boundHandlers.touchend);
            
            // Prevent text selection during drag
            this.boundHandlers.selectstart = function(e) {
                e.preventDefault();
            };
            this.container.addEventListener('selectstart', this.boundHandlers.selectstart);
        }
    };
    
    /**
     * Start dragging interaction
     * @param {Event} event - Mouse or touch event
     */
    InfiniteScrollCarousel.prototype.startDragging = function(event) {
        this.isDragging = true;
        this.isMomentumActive = false;
        if (!this.isPaused) {
            this.pause();
        }
        
        // Get the starting position
        let clientX = event.clientX || (event.touches && event.touches[0].clientX);
        
        // Validate clientX
        if (clientX === undefined || clientX === null || isNaN(clientX)) {
            clientX = 0;
        }
        
        this.dragStartX = clientX;
        this.dragStartPosition = this.currentPosition;
        
        // Initialize momentum tracking
        this.lastDragTime = Date.now();
        this.lastDragX = clientX;
        this.velocity = 0;
        
        // Change cursor
        this.container.style.cursor = 'grabbing';
        
        // Fire onDragStart callback
        this.invokeCallback('onDragStart');
        
        // Prevent default behavior
        event.preventDefault();
    };
    
    /**
     * Handle drag movement
     * @param {Event} event - Mouse or touch event
     */
    InfiniteScrollCarousel.prototype.handleDrag = function(event) {
        if (!this.isDragging) return;
        
        let clientX = event.clientX || (event.touches && event.touches[0].clientX);
        
        // Use last valid clientX if current is invalid
        if (clientX === undefined || clientX === null || isNaN(clientX)) {
            if (this.lastDragX !== undefined && this.lastDragX !== null && !isNaN(this.lastDragX)) {
                clientX = this.lastDragX;
            } else {
                return;
            }
        }
        
        const currentTime = Date.now();
        const deltaX = clientX - this.dragStartX;
        
        // Calculate velocity for momentum
        if (currentTime > this.lastDragTime && this.lastDragX !== undefined && this.lastDragX !== null && !isNaN(this.lastDragX)) {
            const timeDelta = currentTime - this.lastDragTime;
            const distanceDelta = clientX - this.lastDragX;
            
            if (timeDelta > 0) {
                this.velocity = distanceDelta / timeDelta; // pixels per millisecond
                
                // Clamp velocity to reasonable bounds
                this.velocity = Math.max(-this.options.maxMomentumSpeed, 
                                       Math.min(this.options.maxMomentumSpeed, this.velocity));
            }
        }
        
        this.lastDragTime = currentTime;
        this.lastDragX = clientX;
        
        // Calculate new position
        let newPosition = this.dragStartPosition + deltaX;
        
        // Handle infinite dragging by resetting position when reaching boundaries
        if (this.resetPosition !== null) {
            if (newPosition <= this.minDragBoundary) {
                // Reset to beginning and adjust drag start
                newPosition = this.maxDragBoundary + (newPosition - this.minDragBoundary);
                this.dragStartPosition = newPosition;
                this.dragStartX = clientX;
            } else if (newPosition >= this.maxDragBoundary) {
                // Reset to end and adjust drag start
                newPosition = this.minDragBoundary + (newPosition - this.maxDragBoundary);
                this.dragStartPosition = newPosition;
                this.dragStartX = clientX;
            }
        }
        
        // Update position with sub-pixel precision
        this.currentPosition = newPosition;
        this.container.style.transform = 'translateX(' + this.currentPosition + 'px)';
        
        // Fire onDrag callback (throttled to once per frame)
        if (this.onDragCallbackFrame === null) {
            this.onDragCallbackFrame = requestAnimationFrame(function() {
                this.invokeCallback('onDrag', this.currentPosition, deltaX);
                this.onDragCallbackFrame = null;
            }.bind(this));
        }
        
        // Prevent default behavior
        event.preventDefault();
    };
    
    /**
     * End dragging interaction
     */
    InfiniteScrollCarousel.prototype.endDragging = function() {
        if (!this.isDragging) {
            return;
        }
        
        this.isDragging = false;
        
        // Cancel any pending onDrag callback
        if (this.onDragCallbackFrame !== null) {
            cancelAnimationFrame(this.onDragCallbackFrame);
            this.onDragCallbackFrame = null;
        }
        
        // Fire onDragEnd callback
        this.invokeCallback('onDragEnd');
        
        // Ensure velocity is valid
        const validVelocity = (this.velocity !== null && this.velocity !== undefined && !isNaN(this.velocity)) ? this.velocity : 0;
        
        // Start momentum animation if velocity is significant and momentum is not disabled
        if (Math.abs(validVelocity) > 0.01 && !this.options.disableMomentum) {
            this.velocity = validVelocity;
            this.startMomentum();
        } else {
            // Reset velocity
            this.velocity = 0;
            // Snap to valid position if needed
            this.snapToValidPosition();
            
            // Reset cursor
            this.container.style.cursor = 'grab';
            
            // Resume scrolling
            this.resume();
        }
    };
    
    /**
     * Start momentum animation after drag. Momentum is driven by the main animate() loop.
     */
    InfiniteScrollCarousel.prototype.startMomentum = function() {
        this.isMomentumActive = true;
        this.container.style.cursor = 'grab';
        this.invokeCallback('onMomentumStart', this.velocity);
        if (!this.animationId) {
            this.animate();
        }
    };
    
    /**
     * Snap to valid position after interaction
     */
    InfiniteScrollCarousel.prototype.snapToValidPosition = function() {
        if (this.resetPosition === null) return;
        
        // Unified logic for both directions
        if (this.options.reverseDirection) {
            // Reverse direction: snap if we're too far right (>= 0)
            if (this.currentPosition >= 0) {
                this.currentPosition = this.resetPosition; // -totalSetWidth
                this.container.style.transform = 'translateX(' + this.currentPosition + 'px)';
                // Fire onPositionReset callback
                this.invokeCallback('onPositionReset');
            }
        } else {
            // Forward direction: snap if we're too far left (<= resetPosition)
            if (this.currentPosition <= this.resetPosition) {
                this.currentPosition = 0;
                this.container.style.transform = 'translateX(0px)';
                // Fire onPositionReset callback
                this.invokeCallback('onPositionReset');
            }
        }
    };
    
    /**
     * Pause automatic scrolling
     */
    InfiniteScrollCarousel.prototype.pause = function() {
        this.isPaused = true;
        // Fire onPause callback
        this.invokeCallback('onPause');
    };
    
    /**
     * Resume paused scrolling or start scrolling if stopped.
     * This method handles both resuming from a paused state and starting from a stopped state.
     */
    InfiniteScrollCarousel.prototype.resume = function() {
        if (!this.isPaused) return;
        this.isPaused = false;
        this.isScrolling = true;
        this.lastTimestamp = 0; // Reset timestamp for accurate delta calculation
        if (!this.animationId && !this.isMomentumActive) {
            this.animate();
        }
        // Fire onResume callback
        this.invokeCallback('onResume');
    };
    
    /**
     * Main animation loop
     * @param {number} timestamp - Animation frame timestamp
     */
    InfiniteScrollCarousel.prototype.animate = function(timestamp) {
        if (!this.isScrolling) {
            this.animationId = null;
            return;
        }
        
        // Initialize timestamp on first frame
        if (this.lastTimestamp === 0) {
            this.lastTimestamp = timestamp || 0;
            this.animationId = requestAnimationFrame(this.animate.bind(this));
            return;
        }
        
        const deltaTime = (timestamp || 0) - this.lastTimestamp;
        this.lastTimestamp = timestamp || 0;
        
        // Cap deltaTime to prevent large jumps when animation is throttled
        const maxDeltaTime = 100; // Maximum 100ms between frames
        const clampedDeltaTime = Math.min(deltaTime, maxDeltaTime);
        
        // Momentum runs in this loop; use same deltaTime for consistency
        if (this.isMomentumActive && deltaTime > 0) {
            this.currentPosition += this.velocity * clampedDeltaTime;
            this.velocity *= (1 - this.options.momentumDecay);
            if (this.resetPosition !== null) {
                if (this.currentPosition <= this.minDragBoundary) {
                    this.currentPosition = this.maxDragBoundary + (this.currentPosition - this.minDragBoundary);
                } else if (this.currentPosition >= this.maxDragBoundary) {
                    this.currentPosition = this.minDragBoundary + (this.currentPosition - this.maxDragBoundary);
                }
            }
            this.container.style.transform = 'translateX(' + this.currentPosition + 'px)';
            if (Math.abs(this.velocity) < 0.02) {
                this.isMomentumActive = false;
                this.velocity = 0;
                this.invokeCallback('onMomentumEnd');
                this.snapToValidPosition();
                this.resume();
            }
            this.animationId = requestAnimationFrame(this.animate.bind(this));
            return;
        }
        
        if (!this.isPaused && deltaTime > 0 && !this.isDragging && !this.isMomentumActive) {
            const speed = this.options.speed;
            const pixelsPerFrame = (speed / 1000) * clampedDeltaTime;
            
            // Calculate new position based on direction
            // Forward: move left (decrease position)
            // Reverse: move right (increase position)
            let newPosition;
            if (this.options.reverseDirection) {
                newPosition = this.currentPosition + pixelsPerFrame;
            } else {
                newPosition = this.currentPosition - pixelsPerFrame;
            }
            
            // Reset position when we reach the reset point
            // Unified logic for both directions
            // Check boundaries BEFORE updating to prevent visible jump
            // Add small buffer (1px) to prevent premature resets due to floating point precision
            const resetBuffer = 1;
            if (this.resetPosition !== null) {
                if (this.options.reverseDirection) {
                    // Reverse direction: moving right (increasing), reset when >= 0 - buffer
                    if (newPosition >= 0 - resetBuffer) {
                        this.currentPosition = this.resetPosition; // -totalSetWidth
                        // Fire onPositionReset callback
                        this.invokeCallback('onPositionReset');
                    } else {
                        this.currentPosition = newPosition;
                    }
                } else {
                    // Forward direction: moving left (decreasing), reset when <= resetPosition + buffer
                    if (newPosition <= this.resetPosition + resetBuffer) {
                        this.currentPosition = 0;
                        // Fire onPositionReset callback
                        this.invokeCallback('onPositionReset');
                    } else {
                        this.currentPosition = newPosition;
                    }
                }
            } else {
                this.currentPosition = newPosition;
            }
            
            // Update transform with sub-pixel precision
            this.container.style.transform = 'translateX(' + this.currentPosition + 'px)';
        }
        
        this.animationId = requestAnimationFrame(this.animate.bind(this));
    };
    
    /**
     * Set scroll speed (pixels per second). No-op if destroyed.
     * @param {number} value - Speed in pixels per second (will be validated/clamped)
     */
    InfiniteScrollCarousel.prototype.setSpeed = function(value) {
        if (this.destroyed) return;
        if (typeof value === 'number' && Number.isFinite(value)) {
            this.options.speed = value;
            this.validateOptions();
        }
    };
    
    /**
     * Set scroll direction. No-op if destroyed.
     * @param {boolean} value - true for reverse (right to left), false for forward (left to right)
     */
    InfiniteScrollCarousel.prototype.setReverseDirection = function(value) {
        if (this.destroyed) return;
        this.options.reverseDirection = !!value;
    };
    
    /**
     * Set fade color and re-apply to wrapper. No-op if destroyed or invalid input.
     * @param {string} color - Color in hex, rgb, or rgba format
     */
    InfiniteScrollCarousel.prototype.setFadeColor = function(color) {
        if (this.destroyed) return;
        if (typeof color === 'string') {
            this.options.fadeColor = color;
            this.applyFadeColor();
        }
    };
    
    /**
     * Set fade width and re-apply to wrapper. No-op if destroyed or invalid input.
     * @param {number} value - Width of fade gradient in pixels
     */
    InfiniteScrollCarousel.prototype.setFadeWidth = function(value) {
        if (this.destroyed) return;
        if (typeof value === 'number' && Number.isFinite(value)) {
            this.options.fadeWidth = value;
            this.applyFadeColor();
        }
    };
    
    /**
     * Cleanup method for proper resource management
     */
    InfiniteScrollCarousel.prototype.destroy = function() {
        // Mark destroyed and stop measurement so no callbacks run after destroy
        this.destroyed = true;
        this.isMeasuring = false;
        
        // Stop scrolling and cancel animation
        this.isScrolling = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        // Remove event listeners
        if (this.boundHandlers.mouseenter) {
            this.container.removeEventListener('mouseenter', this.boundHandlers.mouseenter);
        }
        if (this.boundHandlers.mouseleave) {
            this.container.removeEventListener('mouseleave', this.boundHandlers.mouseleave);
        }
        if (this.boundHandlers.mousedown) {
            this.container.removeEventListener('mousedown', this.boundHandlers.mousedown);
        }
        if (this.boundHandlers.mousemove) {
            document.removeEventListener('mousemove', this.boundHandlers.mousemove);
        }
        if (this.boundHandlers.mouseup) {
            document.removeEventListener('mouseup', this.boundHandlers.mouseup);
        }
        if (this.boundHandlers.mouseleaveWindow) {
            window.removeEventListener('mouseleave', this.boundHandlers.mouseleaveWindow);
        }
        if (this.boundHandlers.touchstart) {
            this.container.removeEventListener('touchstart', this.boundHandlers.touchstart);
        }
        if (this.boundHandlers.touchmove) {
            document.removeEventListener('touchmove', this.boundHandlers.touchmove);
        }
        if (this.boundHandlers.touchend) {
            document.removeEventListener('touchend', this.boundHandlers.touchend);
        }
        if (this.boundHandlers.selectstart) {
            this.container.removeEventListener('selectstart', this.boundHandlers.selectstart);
        }
        
        // Clear handler references so no references to bound functions remain
        this.boundHandlers = {
            mouseenter: null,
            mouseleave: null,
            mousedown: null,
            mousemove: null,
            mouseup: null,
            mouseleaveWindow: null,
            touchstart: null,
            touchmove: null,
            touchend: null,
            selectstart: null
        };
        
        // Disconnect ResizeObserver if it exists
        if (this.sizeObserver) {
            this.sizeObserver.disconnect();
            this.sizeObserver = null;
        }
        
        // Clear size observer timeout
        if (this.sizeObserverTimeout) {
            clearTimeout(this.sizeObserverTimeout);
            this.sizeObserverTimeout = null;
        }
        
        // Reset container styles
        this.container.style.transform = '';
        this.container.style.cursor = '';
    };
    
    // Export to global scope
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = InfiniteScrollCarousel;
    } else {
        window.InfiniteScrollCarousel = InfiniteScrollCarousel;
    }
    
})(typeof window !== 'undefined' ? window : this);

