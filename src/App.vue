<template>
  <div id="app" class="container">
    <transition name="move" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import './styles/main.css';

export default {
  name: 'App',
};
</script>

<style>
.container {
  overflow-x: hidden;
}
.move-enter-from, .move-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.move-enter-to, .move-leave-from  {
  transform: translateX(0);
  opacity: 1;
}
.move-enter-active {
  transition: all .5s;
}
.move-leave-active {
  transition: all .3s;
}
</style>
