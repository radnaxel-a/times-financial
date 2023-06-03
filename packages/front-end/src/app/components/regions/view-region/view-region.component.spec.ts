import { HttpClientModule } from '@angular/common/http';
import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RegionService } from 'src/app/services/regions/region.service';

import { ViewRegionComponent } from './view-region.component';

describe('ViewRegionComponent', () => {
    let component: ViewRegionComponent;
    let fixture: ComponentFixture<ViewRegionComponent>;
    let router: Router;
    let regionService: RegionService;

    beforeEach(() => {
        const routes: Routes = [
            {
                path: 'regions/details/:id',
                component: ViewRegionComponent,
            },
        ];

        TestBed.configureTestingModule({
            declarations: [ViewRegionComponent],
            imports: [HttpClientModule, RouterTestingModule.withRoutes(routes)],
            providers: [
                RegionService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id: 123 }),
                    },
                },
            ],
        }).compileComponents();

        router = TestBed.inject(Router);
        regionService = TestBed.inject(RegionService);
        fixture = TestBed.createComponent(ViewRegionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should be able to set region', fakeAsync(() => {
        const serviceSpy = spyOn(regionService, 'get').and.callFake(() => {
            return of({
                name: 'opa',
                region_id: '123123',
                countries: [],
                isActive: false,
            });
        });

        router.navigate(['regions', 'details', '123123']);
        component.ngOnInit();

        expect(serviceSpy).toHaveBeenCalled();
        expect(component.region).toBeTruthy();
    }));
});
