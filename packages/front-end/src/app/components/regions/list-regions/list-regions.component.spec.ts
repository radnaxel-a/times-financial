import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RegionService } from 'src/app/services/regions/region.service';
import { SharedModule } from '../../shared/shared.module';

import { ListRegionsComponent } from './list-regions.component';

describe('ListRegionsComponent', () => {
    let component: ListRegionsComponent;
    let fixture: ComponentFixture<ListRegionsComponent>;
    let regionService: RegionService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, SharedModule, ReactiveFormsModule],
            declarations: [ListRegionsComponent],
            providers: [RegionService, Router],
        }).compileComponents();

        regionService = TestBed.inject(RegionService);
        router = TestBed.inject(Router);

        fixture = TestBed.createComponent(ListRegionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should be able to set regions data', () => {
        const regionsSpy = spyOn(regionService, 'get').and.callFake(() => {
            return of([
                {
                    region_id: '8288797231',
                    name: 'Regions',
                    countries: [],
                    isActive: false,
                },
            ]);
        });

        component.ngOnInit();

        expect(regionsSpy).toHaveBeenCalled();
        expect(component.regions$).toBeTruthy();
    });

    it('Should be able to navigate to edit', () => {
        const routerSpy = spyOn(router, 'navigate').and.callFake(() => {
            return Promise.resolve(true);
        });

        const idMock = '1213sr12';

        component.onEdit(idMock);

        expect(routerSpy).toHaveBeenCalledOnceWith(['regions', 'edit', idMock]);
    });

    it('should be able to open dropdowns', () => {
        component.openDropdown('some id');

        // make asserts
    });

    it('should be able to call delete endpoint on delete', () => {
        const regionsSpy = spyOn(regionService, 'delete').and.callFake(() => {
            return of({});
        });

        const idMock = '219801';

        component.onDelete(idMock);

        expect(regionsSpy).toHaveBeenCalledOnceWith(idMock);
    });
});
