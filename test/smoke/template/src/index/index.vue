<template>
  <div class="example">
      <p>
          {{ msg }}
      </p>
      <p class="test">{{msg}}</p>
  </div>
</template>

<script>
import { showToast } from '../../common/utils';

export default {
  data() {
    return {
      msg: 'Hello world! this is index page',
    };
  },
  created() {
    showToast('index created');
    console.log('index created');
  },
};
</script>

<style>
.example {
  display: flex;
  color: red;
}
</style>
