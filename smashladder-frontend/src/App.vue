<template>
  <div id="app">
    <vs-row vs-w="12">
      <vs-col vs-offset="2" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="4" vs-xs="12">
          <vs-row vs-w="12">
            <vs-topbar vs-color="primary">
              <h4 v-if="this.getName() != null">Smash Central → {{this.getName()}}</h4>
              <h4 v-if="this.getName() == null">Smash Central</h4>
              <vs-button vs-color-text="rgb(255, 255, 255)" vs-color="rgba(255, 255, 255, 0.3)" vs-type="dark-flat" @click="prompt">Choose Name</vs-button>
            </vs-topbar>
          </vs-row>
      </vs-col>
    </vs-row>
    <vs-row vs-w="12">
      <vs-col vs-offset="2" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="4" vs-xs="12">
          <vs-row vs-w="12">
            <router-view/>
          </vs-row>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data(){
    return {
      val:"",
    }
  },
  methods:{
    ...mapActions(["changeName"]),
    ...mapGetters(["getName"]),
    prompt(){
      this.$vs.prompt({
        title:'Choose a display name',
        text:'This is how you will be identified',
        color:'primary',
        input:{
          placeholder:'Name',
          value:this.val,
          maxLength:20,
          type:'text'
        },
        confirm:(value)=>{
          this.changeName(value);
          this.val = value
          this.$vs.notify({
            title:'Success',
            text:'Display name set as '+value,
            color:'success',
          })
        },
        cancel:(value)=>{
          this.$vs.notify({
            title:'Cancel',
            text:'aww ;-;',
            color:'danger',
          })
        }
      })
    },
  }
}
</script>
