let expect = require('chai').expect;
let { Item, Shop } = require('../src/gilded_rose');

const BRIE = 'Aged Brie';
const PASS = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const FOO = 'foo';

describe('Gilded Rose', function() {
  describe(FOO, function() {
    it('create item', function() {
      const item = new Item(FOO, 0, 0);

      expect(item.name).to.equal(FOO);
    });
    it('basic test', function() {
      const gildedRose = new Shop([ new Item(FOO, 0, 0) ]);

      const items = gildedRose.updateQuality();

      expect(items[0]).to.deep.equal({
        name: FOO,
        sellIn: -1,
        quality: 0,
      });
    });
    it('high quality', function() {
      const gildedRose = new Shop([ new Item(FOO, 0, 50) ]);

      const items = gildedRose.updateQuality();

      expect(items[0]).to.deep.equal({
        name: FOO,
        sellIn: -1,
        quality: 48,
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
    it('high quality', function() {
      const gildedRose = new Shop([ new Item(BRIE, 0, 50) ]);

      const items = gildedRose.updateQuality();

      expect(items[0]).to.deep.equal({
        name: BRIE,
        sellIn: -1,
        quality: 50,
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
    it('high quality', function() {
      const gildedRose = new Shop([ new Item(PASS, 0, 50) ]);

      const items = gildedRose.updateQuality();

      expect(items[0]).to.deep.equal({
        name: PASS,
        sellIn: -1,
        quality: 0,
      });
    });
    it('short term sell in, high quality', function() {
      const gildedRose = new Shop([ new Item(PASS, 10, 50) ]);

      const items = gildedRose.updateQuality();

      expect(items[0]).to.deep.equal({
        name: PASS,
        sellIn: 9,
        quality: 50,
      });
    });
    it('long term sell in, high quality', function() {
      const gildedRose = new Shop([ new Item(PASS, 12, 50) ]);

      const items = gildedRose.updateQuality();

      expect(items[0]).to.deep.equal({
        name: PASS,
        sellIn: 11,
        quality: 50,
      });
    });
    it('short term sell in, 0 quality', function() {
      const gildedRose = new Shop([ new Item(PASS, 10, 0) ]);

      const items = gildedRose.updateQuality();

      expect(items[0]).to.deep.equal({
        name: PASS,
        sellIn: 9,
        quality: 2,
      });
    });
    it('long term sell in, 0 quality', function() {
      const gildedRose = new Shop([ new Item(PASS, 12, 0) ]);

      const items = gildedRose.updateQuality();

      expect(items[0]).to.deep.equal({
        name: PASS,
        sellIn: 11,
        quality: 1,
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
    it('high quality', function() {
      const gildedRose = new Shop([ new Item(SULFURAS, 0, 50) ]);

      const items = gildedRose.updateQuality();

      expect(items[0]).to.deep.equal({
        name: SULFURAS,
        sellIn: 0,
        quality: 50,
      });
    });
    it('high quality, -1 sellin', function() {
      const gildedRose = new Shop([ new Item(SULFURAS, -1, 50) ]);

      const items = gildedRose.updateQuality();

      expect(items[0]).to.deep.equal({
        name: SULFURAS,
        sellIn: -1,
        quality: 50,
      });
    });
  });
});
