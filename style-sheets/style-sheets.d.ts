export declare class StyleSheets {
    private static cachedStyles;
    static cacheStyle(styleName: string): any;
    static mergeStyles(styleList: string[]): any;
    private static getStyleAttributes(styleName);
    private static checkSelectorName(thisSelector, targetSelector);
}
