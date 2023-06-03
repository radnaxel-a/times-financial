import {
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { IRegion } from 'src/app/services/regions/interfaces/IRegion';
import { RegionService } from 'src/app/services/regions/region.service';

@Component({
    selector: 'app-list-regions',
    templateUrl: './list-regions.component.html',
    styleUrls: ['./list-regions.component.css'],
})
export class ListRegionsComponent implements OnInit {
    @ViewChildren('options') options!: QueryList<ElementRef>;

    public regions$!: Observable<IRegion[]>;
    public regionsSearchQuery = new FormControl('');

    private hasOpenDropdowns = false;
    private lastClickedDropdownId!: string;

    constructor(private regionService: RegionService, private router: Router) {}

    public ngOnInit(): void {
        this.getRegions();
    }

    public getRegions(): void {
        this.regions$ = this.regionService.get() as Observable<IRegion[]>;
    }

    public openDropdown(id: string) {
        if (this.hasOpenDropdowns) {
            this.options.map((d) => (d.nativeElement.style.display = 'none'));

            if (this.lastClickedDropdownId === id) {
                this.lastClickedDropdownId = '';
                return;
            }
        }

        this.hasOpenDropdowns = true;
        this.lastClickedDropdownId = id;

        const dropdown = this.options.find((d) => d.nativeElement.id === id);

        if (!dropdown) {
            return;
        }

        dropdown.nativeElement.style.display = 'block';
    }

    public onDelete(id: string) {
        this.hasOpenDropdowns = false;
        this.regionService
            .delete(id)
            .pipe(take(1))
            .subscribe(() => {
                this.getRegions();
            });

        const dropdown = this.options.find((d) => d.nativeElement.id === id);

        if (!dropdown) {
            return;
        }

        dropdown.nativeElement.style.display = 'none';
    }

    public onEdit(id: string) {
        this.hasOpenDropdowns = false;
        this.router.navigate(['regions', 'edit', id]);
    }
}
