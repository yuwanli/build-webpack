<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
import {showToast} from '../common/utils'
export default {
  data () {
    return {
      msg: 'Hello world! this is demo page'
    }
  },
  created() {
    showToast('demo2 created')
  }
}
</script>

<style>
.example {
  color: yellowgreen;
}
</style>