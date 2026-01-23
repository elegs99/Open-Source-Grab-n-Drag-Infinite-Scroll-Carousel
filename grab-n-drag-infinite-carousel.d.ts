/**
 * TypeScript definitions for InfiniteScrollCarousel
 * 
 * A standalone, dependency-free infinite scrolling carousel component with
 * grab-and-drag interaction, momentum scrolling, and seamless looping.
 */

/**
 * Configuration options for InfiniteScrollCarousel
 */
export interface InfiniteScrollCarouselOptions {
    /**
     * Scroll speed in pixels per second, clamped to minimum 0
     * @default 50
     */
    speed?: number;
    
    /**
     * Scroll in reverse direction (right to left)
     * @default false
     */
    reverseDirection?: boolean;
    
    /**
     * Pause scrolling on hover
     * @default true
     */
    pauseOnHover?: boolean;
    
    /**
     * Momentum decay factor, clamped to 0.1-0.99
     * @default 0.95
     */
    momentumDecay?: number;
    
    /**
     * Max momentum speed in px/ms, clamped to 0.5-25
     * @default 2.0
     */
    maxMomentumSpeed?: number;
    
    /**
     * Color of the fade gradient in hex, rgb, or rgba format
     * @default '#ffffff'
     */
    fadeColor?: string;
    
    /**
     * Width of the fade gradient in pixels
     * @default 50
     */
    fadeWidth?: number;
    
    /**
     * Enable grab-and-drag interaction
     * @default true
     */
    interactable?: boolean;
    
    /**
     * Number of item copies for seamless loop
     * @default 3
     */
    copies?: number;
    
    /**
     * Fires when carousel initialization completes
     */
    onReady?: () => void;
    
    /**
     * Fires when user starts dragging
     */
    onDragStart?: () => void;
    
    /**
     * Fires during drag movement (throttled)
     * @param position - Current scroll position in pixels
     * @param deltaX - Distance dragged from the start position
     */
    onDrag?: (position: number, deltaX: number) => void;
    
    /**
     * Fires when user ends dragging
     */
    onDragEnd?: () => void;
    
    /**
     * Fires when momentum scrolling begins
     * @param velocity - Initial momentum velocity in pixels per millisecond
     */
    onMomentumStart?: (velocity: number) => void;
    
    /**
     * Fires when momentum scrolling ends
     */
    onMomentumEnd?: () => void;
    
    /**
     * Fires when position resets during seamless loop
     */
    onPositionReset?: () => void;
    
    /**
     * Fires when carousel is paused
     */
    onPause?: () => void;
    
    /**
     * Fires when carousel is resumed
     */
    onResume?: () => void;
}

/**
 * InfiniteScrollCarousel class
 * 
 * A standalone, dependency-free infinite scrolling carousel component with
 * grab-and-drag interaction, momentum scrolling, and seamless looping.
 */
declare class InfiniteScrollCarousel {
    /**
     * Creates an infinite scrolling carousel instance
     * 
     * @param container - Container element or selector
     * @param options - Configuration options
     */
    constructor(container: HTMLElement | string, options?: InfiniteScrollCarouselOptions);
    
    /**
     * Validate and clamp option values to valid ranges
     */
    validateOptions(): void;
    
    /**
     * Initialize the carousel
     */
    init(): void;
    
    /**
     * Perform initialization after DOM is ready
     */
    initialize(): void;
    
    /**
     * Convert color string to rgba format with opacity
     * @param color - Color in hex, rgb, or rgba format
     * @param opacity - Opacity value 0-1 (default: 0.3)
     * @returns rgba color string
     */
    colorToRgba(color: string, opacity?: number): string;
    
    /**
     * Apply fade color to the wrapper element
     */
    applyFadeColor(): void;
    
    /**
     * Duplicate container children to create seamless infinite loop
     */
    duplicateItems(): void;
    
    /**
     * Calculate scroll distance for seamless looping
     * @param callback - Callback to execute after calculation
     */
    calculateScrollDistance(callback?: () => void): void;
    
    /**
     * Set initial position based on scroll direction
     */
    setInitialPosition(): void;
    
    /**
     * Calculate drag boundaries for infinite dragging
     */
    calculateDragBoundaries(): void;
    
    /**
     * Setup event listeners for interaction
     */
    setupEventListeners(): void;
    
    /**
     * Start dragging interaction
     * @param event - Mouse or touch event
     */
    startDragging(event: MouseEvent | TouchEvent): void;
    
    /**
     * Handle drag movement
     * @param event - Mouse or touch event
     */
    handleDrag(event: MouseEvent | TouchEvent): void;
    
    /**
     * End dragging interaction
     */
    endDragging(): void;
    
    /**
     * Start momentum animation after drag
     */
    startMomentum(): void;
    
    /**
     * Animate momentum scrolling
     */
    animateMomentum(): void;
    
    /**
     * Snap to valid position after interaction
     */
    snapToValidPosition(): void;
    
    /**
     * Pause automatic scrolling
     * The animation loop continues but position updates are paused.
     */
    pause(): void;
    
    /**
     * Resume paused scrolling or start scrolling if stopped.
     * This method handles both resuming from a paused state and starting from a stopped state.
     */
    resume(): void;
    
    /**
     * Main animation loop
     * @param timestamp - Animation frame timestamp
     */
    animate(timestamp?: number): void;
    
    /**
     * Cleanup method for proper resource management
     */
    destroy(): void;
}

export default InfiniteScrollCarousel;

// Global declaration for browser usage
declare global {
    interface Window {
        InfiniteScrollCarousel: typeof InfiniteScrollCarousel;
    }
}
