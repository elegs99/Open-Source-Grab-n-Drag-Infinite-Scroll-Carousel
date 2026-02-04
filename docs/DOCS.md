# Complete Documentation

> 📖 **Full API reference, examples, and advanced usage guide**

For [quickstart](../README.md#quickstart) and [installation](../README.md#installation), see the [README](../README.md).

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
| `speed` | number | `50` | Auto-scroll speed in pixels per second. Use `0` to turn off auto-scroll. |
| `reverseDirection` | boolean | `false` | If `false`, content scrolls right to left; if `true`, scrolls left to right. |
| `fadeColor` | string | `#ffffff` | Color of the left/right edge fade (hex, rgb, or rgba). Use `'transparent'` to hide. |
| `fadeWidth` | number | `50` | Width of the edge fade in pixels. |
| `momentumDecay` | number | `0.05` | How quickly drag momentum fades after release (0.01–0.5). Higher = stops sooner. |
| `maxMomentumSpeed` | number | `2.0` | Maximum momentum speed after release, in px/ms (0.5–25). |
| `disableMomentum` | boolean | `false` | If `true`, no momentum after release; position snaps and auto-scroll resumes. |
| `pauseOnHover` | boolean | `true` | If `true`, auto-scroll pauses while the pointer is over the carousel. |
| `interactable` | boolean | `true` | If `true`, users can drag; if `false`, drag is disabled. |
| `copies` | number | `3` | Number of full item sets cloned for the infinite loop (3–100). |

### Methods

| Method | Description |
|--------|-------------|
| `pause()` | Pause automatic scrolling. The animation loop continues but position updates are paused. |
| `resume()` | Resume paused scrolling or start scrolling if stopped. Handles both resuming from pause and starting from stop. |
| `setSpeed(value)` | Set scroll speed in pixels per second. Value is validated and clamped (negative becomes positive with reverse direction). No-op if destroyed. |
| `setReverseDirection(value)` | Set scroll direction. `true` = reverse (right to left), `false` = forward (left to right). No-op if destroyed. |
| `setFadeColor(color)` | Set edge fade color (hex, rgb, or rgba) and re-apply to the wrapper. No-op if destroyed or invalid input. |
| `setFadeWidth(value)` | Set fade gradient width in pixels and re-apply to the wrapper. No-op if destroyed or invalid input. |
| `calculateScrollDistance(callback?)` | Recalculate scroll distance for seamless looping (e.g. after DOM/filter changes). Optional callback runs after calculation completes. No-op if destroyed. |
| `destroy()` | Clean up event listeners and reset the carousel. Call when removing the carousel from the page. Does not remove duplicated DOM nodes. |

**Example usage:**

```javascript
carousel.pause();
carousel.resume();
carousel.setSpeed(75);
carousel.setReverseDirection(true);
carousel.setFadeColor('#ff0000');
carousel.setFadeWidth(80);
carousel.calculateScrollDistance(() => { /* optional: run after recalc */ });
carousel.destroy();
```

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

### Example 2: Reverse Direction with Custom Fade and Runtime Controls

A carousel with custom fade and reverse direction (options). The buttons call `setSpeed(value)` (20, 50, 100) and `setReverseDirection(boolean)` (L►R true, L◄R false). The carousel can be read-only (`interactable: false`) so that speed and direction change only via the API.

```html
<style>
    .testimonial-carousel .infinite-scroll-item {
        padding: 10px 20px;
        margin-right: 30px;
        background: #1a1a2e;
        border-radius: 12px;
        color: white;
        min-width: 200px;
    }
    .carousel-controls { text-align: center; margin-bottom: 16px; }
    .carousel-controls button {
        padding: 8px 16px;
        margin: 0 4px;
        border: 2px solid #1a1a2e;
        background: white;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
    }
    .carousel-controls button.active { background: #1a1a2e; color: white; }
    .carousel-controls .control-group { margin-bottom: 8px; }
    .carousel-controls .control-group:last-child { margin-bottom: 0; }
    .carousel-controls .control-group .control-label { margin-left: 30px; }
    .carousel-controls .control-label { font-size: 12px; color: #666; margin-right: 8px; }
</style>

<div class="carousel-controls">
    <div class="control-group">
        <span class="control-label">setSpeed(value):</span>
        <button type="button" data-speed="20">Slower (20)</button>
        <button type="button" data-speed="50" class="active">Normal (50)</button>
        <button type="button" data-speed="100">Faster (100)</button>
        <span class="control-label">setReverseDirection(boolean):</span>
        <button type="button" data-direction="true" class="active">L►R (true)</button>
        <button type="button" data-direction="false">L◄R (false)</button>
    </div>
</div>

<div class="infinite-scroll-wrapper testimonial-carousel">
    <div class="infinite-scroll-container" id="testimonialCarousel">
        <div class="infinite-scroll-item">
            <p>"Amazing product!" – John Doe</p>
        </div>
        <div class="infinite-scroll-item">
            <p>"Best service ever!" – Jane Smith</p>
        </div>
        <div class="infinite-scroll-item">
            <p>"Highly recommended!" – Bob Johnson</p>
        </div>
    </div>
</div>

<script>
    const carousel = new InfiniteScrollCarousel('#testimonialCarousel', {
        speed: 40,
        reverseDirection: true,
        pauseOnHover: false,
        fadeColor: '#1a1a2e',
        fadeWidth: 80,
        interactable: false
    });

    document.querySelectorAll('[data-speed]').forEach(btn => {
        btn.addEventListener('click', function() {
            carousel.setSpeed(Number(this.dataset.speed));
            document.querySelectorAll('[data-speed]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    document.querySelectorAll('[data-direction]').forEach(btn => {
        btn.addEventListener('click', function() {
            carousel.setReverseDirection(this.dataset.direction === 'true');
            document.querySelectorAll('[data-direction]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
</script>
```

**Features demonstrated:**
- `reverseDirection`, `fadeColor`, `fadeWidth` (options)
- `interactable: false` (read-only; speed and direction change only via API)
- **setSpeed()** and **setReverseDirection()** at runtime
- Custom styling integration

---

### Example 3: Real-world Carousel with Analytics

A simple product strip with a single analytics row. All metrics come from callbacks: Views (onReady, onPositionReset), Interactions (onDragStart), Drags done (onDragEnd), Pauses (onPause), Resumes (onResume).

```html
<style>
    .carousel-wrap {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 32px 0;
        border-radius: 12px;
    }
    .product-card {
        background: white;
        border-radius: 12px;
        padding: 20px;
        margin-right: 20px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        min-width: 220px;
        transition: transform 0.2s;
    }
    .product-card:hover { transform: translateY(-4px); }
    .product-card img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 12px;
    }
    .product-card h4 { margin: 0 0 6px 0; font-size: 1rem; color: #333; }
    .product-card .price { font-size: 1.1rem; font-weight: bold; color: #667eea; }
    .analytics-row {
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        padding: 12px 16px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        display: flex;
        flex-wrap: wrap;
    }
    .analytics-row .cell {
        flex: 1;
        min-width: 0;
        padding: 8px 12px;
        text-align: center;
        color: white;
        font-size: 13px;
    }
    .analytics-row .cell .value { font-weight: 700; }
</style>

<div class="carousel-wrap">
    <div class="infinite-scroll-wrapper">
        <div class="infinite-scroll-container" id="showcaseCarousel">
            <div class="infinite-scroll-item">
                <div class="product-card">
                    <img src="product1.jpg" alt="Product 1">
                    <h4>Premium Headphones</h4>
                    <p class="price">$199.99</p>
                </div>
            </div>
            <div class="infinite-scroll-item">
                <div class="product-card">
                    <img src="product2.jpg" alt="Product 2">
                    <h4>Wireless Speaker</h4>
                    <p class="price">$79.99</p>
                </div>
            </div>
            <div class="infinite-scroll-item">
                <div class="product-card">
                    <img src="product3.jpg" alt="Product 3">
                    <h4>Smart Watch</h4>
                    <p class="price">$299.99</p>
                </div>
            </div>
        </div>
    </div>
    <div class="analytics-row">
        <div class="cell">Views <span class="value" id="showcaseViews">0</span></div>
        <div class="cell">Interactions <span class="value" id="showcaseInteractions">0</span></div>
        <div class="cell">Drags done <span class="value" id="showcaseDragsDone">0</span></div>
        <div class="cell">Pauses <span class="value" id="showcasePauses">0</span></div>
        <div class="cell">Resumes <span class="value" id="showcaseResumes">0</span></div>
    </div>
</div>

<script>
    const analytics = { views: 0, interactions: 0, dragsDone: 0, pauses: 0, resumes: 0 };

    function updateAnalytics() {
        document.getElementById('showcaseViews').textContent = analytics.views;
        document.getElementById('showcaseInteractions').textContent = analytics.interactions;
        document.getElementById('showcaseDragsDone').textContent = analytics.dragsDone;
        document.getElementById('showcasePauses').textContent = analytics.pauses;
        document.getElementById('showcaseResumes').textContent = analytics.resumes;
    }

    const carousel = new InfiniteScrollCarousel('#showcaseCarousel', {
        speed: 50,
        pauseOnHover: true,
        fadeColor: 'rgba(102, 126, 234, 0.8)',
        fadeWidth: 80,
        onReady: () => { analytics.views++; updateAnalytics(); },
        onDragStart: () => { analytics.interactions++; updateAnalytics(); },
        onDragEnd: () => { analytics.dragsDone++; updateAnalytics(); },
        onPause: () => { analytics.pauses++; updateAnalytics(); },
        onResume: () => { analytics.resumes++; updateAnalytics(); },
        onPositionReset: () => { analytics.views++; updateAnalytics(); }
    });

    window.addEventListener('beforeunload', () => carousel.destroy());
</script>
```

**Features demonstrated:**
- **Callbacks** — onReady, onDragStart, onDragEnd, onPause, onResume, onPositionReset used to drive a simple analytics row (views, interactions, drags done, pauses, resumes).
- Custom fade and styling.
- Lifecycle — `destroy()` on beforeunload.

---

## Framework Integration

The carousel works with any framework or vanilla JavaScript. Here are examples for popular frameworks:

> 💡 **Tip:** Use the **root** entry (package default) for development/unminified; use **dist/** for production/minified. See [README Installation](../README.md#installation) for import and CDN patterns.

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

The carousel works perfectly with vanilla JavaScript - see the [Quickstart](../README.md#quickstart) section in the README for examples.

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

Override the fade color (defaults to white) on the wrapper edges, either via the API or by customizing CSS if needed. Set the [fadeColor](#options) option in JS.

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
- Ensure the [interactable](#options) option is set to true
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

**Solution**: Adjust the [speed](#options) option:
```javascript
const carousel = new InfiniteScrollCarousel(container, {
    speed: 30 // 0 = doesnt scroll automatically
});
```

### Visible Gap At End Of Items

**Problem**: You see a visible gap because the carousel runs out of duplicated copies to fill the infinite loop.

**Solution**: Increase the [copies](#options) option to add more item duplicates:
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

**Solution**: Callbacks are invoked with no specific `this` (see [Event Callbacks Details](#event-callbacks-details)). Use an arrow function and close over your carousel variable, or pass the carousel in via options.

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