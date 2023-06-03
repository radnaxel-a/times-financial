import { Request, Response } from "express";
import { Routes } from "../../config/Routes.enum";
import { Method } from "../../interfaces/Method.enum";
import { Controller } from "../Controller";
import { Entity } from "../../../db/Entity.enum";

export class CountriesController extends Controller {
  constructor() {
    super(Routes.Countries);
  }

  public [Method.GET](request: Request, response: Response): void {
    super
      .getEntities(Entity.Countries)
      .then((d) => {
        response.send(d);
      })
      .catch((e) => {
        response.statusCode = 500;
        response.send(e);
      });
  }

  public [Method.POST](request: Request, response: Response): void {
    super.notFound(request, response);
  }

  public [Method.PUT](request: Request, response: Response): void {
    super.notFound(request, response);
  }

  public [Method.DELETE](request: Request, response: Response): void {
    super.notFound(request, response);
  }
}
