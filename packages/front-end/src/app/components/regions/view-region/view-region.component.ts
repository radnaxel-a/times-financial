import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat, map, Observable, take, tap } from 'rxjs';
import { IRegion } from 'src/app/services/regions/interfaces/IRegion';
import { RegionService } from 'src/app/services/regions/region.service';

@Component({
    selector: 'app-view-region',
    templateUrl: './view-region.component.html',
    styleUrls: ['./view-region.component.css'],
})
export class ViewRegionComponent implements OnInit {
    public region!: IRegion;

    constructor(
        private regionsService: RegionService,
        private route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.getIdParam();
    }

    private getIdParam(): void {
        this.route.params.pipe(take(1)).subscribe((params) => {
            this.setRegion(params['id']);
        });
    }

    private setRegion(id: string): void {
        if (!id) {
            return;
        }

        const region$ = this.regionsService.get(id) as Observable<IRegion>;

        region$.pipe(take(1)).subscribe((region) => {
            this.region = region;
        });
    }
}
