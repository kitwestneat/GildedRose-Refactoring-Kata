class Item {
  constructor(name, sellIn, quality){
    console.log('Item constructor', name, sellIn, quality);
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    console.log('Shop constructor', items);
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
    console.log('updateQuality', this.items[i].name);
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
            console.log('updateQuality', 'quality - 1');
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          console.log('updateQuality', 'quality + 1');
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
                console.log('updateQuality', 'quality + 1');
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
                console.log('updateQuality', 'quality + 1');
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
        console.log('updateQuality', 'sellin + 1');
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
                console.log('updateQuality', 'quality - 1');
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
            console.log('updateQuality', 'quality = 0');
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
            console.log('updateQuality', 'quality + 1');
          }
        }
      }
    }

    console.log('updateQuality', 'returning', JSON.stringify(this.items));
    return this.items;
  }
}

module.exports = { Shop, Item };
