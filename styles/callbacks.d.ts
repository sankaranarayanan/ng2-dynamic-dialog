export declare enum CallbackResult {
    CallSubsequent = 0,
    None = 1,
}
export declare class Callbacks {
    owner: any;
    onButton1Clicked: (nextOwner: any) => CallbackResult;
    onButton2Clicked: (nextOwner: any) => CallbackResult;
    onButton3Clicked: (nextOwner: any) => CallbackResult;
    onButtonExitClicked: (nextOwner: any) => CallbackResult;
    onButtonEnter: (nextOwner: any) => CallbackResult;
    onButtonExit: (nextOwner: any) => CallbackResult;
    onDialogOpening: (nextOwner: any) => CallbackResult;
    onDialogOpened: (nextOwner: any) => CallbackResult;
    onDialogClosing: (nextOwner: any) => CallbackResult;
    onDialogClosed: (nextOwner: any) => CallbackResult;
    onTransitionDimensions: (nextOwner: any) => CallbackResult;
    onTransitionContentHide: (nextOwner: any) => CallbackResult;
    onTransitionContentShow: (nextOwner: any) => CallbackResult;
    onContentLocking: (nextOwner: any) => CallbackResult;
    onContentLocked: (nextOwner: any) => CallbackResult;
    onContentUnlocking: (nextOwner: any) => CallbackResult;
    onContentUnlocked: (nextOwner: any) => CallbackResult;
}
