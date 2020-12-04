<template>
  <div id="landing">
    <img id="first-image" src="../assets/image-6.jpg" alt="" />
    <img id="second-image" src="../assets/image-2.jpg" alt="" />
    <img id="third-image" src="../assets/image-5.jpg" alt="" />
    <div data-aos="fade-up"
     data-aos-anchor-placement="bottom-center" data-aos-duration="2000" id="landing-text">
        <h1> Tweeter </h1>
        <h2> Tweet As You Go </h2>
    </div>
    <div id="choices">
      <button @click="gotoSignup"><i class="fas fa-user-plus"> Signup </i></button>
      <button @click="goTologin "><i class="fas fa-sign-in-alt"> Login </i></button>
    </div>
    
  </div>
</template>

<script>
import cookies from "vue-cookies" 

export default {
    name:"landing-page",

  mounted() {
    if (cookies.get("token") != undefined) {
      this.$router.push("/home");
    }
   
  },
  methods: {
      goTologin() {
          this.$router.push("/signin");
          
      },
      gotoSignup(){
          this.$router.push("/signup");
      }

  },

};
</script>

<style lang="scss" scoped>
#landing {
  display: grid;
  width: 100%;
  img {
    position: absolute;
    width: 100%;
    height: 100vh;
    object-fit: cover;
    z-index: -1;
  }
}

#landing-text{
    padding-top: 10vh;
   color: #1da1f2;
   z-index: 1;
   position: relative;
   width: 100%;
   display: grid;
   justify-items: center;
   align-items: center;
   h1{
       text-align: center;
       font-size: 48px;
       width: 80%;
       border-bottom: 2px solid #657786; 
   }
   h2{
       font-size: 32px;
   }
   
}

#choices {
  justify-self: center;
  width: 50vw;
  height: 50vh;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;

  button {
    width: 95%;
    height: 6vh;
    background-color: #1da1f2;
    color: white;
    border-radius: 15px 15px 15px 15px;
    border: 1px solid #1da1f2;
    text-transform: capitalize;
    letter-spacing: 0.2vw;
    margin-bottom: 2vh;
    

    &:hover {
      border: 1px solid #1da1f2;
      background-color: white;
      color: #1da1f2;
      transition: all 0.2s ease-in;
      box-shadow: 2px 2px #aab8c2;
    }
  }
}

#first-image {
  animation: slide1 15s infinite ease-out;
}
#second-image {
  animation: slide2 15s infinite ease-out;
}
#third-image {
  animation: slide3 15s infinite ease-out;
}

@keyframes slide1 {
  33% {
    opacity: 0;
  }
  66% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes slide2 {
  33% {
    opacity: 0;
  }
  66% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes slide3 {
  33% {
    opacity: 1;
  }
  66% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@media only screen and(min-width: 600px) {

  button{
    font-size: 1.2em;
  }
  
}

</style>