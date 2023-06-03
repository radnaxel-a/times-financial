import { Request, Response } from 'express';
import { Entity } from '../../../db/Entity.enum';
import { IRegion } from '../../../db/interfaces/IRegion';
import { Routes } from '../../config/Routes.enum';
import { Method } from '../../interfaces/Method.enum';
import { Controller } from '../Controller';

export class RegionsController extends Controller {
    /**
     * Set the route for this controller in super()
     */
    constructor() {
        super(Routes.Regions);
    }

    public async [Method.GET](
        request: Request,
        response: Response
    ): Promise<void> {
        const regions: IRegion[] = JSON.parse(
            await super.getEntities(Entity.Regions)
        );

        if (request.params.uid) {
            const region = regions.find(
                (r) => r.region_id === request.params.uid
            );
            response.send(region);
            return;
        }

        response.send(regions);
    }

    public async [Method.POST](
        request: Request,
        response: Response
    ): Promise<void> {
        request.body.region_id = Math.floor(Math.random() * 110000).toString();

        await super.updateEntity(Entity.Regions, Method.POST, request.body);

        const resp = {
            success: true,
            data: request.body,
        };

        response.send(resp);
    }

    public async [Method.PUT](
        request: Request,
        response: Response
    ): Promise<void> {
        await super.updateEntity(Entity.Regions, Method.PUT, request.body);

        const resp = {
            success: true,
            data: request.body,
        };

        response.send(resp);
    }

    public async [Method.DELETE](
        request: Request,
        response: Response
    ): Promise<void> {
        await super.updateEntity(Entity.Regions, Method.DELETE, {
            id: request.params.uid,
        });

        const resp = {
            success: true,
            data: {
                id: request.params.uid,
            },
        };

        response.send(resp);
    }
}
