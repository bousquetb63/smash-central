<template>
    <vs-card class="welcome">
        <vs-popup class="holamundo"  vs-title="Join this netplay game, goodluck!" :vs-active="popupActivo" @vs-cancel="popupActivo=false">
            <p>Code: {{netplayCode}}</p>
        </vs-popup>
        <vs-card-header vs-title="Active Matches" />
        <vs-card-body>
            <div v-if="loading">
                <atom-spinner
                    :animation-duration="1000"
                    :size="60"
                    :color="'#ff1d5e'"
                />
            </div>
            <vs-list>
                <vs-list-header vs-title="Melee" vs-color="danger"></vs-list-header>
                <div v-for="match in this.matches">
                    <vs-list-item vs-icon="grade" :key="match._id" :vs-title="match.Host" :vs-subtitle="match.Location">
                        <vs-button vs-color="success" @click="removeMatch(match._id)">Accept</vs-button>
                    </vs-list-item>
                </div>
            </vs-list>
        </vs-card-body>
    </vs-card>
</template>

<style>
  .welcome {
    padding-top: 30px;
  }
</style>

<script>
import {AtomSpinner} from 'epic-spinners'
import axios from 'axios';

export default {
  name: 'matches',
  data () {
    return {
      matches: [],
      loading: true,
      popupActivo:false,
      netplayCode:null
    }
  }, 
  mounted () {
      this.getAllMatches();
  },
  methods: {
      removeMatch (id) {
        axios.delete("https://ehto8mb75h.execute-api.us-east-1.amazonaws.com/dev/matches/" + id)
        .then((response) => {
            var matchID = this.matches.findIndex(function (element) {
                return element._id == id;
            })
            
            this.netplayCode = this.matches[matchID].Code;
            this.popupActivo = true;
            console.log(this.matches[matchID]);
            this.getAllMatches();
        }, (error) => {
            return "error";
        })
      },
      getAllMatches () {
        fetch("https://ehto8mb75h.execute-api.us-east-1.amazonaws.com/dev/matches", {
            mode: 'cors',
            credentials: 'omit',
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then( (response) => {
            this.loading = false;
            this.matches = response.data;
            console.log(this.matches);
        })
        // axios("https://ehto8mb75h.execute-api.us-east-1.amazonaws.com/dev/matches", {method: "GET", headers: {
        //     //'Access-Control-Allow-Origin': '*',
        //      'Access-Control-Allow-Methods':'GET', 'Content-Type': 'text/plain', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'} })
        // .then((response)  =>  {
        //     this.loading = false;
        //     this.matches = response.data;
        //     console.log(this.matches);
        // }, (error)  =>  {
        //     this.loading = false;
        //     console.log("ERROR")
        // })
      },
  },
  component: {
      AtomSpinner
  }
}
</script>