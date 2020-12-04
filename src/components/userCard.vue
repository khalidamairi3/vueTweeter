<template>
    <div v-if="user!=undefined" id="user-card">


        <h3> {{user.username}}</h3>
        <h5> {{ user.email }}</h5>
        <p> {{user.bio}} </p>
        <p> {{ user.birthdate }}</p>

    </div>
</template>

<script>
import axios from "axios"
    export default {
        name:"user-card",
        props: {
            userId: {
                type: Number,
                required:true 
            },
        },
         mounted () {
                this.getUser();
            },

             data() {
                return {
                    user: {},
                    ready : true
                }
            },
            methods: {
                
                getUser() {
                    if (!this.ready)
                    {
                        return;
                    }
                    this.ready=false
                    axios.request({
                        url:"https://tweeeter.ml/api/users",
                        method:"GET",
                        params:{
                            userId : this.userId
                        }
                    }).then((response)=>{
                        this.user=response.data[0];
                        this.ready=true;

                    }).catch((err)=>{
                        console.log(err);
                        this.ready=true;
                    })

                    
                }
            },
        
    }
</script>

<style lang="scss" scoped>

#user-card{

    text-align: center;
    justify-items: center;
    max-width: 400px;
    position: fixed;
    left: 3vw;
    bottom: 5vh;
    right: 3vw;
    background: white;
    z-index: 10;
    border-radius:15px;
    border: solid 1px #92b4a7;
    box-shadow: 4px 2px 2px #1da1f2


}

</style>