<template>
  <section class="bookmarks">
    <div class="card" v-for="(bookmark, index) in getBookmarks" :key="bookmark.name + index">
      <a :href="bookmark.urlPath" target="_blank" class="card__link">
        {{ bookmark.name }}
      </a>
      <div class="card__settings">
        <BookmarkTools :urlPath='bookmark.urlPath' :name='bookmark.name' @showTip='showTip'/>
      </div>
    </div>
    <div class="bookmarks__tip" v-if="isShowTip">URL для {{ tipName }} скопирован</div>
    <router-link to='/create' class="bookmarks__link">Добавить закладку</router-link>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import BookmarkTools from './BookmarkTools';

export default {
  name: 'TheBookmark',
  components: { BookmarkTools },
  data() {
    return {
      isShowTip: false,
      tipName: '',
    };
  },
  computed: {
    ...mapGetters(['getBookmarks']),
  },
  methods: {
    showTip(name) {
      this.tipName = name;
      this.isShowTip = true;
      setTimeout(() => {
        this.isShowTip = false;
      }, 3000);
    },
  },
};
</script>

<style>
.bookmarks {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5% 0;
}
.bookmarks__tip {
  position: absolute;
  bottom: 5%;
  left: 5%;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 1px 2px 2px 1px rgba(0,0,0,.3);
}
.bookmarks__link {
  outline: none;
  text-decoration: none;
  background: rgb(66, 66, 255);
  color: white;
  border: 2px solid transparent;
  border-radius: 16px;
  text-transform: uppercase;
  padding: 20px 24px;
  margin-top: 50px;
  box-shadow: 4px 4px 8px 0px rgba(9, 36, 242, 0.2);
}
.bookmarks__link:hover {
  transform: scale(.99);
}
.bookmarks__link:focus {
  border-color: black;
}
.bookmarks__link:visited, .bookmarks__link:active {
  color: white
}
.card {
  width: 60%;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  box-shadow: 0px 0px 6px  rgba(34, 60, 80, 0.2);
  transition: all .2s;
  border: 2px solid var(--border-color);
}
@media screen and (max-width: 768px) {
  .card{
    width: 80%;
  }
}
.card__link {
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  text-decoration: none;
  color: black;
  line-height: normal;
  outline: 0;
  font-size: 1rem;
}
.card__link:visited,
.card__link:active {
  color: black;
}
</style>
