import isDom from 'is-dom';
import { $, $$ } from '../';

const invalidSelector = 'The string "", is not a valid CSS selector';
const errorSelector = 'Selector must be a string';

describe('qselect', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="test">
        <span>s</span>
        <div class="lol">
          <span>t</span>
          <span>r</span>
        </div>
      </div>
    `;
  });

  describe('$', () => {
    it('should get a dom node if selector exists', () => {
      const node = $('span');
      expect(node.innerHTML).toBe('s');
    });

    it('should get a dom node if selector exists and the context exists', () => {
      const node = $('span', '.lol');
      expect(node.innerHTML).toBe('t');
    });

    it('should get a null if selector exists and the context does not exist', () => {
      const node = $('span', 'input');
      expect(node).toBeUndefined();
    });

    it('should be a dom element if selector exists', () => {
      const node = $('div');
      expect(isDom(node)).toBeTruthy();
    });

    it('should get a null if selector does not exist', () => {
      const node = $('input');
      expect(node).toBeNull();
    });

    it('should be nuill if selector does not exist', () => {
      const node = $('input');
      expect(isDom(node)).toBeFalsy();
    });

    it('should throw if selector is Nan', () => {
      expect(() => {
        $(NaN);
      }).toThrowError();
    });

    it('should throw if selector is Infinity', () => {
      expect(() => {
        $(Infinity);
      }).toThrowError(errorSelector);
    });

    it('should throw if selector is a Boolean', () => {
      expect(() => {
        $(Boolean);
      }).toThrowError(errorSelector);
    });

    it('should throw if selector is an empty Object', () => {
      expect(() => {
        $({});
      }).toThrowError(errorSelector);
    });

    it('should throw if selector is a RegExp', () => {
      expect(() => {
        $(new RegExp());
      }).toThrowError(errorSelector);
    });

    it('should throw if selector is a Date', () => {
      expect(() => {
        $(new Date());
      }).toThrowError(errorSelector);
    });

    it('should throw if selector is an Array', () => {
      expect(() => {
        $([]);
      }).toThrowError(errorSelector);
    });

    it('should throw if selector is an Integer', () => {
      expect(() => {
        $(1);
      }).toThrowError(errorSelector);
    });

    it('should throw if selector is undefined', () => {
      expect(() => {
        $(undefined);
      }).toThrowError(errorSelector);
    });

    it('should throw if selector is null', () => {
      expect(() => {
        $(null);
      }).toThrowError(errorSelector);
    });

    it('should throw if selector is an empty string', () => {
      expect(() => {
        $('');
      }).toThrowError(invalidSelector);
    });

    it('should get a dom node within the context if context is a dom node', () => {
      const node = $('span', '.lol');

      expect(isDom(node)).toBeTruthy();
      expect(node.innerHTML).toBe('t');
    });
  });

  describe('$$', () => {
    it('should get an array', () => {
      const node = $$('div');
      expect(Array.isArray(node)).toBeTruthy();
    });

    it('should get an empty array if selector does not exist', () => {
      const node = $$('input');
      expect(node).toHaveLength(0);
    });

    it('should get an array of dom nodes if selector exists', () => {
      const node = $$('div');
      expect(node.length).toBeGreaterThan(1);
    });
  });
});
