# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2026-01-31

### Added
- `disableMomentum` option - when true, drag end snaps and resumes auto-scroll without momentum
- `setSpeed(value)` - set scroll speed at runtime (validated/clamped)
- `setReverseDirection(boolean)` - set scroll direction at runtime
- `setFadeColor(color)` - set fade color at runtime and re-apply to wrapper
- `setFadeWidth(value)` - set fade width at runtime and re-apply to wrapper

## [1.1.1] - 2026-01-30

### Fixed
- `destroy()` now prevents measurement callbacks (e.g. `onReady`) from running after the instance is destroyed
- `copies` option now enforces maximum of 100; values above 100 are clamped with a console warning
- Removed redundant speed validation
- Options built from defaults only; user values overwrite only when type-valid (numbers, booleans, strings, callbacks)
- Momentum runs inside the main `animate()` loop using frame `deltaTime` instead of a separate rAF chain
- `destroy()` clears `boundHandlers` so no references to bound functions remain

## [1.1.0] - 2026-01-26

### Added
- Event callbacks: `onReady`, `onDragStart`, `onDrag`, `onDragEnd`, `onMomentumStart`, `onMomentumEnd`, `onPositionReset`, `onPause`, `onResume`
- Comprehensive visual testing file

### Changed
- `momentumDecay` parameter to use complement as input (higher number = quicker decay)

## [1.0.1] - 2026-01-13

### Fixed
- Incorrect dimension calculations when images load slowly
- Layout issues when items resize dynamically
- Memory leaks from ResizeObserver not being cleaned up

## [1.0.0] - 2026-01-11

### Added
- Initial release
- Infinite seamless scrolling
- Grab and drag interaction
- Momentum scrolling physics
- Touch and mouse support
- Pause on hover functionality
