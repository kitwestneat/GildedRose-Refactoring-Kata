const { BRIE, PASS, SULFURAS, HIGH_QUALITY, LONG_SELL, SHORT_SELL } = require('./constants');

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const deltaFns = {
  brie: (sellIn) => sellIn < 0 ? 2 : 1,
  pass: (sellIn) => {
    if (sellIn < 0) {
      return -50;
    } else if (sellIn < SHORT_SELL) {
      return 3;
    } else if (sellIn < LONG_SELL) {
      return 2;
    } else {
      return 1;
    }
  },
  other: (sellIn) => sellIn < 0 ? -2 : -1,
}

function updateItemQuality(item) {
  let qualityDelta;

  if (item.name == BRIE) {
    qualityDelta = deltaFns.brie(item.sellIn);
  } else if (item.name == PASS) {
    qualityDelta = deltaFns.pass(item.sellIn);
  } else {
    qualityDelta = deltaFns.other(item.sellIn);
  }
  item.quality += qualityDelta;

  if (item.quality < 0) {
    item.quality = 0;
  } else if (item.quality > 50) {
    item.quality = 50;
  }
}

function updateItemSellIn(item) {
  item.sellIn--;
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      // legendary items don't need to change sellin or quality
      if (this.items[i].name == SULFURAS)
        continue;

      updateItemSellIn(this.items[i]);
      updateItemQuality(this.items[i]);
    }

    return this.items;
  }
}

module.exports = { Shop, Item };
