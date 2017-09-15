"use strict";
var tslerp_1 = require('tslerp');
var style_sheets_1 = require('../../style-sheets/style-sheets');
var style_1 = require('../../styles/style');
var behaviour_1 = require('../../styles/behaviour');
var cached_display_styles_1 = require('./cached-display-styles');
var DisplayController = (function () {
    function DisplayController() {
        this.dialogTransitionStates = {
            NONE: 0,
            TRANSITION_IN: 1,
            TRANSITION_OUT: 2,
        };
        this.contentTransitionStates = {
            NONE: 0,
            TRANSITION_IN: 1,
            TRANSITION_OUT: 2,
            DIMENSIONS: 3,
            LOCKING_OUT: 4,
            LOCKING_IN: 5,
            UNLOCKING_OUT: 6,
            UNLOCKING_IN: 7,
        };
        this.buttonState = {
            IDLE: 0,
            HOVER: 1,
        };
        this.lockState = {
            LOCK: 0,
            UNLOCK: 1,
        };
        this.dialogStyle = new style_1.Style();
        this.dialogBehaviour = new behaviour_1.Behaviour();
        this.isActive = false;
        this.dialogTransition = this.dialogTransitionStates.NONE;
        this.contentTransition = this.contentTransitionStates.NONE;
        this.dialogTransitionLerp = new tslerp_1.TsLerp();
        this.lerpTransition = tslerp_1.TsLerpTransition.EaseOut;
        this.lerpStyle = tslerp_1.TsLerpStyle.Quadratic;
        this.dialogOpacity = 0;
        this.dialogWidth = 0;
        this.dialogHeight = 0;
        this.contentOpacity = 0;
        this.lockedIconOpacity = 0;
        this.buttonOpacity = 0;
        this.contentChanging = false;
        this.dimensionsChanging = false;
        this.currentButtonStates = [this.buttonState.IDLE, this.buttonState.IDLE, this.buttonState.IDLE];
        this.currentLockState = this.lockState.UNLOCK;
        this.cachedStyles = new cached_display_styles_1.CachedDisplayStyles();
    }
    DisplayController.prototype.setStyle = function (dialogStyle) {
        if (dialogStyle === null) {
            this.dialogStyle = new style_1.Style();
        }
        else {
            this.dialogStyle = dialogStyle;
        }
        this.cachedStyles.clear();
    };
    DisplayController.prototype.setBehaviour = function (dialogBehaviour) {
        if (dialogBehaviour === null) {
            this.dialogBehaviour = new behaviour_1.Behaviour();
        }
        else {
            this.dialogBehaviour = dialogBehaviour;
        }
    };
    DisplayController.prototype.setEventCallbacks = function (dialogShownCallback, dialogClosedCallback, contentLockedCallback, contentUnockedCallback, dialogTransitionCallback, contentTransitionCallback) {
        this.dialogShownCallback = dialogShownCallback;
        this.dialogClosedCallback = dialogClosedCallback;
        this.contentLockedCallback = contentLockedCallback;
        this.contentUnlockedCallback = contentUnockedCallback;
        this.dialogTransitionCallback = dialogTransitionCallback;
        this.contentTransitionCallback = contentTransitionCallback;
    };
    DisplayController.prototype.setButtonState = function (buttonIndex, state) {
        this.currentButtonStates[buttonIndex] = state;
    };
    DisplayController.prototype.show = function (content) {
        if (this.inTransition() === true) {
            return;
        }
        if (this.isActive === true) {
            this.nextContent = content;
            this.dimensionsChanging = (this.nextContent.height !== this.currentContent.height ||
                this.nextContent.width !== this.currentContent.width);
            this.contentChanging = (this.nextContent.unsafeHtmlContent !== this.currentContent.unsafeHtmlContent ||
                this.nextContent.safeHtmlContent !== this.currentContent.safeHtmlContent ||
                this.nextContent.componentContent !== this.currentContent.componentContent);
            var contentTransition = this.contentTransitionStates.NONE;
            if (this.contentChanging === true) {
                contentTransition = this.contentTransitionStates.TRANSITION_OUT;
            }
            else if (this.dimensionsChanging === true) {
                contentTransition = this.contentTransitionStates.DIMENSIONS;
            }
            if (contentTransition !== this.contentTransitionStates.NONE) {
                this.setContentTransitionState(contentTransition);
            }
        }
        else {
            this.currentContent = content;
            this.setDialogTransitionState(this.dialogTransitionStates.TRANSITION_IN);
            this.dialogWidth = this.currentContent.width;
            this.dialogHeight = this.currentContent.height;
            this.contentOpacity = 1;
            this.buttonOpacity = 1;
            this.lockedIconOpacity = 0;
            this.dimensionsChanging = false;
            this.contentChanging = false;
            this.isActive = true;
            for (var i = 0; i < this.currentButtonStates.length; i++) {
                this.currentButtonStates[i] = this.buttonState.IDLE;
            }
            if (this.dialogShownCallback != null) {
                this.dialogShownCallback();
            }
        }
    };
    DisplayController.prototype.close = function (offDialogClick) {
        if (this.inTransition() === true) {
            return;
        }
        if (this.buttonOpacity <= 0) {
            return;
        }
        if (offDialogClick === true && this.dialogBehaviour.exitOnOffDialogClick === false) {
            return;
        }
        if (this.dialogClosedCallback != null) {
            this.dialogClosedCallback(offDialogClick);
        }
        this.setDialogTransitionState(this.dialogTransitionStates.TRANSITION_OUT);
    };
    DisplayController.prototype.lock = function (lockState, instant, lockStartedCallback) {
        if (instant === true) {
            this.triggerInstantLock(lockState, lockStartedCallback);
            return;
        }
        if (this.inTransition() === true) {
            return;
        }
        if (lockState === this.currentLockState) {
            return;
        }
        this.currentLockState = lockState;
        if (lockStartedCallback != null) {
            lockStartedCallback();
        }
        if (lockState === this.lockState.LOCK) {
            this.setContentTransitionState(this.contentTransitionStates.LOCKING_OUT);
        }
        else if (lockState === this.lockState.UNLOCK) {
            this.setContentTransitionState(this.contentTransitionStates.UNLOCKING_OUT);
        }
    };
    DisplayController.prototype.inTransition = function () {
        return (this.dialogTransition !== this.dialogTransitionStates.NONE || this.contentTransition !== this.contentTransitionStates.NONE);
    };
    DisplayController.prototype.triggerInstantLock = function (lockState, lockStartedCallback) {
        if (this.contentTransition === this.contentTransitionStates.LOCKING_IN ||
            this.contentTransition === this.contentTransitionStates.LOCKING_OUT ||
            this.contentTransition === this.contentTransitionStates.UNLOCKING_IN ||
            this.contentTransition === this.contentTransitionStates.UNLOCKING_OUT) {
            return;
        }
        this.lockedIconOpacity = (lockState === this.lockState.LOCK ? 1 : 0);
        this.buttonOpacity = (lockState === this.lockState.LOCK ? 0 : 1);
        this.currentLockState = lockState;
        if (lockStartedCallback != null) {
            lockStartedCallback();
        }
        var callbackToCall = (lockState === this.lockState.LOCK ? this.contentLockedCallback : this.contentUnlockedCallback);
        if (callbackToCall != null) {
            callbackToCall();
        }
    };
    DisplayController.prototype.setDialogTransitionState = function (transitionState) {
        var _this = this;
        if (transitionState === this.dialogTransitionStates.NONE) {
            this.dialogTransition = this.dialogTransitionStates.NONE;
            return;
        }
        if (transitionState === this.dialogTransitionStates.TRANSITION_IN) {
            this.dialogTransitionLerp.define([[0, 1]], this.dialogBehaviour.transitionTimeDialogs, this.lerpTransition, this.lerpStyle);
        }
        else if (transitionState === this.dialogTransitionStates.TRANSITION_OUT) {
            this.dialogTransitionLerp.define([[1, 0]], this.dialogBehaviour.transitionTimeDialogs, this.lerpTransition, this.lerpStyle);
        }
        this.dialogTransitionLerp.lerp(function (results, time) {
            _this.intervalCallback(results, time);
        });
        this.dialogTransition = transitionState;
    };
    DisplayController.prototype.setContentTransitionState = function (transitionState) {
        var _this = this;
        if (transitionState === this.contentTransitionStates.NONE) {
            this.contentTransition = this.contentTransitionStates.NONE;
            return;
        }
        if (transitionState === this.contentTransitionStates.DIMENSIONS) {
            var lerpValues = [[this.currentContent.width, this.nextContent.width],
                [this.currentContent.height, this.nextContent.height]];
            this.dialogTransitionLerp.define(lerpValues, this.dialogBehaviour.transitionTimeContent, this.lerpTransition, this.lerpStyle);
        }
        else if (transitionState === this.contentTransitionStates.TRANSITION_OUT ||
            transitionState === this.contentTransitionStates.LOCKING_OUT ||
            transitionState === this.contentTransitionStates.UNLOCKING_OUT) {
            this.dialogTransitionLerp.define([[1, 0]], this.dialogBehaviour.transitionTimeContent, this.lerpTransition, this.lerpStyle);
        }
        else if (transitionState === this.contentTransitionStates.TRANSITION_IN ||
            transitionState === this.contentTransitionStates.LOCKING_IN ||
            transitionState === this.contentTransitionStates.UNLOCKING_IN) {
            this.dialogTransitionLerp.define([[0, 1]], this.dialogBehaviour.transitionTimeContent, this.lerpTransition, this.lerpStyle);
        }
        if (this.contentTransitionCallback != null) {
            this.contentTransitionCallback(transitionState);
        }
        this.dialogTransitionLerp.lerp(function (results, time) {
            _this.intervalCallback(results, time);
        });
        this.contentTransition = transitionState;
    };
    DisplayController.prototype.intervalCallback = function (results, time) {
        var finished = time === 1;
        if (this.dialogTransition !== this.dialogTransitionStates.NONE) {
            this.dialogOpacity = results[0];
            if (finished === true) {
                if (this.dialogTransition === this.dialogTransitionStates.TRANSITION_OUT) {
                    this.isActive = false;
                }
                if (this.dialogTransitionCallback != null) {
                    this.dialogTransitionCallback(this.dialogTransition);
                }
            }
        }
        else if (this.contentTransition === this.contentTransitionStates.DIMENSIONS) {
            this.dialogWidth = results[0];
            this.dialogHeight = results[1];
        }
        else if (this.contentTransition === this.contentTransitionStates.TRANSITION_OUT ||
            this.contentTransition === this.contentTransitionStates.TRANSITION_IN) {
            this.contentOpacity = results[0];
        }
        else if (this.contentTransition === this.contentTransitionStates.LOCKING_IN ||
            this.contentTransition === this.contentTransitionStates.UNLOCKING_OUT) {
            this.lockedIconOpacity = results[0];
            this.buttonOpacity = 0;
        }
        else if (this.contentTransition === this.contentTransitionStates.LOCKING_OUT ||
            this.contentTransition === this.contentTransitionStates.UNLOCKING_IN) {
            this.buttonOpacity = results[0];
            this.lockedIconOpacity = 0;
        }
        if (finished === true) {
            var newContentTransitionState = this.contentTransitionStates.NONE;
            if (this.contentTransition === this.contentTransitionStates.TRANSITION_OUT) {
                if (this.dimensionsChanging === true) {
                    newContentTransitionState = this.contentTransitionStates.DIMENSIONS;
                }
                else {
                    newContentTransitionState = this.contentTransitionStates.TRANSITION_IN;
                }
                this.dimensionsChanging = false;
            }
            else if (this.contentTransition === this.contentTransitionStates.DIMENSIONS) {
                if (this.contentChanging === true) {
                    newContentTransitionState = this.contentTransitionStates.TRANSITION_IN;
                }
                this.contentChanging = false;
            }
            else if (this.contentTransition === this.contentTransitionStates.LOCKING_OUT) {
                newContentTransitionState = this.contentTransitionStates.LOCKING_IN;
            }
            else if (this.contentTransition === this.contentTransitionStates.LOCKING_IN) {
                this.contentLockedCallback();
            }
            else if (this.contentTransition === this.contentTransitionStates.UNLOCKING_OUT) {
                newContentTransitionState = this.contentTransitionStates.UNLOCKING_IN;
            }
            else if (this.contentTransition === this.contentTransitionStates.UNLOCKING_IN) {
                this.contentUnlockedCallback();
            }
            this.setContentTransitionState(newContentTransitionState);
            this.setDialogTransitionState(this.dialogTransitionStates.NONE);
            if (newContentTransitionState === this.contentTransitionStates.TRANSITION_IN) {
                this.currentContent = this.nextContent;
            }
        }
    };
    DisplayController.prototype.setStyleBackground = function () {
        if (this.cachedStyles.background === null) {
            var styleList = [
                'ng2-dynamic-dialog-background',
            ];
            if (this.dialogStyle.background != null && this.dialogStyle.background.length > 0) {
                styleList.push(this.dialogStyle.background);
            }
            var styleToUse = style_sheets_1.StyleSheets.mergeStyles(styleList);
            this.cachedStyles.background = styleToUse;
        }
        return this.cachedStyles.background;
    };
    DisplayController.prototype.setStyleModalDialog = function () {
        if (this.cachedStyles.dialog === null) {
            var styleList = [
                'ng2-dynamic-dialog-modal',
            ];
            if (this.dialogStyle.dialog != null && this.dialogStyle.dialog.length > 0) {
                styleList.push(this.dialogStyle.dialog);
            }
            var styleToUse = style_sheets_1.StyleSheets.mergeStyles(styleList);
            this.cachedStyles.dialog = styleToUse;
        }
        this.cachedStyles.dialog['width.px'] = this.dialogWidth;
        this.cachedStyles.dialog['height.px'] = this.dialogHeight;
        this.cachedStyles.dialog['opacity'] = this.dialogOpacity;
        return this.cachedStyles.dialog;
    };
    DisplayController.prototype.setStyleTitle = function () {
        if (this.cachedStyles.title === null) {
            var styleList = [
                'ng2-dynamic-dialog-modal-title',
            ];
            if (this.dialogStyle.title != null && this.dialogStyle.title.length > 0) {
                styleList.push(this.dialogStyle.title);
            }
            var styleToUse = style_sheets_1.StyleSheets.mergeStyles(styleList);
            this.cachedStyles.title = styleToUse;
        }
        return this.cachedStyles.title;
    };
    DisplayController.prototype.setStyleCloseButton = function () {
        if (this.cachedStyles.closeButton === null) {
            var styleList = [
                'ng2-dynamic-dialog-modal-button-close',
            ];
            if (this.dialogStyle.buttonClose.style != null && this.dialogStyle.buttonClose.style.length > 0) {
                styleList.push(this.dialogStyle.buttonClose.style);
            }
            var styleToUse = style_sheets_1.StyleSheets.mergeStyles(styleList);
            this.cachedStyles.closeButton = styleToUse;
        }
        this.cachedStyles.closeButton['opacity'] = this.buttonOpacity;
        if (this.inTransition() === true) {
            this.cachedStyles.closeButton['cursor'] = 'default';
        }
        else {
            this.cachedStyles.closeButton['cursor'] = 'pointer';
        }
        return this.cachedStyles.closeButton;
    };
    DisplayController.prototype.setStyleLockedIcon = function () {
        if (this.cachedStyles.lockedImage === null) {
            var styleList = [
                'ng2-dynamic-dialog-modal-icon-locked',
            ];
            if (this.dialogStyle.iconLocked.style != null && this.dialogStyle.iconLocked.style.length > 0) {
                styleList.push(this.dialogStyle.iconLocked.style);
            }
            var styleToUse = style_sheets_1.StyleSheets.mergeStyles(styleList);
            this.cachedStyles.lockedImage = styleToUse;
        }
        this.cachedStyles.lockedImage['opacity'] = this.lockedIconOpacity;
        return this.cachedStyles.lockedImage;
    };
    DisplayController.prototype.setStyleButtonText = function () {
        if (this.cachedStyles.buttonText === null) {
            var styleList = [
                'ng2-dynamic-dialog-modal-button-text',
            ];
            if (this.dialogStyle.buttonText != null && this.dialogStyle.buttonText.length > 0) {
                styleList.push(this.dialogStyle.buttonText);
            }
            var styleToUse = style_sheets_1.StyleSheets.mergeStyles(styleList);
            this.cachedStyles.buttonText = styleToUse;
        }
        return this.cachedStyles.buttonText;
    };
    DisplayController.prototype.setStyleButton = function (buttonIndex) {
        var styleList = [
            'ng2-dynamic-dialog-modal-button',
        ];
        if (this.dialogStyle.button.general.idle != null && this.dialogStyle.button.general.idle.length > 0) {
            styleList.push(this.dialogStyle.button.general.idle);
        }
        var individualButtonStyle = "ng2-dynamic-dialog-modal-button-button-" + buttonIndex;
        styleList.push(individualButtonStyle);
        var usersIndividualStyle = this.dialogStyle.button.individial[buttonIndex];
        if (usersIndividualStyle.idle != null && usersIndividualStyle.idle.length > 0) {
            styleList.push(usersIndividualStyle.idle);
        }
        if (this.currentButtonStates[buttonIndex] === this.buttonState.HOVER) {
            styleList.push('ng2-dynamic-dialog-modal-button:hover');
            if (this.dialogStyle.button.general.hover != null && this.dialogStyle.button.general.hover.length > 0) {
                styleList.push(this.dialogStyle.button.general.hover);
            }
        }
        var styleToUse = style_sheets_1.StyleSheets.mergeStyles(styleList);
        styleToUse['opacity'] = this.buttonOpacity;
        if (this.inTransition() === true) {
            styleToUse['cursor'] = 'default';
        }
        else {
            styleToUse['cursor'] = 'pointer';
        }
        return styleToUse;
    };
    return DisplayController;
}());
exports.DisplayController = DisplayController;
//# sourceMappingURL=display-controller.js.map