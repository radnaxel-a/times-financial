import { Pipe, PipeTransform } from '@angular/core';
import { ICountry } from 'src/app/services/countries/ICountry';

@Pipe({
    name: 'filterCountries',
})
export class FilterCountiresPipe implements PipeTransform {
    transform(value: ICountry[] | null, query: string | null) {
        if (!value) {
            return [];
        }

        if (query === null || query === '') {
            return value;
        }

        return value.filter(
            (c: ICountry) =>
                c.name
                    .toLocaleLowerCase()
                    .includes(query.toLocaleLowerCase()) ||
                c.code.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        );
    }
}
