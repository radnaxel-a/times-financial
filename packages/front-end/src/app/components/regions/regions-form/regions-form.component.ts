import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { CountryService } from 'src/app/services/countries/country.service';
import { ICountry } from 'src/app/services/countries/ICountry';
import { IRegion } from 'src/app/services/regions/interfaces/IRegion';
import { RegionService } from 'src/app/services/regions/region.service';

@Component({
    selector: 'app-regions-form',
    templateUrl: './regions-form.component.html',
    styleUrls: ['./regions-form.component.css'],
})
export class RegionsFormComponent implements OnInit {
    public countries: ICountry[] = [];
    public form!: FormGroup;
    public regionId!: string;
    public countriesSearchQuery = new FormControl('');

    constructor(
        private countryService: CountryService,
        private regionService: RegionService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router
    ) {}

    public ngOnInit(): void {
        this.prepareForm();
    }

    public onSubmit(): void {
        const body = this.form.getRawValue();

        // if we have id, we make put
        if (this.regionId) {
            body.region_id = this.regionId;

            this.regionService
                .put(this.regionId, body)
                .pipe(take(1))
                .subscribe(() => {
                    this.router.navigate(['regions']);
                });

            return;
        }

        this.regionService
            .post(body)
            .pipe(take(1))
            .subscribe(() => {
                this.router.navigate(['regions']);
            });
    }

    public addCountry(country: ICountry): void {
        const form = this.form.getRawValue();

        if (form.countries.includes(country.name)) {
            return;
        }

        form.countries.push(country.name);

        this.form.setValue({
            ...form,
        });

        this.countriesSearchQuery.setValue('');
    }

    public removeCountry(country: string): void {
        const form = this.form.getRawValue();

        form.countries = form.countries.filter((c: string) => c !== country);

        this.form.setValue({
            ...form,
        });
    }

    public showCountriesDropDown(event: any): void {
        event.target.nextSibling.style.display = 'block';
    }

    public hideCountriesDropDown(event: any): void {
        setTimeout(() => {
            event.target.nextSibling.style.display = 'none';
        }, 50);
    }

    private prepareForm(): void {
        this.form = this.formBuilder.group({
            name: new FormControl('', [Validators.required]),
            countries: new FormControl([]),
            isActive: new FormControl(false),
        });

        this.countryService
            .get()
            .pipe(take(1))
            .subscribe((countries) => {
                this.countries = countries;
            });

        this.route.params.pipe(take(1)).subscribe((data: Params) => {
            this.setData(data['id']);
        });
    }

    private setData(id: string): void {
        // if we dont have id we are in create
        if (!id) {
            return;
        }

        this.regionId = id;

        const region$ = this.regionService.get(id) as Observable<IRegion>;

        region$
            .pipe(take(1))
            .subscribe(({ name, countries, isActive }: IRegion) => {
                this.form.setValue({
                    name,
                    countries,
                    isActive,
                });
            });
    }
}
