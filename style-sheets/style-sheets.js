"use strict";
var StyleSheets = (function () {
    function StyleSheets() {
    }
    StyleSheets.cacheStyle = function (styleName) {
        var styleAttributes = StyleSheets.getStyleAttributes(styleName);
        if (styleAttributes === null) {
            console.warn("ng2-dynamic-dialog: Unable to find " + styleName);
            return null;
        }
        StyleSheets.cachedStyles[styleName] = styleAttributes;
        return styleAttributes;
    };
    StyleSheets.mergeStyles = function (styleList) {
        var styleToReturn = {};
        for (var i = 0; i < styleList.length; ++i) {
            var thisStyleName = styleList[i];
            var thisStyle = StyleSheets.cachedStyles[thisStyleName];
            if (thisStyle === null || thisStyle === undefined) {
                thisStyle = StyleSheets.cacheStyle(thisStyleName);
                if (thisStyle === null) {
                    continue;
                }
            }
            for (var attrname in thisStyle) {
                if (attrname === null || attrname === undefined) {
                    continue;
                }
                var isNaN_1 = Number.isNaN(Number(attrname));
                var isCssText = attrname.toLowerCase() === 'csstext';
                if (isNaN_1 === true && isCssText === false) {
                    var isString = typeof thisStyle[attrname] === 'string' || thisStyle[attrname] instanceof String;
                    if (thisStyle[attrname] != null && isString === true && thisStyle[attrname].length > 0) {
                        styleToReturn[attrname] = thisStyle[attrname];
                    }
                }
            }
        }
        return styleToReturn;
    };
    StyleSheets.getStyleAttributes = function (styleName) {
        styleName = styleName.toLocaleLowerCase();
        if (styleName.startsWith('.') === false) {
            styleName = '.' + styleName;
        }
        for (var i = 0; i < document.styleSheets.length; ++i) {
            var rulesList = null;
            try {
                rulesList = document.styleSheets[i].rules || document.styleSheets[i].cssRules;
            }
            catch (e) {
                if (e.name !== 'SecurityError') {
                    throw e;
                }
            }
            if (rulesList != null) {
                for (var x = 0; x < rulesList.length; x++) {
                    if (rulesList[x].selectorText != null) {
                        var selectorFound = StyleSheets.checkSelectorName(rulesList[x].selectorText, styleName);
                        if (selectorFound === true) {
                            return rulesList[x].style;
                        }
                    }
                }
            }
        }
        return null;
    };
    StyleSheets.checkSelectorName = function (thisSelector, targetSelector) {
        if (thisSelector === null || targetSelector === null) {
            return false;
        }
        var strippedSelectorString = thisSelector.replace(/\[_(.*?)\]/, '');
        var selectorNameToCheck = strippedSelectorString.toLocaleLowerCase();
        return selectorNameToCheck === targetSelector;
    };
    StyleSheets.cachedStyles = {};
    return StyleSheets;
}());
exports.StyleSheets = StyleSheets;
//# sourceMappingURL=style-sheets.js.map