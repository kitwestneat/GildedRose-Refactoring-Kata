const { BRIE, PASS, SULFURAS, MAX_QUALITY, LONG_SELL, SHORT_SELL } = require('./constants');

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
      return -MAX_QUALITY;
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

function getNewQuality({ name, quality, sellIn }) {
  let qualityDelta;

  if (name == BRIE) {
    qualityDelta = deltaFns.brie(sellIn);
  } else if (name == PASS) {
    qualityDelta = deltaFns.pass(sellIn);
  } else {
    qualityDelta = deltaFns.other(sellIn);
  }

  let newQuality = quality + qualityDelta;
  if (newQuality < 0) {
    return 0;
  } else if (newQuality > MAX_QUALITY) {
    return MAX_QUALITY;
  }

  return newQuality;
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(item => {
      // legendary items don't need to change sellin or quality
      if (item.name == SULFURAS)
        return;

      // must update sell in before quality
      item.sellIn--;
      item.quality = getNewQuality(item);
    });

    return this.items;
  }
}

module.exports = { Shop, Item };
