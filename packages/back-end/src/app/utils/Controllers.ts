import { Controller } from "../controllers/Controller";
import { CountriesController } from "../controllers/countries/Countries.controller";
import { RegionsController } from "../controllers/regions/Regions.controller";
import { Constructable } from "../interfaces/Constructable.interface";

export class Controllers {
    /**
     * Add type referance to controllers here
     */
    protected controllers: Constructable<Controller>[] = [
        RegionsController,
        CountriesController
    ];

    public create(): Controller[] {
        return this.controllers.map((c) => new c());
    }
}
