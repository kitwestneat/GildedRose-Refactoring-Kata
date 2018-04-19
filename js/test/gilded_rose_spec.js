let expect = require('chai').expect;
let { Item, Shop } = require('../src/gilded_rose');

const BRIE = 'Aged Brie', PASS = 'Backstage passes to a TAFKAL80ETC concert', SULFURAS = 'Sulfuras, Hand of Ragnaros';

describe('Gilded Rose', function() {
  describe('foo', function() {
    it('create item', function() {
      const item = new Item('foo', 0, 0);

      expect(item.name).to.equal('foo');
    });
    it('basic test', function() {
      const gildedRose = new Shop([ new Item('foo', 0, 0) ]);

      const items = gildedRose.updateQuality();

      expect(items[0]).to.deep.equal({
        name: 'foo',
        sellIn: -1,
        quality: 0,
      });
    });
  });
  describe(BRIE, function() {
    it('basic test', function() {
      const gildedRose = new Shop([ new Item(BRIE, 0, 0) ]);

      const items = gildedRose.updateQuality();

      expect(items[0]).to.deep.equal({
        name: BRIE,
        sellIn: -1,
        quality: 2,
      });
    });
  });
  describe(PASS, function() {
    it('basic test', function() {
      const gildedRose = new Shop([ new Item(PASS, 0, 0) ]);

      const items = gildedRose.updateQuality();

      expect(items[0]).to.deep.equal({
        name: PASS,
        sellIn: -1,
        quality: 0,
      });
    });
  });
  describe(SULFURAS, function() {
    it('basic test', function() {
      const gildedRose = new Shop([ new Item(SULFURAS, 0, 0) ]);

      const items = gildedRose.updateQuality();

      expect(items[0]).to.deep.equal({
        name: SULFURAS,
        sellIn: 0,
        quality: 0,
      });
    });
  });
});
