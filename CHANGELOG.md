# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Applications now display as tree views that can be expanded to see assigned numbers
- Numbers can be assigned to an application using the context menu on the Numbers view
- Numbers can be removed from an application using the context menu on the Applications view
- Numbers can be purchased using the context button on the Numbers view
- Numbers can be canceled using the context menu on a number in any tree view
- Numbers can be copied to the clipboard using the context menu on a number in any tree view

### Updated

- Extension now uses approved Vonage icons
- Numbers view renamed Unassigned Numbers to reflect that it only displays numbers unassigned from an application

### Infrastructure

- CI process now confirms all tests pass on Linux, macOS, and Windows
- CD process now generates versions on creation of releases in GitHub
- Adding unit tests for existing extension capabilities

---

## [0.0.10] - 2021-03-08

### Added

- New Account view that displays the current balance of the account
  - Clicking on the balance will toggle its display for privacy
  
### Fixed

- Corrected rules for the Help & Feedback view that prevented users
from using them if they weren't authenticated
- Corrected message displayed when authenticating. Previously asked for a url rather than Vonage API key

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

[unreleased]: https://github.com/vonage/vscode/compare/0.0.10...HEAD
[0.0.10]: https://github.com/vonage/vscode/compare/0.0.8...0.0.10
[0.0.8]: https://github.com/vonage/vscode/compare/edc07b4...0.0.8
