// <swatch>

Vue.component('swatch', {
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  template: `
    <div class="testing-wrapper">
      <img id="testing-image"></img>
      <div class="testing-color" id="testing-color"></div>
    </div>
  `
})

// <item>

Vue.component('item', {
  props: {
    item: {
      required: true,
      type: Object
    },
    clicked: {
      required: true,
      type: Function
    }
  },
  template: `
    <!-- testing color thief -->
    <li class="item" :class="{'item--fav': item.isFav}" @click="clicked(item.id, item.imageSrc)">
      <div class="item-fav-icon">{{ item.isFav ? "😊" : "☹️" }}</div>
      <img class="item-image" v-bind:src="item.imageSrc" alt="">
      <div>{{ item.brand }}</div>
      <div class="item-color">{{ item.color }}</div>
    </li>
  `
})

// <items>

Vue.component('items', {
  props: {
    listTitle: String,
    list: Array
  },
  template: `
    <div>
      <p class="list-title">{{ listTitle }}</p>
      <ul class="item-list">
        <item 
          class="item"
          v-for="item in this.list"
          :item="item"
          :clicked="toggleFav"
          :key="item.id"
        >
        </item>
      </ul>
    </div>
  `,
  methods: {
    toggleFav (ID, imagePath) {
      
      //testing color theif
      setImage(imagePath)
      setColor(imagePath)

      this.list.forEach((listItem) => {
        if (listItem.id === ID) {
          listItem.isFav = !listItem.isFav
        }
      })
    }
  }
})

// <app>

const app = new Vue({
  el: '#app',
  data: {
    name1: "PURSES 包包",
    name2: "DRESSES 裙子",
    name3: "SHOES 鞋子",
    purses: [
      { id: 0, brand: 'Bao Bao', color: 'Classic Silver', imageSrc: '/assets/issey.jpeg', isFav: true},
      { id: 1, brand: 'Longchamp', color: 'Grass Khaki', imageSrc: '/assets/longchamp.jpeg', isFav: false },
      { id: 2, brand: 'Coach', color: 'Lychee Black', imageSrc: '/assets/coach.jpeg', isFav: true },
      { id: 3, brand: 'Louis Vuitton', color: 'Shiny Nude', imageSrc: '/assets/alma.jpeg', isFav: true },
      { id: 4, brand: 'Chanel', color: 'Black Fabric', imageSrc: '/assets/leboy.png', isFav: false },
      { id: 5, brand: 'Louis Vuitton', color: 'Pink', imageSrc: '/assets/girolata.png', isFav: false }
    ],
    dresses: [
      { id: 0, brand: 'Valentino', color: 'lace white', imageSrc: '/assets/dress-white.png', isFav: true},
      { id: 1, brand: 'Christian Dior', color: 'royal blue', imageSrc: '/assets/dress-blue.png', isFav: false },
      { id: 2, brand: 'Chanel', color: 'dance black', imageSrc: '/assets/dress-black.png', isFav: true },
      { id: 3, brand: 'Zara', color: 'indian red', imageSrc: '/assets/dress-red.png', isFav: true },
      { id: 4, brand: 'H&M', color: 'bling bling', imageSrc: '/assets/dress-bling.png', isFav: false },
      { id: 5, brand: 'Aritzia', color: 'playful yellow', imageSrc: '/assets/dress-yellow.png', isFav: false }
    ],
    shoes: [
      { id: 0, brand: 'Fendi', color: 'white carrson', imageSrc: '/assets/shoes-white.png', isFav: true},
      { id: 1, brand: 'Steve Madden', color: 'royal blue', imageSrc: '/assets/shoes-blue.png', isFav: false },
      { id: 2, brand: 'Forever 21', color: 'Kim Kardashian', imageSrc: '/assets/shoes-kim.png', isFav: true },
      { id: 3, brand: 'Guess', color: 'Dangerous pump', imageSrc: '/assets/shoes-dangerous.png', isFav: true },
      { id: 4, brand: 'Gucci', color: 'pink feather', imageSrc: '/assets/shoes-fefe.png', isFav: false },
      { id: 5, brand: 'Blessed', color: 'red suede', imageSrc: '/assets/shoes-red.png', isFav: false }
    ],
    selectedItem: null
  },
  template: `
    <div>
      <h1 class="app-title">My Closet 我的衣柜</h1>
      <items :list-title="name1" :list="purses"></items>
      <items :list-title="name2" :list="dresses"></items>
      <items :list-title="name3" :list="shoes"></items>
      <swatch v-if="selectedItem != null" :item="selectedItem"></swatch>
    </div>
  `
})

// color thief
function setImage(path) {
  document.getElementById('testing-image').src = path
}

function setColor(path) {
  const sourceImage = new Image(200, 200)
  sourceImage.src = path
  
  sourceImage.onload = function(e) {
    var can = document.createElement('canvas');
    var ctx = can.getContext("2d");
    ctx.drawImage(this, 0, 0, this.width, this.height);
    var colorThief = new ColorThief();
    var pal = colorThief.getPalette(can);
    document.getElementById("testing-color").style.backgroundColor = getColor(pal[5]);
  };
}

function getColor (array) {
  return "rgb(" + array[0] + "," + array[1] + "," + array[2] + ")"

}

