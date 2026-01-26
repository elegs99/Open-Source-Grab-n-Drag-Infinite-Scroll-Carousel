# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-01-26

### Added
- Event callbacks: `onReady`, `onDragStart`, `onDrag`, `onDragEnd`, `onMomentumStart`, `onMomentumEnd`, `onPositionReset`, `onPause`, `onResume`
- More comprehensive visual testing file

### Changed
- Refactored `momentumDecay` parameter to use complement as input (higher number = quicker decay)

## [1.0.2] - 2026-01-21

### Added
- `fadeWidth` option to customize fade gradient width (default: 50px)
- `interactable` option to enable/disable grab-and-drag interaction (default: true)

### Changed
- Refactored `pause()` and `resume()` methods to handle both starting from stopped state and resuming from paused state

### Removed
- `startScrolling()` method (use `resume()` instead)
- `stop()` method (use `pause()` or `destroy()` instead)

## [1.0.1] - 2026-01-14

### Added
- ResizeObserver for automatic detection of container and item size changes
- Resource loading detection (waits for fonts and images before initialization)
- Debounced resize calculations (100ms) for better performance

### Fixed
- Incorrect dimension calculations when images load slowly
- Layout issues when items resize dynamically
- Memory leaks from ResizeObserver not being cleaned up

## [1.0.0] - 2026-01-12

### Added
- Initial release
- Infinite seamless scrolling
- Grab and drag interaction
- Momentum scrolling physics
- Touch and mouse support
- Pause on hover functionality