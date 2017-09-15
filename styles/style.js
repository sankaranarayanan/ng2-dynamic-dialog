"use strict";
var Style = (function () {
    function Style() {
        this.background = null;
        this.dialog = null;
        this.title = null;
        this.buttonClose = {
            style: '',
            image: '',
        };
        this.iconLocked = {
            style: '',
            image: '',
        };
        this.button = {
            general: {
                idle: '',
                hover: '',
            },
            individial: [
                {
                    idle: '',
                    hover: '',
                },
                {
                    idle: '',
                    hover: '',
                },
                {
                    idle: '',
                    hover: '',
                },
            ],
        };
        this.buttonText = null;
    }
    return Style;
}());
exports.Style = Style;
//# sourceMappingURL=style.js.map