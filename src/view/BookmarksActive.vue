<template>
  <section class="bookmarks-active">
    <ValidationObserver v-slot="{ handleSubmit }">
    <form class="form" @submit.prevent="handleSubmit(onSubmit)"
      novalidate>
      <ValidationProvider v-slot="{ errors }" rules="required" tag='label' class="form__label">
        <input v-model="bookmarkName" type="text" class="field__input">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required" tag='label' class="form__label">
        <input v-model="urlPath" type="text" class="field__input">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <button class="field_button">{{ title }} закладку</button>
    </form>
    </ValidationObserver>
  </section>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { mapActions, mapGetters } from 'vuex';
import './rules';

export default {
  name: 'BookmarksActive',
  components: { ValidationProvider, ValidationObserver },
  props: {
    action: {
      type: String,
    },
  },
  data() {
    return {
      bookmarkName: '',
      urlPath: '',
      title: 'Создать',
      currentIndex: '',
    };
  },
  computed: {
    ...mapGetters(['getIdByUrlPath']),
  },
  mounted() {
    if (this.action === 'edit') {
      this.bookmarkName = this.$route.query.bookmarkName;
      this.urlPath = this.$route.query.urlPath;
      this.title = 'Изменить';
      this.currentIndex = this.getIdByUrlPath(this.$route.query.urlPath);
    }
  },
  methods: {
    ...mapActions(['addBookmark', 'putBookmarkData']),
    onSubmit() {
      if (this.action === 'create') {
        this.addBookmark({ name: this.bookmarkName, urlPath: this.urlPath });
        this.$router.push('/');
      } else {
        this.putBookmarkData({ index: this.currentIndex,
          name: this.bookmarkName,
          urlPath: this.urlPath });
        this.$router.push('/');
      }
    },
  },
};
</script>

<style>
.bookmarks-active {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.form__label {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  margin-bottom: 18px;
  box-shadow: 1px 1px 3px 1px rgba(0,0,0,.3);
  padding: 16px 24px;
  border-radius: 12px;
}
.field__input {
  outline: 0;
  border: 0;
  width: 100%;
}
.form__label > span {
  position: absolute;
  bottom: -14px;
  left: 6px;
  font-size: 12px;
  color: red;
}
.field_button {
  margin-top: 50px;
  border: 2px solid transparent;
  text-transform: uppercase;
  color: white;
  background: rgb(66, 66, 255);
  cursor: pointer;
  padding: 20px 30px;
  border-radius: 16px;
  white-space: nowrap;
}
.field_button:hover {
  transform: scale(0.99);
}
.field_button:focus {
  background-color: black;
}
</style>
