/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  return {
    width,
    height,

    getArea() {
      return this.width * this.height;
    },
  };
  // throw new Error('Not implemented');
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
  // throw new Error('Not implemented');
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const values = JSON.parse(json);

  return {
    ...values,
    __proto__: proto,
  };
  // throw new Error('Not implemented');
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  resultCSS: '',
  elementCSS: [],
  idCSS: [],
  pseudoElementCSS: [],

  element(value) {
    this.resultCSS = `${this.resultCSS}${value}`;
    this.elementCSS.push(value);

    if (this.elementCSS.length > 1) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }

    if (this.resultCSS.includes('#')) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    const values = JSON.parse(JSON.stringify(this));

    this.resultCSS = '';
    this.elementCSS.length = 0;

    return {
      __proto__: this,
      ...values,
    };
    // throw new Error('Not implemented');
  },

  id(value) {
    this.resultCSS = `${this.resultCSS}#${value}`;
    this.idCSS.push(value);

    if (this.idCSS.length > 1) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }

    if (this.resultCSS.includes('.')) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    if (this.resultCSS.includes('::')) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    const values = JSON.parse(JSON.stringify(this));

    this.resultCSS = '';
    this.idCSS.length = 0;

    return {
      ...values,
      __proto__: this,
    };
    // throw new Error('Not implemented');
  },

  class(value) {
    this.resultCSS = `${this.resultCSS}.${value}`;

    const values = JSON.parse(JSON.stringify(this));

    if (this.resultCSS.includes('[') && this.resultCSS.includes(']')) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    this.resultCSS = '';

    return {
      ...values,
      __proto__: this,
    };
    // throw new Error('Not implemented');
  },

  attr(value) {
    this.resultCSS = `${this.resultCSS}[${value}]`;

    if (this.resultCSS.includes(':')) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    const values = JSON.parse(JSON.stringify(this));

    this.resultCSS = '';

    return {
      ...values,
      __proto__: this,
    };
    // throw new Error('Not implemented');
  },

  pseudoClass(value) {
    this.resultCSS = `${this.resultCSS}:${value}`;

    if (this.resultCSS.includes('::')) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    const values = JSON.parse(JSON.stringify(this));

    this.resultCSS = '';

    return {
      ...values,
      __proto__: this,
    };
    // throw new Error('Not implemented');
  },

  pseudoElement(value) {
    this.resultCSS = `${this.resultCSS}::${value}`;
    this.pseudoElementCSS.push(value);

    console.log(JSON.parse(JSON.stringify(this)));

    if (this.pseudoElementCSS.length > 1) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }

    const values = JSON.parse(JSON.stringify(this));

    this.resultCSS = '';
    this.pseudoElementCSS.length = 0;

    return {
      ...values,
      __proto__: this,
    };
    // throw new Error('Not implemented');
  },

  combine(selector1, combinator, selector2) {
    const css1 = selector1.stringify();
    const css2 = selector2.stringify();

    this.resultCSS = `${css1} ${combinator} ${css2}`;

    const values = JSON.parse(JSON.stringify(this));

    this.resultCSS = '';

    return {
      ...values,
      __proto__: this,
    };
    // throw new Error('Not implemented');
  },

  stringify() {
    const selector = this.resultCSS;
    return selector;
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
