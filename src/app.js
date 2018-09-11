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
    <li class="item" :class="{'item--fav': item.isFav}" @click="clicked(item.id)">
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
    toggleFav (ID) {
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
      { id: 0, brand: 'Valentino', color: 'lace white', imageSrc: '/assets/dress-white.png', isFav: true},
      { id: 1, brand: 'Christian Dior', color: 'royal blue', imageSrc: '/assets/dress-blue.png', isFav: false },
      { id: 2, brand: 'Chanel', color: 'dance black', imageSrc: '/assets/dress-black.png', isFav: true },
      { id: 3, brand: 'Zara', color: 'indian red', imageSrc: '/assets/dress-red.png', isFav: true },
      { id: 4, brand: 'H&M', color: 'bling bling', imageSrc: '/assets/dress-bling.png', isFav: false },
      { id: 5, brand: 'Aritzia', color: 'playful yellow', imageSrc: '/assets/dress-yellow.png', isFav: false }
    ]
  },
  template: `
    <div>
      <h1 class="app-title">My Closet 我的衣柜</h1>
      <items :list-title="name1" :list="purses"></items>
      <items :list-title="name2" :list="dresses"></items>
      <items :list-title="name3" :list="shoes"></items>      
    </div>
  `
})
