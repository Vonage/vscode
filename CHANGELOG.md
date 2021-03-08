# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- New Account view that displays the current balance of the account
  - Clicking on the balance will toggle its display for privacy
  
### Fixed

- Corrected rules for the Help & Feedback view that prevented users
from using them if they weren't authenticated
- Corrected message displayed when authenticating. Previously asked for a url rather than Vonage API key

---

## [0.0.8] - 2021-03-06

### Added

- Application management
  - Create, rename, and delete applications
  - Add, edit, or remove capabilities (voice, messages, rtc, vbc)
- Numbers
  - See listing of numbers owned
- Documentation
  - Quick access to Vonage API dashboard
  - Initial README, CONTRIBUTING, etc.

[unreleased]: https://github.com/vonage/vscode/compare/0.0.8...HEAD
[0.0.8]: https://github.com/vonage/vscode/compare/edc07b4...0.0.8
