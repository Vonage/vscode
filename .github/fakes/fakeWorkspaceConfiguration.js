"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeWorkspaceConfiguration = void 0;
const extensionConfig = {
    "autoConnect": false
};
/**
 * Fake workspace for use in tests
 */
exports.fakeWorkspaceConfiguration = {
    get(section, defaultValue) {
        return extensionConfig[section] || defaultValue;
    },
    has(section) {
        return Object.keys(extensionConfig).some(c => c === section);
    },
    inspect(section) {
        return undefined;
    },
    update(section, value, configurationTarget) {
        extensionConfig[section] = value;
        return Promise.resolve();
    }
};
//# sourceMappingURL=fakeWorkspaceConfiguration.js.map