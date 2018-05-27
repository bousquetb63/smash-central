<template>
  <div class="home spacing">   
    <vs-input vs-label="Location" vs-placeholder="California" v-model="location"/>
    <vs-input vs-label="Main" vs-placeholder="Marth" v-model="main"/>
    <vs-input vs-label="Netplay Code" vs-placeholder="d8a278da" v-model="code"/>
    <vs-button @click="submit" vs-type="success-filled">Create</vs-button>
    <vs-button @click="goHome" vs-type="success-filled">Home</vs-button>
    <div v-if="error">
        <vs-alert vs-title="WRRRRONNNGG" vs-active="true" vs-color="danger">
        HEYYY, Fill out the form correctly and don't forget to choose a name!
        </vs-alert>
    </div>
  </div>
</template>

<style>
.spacing {
    padding-top: 20px;
}
</style>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
    data(){
        return{
            location: '',
            code: '',
            main: '',
            error: false
        }
    },
    methods: {
        ...mapGetters(["getName"]),
        submit () {
            if(this.location == "" || this.code == "" || this.code.length != 8 || this.main == "" || this.getName() == null){
                this.error = true;
            } else {
                this.error = false;
                axios.post('https://ehto8mb75h.execute-api.us-east-1.amazonaws.com/dev/matches', {
                    Host: this.getName(),
                    Code: this.code,
                    Location: this.location,
                    Main: this.main
                }, { crossdomain: true })
                .then(response=>{
                    this.$router.push({
                        name: 'home'
                    })
                })
                .catch(e => {
                    this.error.push(e)
                })
            }
        },
        goHome () {
            this.$router.push({
                name: 'home'
            })
        }
    }
}
</script>
