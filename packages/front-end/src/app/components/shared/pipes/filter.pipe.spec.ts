import { FilterCountiresPipe } from './filterCountries.pipe';

describe('FilterCountiresPipe', () => {
    let pipe: FilterCountiresPipe;

    beforeEach(() => {
        pipe = new FilterCountiresPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should be able to return empty array is value is nullish', () => {
        expect(pipe.transform(null, 'asd')).toEqual([]);
    });

    it('should be able to return the value if query is nullish', () => {
        const countries = [
            {
                name: 'bulgaria',
                code: 'bg',
            },
        ];

        expect(pipe.transform(countries, '').length).toEqual(1);
    });

    it('should be able to return the data filtered', () => {
        const countries = [
            {
                name: 'bulgaria',
                code: 'bg',
            },
            {
                name: 'Deutschland',
                code: 'De',
            },
        ];

        expect(pipe.transform(countries, 'bg').length).toEqual(1);
    });
});
