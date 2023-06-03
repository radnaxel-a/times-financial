import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCountiresPipe } from './pipes/filterCountries.pipe';
import { FilterRegionsPipe } from './pipes/filter-regions.pipe';

@NgModule({
    declarations: [FilterCountiresPipe, FilterRegionsPipe],
    imports: [CommonModule],
    exports: [FilterCountiresPipe, FilterRegionsPipe],
})
export class SharedModule {}
