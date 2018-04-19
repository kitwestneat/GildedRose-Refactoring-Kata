const { BRIE, PASS, SULFURAS, HIGH_QUALITY, LONG_SELL, SHORT_SELL } = require('./constants');

class Item {
  constructor(name, sellIn, quality){
    console.log('Item constructor', name, sellIn, quality);
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function updateItemQuality(item) {
  if (item.name == BRIE) {
    item.quality++;
  } else if (item.name == PASS) {
    if (item.sellIn < 0) {
      item.quality = 0;
    } else if (item.sellIn < SHORT_SELL) {
      item.quality += 3;
    } else if (item.sellIn < LONG_SELL) {
      item.quality += 2;
    } else {
      item.quality++;
    }
  } else if (item.passedSellby()) {
    item.quality -= 2;
  } else {
    item.quality--;
  }

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
    console.log('Shop constructor', items);
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
