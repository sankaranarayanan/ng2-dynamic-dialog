import { Callbacks } from '../../styles/callbacks';
export declare class CallbackController {
    private dialogCallbacks;
    private componentCallbacks;
    setCallbacks(dialogCallbacks: Callbacks): void;
    setComponentCallbacks(componentCallbacks: Callbacks): void;
    onButtonClicked(index: number): void;
    onButtonExitClicked(): void;
    onButtonEnter(): void;
    onButtonExit(): void;
    onDialogOpening(): void;
    onDialogOpened(): void;
    onDialogClosing(): void;
    onDialogClosed(): void;
    onTransitionDimensions(): void;
    onTransitionContentHide(): void;
    onTransitionContentShow(): void;
    onContentLock(): void;
    onContentUnlock(): void;
    onContentLocked(): void;
    onContentUnlocked(): void;
    private triggerCallback(dialogCallbackOwner, dialogCallback, componentCallback);
}
