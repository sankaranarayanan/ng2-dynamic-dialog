"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var display_controller_1 = require('../controllers/display-controller/display-controller');
var callback_controller_1 = require('../controllers/callback-controller/callback-controller');
var DialogComponent = (function () {
    function DialogComponent() {
        this.callbackController = new callback_controller_1.CallbackController();
        this.displayController = new display_controller_1.DisplayController();
    }
    DialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.boundOnComponentCreated = this.onComponentCreated.bind(this);
        this.boundOnComponentDestroyed = this.onComponentDestroyed.bind(this);
        this.displayController.setEventCallbacks(function () { return _this.onDialogShown(); }, function (offDialogClick) { return _this.onDialogClosed(offDialogClick); }, function () { return _this.onContentLocked(); }, function () { return _this.onContentUnlocked(); }, function (transitionState) { return _this.onDialogTransition(transitionState); }, function (transitionState) { return _this.onContentTransition(transitionState); });
    };
    DialogComponent.prototype.setStyle = function (dialogStyle) {
        this.displayController.setStyle(dialogStyle);
    };
    DialogComponent.prototype.setBehaviour = function (dialogBehaviour) {
        this.displayController.setBehaviour(dialogBehaviour);
    };
    DialogComponent.prototype.setCallbacks = function (callbacks) {
        this.callbackController.setCallbacks(callbacks);
    };
    DialogComponent.prototype.show = function (content) {
        this.displayController.show(content);
    };
    DialogComponent.prototype.close = function () {
        this.displayController.close(false);
    };
    DialogComponent.prototype.lock = function (instant) {
        var _this = this;
        this.displayController.lock(this.displayController.lockState.LOCK, instant, function () {
            _this.callbackController.onContentLock();
        });
    };
    DialogComponent.prototype.unlock = function (instant) {
        var _this = this;
        this.displayController.lock(this.displayController.lockState.UNLOCK, instant, function () {
            _this.callbackController.onContentUnlock();
        });
    };
    DialogComponent.prototype.inTransition = function () {
        return this.displayController.inTransition();
    };
    DialogComponent.prototype.onDialogShown = function () {
        this.callbackController.onDialogOpening();
    };
    DialogComponent.prototype.onDialogClosed = function (offDialogClick) {
        if (offDialogClick === false) {
            this.callbackController.onButtonExitClicked();
        }
        this.callbackController.onDialogClosing();
    };
    DialogComponent.prototype.onContentLocked = function () {
        this.callbackController.onContentLocked();
    };
    DialogComponent.prototype.onContentUnlocked = function () {
        this.callbackController.onContentUnlocked();
    };
    DialogComponent.prototype.onDialogTransition = function (transitionState) {
        if (transitionState === this.displayController.dialogTransitionStates.TRANSITION_IN) {
            this.callbackController.onDialogOpened();
        }
        else if (transitionState === this.displayController.dialogTransitionStates.TRANSITION_OUT) {
            this.callbackController.onDialogClosed();
        }
    };
    DialogComponent.prototype.onContentTransition = function (transitionState) {
        if (transitionState === this.displayController.contentTransitionStates.DIMENSIONS) {
            this.callbackController.onTransitionDimensions();
        }
        else if (transitionState === this.displayController.contentTransitionStates.TRANSITION_IN) {
            this.callbackController.onTransitionContentShow();
        }
        else if (transitionState === this.displayController.contentTransitionStates.TRANSITION_OUT) {
            this.callbackController.onTransitionContentHide();
        }
        else if (transitionState === this.displayController.contentTransitionStates.LOCKING_OUT) {
            this.callbackController.onContentLock();
        }
        else if (transitionState === this.displayController.contentTransitionStates.UNLOCKING_OUT) {
            this.callbackController.onContentUnlock();
        }
    };
    DialogComponent.prototype.onComponentCreated = function (component) {
        if (typeof (component.getDialogComponentCallbacks) !== 'undefined') {
            var componentCallbacks = component.getDialogComponentCallbacks();
            this.callbackController.setComponentCallbacks(componentCallbacks);
        }
        if (typeof (component.setDialogComponent) !== 'undefined') {
            component.setDialogComponent(this);
        }
    };
    DialogComponent.prototype.onComponentDestroyed = function () {
        this.callbackController.setComponentCallbacks(null);
    };
    DialogComponent.prototype.onButtonClicked = function (buttonIndex) {
        this.callbackController.onButtonClicked(buttonIndex);
    };
    DialogComponent.prototype.onButtonMouseOver = function (buttonIndex) {
        this.displayController.setButtonState(buttonIndex, this.displayController.buttonState.HOVER);
        this.callbackController.onButtonEnter();
    };
    DialogComponent.prototype.onButtonMouseOut = function (buttonIndex) {
        this.displayController.setButtonState(buttonIndex, this.displayController.buttonState.IDLE);
        this.callbackController.onButtonExit();
    };
    DialogComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ng2-dynamic-dialog-modal',
            templateUrl: 'dialog.component.html',
            styleUrls: ['dialog.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], DialogComponent);
    return DialogComponent;
}());
exports.DialogComponent = DialogComponent;
//# sourceMappingURL=dialog.component.js.map