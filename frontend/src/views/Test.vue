<template>
  <div class="home">
    <vs-card vs-color="success" class="welcome">
      <vs-card-header vs-title="Welcome to Smash Central" />
      <vs-card-body>
        Test
      </vs-card-body>
      <vs-card-actions>
        <vs-button vs-color="dark" @click="pingServer()">Create Match</vs-button>
      </vs-card-actions>
    </vs-card>
    <Matches/>
  </div>
</template>

<style>
  .welcome {
    padding-top: 30px;
  }
</style>

<script>
// @ is an alias to /src

export default {
  name: 'test',
  data(){
    return {
      isConnected: false,
      socketMessage: '',
    }
  },
  sockets: {
    connect() {
        this.isConnected = true;
    },
    disconnect() {
        this.isConnected = false;
    },
    messageChannel(data) {
        this.socketMessage = data
    }
  },
  methods:{
    pingServer() {
      this.$socket.emit('pingServer', 'PING!')
    }
  }
}
</script>
