import { Responses, Elements, ElementType, IContentItem } from '../../../../../lib';
import { getDeliveryClientWithJson } from '../../../setup';
import * as responseJson from './rich-text.spec.json';

describe('Rich Text element', () => {
    let response: Responses.IListContentItemsResponse;
    beforeAll(async () => {
        response = (await getDeliveryClientWithJson(responseJson).items().toPromise()).data;
    });

    it(`Rich-textlinked items should be re-ordered if order in response`, async () => {
        const item = response.items.find(
            ({ system: { codename } }) => codename === 'rich_text_item_unordered'
        ) as IContentItem;
        const element = item.elements.rich as Elements.RichTextElement;

        expect(element.type).toEqual(ElementType.RichText);
        expect(element.linkedItemCodenames).toEqual(['n1', 'n2', 'n3']);
        for (var i = 0; i < element.linkedItems.length; ++i) {
            expect(element.linkedItems[i].system.codename).toBe(`n${i + 1}`);
        }
    });

    it(`Rich-text linked items order should be maintained if already ordered in response`, () => {
        const item = response.items.find(
            ({ system: { codename } }) => codename === 'rich_text_item_ordered'
        ) as IContentItem;
        const element = item.elements.rich as Elements.RichTextElement;

        expect(element.type).toEqual(ElementType.RichText);
        expect(element.linkedItemCodenames).toEqual(['n1', 'n2', 'n3']);
        for (var i = 0; i < element.linkedItems.length; ++i) {
            expect(element.linkedItems[i].system.codename).toBe(`n${i + 1}`);
        }
    });

    it(`Rich-text mapper should not throw error if value is empty`, () => {
        const item = response.items.find(
            ({ system: { codename } }) => codename === 'rich_text_item_empty'
        ) as IContentItem;
        const element = item.elements.rich as Elements.RichTextElement;

        expect(element.type).toEqual(ElementType.RichText);
        expect(element.linkedItemCodenames).toEqual([]);
    });
});
