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
    listTitle: String
  },
  template: `
    <div>
      <p class="list-title">{{ listTitle }}</p>
      <ul class="item-list">
        <item 
          class="item"
          v-for="purse in purses"
          :item="purse"
          :clicked="toggleFav"
          :key="purse.id"
        >
        </item>
      </ul>
    </div>
  `,
  data () {
    return {
      purses: [
        { id: 0, brand: 'Bao Bao', color: 'Classic Silver', imageSrc: '/assets/issey.jpeg', isFav: true},
        { id: 1, brand: 'Longchamp', color: 'Grass Khaki', imageSrc: '/assets/longchamp.jpeg', isFav: false },
        { id: 2, brand: 'Coach', color: 'Lychee Black', imageSrc: '/assets/coach.jpeg', isFav: true },
        { id: 3, brand: 'Louis Vuitton', color: 'Shiny Nude', imageSrc: '/assets/alma.jpeg', isFav: true },
        { id: 4, brand: 'Chanel', color: 'Black Fabric', imageSrc: '/assets/leboy.png', isFav: false },
        { id: 5, brand: 'Louis Vuitton', color: 'Pink', imageSrc: '/assets/girolata.png', isFav: false }
      ]
    }
  },
  methods: {
    toggleFav (ID) {
      this.purses.forEach((purse) => {
        if (purse.id === ID) {
          purse.isFav = !purse.isFav
        }
      })
    }
  }
})

// <app>

const app = new Vue({
  el: '#app',
  data: {
    name: "PURSES"
  },
  template: `
    <div>
      <items :list-title="name"></items>
      <items :list-title="name"></items>
      <items :list-title="name"></items>      
    </div>
  `
})
