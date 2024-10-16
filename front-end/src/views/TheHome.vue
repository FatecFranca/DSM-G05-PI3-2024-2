<template>
  <div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      value_email: ""
    };
  },
  methods: {
    getEmail() {
      console.log(this.value_email);
    }
  }
};
</script>

<style scoped>
    div {
        background-color: brown;
        height: 100vh;
        width: 100vw;
    }
</style>
