# Grab-n-Drag Infinite Scrolling Carousel

**A lightweight, dependency-free JavaScript library for creating smooth infinite scrolling carousels with grab-and-drag interaction.**

Perfect for showcasing logos, skills, testimonials, or any scrollable content. Features seamless looping, natural momentum physics, and full touch support, all packed into a tiny ~22KB bundle.

![npm version](https://img.shields.io/npm/v/grab-n-drag-infinite-carousel) ![CI](https://github.com/elegs99/Open-Source-Grab-n-Drag-Infinite-Scroll-Carousel/workflows/CI/badge.svg) ![npm downloads](https://img.shields.io/npm/dm/grab-n-drag-infinite-carousel) ![GitHub issues](https://img.shields.io/github/issues/elegs99/Open-Source-Grab-n-Drag-Infinite-Scroll-Carousel) ![License](https://img.shields.io/npm/l/grab-n-drag-infinite-carousel)

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

Download the files directly from [npm](https://www.npmjs.com/package/grab-n-drag-infinite-carousel) or this repository:
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

### HTML, CSS, JS

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
    <script>
        const container = document.querySelector('#myCarousel');
        const carousel = new InfiniteScrollCarousel(container, {
            speed: 50
        });
    </script>
</body>
</html>
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
| `reverseDirection` | boolean | `false` | Scroll direction. `false`: right to left ←, `true`: left to right → |
| `pauseOnHover` | boolean | `true` | Pauses scrolling when the pointer hovers an element. |
| `momentumDecay` | number | `0.05` | Drag momentum decay rate (Range: `0.01–0.5`). Higher values decay quicker. |
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

> **[View interactive examples with code →](https://www.ethanlegum.com/Open-Source-Grab-n-Drag-Infinite-Scroll-Carousel/)**
> 
> 📖 **For more examples including React/Vue integration, advanced use cases, and styling guides, see [DOCS.md](docs/DOCS.md)**


## Browser Compatibility

✅ Chrome 64+, Firefox 69+, Safari 13.1+, Edge 79+  
✅ Mobile support (iOS Safari 13.1+, Android Chrome 64+)  
✅ Requires: `requestAnimationFrame`, CSS `transform`, `addEventListener` (ResizeObserver has fallback support)

## Accessibility

✅ Keyboard navigation support  
✅ Screen reader compatible  
✅ Touch gesture support  
✅ Focus management

## Performance

✅ 60fps smooth animations using `requestAnimationFrame`  
✅ Efficient event handling with proper cleanup  
✅ Minimal DOM manipulation

## Troubleshooting

**Items not scrolling?** Ensure CSS is loaded and container has direct children.  
**Drag not working?** Check that `interactable: true` and no CSS is blocking pointer events.  
**Items too close?** Add margin: `.infinite-scroll-item { margin-right: 30px; }`  
**Speed issues?** Adjust the `speed` option (set to `0` to disable auto-scroll).  
**Visible gap at end of items?** The carousel runs out of duplicated copies to fill the infinite loop. Increase the `copies` option to add more item duplicates (default: 3).

> 📖 **For detailed troubleshooting, styling guides, framework integration, and more examples, see [DOCS.md](docs/DOCS.md)**


## License

This project is licensed under CC0 1.0 Universal - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](docs/CHANGELOG.md) for a list of changes and version history.

## Support & Contributing

Contributions are welcome! Please feel free to submit a Pull Request.  
For bug reports or feature requests, please [open an issue](https://github.com/elegs99/Open-Source-Grab-n-Drag-Infinite-Scroll-Carousel/issues) on the repository.