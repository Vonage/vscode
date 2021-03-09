"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeMemento = void 0;
const stateValues = {
    isStreaming: false
};
exports.fakeMemento = {
    get(key) {
        return stateValues[key];
    },
    update(key, value) {
        stateValues[key] = value;
        return Promise.resolve();
    }
};
//# sourceMappingURL=fakeMemento.js.map