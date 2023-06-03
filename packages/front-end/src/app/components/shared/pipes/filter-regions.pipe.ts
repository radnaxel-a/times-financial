import { Pipe, PipeTransform } from '@angular/core';
import { IRegion } from 'src/app/services/regions/interfaces/IRegion';

@Pipe({
    name: 'filterRegions',
})
export class FilterRegionsPipe implements PipeTransform {
    transform(value: IRegion[] | null, query: string | null) {
        if (!value) {
            return [];
        }

        if (query === null || query === '') {
            return value;
        }

        return value.filter((c: IRegion) =>
            c.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        );
    }
}
