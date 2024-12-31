import Choices from 'choices.js';

new Choices('.choices', {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
  shouldSortItems: false,
  callbackOnCreateTemplates: template => {
    return {
      choice: (_, data) => {
        const isSelected = data.selected ? 'is-selected' : '';
        const isHighlighted = data.highlighted ? 'is-highlighted' : '';

        const customProps = data.customProperties || {};
        const svgURL = customProps.url || '';
        const svgClass = customProps.class || '';
        const ariaLabel = customProps.label || '';

        return template(`
          <div
            class="choices__item choices__item--choice choices__item--selectable ${isSelected} ${isHighlighted}"
            data-id="${data.id}"
            data-value="${data.value}"
            role="option"
            aria-label="${ariaLabel}"
            data-choice
            data-choice-selectable
          >
            <svg class="${svgClass}" aria-hidden="true">
              <use href="${svgURL}"></use>
            </svg>
          </div>
        `);
      },
      item: (_, data) => {
        const customProps = data.customProperties || {};
        const svgURL = customProps.url || '';
        const svgClass = customProps.class || '';
        const ariaLabel = customProps.label || '';

        return template(`
          <div
            class="choices__item choices__item--selectable"
            data-id="${data.id}"
            data-value="${data.value}"
            role="option"
            aria-label="${ariaLabel}"
          >
            <svg class="${svgClass}" aria-hidden="true">
              <use href="${svgURL}"></use>
            </svg>
          </div>
        `);
      },
    };
  },
});
