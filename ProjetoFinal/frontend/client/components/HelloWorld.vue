<template>
  <div class="hello">
    <!-- <h1>{{ messages.message }}</h1> -->
    <input v-model="messages">
    <p>{{messages}}</p>
  </div>
</template>

<script>
const API_URL = "http://localhost:8081";
 
export default {
  name: "home",
  data: () => ({
    error: "",
    messages: ""
  }),
 
  mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        this.messages = result;
      });
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
