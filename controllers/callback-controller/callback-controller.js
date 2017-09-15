"use strict";
var callbacks_1 = require('../../styles/callbacks');
var callbacks_2 = require('../../styles/callbacks');
var CallbackController = (function () {
    function CallbackController() {
        this.dialogCallbacks = new callbacks_1.Callbacks();
        this.componentCallbacks = new callbacks_1.Callbacks();
    }
    CallbackController.prototype.setCallbacks = function (dialogCallbacks) {
        if (dialogCallbacks === null) {
            this.dialogCallbacks = new callbacks_1.Callbacks();
        }
        else {
            this.dialogCallbacks = dialogCallbacks;
        }
    };
    CallbackController.prototype.setComponentCallbacks = function (componentCallbacks) {
        if (componentCallbacks === null) {
            this.componentCallbacks = new callbacks_1.Callbacks();
        }
        else {
            this.componentCallbacks = componentCallbacks;
        }
    };
    CallbackController.prototype.onButtonClicked = function (index) {
        var dialogMethods = [
            this.dialogCallbacks.onButton1Clicked,
            this.dialogCallbacks.onButton2Clicked,
            this.dialogCallbacks.onButton3Clicked,
        ];
        var componentMethods = [
            this.componentCallbacks.onButton1Clicked,
            this.componentCallbacks.onButton2Clicked,
            this.componentCallbacks.onButton3Clicked,
        ];
        this.triggerCallback(this.dialogCallbacks.owner, dialogMethods[index], componentMethods[index]);
    };
    CallbackController.prototype.onButtonExitClicked = function () {
        this.triggerCallback(this.dialogCallbacks.owner, this.dialogCallbacks.onButtonExitClicked, this.componentCallbacks.onButtonExitClicked);
    };
    CallbackController.prototype.onButtonEnter = function () {
        this.triggerCallback(this.dialogCallbacks.owner, this.dialogCallbacks.onButtonEnter, this.componentCallbacks.onButtonEnter);
    };
    CallbackController.prototype.onButtonExit = function () {
        this.triggerCallback(this.dialogCallbacks.owner, this.dialogCallbacks.onButtonExit, this.componentCallbacks.onButtonExit);
    };
    CallbackController.prototype.onDialogOpening = function () {
        this.triggerCallback(this.dialogCallbacks.owner, this.dialogCallbacks.onDialogOpening, this.componentCallbacks.onDialogOpening);
    };
    CallbackController.prototype.onDialogOpened = function () {
        this.triggerCallback(this.dialogCallbacks.owner, this.dialogCallbacks.onDialogOpened, this.componentCallbacks.onDialogOpened);
    };
    CallbackController.prototype.onDialogClosing = function () {
        this.triggerCallback(this.dialogCallbacks.owner, this.dialogCallbacks.onDialogClosing, this.componentCallbacks.onDialogClosing);
    };
    CallbackController.prototype.onDialogClosed = function () {
        this.triggerCallback(this.dialogCallbacks.owner, this.dialogCallbacks.onDialogClosed, this.componentCallbacks.onDialogClosed);
    };
    CallbackController.prototype.onTransitionDimensions = function () {
        this.triggerCallback(this.dialogCallbacks.owner, this.dialogCallbacks.onTransitionDimensions, this.componentCallbacks.onTransitionDimensions);
    };
    CallbackController.prototype.onTransitionContentHide = function () {
        this.triggerCallback(this.dialogCallbacks.owner, this.dialogCallbacks.onTransitionContentHide, this.componentCallbacks.onTransitionContentHide);
    };
    CallbackController.prototype.onTransitionContentShow = function () {
        this.triggerCallback(this.dialogCallbacks.owner, this.dialogCallbacks.onTransitionContentShow, this.componentCallbacks.onTransitionContentShow);
    };
    CallbackController.prototype.onContentLock = function () {
        this.triggerCallback(this.dialogCallbacks.owner, this.dialogCallbacks.onContentLocking, this.componentCallbacks.onContentLocking);
    };
    CallbackController.prototype.onContentUnlock = function () {
        this.triggerCallback(this.dialogCallbacks.owner, this.dialogCallbacks.onContentUnlocking, this.componentCallbacks.onContentUnlocking);
    };
    CallbackController.prototype.onContentLocked = function () {
        this.triggerCallback(this.dialogCallbacks.owner, this.dialogCallbacks.onContentLocked, this.componentCallbacks.onContentLocked);
    };
    CallbackController.prototype.onContentUnlocked = function () {
        this.triggerCallback(this.dialogCallbacks.owner, this.dialogCallbacks.onContentUnlocked, this.componentCallbacks.onContentUnlocked);
    };
    CallbackController.prototype.triggerCallback = function (dialogCallbackOwner, dialogCallback, componentCallback) {
        var callDialogCallback = callbacks_2.CallbackResult.CallSubsequent;
        if (componentCallback !== null) {
            callDialogCallback = componentCallback(dialogCallbackOwner);
        }
        if (dialogCallback !== null && callDialogCallback === callbacks_2.CallbackResult.CallSubsequent) {
            dialogCallback(null);
        }
    };
    return CallbackController;
}());
exports.CallbackController = CallbackController;
//# sourceMappingURL=callback-controller.js.map