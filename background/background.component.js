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
var BackgroundComponent = (function () {
    function BackgroundComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', display_controller_1.DisplayController)
    ], BackgroundComponent.prototype, "displayController", void 0);
    BackgroundComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ng2-dynamic-dialog-background',
            templateUrl: 'background.component.html',
            styleUrls: ['background.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], BackgroundComponent);
    return BackgroundComponent;
}());
exports.BackgroundComponent = BackgroundComponent;
//# sourceMappingURL=background.component.js.map