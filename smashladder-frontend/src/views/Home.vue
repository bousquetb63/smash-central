<template>
  <div class="home">
    <vs-card vs-color="success" class="welcome">
      <vs-card-header vs-title="Welcome to Smash Central" />
      <vs-card-body>
        Smash with people from all over the world and find worthy opponents.
      </vs-card-body>
      <vs-card-actions>
        <vs-button vs-color="dark" @click="toCreate">Create Match</vs-button>
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
import Matches from '@/components/Matches.vue'

export default {
  name: 'home',
  components: {
    Matches
  },
    data(){
    return {
      val:null,
    }
  },
  methods:{
    toCreate() {
      this.$router.push({
          name: 'create'
      })
    }
  }
}
</script>
