import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CountryService } from 'src/app/services/countries/country.service';
import { RegionService } from 'src/app/services/regions/region.service';

import { RegionsFormComponent } from './regions-form.component';

describe('RegionsFormComponent - Edit', () => {
    let component: RegionsFormComponent;
    let fixture: ComponentFixture<RegionsFormComponent>;
    let countryService: CountryService;
    let regionService: RegionService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, ReactiveFormsModule],
            declarations: [RegionsFormComponent],
            providers: [
                CountryService,
                RegionService,
                Router,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id: '123' }),
                    },
                },
            ],
        });

        countryService = TestBed.inject(CountryService);
        regionService = TestBed.inject(RegionService);
        router = TestBed.inject(Router);

        fixture = TestBed.createComponent(RegionsFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get countries on init', () => {
        const countriesSpy = spyOn(countryService, 'get').and.callFake(() => {
            return of([
                {
                    name: 'bulgaria',
                    code: 'BG',
                },
            ]);
        });

        spyOn(regionService, 'get').and.callFake(() => {
            return of({
                name: 'opa',
                region_id: '123123',
                countries: [],
                isActive: false,
            });
        });

        component.ngOnInit();

        expect(countriesSpy).toHaveBeenCalled();
    });

    it('Should be able to add country to the list', () => {
        component.addCountry({ name: 'bulgaria', code: 'bg' });

        const formData = component.form.getRawValue();
        expect(formData.countries.length).toBe(1);
    });

    it('Should be able to detect if country is already added', () => {
        component.form.setValue({
            name: 'region',
            countries: ['bulgaria'],
            isActive: true,
        });

        let formData = component.form.getRawValue();
        expect(formData.countries.length).toBe(1);

        component.addCountry({ name: 'bulgaria', code: 'bg' });

        formData = component.form.getRawValue();
        expect(formData.countries.length).toBe(1);
    });

    it('Should be able to remove country from list', () => {
        component.form.setValue({
            name: 'region',
            countries: ['bulgaria'],
            isActive: true,
        });

        let formData = component.form.getRawValue();
        expect(formData.countries.length).toBe(1);

        component.removeCountry('bulgaria');

        formData = component.form.getRawValue();
        expect(formData.countries.length).toBe(0);
    });

    it('should be able to set a put request with the updated data', () => {
        const regionsPutSpy = spyOn(regionService, 'put').and.callFake(() => {
            return of({});
        });
        spyOn(router, 'navigate').and.callFake(() => {
            return Promise.resolve(true);
        });

        component.form.setValue({
            name: 'region',
            countries: ['bulgaria'],
            isActive: true,
        });

        component.onSubmit();

        expect(regionsPutSpy).toHaveBeenCalledOnceWith('123', {
            name: 'region',
            countries: ['bulgaria'],
            isActive: true,
            region_id: '123',
        });
    });
});

describe('RegionsFormComponent - Create', () => {
    let component: RegionsFormComponent;
    let fixture: ComponentFixture<RegionsFormComponent>;
    let countryService: CountryService;
    let regionService: RegionService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, ReactiveFormsModule],
            declarations: [RegionsFormComponent],
            providers: [
                CountryService,
                RegionService,
                Router,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id: undefined }),
                    },
                },
            ],
        });

        countryService = TestBed.inject(CountryService);
        regionService = TestBed.inject(RegionService);
        router = TestBed.inject(Router);

        fixture = TestBed.createComponent(RegionsFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be able to set a post with new region', () => {
        const regionsPostSpy = spyOn(regionService, 'post').and.callFake(() => {
            return of({});
        });
        spyOn(router, 'navigate').and.callFake(() => {
            return Promise.resolve(true);
        });

        component.form.setValue({
            name: 'region',
            countries: ['bulgaria'],
            isActive: true,
        });

        component.onSubmit();

        expect(regionsPostSpy).toHaveBeenCalledOnceWith({
            name: 'region',
            countries: ['bulgaria'],
            isActive: true,
        });
    });
});
