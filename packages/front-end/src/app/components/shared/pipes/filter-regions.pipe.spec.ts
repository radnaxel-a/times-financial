import { FilterRegionsPipe } from './filter-regions.pipe';

describe('FilterRegionsPipe', () => {
    let pipe: FilterRegionsPipe;

    beforeEach(() => {
        pipe = new FilterRegionsPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should be able to return empty array on nullish value', () => {
        expect(pipe.transform(null, 'asd')).toEqual([]);
    });

    it('should be able to return the value if query is empty', () => {
        const regions = [
            {
                region_id: '8288797231',
                name: 'Regions',
                countries: [],
                isActive: false,
            },
        ];

        expect(pipe.transform(regions, '')).toEqual(regions);
    });

    it('should be able to return filtered data', () => {
        const regions = [
            {
                region_id: '8288797231',
                name: 'Regions',
                countries: [],
                isActive: false,
            },
            {
                region_id: '8288797231',
                name: 'opa dai gaz',
                countries: [],
                isActive: false,
            },
        ];

        expect(pipe.transform(regions, 'Regi').length).toEqual(1);
    });
});
