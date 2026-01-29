# Complete Documentation

> 📖 **Full API reference, examples, and advanced usage guide**

For quickstart and installation, see the [README.md](../README.md).

## Table of Contents

- [API Reference](#api-reference)
- [Examples](#examples)
- [Framework Integration](#framework-integration)
- [Styling Guide](#styling-guide)
- [Troubleshooting](#troubleshooting)
- [Browser Compatibility](#browser-compatibility)
- [Accessibility](#accessibility)
- [Performance](#performance)
---

## API Reference

### Constructor

```javascript
new InfiniteScrollCarousel(container, options)
```

#### Parameters

- **container** (`HTMLElement` or `string`) - The container element or CSS selector. Must contain direct children that will be scrolled.
- **options** (`Object`, optional) - Configuration object

### Options

| Option | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | number | `50` | Auto-scroll speed (pixels/sec).<br>Set to `0` to disable auto-scroll. |
| `reverseDirection` | boolean | `false` | Scroll direction.<br>`false`: right to left ←<br>`true`: left to right → |
| `pauseOnHover` | boolean | `true` | Pauses scrolling when the pointer hovers an element. |
| `momentumDecay` | number | `0.05` | Drag momentum decay rate.<br>Range: `0.01–0.5`<br>`0.01`: slow decay (keeps momentum longer)<br>`0.5`: quick decay (loses momentum quickly)<br>Higher values decay quicker. |
| `maxMomentumSpeed` | number | `2.0` | Maximum momentum speed (px/ms).<br>Range: `0.5–25` |
| `fadeColor` | string | `#ffffff` | Edge fade color (`hex`, `rgb`, `rgba`).<br>Use `transparent` to disable. |
| `fadeWidth` | number | `50` | Width of the fade gradient in pixels. |
| `interactable` | boolean | `true` | Enable grab-and-drag interaction. Set to `false` to disable dragging. |
| `copies` | number | `3` | Number of duplicated item sets for seamless looping. |

### Event Callbacks

| Callback | Type | Description |
|----------|------|-------------|
| `onReady` | `() => void` | Fires when carousel initialization completes |
| `onDragStart` | `() => void` | Fires when user starts dragging |
| `onDrag` | `(position: number, deltaX: number) => void` | Fires during drag movement (throttled) |
| `onDragEnd` | `() => void` | Fires when user ends dragging |
| `onMomentumStart` | `(velocity: number) => void` | Fires when momentum scrolling begins |
| `onMomentumEnd` | `() => void` | Fires when momentum scrolling ends |
| `onPositionReset` | `() => void` | Fires when position resets during seamless loop or drag |
| `onPause` | `() => void` | Fires when carousel is paused |
| `onResume` | `() => void` | Fires when carousel is resumed |

### Event Callbacks Details

Event callbacks allow you to hook into carousel lifecycle events and user interactions. All callbacks are optional.

**Callback context:** Callbacks are invoked with no specific `this` (global/undefined). Use arrow functions or close over your carousel variable if you need the instance inside a callback.

#### `onReady()`
Fires once when the carousel has finished initializing (after items are duplicated, measurements are complete, and scrolling has started).

```javascript
const carousel = new InfiniteScrollCarousel('#myCarousel', {
    onReady: () => {
        console.log('Carousel initialized and ready');
    }
});
```

#### `onDragStart()`
Fires when the user starts dragging the carousel (mouse down or touch start).

```javascript
const carousel = new InfiniteScrollCarousel('#myCarousel', {
    onDragStart: () => {
        console.log('Drag started');
    }
});
```

#### `onDrag(position, deltaX)`
Fires during drag movement. This callback is throttled to prevent excessive calls.

**Parameters:**
- `position` (number) - Current scroll position in pixels
- `deltaX` (number) - Distance dragged from the start position

```javascript
const carousel = new InfiniteScrollCarousel('#myCarousel', {
    onDrag: (position, deltaX) => {
        console.log(`Position: ${position}, Delta: ${deltaX}`);
    }
});
```

#### `onDragEnd()`
Fires when the user releases the drag (mouse up or touch end).

```javascript
const carousel = new InfiniteScrollCarousel('#myCarousel', {
    onDragEnd: () => {
        console.log('Drag ended');
    }
});
```

#### `onMomentumStart(velocity)`
Fires when momentum scrolling begins after a drag ends (only if velocity is significant).

**Parameters:**
- `velocity` (number) - Initial momentum velocity in pixels per millisecond

```javascript
const carousel = new InfiniteScrollCarousel('#myCarousel', {
    onMomentumStart: (velocity) => {
        console.log(`Momentum started: ${velocity} px/ms`);
    }
});
```

#### `onMomentumEnd()`
Fires when momentum scrolling ends (velocity decays below threshold).

```javascript
const carousel = new InfiniteScrollCarousel('#myCarousel', {
    onMomentumEnd: () => {
        console.log('Momentum ended');
    }
});
```

#### `onPositionReset()`
Fires when the carousel position resets during the seamless loop (invisible to the user).

```javascript
const carousel = new InfiniteScrollCarousel('#myCarousel', {
    onPositionReset: () => {
        console.log('Position reset - seamless loop');
    }
});
```

#### `onPause()`
Fires when the carousel is paused (via `pause()` method or automatically on hover if `pauseOnHover` is enabled).

```javascript
const carousel = new InfiniteScrollCarousel('#myCarousel', {
    onPause: () => {
        console.log('Carousel paused');
    }
});
```

#### `onResume()`
Fires when the carousel is resumed (via `resume()` method or automatically when hover ends if `pauseOnHover` is enabled).

```javascript
const carousel = new InfiniteScrollCarousel('#myCarousel', {
    onResume: () => {
        console.log('Carousel resumed');
    }
});
```

**Note:** Callbacks that throw errors will not break the carousel. Errors are caught internally to ensure stability.

### Methods

#### `pause()`
Pause automatic scrolling. The animation loop continues but position updates are paused.

```javascript
carousel.pause();
```

#### `resume()`
Resume paused scrolling or start scrolling if stopped. This method handles both resuming from a paused state and starting from a stopped state.

```javascript
carousel.resume();
```

#### `destroy()`
Clean up event listeners and reset the carousel. Call this when removing the carousel from the page. Does not remove duplicated DOM nodes.

```javascript
carousel.destroy();
```

---

## Examples

### Example 1: Simple Logo Carousel (Basic Setup)

The simplest implementation using default settings. Perfect for getting started quickly.

```html
<div class="infinite-scroll-wrapper">
    <div class="infinite-scroll-container" id="logoCarousel">
        <div class="infinite-scroll-item">
            <img src="logo1.png" alt="Company 1">
        </div>
        <div class="infinite-scroll-item">
            <img src="logo2.png" alt="Company 2">
        </div>
        <div class="infinite-scroll-item">
            <img src="logo3.png" alt="Company 3">
        </div>
        <div class="infinite-scroll-item">
            <img src="logo4.png" alt="Company 4">
        </div>
    </div>
</div>

<script>
    // Uses all default settings:
    // - speed: 50 (auto-scroll)
    // - pauseOnHover: true
    // - interactable: true (grab & drag enabled)
    // - reverseDirection: false (right to left)
    const carousel = new InfiniteScrollCarousel('#logoCarousel');
</script>
```

**Features demonstrated:**
- Default configuration
- Auto-scrolling enabled
- Grab-and-drag interaction
- Pause on hover

---

### Example 2: Reverse Direction with Custom Fade

A carousel scrolling in reverse direction with custom fade gradient to match your design.

```html
<style>
    .testimonial-carousel .infinite-scroll-item {
        padding: 20px;
        margin-right: 30px;
        background: #1a1a2e;
        border-radius: 12px;
        color: white;
        min-width: 300px;
    }
</style>

<div class="infinite-scroll-wrapper testimonial-carousel">
    <div class="infinite-scroll-container" id="testimonialCarousel">
        <div class="infinite-scroll-item">
            <p>"Amazing product!" - John Doe</p>
        </div>
        <div class="infinite-scroll-item">
            <p>"Best service ever!" - Jane Smith</p>
        </div>
        <div class="infinite-scroll-item">
            <p>"Highly recommended!" - Bob Johnson</p>
        </div>
    </div>
</div>

<script>
    const carousel = new InfiniteScrollCarousel('#testimonialCarousel', {
        speed: 40,
        reverseDirection: true,        // Scroll left to right (→)
        pauseOnHover: true,
        fadeColor: '#1a1a2e',          // Match background color
        fadeWidth: 80                  // Wider fade gradient
    });
</script>
```

**Features demonstrated:**
- `reverseDirection: true` - Reverse scroll direction
- `fadeColor` - Custom fade gradient color
- `fadeWidth` - Custom fade width
- Custom styling integration

---

### Example 3: Gallery with Manual Browsing & Display Modes

A flexible gallery carousel that can switch between manual-only browsing (user-controlled) and auto-display mode (read-only). Perfect for portfolios, image galleries, or kiosk displays.

```html
<style>
    .gallery-item {
        margin-right: 20px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .gallery-item img {
        display: block;
        width: 300px;
        height: 200px;
        object-fit: cover;
    }
    
    .mode-toggle {
        text-align: center;
        margin: 20px 0;
    }
    
    .mode-btn {
        padding: 10px 24px;
        margin: 0 10px;
        border: 2px solid #333;
        background: white;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s;
    }
    
    .mode-btn.active {
        background: #333;
        color: white;
    }
</style>

<div class="mode-toggle">
    <button class="mode-btn active" data-mode="manual">Manual Browse</button>
    <button class="mode-btn" data-mode="display">Auto Display</button>
</div>

<div class="infinite-scroll-wrapper">
    <div class="infinite-scroll-container" id="galleryCarousel">
        <div class="infinite-scroll-item gallery-item">
            <img src="photo1.jpg" alt="Gallery Image 1">
        </div>
        <div class="infinite-scroll-item gallery-item">
            <img src="photo2.jpg" alt="Gallery Image 2">
        </div>
        <div class="infinite-scroll-item gallery-item">
            <img src="photo3.jpg" alt="Gallery Image 3">
        </div>
        <div class="infinite-scroll-item gallery-item">
            <img src="photo4.jpg" alt="Gallery Image 4">
        </div>
        <div class="infinite-scroll-item gallery-item">
            <img src="photo5.jpg" alt="Gallery Image 5">
        </div>
    </div>
</div>

<script>
    let carousel;
    
    function initializeCarousel(mode) {
        // Destroy existing carousel if it exists
        if (carousel) {
            carousel.destroy();
        }
        
        if (mode === 'manual') {
            // Manual browsing mode: user controls via drag, no auto-scroll
            carousel = new InfiniteScrollCarousel('#galleryCarousel', {
                speed: 0,                      // No auto-scroll (manual only)
                pauseOnHover: false,            // Not needed since no auto-scroll
                momentumDecay: 0.02,            // Lower decay rate (keeps momentum longer)
                maxMomentumSpeed: 3.5,          // Higher max speed for smooth browsing
                copies: 4,                      // More copies for smoother infinite loop
                fadeColor: 'transparent',       // Disable fade effect
                interactable: true              // Enable drag interaction
            });
        } else {
            // Auto-display mode: continuous scrolling, no user interaction
            carousel = new InfiniteScrollCarousel('#galleryCarousel', {
                speed: 60,                      // Faster scroll speed for display
                reverseDirection: false,
                pauseOnHover: false,            // Never pause (continuous)
                interactable: false,            // Disable drag interaction (read-only)
                fadeColor: '#ffffff',
                fadeWidth: 60,
                copies: 3
            });
        }
    }
    
    // Initialize with manual mode by default
    initializeCarousel('manual');
    
    // Mode toggle functionality
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const mode = this.dataset.mode;
            initializeCarousel(mode);
        });
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (carousel) {
            carousel.destroy();
        }
    });
</script>
```

**Features demonstrated:**
- **Manual mode**: `speed: 0` (no auto-scroll), custom momentum physics (`momentumDecay`, `maxMomentumSpeed`), `copies` configuration, `fadeColor: 'transparent'`
- **Display mode**: `interactable: false` (read-only), `pauseOnHover: false` (continuous), higher speed for display
- **Dynamic reinitialization**: Switching between modes with proper cleanup using `destroy()`
- **Real-world use case**: Gallery/portfolio that adapts to different viewing contexts

---

### Example 4: Product Showcase with Analytics and Smart Controls

A production-ready e-commerce product carousel that tracks user engagement, integrates with filters, and provides analytics insights. Demonstrates real-world business value.

```html
<style>
    .product-carousel-wrapper {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px 0;
    }
    
    .product-card {
        background: white;
        border-radius: 16px;
        padding: 24px;
        margin-right: 24px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        min-width: 280px;
        transition: transform 0.2s;
        cursor: pointer;
    }
    
    .product-card:hover {
        transform: translateY(-5px);
    }
    
    .product-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 16px;
    }
    
    .product-card h4 {
        margin: 0 0 8px 0;
        color: #333;
    }
    
    .product-card .price {
        font-size: 24px;
        font-weight: bold;
        color: #667eea;
    }
    
    .controls {
        text-align: center;
        margin: 20px 0;
    }
    
    .filter-btn {
        padding: 10px 20px;
        margin: 0 10px;
        border: 2px solid #667eea;
        background: white;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .filter-btn.active {
        background: #667eea;
        color: white;
    }
    
    .analytics {
        text-align: center;
        color: white;
        margin-top: 20px;
        font-size: 14px;
    }
</style>

<div class="product-carousel-wrapper">
    <div class="controls">
        <button class="filter-btn active" data-filter="all">All Products</button>
        <button class="filter-btn" data-filter="featured">Featured</button>
        <button class="filter-btn" data-filter="sale">On Sale</button>
    </div>
    
    <div class="infinite-scroll-wrapper">
        <div class="infinite-scroll-container" id="productCarousel">
            <div class="infinite-scroll-item" data-category="featured">
                <div class="product-card" data-product-id="1">
                    <img src="product1.jpg" alt="Product 1">
                    <h4>Premium Headphones</h4>
                    <p class="price">$199.99</p>
                </div>
            </div>
            <div class="infinite-scroll-item" data-category="sale">
                <div class="product-card" data-product-id="2">
                    <img src="product2.jpg" alt="Product 2">
                    <h4>Wireless Speaker</h4>
                    <p class="price">$79.99 <span style="text-decoration: line-through; color: #999;">$99.99</span></p>
                </div>
            </div>
            <div class="infinite-scroll-item" data-category="featured">
                <div class="product-card" data-product-id="3">
                    <img src="product3.jpg" alt="Product 3">
                    <h4>Smart Watch</h4>
                    <p class="price">$299.99</p>
                </div>
            </div>
            <div class="infinite-scroll-item" data-category="sale">
                <div class="product-card" data-product-id="4">
                    <img src="product4.jpg" alt="Product 4">
                    <h4>Tablet Stand</h4>
                    <p class="price">$29.99 <span style="text-decoration: line-through; color: #999;">$39.99</span></p>
                </div>
            </div>
        </div>
    </div>
    
    <div class="analytics">
        <span id="viewCount">Views: 0</span> | 
        <span id="interactionCount">Interactions: 0</span> | 
        <span id="avgMomentum">Avg Momentum: 0 px/ms</span>
    </div>
</div>

<script>
    // Analytics tracking
    const analytics = {
        views: 0,
        interactions: 0,
        momentumVelocities: [],
        productViews: new Map(),
        lastViewTime: null
    };
    
    // Track which product is currently in view
    function updateProductViews() {
        const container = document.getElementById('productCarousel');
        const items = container.querySelectorAll('.product-card');
        const containerRect = container.getBoundingClientRect();
        const viewportCenter = containerRect.left + containerRect.width / 2;
        
        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(itemCenter - viewportCenter);
            
            // If product is near center of viewport
            if (distance < 150) {
                const productId = item.dataset.productId;
                const now = Date.now();
                
                // Only count as new view if not recently viewed
                if (!analytics.lastViewTime || now - analytics.lastViewTime > 1000) {
                    const currentViews = analytics.productViews.get(productId) || 0;
                    analytics.productViews.set(productId, currentViews + 1);
                    analytics.views++;
                    analytics.lastViewTime = now;
                    updateAnalyticsDisplay();
                }
            }
        });
    }
    
    function updateAnalyticsDisplay() {
        document.getElementById('viewCount').textContent = `Views: ${analytics.views}`;
        document.getElementById('interactionCount').textContent = `Interactions: ${analytics.interactions}`;
        
        if (analytics.momentumVelocities.length > 0) {
            const avg = analytics.momentumVelocities.reduce((a, b) => a + b, 0) / analytics.momentumVelocities.length;
            document.getElementById('avgMomentum').textContent = `Avg Momentum: ${avg.toFixed(2)} px/ms`;
        }
    }
    
    // Initialize carousel with comprehensive callbacks
    const carousel = new InfiniteScrollCarousel('#productCarousel', {
        speed: 35,
        reverseDirection: false,
        pauseOnHover: true,              // Pause when user hovers to view product
        momentumDecay: 0.04,              // Smooth momentum for browsing (slower decay)
        maxMomentumSpeed: 2.8,
        fadeColor: 'rgba(102, 126, 234, 0.8)',  // Match gradient theme
        fadeWidth: 100,
        copies: 3,
        interactable: true,
        
        // Initialize and start tracking
        onReady: () => {
            console.log('Product carousel ready');
            // Start periodic view tracking
            setInterval(updateProductViews, 500);
            
            // Send analytics to server (example)
            // fetch('/api/carousel/init', { method: 'POST' });
        },
        
        // Track user engagement
        onDragStart: () => {
            analytics.interactions++;
            updateAnalyticsDisplay();
            console.log('User started browsing products');
        },
        
        onDrag: (position, deltaX) => {
            // Real-time position tracking for analytics
            // Could be used to determine browsing patterns
        },
        
        onDragEnd: () => {
            // User finished manual browsing
            console.log('Browse session ended');
        },
        
        // Track browsing velocity patterns
        onMomentumStart: (velocity) => {
            analytics.momentumVelocities.push(velocity);
            // Keep only last 50 for average calculation
            if (analytics.momentumVelocities.length > 50) {
                analytics.momentumVelocities.shift();
            }
            updateAnalyticsDisplay();
            console.log(`Browsing momentum: ${velocity.toFixed(2)} px/ms`);
        },
        
        onMomentumEnd: () => {
            console.log('Momentum browsing ended');
        },
        
        // Pause/resume for better UX
        onPause: () => {
            console.log('Carousel paused - user viewing product');
        },
        
        onResume: () => {
            console.log('Carousel resumed - user browsing');
        },
        
        onPositionReset: () => {
            // Seamless loop - invisible to user
            // Could track loop cycles for analytics
        }
    });
    
    // Filter functionality with programmatic control
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Pause carousel during filter transition
            carousel.pause();
            
            // Filter products (simplified - in real app, you'd filter DOM or fetch new data)
            const items = document.querySelectorAll('.infinite-scroll-item');
            items.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Recalculate and resume after brief delay
            setTimeout(() => {
                carousel.calculateScrollDistance(() => {
                    carousel.resume();
                });
            }, 300);
            
            // Track filter usage
            console.log(`Filter applied: ${filter}`);
        });
    });
    
    // Product click handling
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.dataset.productId;
            console.log(`Product clicked: ${productId}`);
            
            // Pause carousel when viewing product details
            carousel.pause();
            
            // In real app: open modal, navigate to product page, etc.
            // For demo: resume after 3 seconds
            setTimeout(() => {
                carousel.resume();
            }, 3000);
        });
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        // Send final analytics
        console.log('Final analytics:', {
            totalViews: analytics.views,
            totalInteractions: analytics.interactions,
            productViews: Object.fromEntries(analytics.productViews),
            avgMomentum: analytics.momentumVelocities.length > 0 
                ? analytics.momentumVelocities.reduce((a, b) => a + b, 0) / analytics.momentumVelocities.length 
                : 0
        });
        
        carousel.destroy();
    });
</script>
```

**Features demonstrated:**
- **Analytics tracking** - Product views, user interactions, browsing patterns
- **Smart filtering** - Programmatic pause/resume with `calculateScrollDistance()` callback
- **Event callbacks** - All callbacks used for real business logic
- **User engagement** - Tracks momentum velocity patterns
- **Product interaction** - Click handling with carousel state management
- **Production patterns** - Analytics collection, cleanup, and data reporting
- **Real-world integration** - Combines carousel with filters, modals, and analytics
- **Custom fade** - Themed gradient matching design
- **Proper lifecycle** - Clean initialization and destruction

---

## Framework Integration

The carousel works with any framework or vanilla JavaScript. Here are examples for popular frameworks:

> 💡 **Tip:** For production builds, use the minified files from the `dist/` folder:
> - `grab-n-drag-infinite-carousel/dist/grab-n-drag-infinite-carousel.min.js`
> - `grab-n-drag-infinite-carousel/dist/grab-n-drag-infinite-carousel.min.css`

### React

```jsx
import { useEffect, useRef } from 'react';
// Development (unminified)
import InfiniteScrollCarousel from 'grab-n-drag-infinite-carousel';
import 'grab-n-drag-infinite-carousel/grab-n-drag-infinite-carousel.css';
// Production (minified)
// import InfiniteScrollCarousel from 'grab-n-drag-infinite-carousel/dist/grab-n-drag-infinite-carousel.min.js';
// import 'grab-n-drag-infinite-carousel/dist/grab-n-drag-infinite-carousel.min.css';

function Carousel({ items }) {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      carouselRef.current = new InfiniteScrollCarousel(containerRef.current, {
        speed: 50,
        pauseOnHover: true
      });
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="infinite-scroll-wrapper">
      <div className="infinite-scroll-container" ref={containerRef}>
        {items.map((item, index) => (
          <div key={index} className="infinite-scroll-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Vue 3 (Composition API)

```vue
<template>
  <div class="infinite-scroll-wrapper">
    <div class="infinite-scroll-container" ref="container">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="infinite-scroll-item"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
// Development (unminified)
import InfiniteScrollCarousel from 'grab-n-drag-infinite-carousel';
import 'grab-n-drag-infinite-carousel/grab-n-drag-infinite-carousel.css';
// Production (minified)
// import InfiniteScrollCarousel from 'grab-n-drag-infinite-carousel/dist/grab-n-drag-infinite-carousel.min.js';
// import 'grab-n-drag-infinite-carousel/dist/grab-n-drag-infinite-carousel.min.css';

const props = defineProps({
  items: Array
});

const container = ref(null);
let carousel = null;

onMounted(() => {
  if (container.value) {
    carousel = new InfiniteScrollCarousel(container.value, {
      speed: 50,
      pauseOnHover: true
    });
  }
});

onBeforeUnmount(() => {
  if (carousel) {
    carousel.destroy();
  }
});
</script>
```

### Vanilla JavaScript

The carousel works perfectly with vanilla JavaScript - see the [Quickstart](README.md#quickstart) section in the README for examples.

---

## Styling Guide

### Required Classes

- `.infinite-scroll-wrapper` - Outer wrapper (handles overflow)
- `.infinite-scroll-container` - Scrolling container
- `.infinite-scroll-item` - Individual items (direct children of container)

### Customization

You can fully customize the look and feel of the carousel by adding your own CSS or extending the default classes.

**1. Item Spacing:**

Change the spacing between items (adjust margin or padding):

```css
.infinite-scroll-item {
    margin-right: 40px; /* Increase space between items */
}
```

**2. Item Styling:**

Style individual items (such as background, border, typography):

```css
.infinite-scroll-item {
    background: #f8f8fc;
    border-radius: 8px;
    padding: 16px 24px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    color: #222;
    font-weight: 500;
}
```

**3. Fade Gradient Colors:**

Override the fade color (defaults to white) on the wrapper edges, either via the API or by customizing CSS if needed. (Set `fadeColor` option in JS.)

**4. Carousel Height and Alignment:**

Adjust item alignment or carousel height to fit your content:

```css
.infinite-scroll-container {
    align-items: flex-start; /* or center, flex-end */
    min-height: 50px;
}
```

**5. Responsive Layouts:**

Make the carousel responsive by adjusting sizes and spacing at different breakpoints:

```css
@media (max-width: 600px) {
    .infinite-scroll-item {
        margin-right: 16px;
        padding: 10px 14px;
        font-size: 0.95em;
    }
}
```

#### Advanced: Add Custom Classes

You can apply your own classes to the wrapper, container, or items for more specific targeting, e.g.

```html
<div class="infinite-scroll-wrapper my-carousel-wrapper">
    <div class="infinite-scroll-container" id="customCarousel">
        <div class="infinite-scroll-item my-carousel-item">Custom 1</div>
        <div class="infinite-scroll-item my-carousel-item">Custom 2</div>
        <div class="infinite-scroll-item my-carousel-item">Custom 3</div>
    </div>
</div>
```

And then:

```css
.my-carousel-wrapper {
    max-width: 900px;
    margin: 0 auto;
    border: 1px solid #ddd;
    background: #fafbfc;
}
.my-carousel-item {
    padding: 24px;
    margin-right: 32px;
    font-size: 18px;
    color: #225577;
}
```

#### Tip

- You can use *any* content inside `.infinite-scroll-item`—icons, images, cards, links, etc.
- You can stack multiple carousels with different IDs and provide tailored styles for each. [See Demo 🠚](https://www.ethanlegum.com/Open-Source-Grab-n-Drag-Infinite-Scroll-Carousel/)

For more advanced interactivity, combine with your JS events or frameworks—just ensure you keep the core class structure for the carousel JavaScript to work.

---

## Troubleshooting

### Items Not Scrolling

**Problem**: Carousel doesn't scroll or items don't move.

**Solutions**:
- Ensure `.infinite-scroll-wrapper` has `overflow: hidden`
- Check that container has direct children
- Verify CSS file is loaded
- Check browser console for errors

### Drag Not Working

**Problem**: Can't drag the carousel.

**Solutions**:
- Ensure `interactable` option is set to true
- Check for CSS that might be blocking pointer events
- Verify JavaScript file is loaded
- Check for JavaScript errors in console

### Items Too Close Together

**Problem**: Items are overlapping or too close.

**Solution**: Add margin to items:
```css
.infinite-scroll-item {
    margin-right: 30px; /* Adjust as needed */
}
```

### Carousel Too Fast/Slow

**Problem**: Scrolling speed is not right.

**Solution**: Adjust the `speed` option:
```javascript
const carousel = new InfiniteScrollCarousel(container, {
    speed: 30 // 0 = doesnt scroll automatically
});
```

### Visible Gap At End Of Items

**Problem**: You see a visible gap because the carousel runs out of duplicated copies to fill the infinite loop.

**Solution**: Increase the `copies` option to add more item duplicates:
```javascript
const carousel = new InfiniteScrollCarousel(container, {
    copies: 4  // Increase this number (default is 3)
});
```

### Clicks or events only work on some items, not the duplicated copies

**Problem**: You attached a click (or other) listener to items before creating the carousel; only the original items respond, not the cloned copies.

**Solution**: Items are cloned for the loop; listeners attached before init are not on the clones. Attach listeners *after* creating the carousel, or use event delegation on the wrapper/container.

### `this` is undefined in my callbacks

**Problem**: You expect `this` to be the carousel inside a callback, but it's undefined or the global object.

**Solution**: Callbacks are invoked with no specific `this`. Use an arrow function and close over your carousel variable, or pass the carousel in via options.

---

## Browser Compatibility

- Chrome 64+, Firefox 69+, Safari 13.1+, Edge 79+
- Mobile support (iOS Safari 13.1+, Android Chrome 64+)

Requires support for:
- `requestAnimationFrame`
- `transform` CSS property
- `addEventListener`
- ResizeObserver (has fallback support)

---

## Accessibility

- **Keyboard Navigation**: Items remain keyboard accessible
- **Screen Readers**: Content is readable by screen readers
- **Focus Management**: Focus states are preserved
- **Touch Support**: Full touch gesture support on mobile devices

### Best Practices

1. Ensure items have proper `alt` text for images
2. Use semantic HTML for carousel items
3. Provide alternative navigation for users who cannot use drag gestures(auto-scroll)
4. Test with keyboard-only navigation

---

## Performance

- Uses `requestAnimationFrame` for smooth 60fps animations
- Sub-pixel precision for smooth scrolling
- Efficient event handling with proper cleanup
- Minimal DOM manipulation
- Debounced resize calculations

### Optimization Tips

1. **Limit Item Count**: While the carousel handles many items, keep it reasonable (< 100 items)
2. **Optimize Images**: Use optimized images for logo/item carousels
3. **Avoid Heavy Animations**: Don't add heavy CSS animations to items

---