// <outfit-generator> 
// takes an array of item lists
// go through each list and pick a random item, 
// put them together to display

Vue.component('outfit-generator', {
  props: {
    itemLists: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      currentList: {}
    }
  },
  computed: {
    randomItem () {
      return this.itemLists[0].items[0]
    },
    outfitList () {
      const outfitArray = []
      this.itemLists.forEach( (itemList) => {
        outfitArray.push(itemList.items[getRandomNum()])
      })
      return outfitArray
    }
  },
  template: `
    <div class="outfit-generator">
      <div class="outfit-generator--title">outfit generator</div>

      <div class="outfit-generator--image-wrapper">
        <div class="outfit-generator--image-column">
          <img class="outfit-generator--image-small" :src="outfitList[0].imageSrc""></img> 
          <img class="outfit-generator--image-small" :src="outfitList[2].imageSrc""></img>
        </div>
        <div class="outfit-generator--image-column">
          <img class="outfit-generator--image-large" :src="outfitList[1].imageSrc""></img>
        </div>
      </div>
      
      <button class="outfit-generator--button-generate">Generate an outfit</button>
    </div>
  `
})

// <swatch>

Vue.component('swatch', {
  data () {
    return {
      primaryColor: ""
    }
  },
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  watch: {
    item () {
      this.setPrimaryColor()
    }
  },
  created () {
    this.setPrimaryColor()
  },
  template: `
    <div class="swatch">
      <img class="swatch-image" :src="item.imageSrc"></img>
      <div class="swatch-color" :style="{'background-color': primaryColor}"></div>
    </div>
  `,
  methods: {
    setPrimaryColor () {
      const image = new Image(200, 200)
      image.onload = () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        this.primaryColor = this.getPrimaryColor(canvas)
      }
      image.src = this.item.imageSrc
    },
    getPrimaryColor (canvas) {
      const colorThief = new ColorThief()
      const palette = colorThief.getPalette(canvas)
      const primaryColor = palette[5]
      return `rgb(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]})`
    }
  }
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
      <img class="item-image" :src="item.imageSrc" alt="">
      <div>{{ item.brand }}</div>
      <div class="item-color">{{ item.color }}</div>
    </li>
  `
})

// <items>

Vue.component('items', {
  props: {
    listTitle: String,
    list: Array,
    itemSelected: Function
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
    toggleFav (ID) {
      this.list.forEach((listItem) => {
        if (listItem.id === ID) {
          listItem.isFav = !listItem.isFav
          this.itemSelected(listItem) // pass the clicked item to parent
        }
      })
    }
  }
})

// <app>

const app = new Vue({
  el: '#app',
  data: {
    lists: [
      // 1st list
      { 
        id: 0,
        title: "PURSES 包包",
        items: [
          { id: 0, brand: 'Bao Bao', color: 'Classic Silver', imageSrc: '/assets/issey.jpeg', isFav: true},
          { id: 1, brand: 'Longchamp', color: 'Grass Khaki', imageSrc: '/assets/longchamp.jpeg', isFav: false },
          { id: 2, brand: 'Coach', color: 'Lychee Black', imageSrc: '/assets/coach.jpeg', isFav: true },
          { id: 3, brand: 'Louis Vuitton', color: 'Shiny Nude', imageSrc: '/assets/alma.jpeg', isFav: true },
          { id: 4, brand: 'Chanel', color: 'Black Fabric', imageSrc: '/assets/leboy.png', isFav: false },
          { id: 5, brand: 'Louis Vuitton', color: 'Pink', imageSrc: '/assets/girolata.png', isFav: false }
        ]
      },
      // 2nd list
      { 
        id: 1,
        title: "DRESSES 裙子",
        items: [
          { id: 0, brand: 'Valentino', color: 'lace white', imageSrc: '/assets/dress-white.png', isFav: true},
          { id: 1, brand: 'Christian Dior', color: 'royal blue', imageSrc: '/assets/dress-blue.png', isFav: false },
          { id: 2, brand: 'Chanel', color: 'dance black', imageSrc: '/assets/dress-black.png', isFav: true },
          { id: 3, brand: 'Zara', color: 'indian red', imageSrc: '/assets/dress-red.png', isFav: true },
          { id: 4, brand: 'H&M', color: 'bling bling', imageSrc: '/assets/dress-bling.png', isFav: false },
          { id: 5, brand: 'Aritzia', color: 'playful yellow', imageSrc: '/assets/dress-yellow.png', isFav: false }
        ],
      },
      // 3rd list
      { 
        id: 2,
        title: "SHOES 鞋子",
        items: [
          { id: 0, brand: 'Fendi', color: 'white carrson', imageSrc: '/assets/shoes-white.png', isFav: true},
          { id: 1, brand: 'Steve Madden', color: 'royal blue', imageSrc: '/assets/shoes-blue.png', isFav: false },
          { id: 2, brand: 'Forever 21', color: 'Kim Kardashian', imageSrc: '/assets/shoes-kim.png', isFav: true },
          { id: 3, brand: 'Guess', color: 'Dangerous pump', imageSrc: '/assets/shoes-dangerous.png', isFav: true },
          { id: 4, brand: 'Gucci', color: 'pink feather', imageSrc: '/assets/shoes-fefe.png', isFav: false },
          { id: 5, brand: 'Blessed', color: 'red suede', imageSrc: '/assets/shoes-red.png', isFav: false }
        ],
      }
    ],
    selectedItem: null
  },
  template: `
    <div>
      <outfit-generator :item-lists="lists"></outfit-generator>
      <h1 class="app-title">My Closet 我的衣柜</h1>
      <items
        v-for="list in lists"
        :key = "list.id"
        :list-title="list.title"
        :list="list.items"
        :item-selected="itemSelected"
      >
      </items>
      <swatch v-if="selectedItem != null" :item="selectedItem"></swatch>
    </div>
  `,
  methods: {
    itemSelected (item) {
      this.selectedItem = item
    }
  }
})


function getRandomNum () {
  let n = (Math.floor(Math.random() * (5 - 0 + 1)) + 0)
  console.log(n)
  return n
}
