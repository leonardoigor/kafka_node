<template>
  <div id="app">
    <form style="width: 32%; margin: 0 auto">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="email"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="pss"
        />
      </div>
      <div class="mb-3 form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="exampleCheck1"
          v-model="check"
        />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click="sub"
        :disabled="!isValid"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import socket from "socket.io-client";
export default {
  name: "App",
  data: () => ({
    check: Boolean(),
    pss: "",
    email: "",
    client: null,
    isloading: Boolean(),
  }),
  methods: {
    sub(e) {
      e.preventDefault();
      const { pss, email } = this;
      this.client.emit("form_request", { pss, email });
      this.isloading = true;
    },
    socketConnect() {
      this.client = socket("localhost:3002");
    },
  },
  mounted() {
    this.socketConnect();
  },
  components: {},
  computed: {
    isValid: function () {
      const { check, pss, email } = this;
      let e = email.length > 0;
      let p = pss.length > 0;

      return e && p && check && !this.isloading;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
