import { Request, Response } from 'express';
import * as fs from 'fs/promises';
import { Entity } from '../../db/Entity.enum';
import { IController } from '../interfaces/IController.interface';
import { Method } from '../interfaces/Method.enum';

export abstract class Controller implements IController {
    public path: string;

    constructor(_path: string) {
        this.path = _path;
    }

    abstract get(request: Request, response: Response): void;
    abstract post(request: Request, response: Response): void;
    abstract put(request: Request, response: Response): void;
    abstract delete(request: Request, response: Response): void;

    protected async updateEntity(entity: Entity, method: Method, record: any) {
        let data = JSON.parse(await fs.readFile(entity, 'utf8'));

        switch (method) {
            case Method.POST:
                data.push(record);
                break;
            case Method.PUT:
                data = data.filter(
                    (e: any) => e.region_id !== record.region_id
                );

                data.push(record);

                break;
            case Method.DELETE:
                data = data.filter((e: any) => e.region_id !== record.id);
                break;
            default:
                throw new Error('Action not recognised');
        }

        await fs.writeFile(entity, JSON.stringify(data), { encoding: 'utf8' });
    }

    protected async getEntities(entity: Entity): Promise<string> {
        const data = await fs.readFile(entity, 'utf8');
        return data;
    }

    protected notFound(request: Request, response: Response): void {
        response.statusCode = 404;
        response.send('404 not found');
    }
}
