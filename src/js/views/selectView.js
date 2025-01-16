import Choices from 'choices.js';

export class SelectView {
  constructor() {
    this.select = document.querySelector('.form__choices');
    this.options = {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false,
      shouldSortItems: false,
      removeItemButton: true,
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
    };
    this.choices = new Choices(this.select, this.options);

    document.querySelector('.choices').addEventListener('keydown', event => {
      this.handleKeyDown(event);
    });
  }

  handleKeyDown(event) {
    const allowedKeys = [' ', 'Enter', 'ArrowUp', 'ArrowDown'];

    if (event.key === 'Tab') {
      this.choices.dropdown.show();
      return;
    }

    if (allowedKeys.includes(event.key)) {
      this.choices.showDropdown();
      return;
    }
  }

  reset() {
    this.choices.setChoiceByValue('no-priority');
    this.choices.hideDropdown();
  }
}
