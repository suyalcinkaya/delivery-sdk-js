import { ItemContracts } from '../../../lib';
import { FieldInterfaces } from '../../../lib/fields/field-interfaces';
import { FieldType } from '../../../lib/fields/field-type';
import { FieldMapper } from '../../../lib/mappers';
import { Context, setup } from '../../setup';

describe('FieldMapper', () => {

    const fieldType = 'invalid';

    class FakeField implements FieldInterfaces.IField {
        public type: FieldType = fieldType as any;
        constructor(
            public name: string,
            public value: any
        ) {
        }
    }

    interface FakeContentItem extends ItemContracts.IContentItemContract {
        testField?: FakeField;
        elements: any;
    }

    const context = new Context();
    setup(context);

    const fieldMapper = new FieldMapper(context.getConfig(), context.richTextHtmlParser);

    it(`should throw an Error when invalid response is given`, () => {
        expect(() => fieldMapper.mapFields(null, null, null, null)).toThrowError();
        expect(() => fieldMapper.mapFields(undefined, undefined, undefined, undefined)).toThrowError();

        expect(() => {
            const item: FakeContentItem = {
                elements: {},
                system: {} as any
            };
            fieldMapper.mapFields(item, undefined, undefined, undefined);
        }).toThrowError();

        expect(() => {
            const item: FakeContentItem = {
                elements: {},
                system: {} as any
            };
            fieldMapper.mapFields(item, undefined, undefined, undefined);
        }).toThrowError();

        expect(() => {
            const item: FakeContentItem = {
                elements: {},
                system: {} as any
            };
            fieldMapper.mapFields(item, {}, {}, undefined);
        }).toThrowError();

    });

    it(`should throw an Error when unsupported field type is used`, () => {
        const fakeField = new FakeField('testField', 'testValue');

        const item: FakeContentItem = {
            elements: { 'testField': fakeField },
            system: {
                type: 'movie',
                codename: 'cd',
                id: '',
                last_modified: new Date(),
                name: 'name',
                sitemap_locations: [],
                language: 'en'
            }
        };

        expect(() => fieldMapper.mapFields(item, {}, {}, [])).toThrowError(`Unsupported field type '${fieldType}'`);
    });
});
