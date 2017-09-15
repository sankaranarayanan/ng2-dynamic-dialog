"use strict";
(function (CallbackResult) {
    CallbackResult[CallbackResult["CallSubsequent"] = 0] = "CallSubsequent";
    CallbackResult[CallbackResult["None"] = 1] = "None";
})(exports.CallbackResult || (exports.CallbackResult = {}));
var CallbackResult = exports.CallbackResult;
var Callbacks = (function () {
    function Callbacks() {
        this.owner = null;
        this.onButton1Clicked = null;
        this.onButton2Clicked = null;
        this.onButton3Clicked = null;
        this.onButtonExitClicked = null;
        this.onButtonEnter = null;
        this.onButtonExit = null;
        this.onDialogOpening = null;
        this.onDialogOpened = null;
        this.onDialogClosing = null;
        this.onDialogClosed = null;
        this.onTransitionDimensions = null;
        this.onTransitionContentHide = null;
        this.onTransitionContentShow = null;
        this.onContentLocking = null;
        this.onContentLocked = null;
        this.onContentUnlocking = null;
        this.onContentUnlocked = null;
    }
    return Callbacks;
}());
exports.Callbacks = Callbacks;
//# sourceMappingURL=callbacks.js.map