<template>
  <section class="settings">
    <button class="tools"
    @click="isShow = !isShow">
      <span class="tools__dot"></span>
      <span class="tools__dot"></span>
      <span class="tools__dot"></span>
    </button>
    <div class="test">
      <div v-if="isShow"
      class="bookmark-options">
        <div class="bookmark-options__list">

          <button
          class="list__item list__item--button"
          @click="deleteItem"
          >Удалить
          </button>

          <router-link
          :to="{ query: {bookmarkName: name, urlPath}, path: '/edit'}"
          class="list__item list__item--link"
          >Изменить
          </router-link>

          <button
          class="list__item list__item--button"
          @click='handlerCopy'
          >
          Копировать URL
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="isShow"
      class="settings__background"
      @click.self="isShow = !isShow"
    ></div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BookmarkTools',
  props: {
    urlPath: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    ...mapActions(['deleteBookmark']),
    async handlerCopy() {
      await this.$copyText(this.urlPath);
      this.isShow = false;
      this.$emit('showTip', this.name);
    },
    deleteItem() {
      this.isShow = false;
      this.deleteBookmark(this.urlPath);
    },
  },
};
</script>

<style>
.test {
  position: relative;
}
:root {
  --dots-width: 28px;
  --options-width: 230px;
}
.tools {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: var(--dots-width);
  height: var(--dots-width);
  border: 0;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s;
}
.tools:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
.tools__dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: black;
}
.settings__background {
  position: fixed;
  inset: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 50;
}
.bookmark-options {
  position: absolute;
  top: 0;
  right: 0;
  width: var(--options-width);
  z-index: 100;
}
.bookmark-options__list {
  position: fixed;
  width: var(--options-width);
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 0;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
}

.list__item {
  width: 100%;
  padding: 4px 0 4px 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: transparent;
  border-radius: 12px;
  transition: all 0.3s;
  outline: 0;
  border: 2px solid transparent;
}
.list__item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.list__item:focus {
  border-color: black;
}

.list__item--button {
  text-align: left;
}

.list__item--link {
  display: block;
  text-decoration: none;
  color: black;
  line-height: normal;
}
.list__item--link:visited,
.list__item--link:active {
  color: black;
}
</style>
