/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __nccwpck_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

// EXPORTS
__nccwpck_require__.d(__webpack_exports__, {
  "getError": () => (/* reexport */ getError),
  "isEmpty": () => (/* reexport */ isEmpty),
  "isIn": () => (/* reexport */ isIn),
  "isNil": () => (/* reexport */ isNil),
  "isNilOrEmpty": () => (/* reexport */ isNilOrEmpty),
  "lazy": () => (/* reexport */ lazy),
  "trimObject": () => (/* reexport */ trimObject)
});

;// CONCATENATED MODULE: ./src/structure/lazy.ts
function lazy(initializers) {
    return new Proxy({}, {
        get(target, prop) {
            if (!(prop in target) && prop in initializers) {
                target[prop] = initializers[prop]();
            }
            return target[prop];
        },
    });
}

;// CONCATENATED MODULE: ./src/misc/utils.ts
function isNil(it) {
    return it === null || it === undefined;
}
function isEmpty(it) {
    return it.trim() === "";
}
function isNilOrEmpty(it) {
    return isNil(it) || (typeof it === "string" && isEmpty(it));
}
function isIn(l, it) {
    return l.includes(it);
}
function getError(error) {
    if (error instanceof Error) {
        return error.message;
    }
    return JSON.stringify(error);
}
function trimObject(obj, seen = new WeakSet()) {
    if (seen.has(obj))
        return obj;
    seen.add(obj);
    const ret = {};
    Object.entries(obj).forEach(([k, v]) => {
        if (isNilOrEmpty(v))
            return;
        if (typeof v !== "object" || Array.isArray(v)) {
            ret[k] = v;
            return;
        }
        const trimmed = trimObject(v, seen);
        if (isNilOrEmpty(trimmed))
            return;
        ret[k] = trimmed;
    });
    return ret;
}

;// CONCATENATED MODULE: ./src/index.ts



module.exports = __webpack_exports__;
/******/ })()
;