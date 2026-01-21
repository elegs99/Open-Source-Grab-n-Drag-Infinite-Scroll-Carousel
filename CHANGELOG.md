# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-01-20

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