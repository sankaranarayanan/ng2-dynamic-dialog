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
var DynamicCreatorComponent = (function () {
    function DynamicCreatorComponent(resolver) {
        this.resolver = resolver;
        this.isViewInitialized = false;
    }
    DynamicCreatorComponent.prototype.ngOnChanges = function () {
        this.updateComponent();
    };
    DynamicCreatorComponent.prototype.ngOnInit = function () {
        this.isViewInitialized = true;
        this.updateComponent();
    };
    DynamicCreatorComponent.prototype.ngOnDestroy = function () {
        if (this.componentReference) {
            this.componentReference.destroy();
        }
    };
    DynamicCreatorComponent.prototype.updateComponent = function () {
        if (!this.isViewInitialized) {
            return;
        }
        if (this.componentReference) {
            this.componentReference.destroy();
            if (this.componentDestroyedCallback !== null) {
                this.componentDestroyedCallback();
            }
        }
        var componentFactory = this.resolver.resolveComponentFactory(this.componentType);
        this.componentReference = this.dynamicTarget.createComponent(componentFactory);
        if (this.componentCreatedCallback !== null) {
            this.componentCreatedCallback(this.componentReference.instance);
        }
    };
    __decorate([
        core_1.ViewChild('dynamicTarget', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', Object)
    ], DynamicCreatorComponent.prototype, "dynamicTarget", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DynamicCreatorComponent.prototype, "componentType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], DynamicCreatorComponent.prototype, "componentCreatedCallback", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], DynamicCreatorComponent.prototype, "componentDestroyedCallback", void 0);
    DynamicCreatorComponent = __decorate([
        core_1.Component({
            selector: 'ng2-dynamic-creator-component',
            template: "<div #dynamicTarget></div>",
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver])
    ], DynamicCreatorComponent);
    return DynamicCreatorComponent;
}());
exports.DynamicCreatorComponent = DynamicCreatorComponent;
//# sourceMappingURL=dynamic-creator.component.js.map