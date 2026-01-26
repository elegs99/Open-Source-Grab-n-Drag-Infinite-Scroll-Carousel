# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-01-26

### Added
- Event callbacks: `onReady`, `onDragStart`, `onDrag`, `onDragEnd`, `onMomentumStart`, `onMomentumEnd`, `onPositionReset`, `onPause`, `onResume`
- Comprehensive visual testing file

### Changed
- `pause()` and `resume()` methods to handle both starting from stopped state and resuming from paused state
- `momentumDecay` parameter to use complement as input (higher number = quicker decay)

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