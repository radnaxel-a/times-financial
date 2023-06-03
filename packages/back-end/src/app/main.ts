import { Express } from 'express';
import { Method } from './interfaces/Method.enum';
import { Controllers } from './utils/Controllers';

export class Main {

    public express: Express;

    constructor(_express: Express) {
        this.express = _express;    
    }

    public init(): void {
        this.createControllers();
    }

    private createControllers(): void {
        const controllers = new Controllers().create();

        for (const ctrl of controllers) {
            this.express[Method.GET](`/${ctrl.path}`, ctrl[Method.GET]);
            this.express[Method.GET](`/${ctrl.path}/:uid`, ctrl[Method.GET]);
            this.express[Method.POST](`/${ctrl.path}`, ctrl[Method.POST]);
            this.express[Method.PUT](`/${ctrl.path}/:uid`, ctrl[Method.PUT]);
            this.express[Method.DELETE](`/${ctrl.path}/:uid`, ctrl[Method.DELETE]);
        }
    }
}
