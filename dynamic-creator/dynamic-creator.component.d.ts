import { ComponentFactoryResolver, OnChanges, OnInit, OnDestroy } from '@angular/core';
export declare class DynamicCreatorComponent implements OnChanges, OnInit, OnDestroy {
    private resolver;
    private componentReference;
    private isViewInitialized;
    private dynamicTarget;
    private componentType;
    private componentCreatedCallback;
    private componentDestroyedCallback;
    constructor(resolver: ComponentFactoryResolver);
    ngOnChanges(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private updateComponent();
}
