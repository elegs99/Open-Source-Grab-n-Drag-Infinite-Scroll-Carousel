# Grab-n-Drag Infinite Scrolling Carousel

**A lightweight, dependency-free JavaScript library for creating smooth infinite scrolling carousels with grab-and-drag interaction.**

Perfect for showcasing logos, skills, testimonials, or any scrollable content. Features seamless looping, natural momentum physics, and full touch support, all packed into a tiny ~30KB package.

![npm version](https://img.shields.io/npm/v/grab-n-drag-infinite-carousel) ![CI](https://github.com/elegs99/Open-Source-Grab-n-Drag-Infinite-Scroll-Carousel/workflows/CI/badge.svg) ![npm downloads](https://img.shields.io/npm/dm/grab-n-drag-infinite-carousel)

<!-- ![GitHub issues](https://img.shields.io/github/issues/elegs99/Open-Source-Grab-n-Drag-Infinite-Scroll-Carousel) ![License](https://img.shields.io/npm/l/grab-n-drag-infinite-carousel) -->

## Demo

![Demo GIF of Infinite Scrolling Carousel](docs/demo/assets/demo.gif)

*[View interactive examples with code →](https://www.ethanlegum.com/Open-Source-Grab-n-Drag-Infinite-Scroll-Carousel/)*

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

- **JavaScript (minified)**: 18.9kB
- **CSS (minified)**: 4.9kB
- **Package Size**: ~30kB
- **Zero dependencies** - No additional bundle weight

## Installation

### npm

```bash
npm install grab-n-drag-infinite-carousel
```

Then import using one of the following:
Use the **root** entry (package default) for development/unminified; use **dist/** paths for production/minified.

```javascript
// ES Modules (development - unminified)
import InfiniteScrollCarousel from 'grab-n-drag-infinite-carousel';
import 'grab-n-drag-infinite-carousel/grab-n-drag-infinite-carousel.css';

// ES Modules (production - minified)
import InfiniteScrollCarousel from 'grab-n-drag-infinite-carousel/dist/grab-n-drag-infinite-carousel.min.js';
import 'grab-n-drag-infinite-carousel/dist/grab-n-drag-infinite-carousel.min.css';

// CommonJS (development - unminified)
const InfiniteScrollCarousel = require('grab-n-drag-infinite-carousel');
require('grab-n-drag-infinite-carousel/grab-n-drag-infinite-carousel.css');

// CommonJS (production - minified)
const InfiniteScrollCarousel = require('grab-n-drag-infinite-carousel/dist/grab-n-drag-infinite-carousel.min.js');
require('grab-n-drag-infinite-carousel/dist/grab-n-drag-infinite-carousel.min.css');
```

### CDN

```html
<!-- CSS (development - unminified) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/grab-n-drag-infinite-carousel@latest/grab-n-drag-infinite-carousel.css">
<!-- CSS (production - minified) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/grab-n-drag-infinite-carousel@latest/dist/grab-n-drag-infinite-carousel.min.css">

<!-- JavaScript (development - unminified) -->
<script src="https://cdn.jsdelivr.net/npm/grab-n-drag-infinite-carousel@latest/grab-n-drag-infinite-carousel.js"></script>
<!-- JavaScript (production - minified) -->
<script src="https://cdn.jsdelivr.net/npm/grab-n-drag-infinite-carousel@latest/dist/grab-n-drag-infinite-carousel.min.js"></script>
```

### Manual Download

Download the files directly from [npm](https://www.npmjs.com/package/grab-n-drag-infinite-carousel) or this repository:

**Development (unminified):**
- `grab-n-drag-infinite-carousel.js`
- `grab-n-drag-infinite-carousel.css`

**Production (minified):**
- `dist/grab-n-drag-infinite-carousel.min.js`
- `dist/grab-n-drag-infinite-carousel.min.css`

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

### HTML

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="grab-n-drag-infinite-carousel.css">
</head>
<body>
    <div class="infinite-scroll-wrapper">
        <div class="infinite-scroll-container" id="myCarousel">
            <div class="infinite-scroll-item">Item 1</div>
            <div class="infinite-scroll-item">Item 2</div>
            <div class="infinite-scroll-item">Item 3</div>
            <!-- Add more items as needed -->
        </div>
    </div>

    <script src="grab-n-drag-infinite-carousel.js"></script>
    <script>
        const container = document.querySelector('#myCarousel');
        const carousel = new InfiniteScrollCarousel(container, {
            speed: 50
        });
    </script>
</body>
</html>
```

That's it! The carousel will automatically start scrolling. For production, use the **dist/** paths or the CDN minified links from the [Installation](#installation) section above.

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
| `pause()` | Pause automatic scrolling. |
| `resume()` | Resume paused scrolling. |
| `setSpeed(value)` | Set scroll speed in pixels per second. |
| `setReverseDirection(value)` | Set scroll direction. |
| `setFadeColor(color)` | Set edge fade color and re-apply to wrapper. |
| `setFadeWidth(value)` | Set fade width in pixels and re-apply to wrapper. |
| `destroy()` | Clean up event listeners and reset the carousel. Call when removing the carousel from the page. |

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

> 📖 **For detailed API documentation, examples, and advanced usage, see [DOCS.md](docs/DOCS.md)**

## Examples

### Basic Example

```html
<div class="infinite-scroll-wrapper">
    <div class="infinite-scroll-container" id="myCarousel">
        <div class="infinite-scroll-item">Item 1</div>
        <div class="infinite-scroll-item">Item 2</div>
        <div class="infinite-scroll-item">Item 3</div>
        <div class="infinite-scroll-item">Item 4</div>
        <div class="infinite-scroll-item">Item 5</div>
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
        reverseDirection: true,         // Scroll left to right
        fadeColor: '#1a1a2e',           // Custom fade color
        fadeWidth: 80,                  // Wider fade
        momentumDecay: 0.04,            // Smoother momentum
        copies: 5,                      // Cover gap with more copies
        onReady: () => {
            console.log('Carousel ready!');
        }
    });
</script>
```
[View interactive examples with code →](https://www.ethanlegum.com/Open-Source-Grab-n-Drag-Infinite-Scroll-Carousel/)

> 📖 **For more examples including React/Vue integration, advanced use cases, and styling guides, see [DOCS.md](docs/DOCS.md)** 

## Browser Compatibility

✅ Chrome 64+, Firefox 69+, Safari 13.1+, Edge 79+  
✅ Mobile support (iOS Safari 13.1+, Android Chrome 64+)  
Requires: `requestAnimationFrame`, CSS `transform`, `addEventListener` (ResizeObserver has fallback support)

## Troubleshooting

**Items not scrolling?** Ensure CSS is loaded and container has direct children.  
**Drag not working?** Check that `interactable: true` and no CSS is blocking pointer events.  
**Items too close?** Add margin: `.infinite-scroll-item { margin-right: 30px; }`  
**Speed issues?** Adjust the [speed](#options) option (set to `0` to disable auto-scroll).  
**Visible gap at end of items?** The carousel runs out of duplicated copies to fill the infinite loop. Increase the [copies](#options) option to add more item duplicates (default: 3).

> 📖 **For detailed troubleshooting, styling guides, framework integration, and more examples, see [DOCS.md](docs/DOCS.md)**


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## Support & Contributing

Contributions are welcome! Please feel free to submit a Pull Request.  
For bug reports or feature requests, please [open an issue](https://github.com/elegs99/Open-Source-Grab-n-Drag-Infinite-Scroll-Carousel/issues) on the repository.