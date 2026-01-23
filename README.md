# Grab-n-Drag Infinite Scrolling Carousel

A lightweight, dependency-free infinite scrolling carousel component with grab-and-drag interaction, momentum scrolling, and seamless looping. Perfect for showcasing logos, skills, testimonials, or any horizontally scrollable content.

![npm version](https://img.shields.io/npm/v/grab-n-drag-infinite-carousel) ![CI](https://github.com/elegs99/Open-Source-Grab-n-Drag-Infinite-Scroll-Carousel/workflows/CI/badge.svg) ![npm downloads](https://img.shields.io/npm/dm/grab-n-drag-infinite-carousel) ![GitHub issues](https://img.shields.io/github/issues/elegs99/Open-Source-Grab-n-Drag-Infinite-Scroll-Carousel) ![License](https://img.shields.io/npm/l/grab-n-drag-infinite-carousel)

## Demo

![Demo GIF of Infinite Scrolling Carousel](demo/assets/demo.gif)
View the interactive [demo page](https://www.ethanlegum.com/Open-Source-Grab-n-Drag-Infinite-Scroll-Carousel/) for live examples and usage.

## Features

- **Infinite Seamless Loop** - Automatically duplicates items for continuous scrolling with no visible jumps
- **Grab and Drag** - Interactive dragging with mouse and touch support
- **Momentum Scrolling** - Natural momentum physics after drag release
- **Pause on Hover** - Optional pause when hovering over the carousel
- **Event Callbacks** - Hook into lifecycle events and user interactions
- **Zero Dependencies** - Pure vanilla JavaScript, no jQuery or frameworks required
- **Lightweight** - Works in all modern browsers
- **HTML Accessible** - Maintains keyboard navigation and screen reader compatibility

## Bundle Size

- **JavaScript (minified)**: 16 KB
- **CSS (minified)**: 5 KB  
- **Total (gzipped)**: ~22 KB
- **Zero dependencies** - No additional bundle weight

## Installation

### npm (Recommended)

```bash
npm install grab-n-drag-infinite-carousel
```

Then import in your project:

```javascript
// ES Modules
import InfiniteScrollCarousel from 'grab-n-drag-infinite-carousel';
import 'grab-n-drag-infinite-carousel/grab-n-drag-infinite-carousel.css';
// or
// CommonJS
const InfiniteScrollCarousel = require('grab-n-drag-infinite-carousel');
require('grab-n-drag-infinite-carousel/grab-n-drag-infinite-carousel.css');
```

### CDN

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/grab-n-drag-infinite-carousel@latest/grab-n-drag-infinite-carousel.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/grab-n-drag-infinite-carousel@latest/grab-n-drag-infinite-carousel.js"></script>
```

### Manual Download

Download the files directly from the repository:
- `grab-n-drag-infinite-carousel.js` (or `grab-n-drag-infinite-carousel.min.js` for production)
- `grab-n-drag-infinite-carousel.css` (or `grab-n-drag-infinite-carousel.min.css` for production)

### TypeScript Support

TypeScript definitions are included! If you're using TypeScript, you'll get full type checking and IntelliSense support:

```typescript
import InfiniteScrollCarousel, { InfiniteScrollCarouselOptions } from 'grab-n-drag-infinite-carousel';

const options: InfiniteScrollCarouselOptions = {
  speed: 50,
  pauseOnHover: true
};

const carousel = new InfiniteScrollCarousel('#myCarousel', options);
```

## Quickstart

### 1. Include the Files

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="grab-n-drag-infinite-carousel.css">
</head>
<body>
    <!-- Carousel HTML structure -->

    <script src="grab-n-drag-infinite-carousel.js"></script>
    <script>
        // Initialize carousel
    </script>
</body>
</html>
```

### 2. Basic HTML Structure

```html
<div class="infinite-scroll-wrapper">
    <div class="infinite-scroll-container" id="myCarousel">
        <div class="infinite-scroll-item">Item 1<!-- Customize elements for your use case --></div>
        <div class="infinite-scroll-item">Item 2</div>
        <div class="infinite-scroll-item">Item 3</div>
        <!-- Add more items as needed -->
    </div>
</div>
```

### 3. Initialize the Carousel

```javascript
// Get the container element
const container = document.querySelector('#myCarousel');

// Create carousel instance
const carousel = new InfiniteScrollCarousel(container, {
    speed: 50,
    // Initialize options for your use case
});
```

That's it! The carousel will automatically start scrolling.

## API Reference

### Constructor

```javascript
new InfiniteScrollCarousel(container, options)
```

**Parameters:**
- `container` (`HTMLElement` or `string`) - The container element or CSS selector
- `options` (`Object`, optional) - Configuration object

### Options

| Option | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | number | `50` | Auto-scroll speed (pixels/sec). Set to `0` to disable auto-scroll. |
| `reverseDirection` | boolean | `false` | Scroll direction. `false`: right to left →, `true`: left to right ← |
| `pauseOnHover` | boolean | `true` | Pauses scrolling when the pointer hovers an element. |
| `momentumDecay` | number | `0.95` | Drag momentum decay rate (Range: `0.5–0.99`). |
| `maxMomentumSpeed` | number | `2.0` | Maximum momentum speed in px/ms (Range: `0.5–25`). |
| `fadeColor` | string | `#ffffff` | Edge fade color (`hex`, `rgb`, `rgba`). Use `transparent` to disable. |
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
| `onPositionReset` | `() => void` | Fires when position resets during seamless loop |
| `onPause` | `() => void` | Fires when carousel is paused |
| `onResume` | `() => void` | Fires when carousel is resumed |

### Methods

- `pause()` - Pause automatic scrolling
- `resume()` - Resume paused scrolling
- `destroy()` - Clean up event listeners and reset the carousel

> 📖 **For detailed API documentation, examples, and advanced usage, see [DOCS.md](DOCS.md)**

## Examples

### Basic Example

```html
<div class="infinite-scroll-wrapper">
    <div class="infinite-scroll-container" id="myCarousel">
        <div class="infinite-scroll-item">
            <img src="logo1.png" alt="Logo 1">
        </div>
        <div class="infinite-scroll-item">
            <img src="logo2.png" alt="Logo 2">
        </div>
        <div class="infinite-scroll-item">
            <img src="logo3.png" alt="Logo 3">
        </div>
    </div>
</div>

<script>
    const carousel = new InfiniteScrollCarousel('#myCarousel', {
        speed: 50,
        pauseOnHover: true
    });
</script>
```

### Custom Configuration

```html
<div class="infinite-scroll-wrapper">
    <div class="infinite-scroll-container" id="customCarousel">
        <div class="infinite-scroll-item">Item 1</div>
        <div class="infinite-scroll-item">Item 2</div>
        <div class="infinite-scroll-item">Item 3</div>
    </div>
</div>

<script>
    const carousel = new InfiniteScrollCarousel('#customCarousel', {
        speed: 40,
        reverseDirection: true,        // Scroll right to left
        fadeColor: '#1a1a2e',          // Custom fade color
        fadeWidth: 80,                  // Wider fade
        momentumDecay: 0.96,            // Smoother momentum
        onReady: () => {
            console.log('Carousel ready!');
        }
    });
</script>
```

> 📖 **For more examples including React/Vue integration, advanced use cases, and styling guides, see [DOCS.md](DOCS.md)**


## Browser Compatibility

✅ Works in all modern browsers (Chrome, Firefox, Safari, Edge)  
✅ Mobile support (iOS Safari, Android Chrome)  
✅ Requires: `requestAnimationFrame`, CSS `transform`, `addEventListener`

## Accessibility

✅ Keyboard navigation support  
✅ Screen reader compatible  
✅ Touch gesture support  
✅ Focus management

## Performance

✅ 60fps smooth animations using `requestAnimationFrame`  
✅ Efficient event handling with proper cleanup  
✅ Minimal DOM manipulation  
✅ Optimized for performance

## Troubleshooting

**Items not scrolling?** Ensure CSS is loaded and container has direct children.  
**Drag not working?** Check that `interactable: true` and no CSS is blocking pointer events.  
**Items too close?** Add margin: `.infinite-scroll-item { margin-right: 30px; }`  
**Speed issues?** Adjust the `speed` option (set to `0` to disable auto-scroll).  
**Large empty gap?** Increase the `copies` option (default: 3).

> 📖 **For detailed troubleshooting, styling guides, framework integration, and more examples, see [DOCS.md](DOCS.md)**


## License

This project is licensed under CC0 1.0 Universal - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or contributions, please open an issue on the repository.
