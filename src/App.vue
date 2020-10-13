<template>
  <div id="app">
    <router-view />
    <div id="space"></div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Dosis:wght@500&display=swap");
@import url("https://use.fontawesome.com/releases/v5.15.0/css/all.css");
@import url("https://use.fontawesome.com/releases/v5.15.0/css/v4-shims.css");
body {
  margin: 0;
}
#app {
  width: 100%;
  height: 100vh;
  display: grid;
  justify-items: center;
  font-family: "Dosis", sans-serif;
  padding: 0;
  margin: 0;
}
input{
  outline: none;
}

#cover {
  img {
    width: 100%;
    height: 25vh;
    object-fit: cover;
  }
}
#initilals {
  position: relative;
  bottom: 5.5vh;
  width: 10vh;
  height: 10vh;
  border: 1px solid #e1e8ed;
  text-align: center;
  // padding-top: 10%;
  z-index: 5;
  background-color: #e1e8ed;
  border-radius: 200px 200px 200px 200px;
  margin-left: 41%;
  h1 {
    font-size: 24px;
    letter-spacing: 0.5vw;
  }
}
#details {
  position: relative;
  bottom: 10vh;
  display: grid;
  grid-template-columns: 3fr 1fr;
  #username {
    margin-left: 3vw;
    font-weight: bolder;
  }
  #email,
  #bio {
    grid-column: span 2;
    margin-left: 3vw;
  }
  .unfollow {
    border: 1px solid #1da1f2;
    color: white;
    background-color: #1da1f2;
    &:hover {
      background-color: #e1e8ed;
      color: #1da1f2;
      transition: all 0.2s ease-in;
    }
  }
  button {
    border-radius: 50px;
    height: 5vh;
    width: 80%;
    font-size: 14px;
    text-align: center;
    font-weight: bold;
    border: 1px solid #e1e8ed;
    color: #657786;
    background-color: white;
    &:hover {
      background-color: #1da1f2;
      color: white;
      transition: all 0.2s ease-in;
    }
  }
}
#options {
  position: relative;
  bottom: 8vh;
  width: 100%;
  border-top: 2px solid #e1e8ed;
  button {
    font-family: "Dosis", sans-serif;
    font-size: 16px;
    width: 30%;
    background-color: white;
    border: 0px;
  }
}
.selection {
  color: #1da1f2;
  border-bottom: 2px solid #1da1f2;
}
textarea {
  outline: none;
  resize: fit-content;
  overflow: auto;
  font-family: inherit;
}
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 15; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  display: grid;
  justify-content: center;
  align-content: center;
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
  letter-spacing: 0.5vw;
  textarea {
    width: 80%;
  }
  button {
    margin-top: 2vh;
    background-color: white;
    height: 6vh;
    width: 20vw;
    background-color: #1da1f2;
    color: white;

    border: 1px solid #1da1f2;

    &:hover {
      border: 1px solid #1da1f2;
      background-color: white;
      color: #1da1f2;
      transition: all 0.2s ease-in;
      box-shadow: 2px 2px #92b4a7;
    }
  }
}
.userDisplay{
  position: relative;
  bottom: 8vh;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.deleted {
  display: none;
}

.date {
  color: #92b4a7;
  font-size: 18px;
}

.fa-heart {
  color: rgb(167, 16, 16);
}

.content {
  font-size: 18px;
  grid-column: span 3;
}
.userInfo {
  // width: 100%;
  text-transform: capitalize;
  letter-spacing: 0.8vw;
  min-height: 80%;
  width: 90%;
  display: grid;
  justify-items: center;
  align-items: center;
  border-radius: 15px 15px 15px 15px;
  border: 1px solid #aab8c2;

  input {
    width: 90%;
    height: 6vh;
    border-radius: 10px 10px 10px 10px;
    font-family: "Courier New", Courier, monospace;
  }
  textarea {
    width: 90%;
    height: 12vh;
    border-radius: 10px 10px 10px 10px;
  }
  p {
    color: #3e000c;
  }
  button {
    margin-top: 2vh;
    width: 40%;
    height: 6vh;
    background-color: #1da1f2;
    color: white;
    border-radius: 15px 15px 15px 15px;
    border: 1px solid #1da1f2;
    text-transform: capitalize;
    letter-spacing: 0.4vw;
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
#space{
  height: 10vh;
}
button{
  outline: none;
}
.desktop{
  display: none;
}

@media only screen and (min-width: 600px) {
  .userInfo {
    font-size: 24px;
    width: 70%;
  }
  #home,#profile,#discoverPage,#userProfile{
  display: grid;
  grid-template-columns: 2fr 8fr;
}
#initilals {

  h1 {
    font-size: 36px;
    position: relative;
     bottom: 2.5vh;
    left: 0.3vw;
    
  }
}
#details {
  
  #username {
   font-size: 24px;
  }
  #email,
  #bio {
    font-size: 20px;
  }
  
  button {
   
    font-size: 18px;
   
  }
}
#options {
  
  button {
    
    font-size: 20px;
   
  }
}


.modal-content {
  width:70%; /* Could be more or less, depending on screen size */
  letter-spacing: 0.5vw;
  p{
    position:relative;
    right: 15vw;
  }
  textarea {
    grid-column: span 2;
    width: 100%;
    height: 10vh;
  }
  button {
   
    font-size: 18px;
    
  }
}
#space{
  height: 0vh;
}
} 

@media only screen and (min-width: 1000px) {
  .desktop{
    display: inline;
    font-size: 24px;
    position: relative;
    bottom: 1vh;
  }
    #home,#profile,#discoverPage,#userProfile{
  display: grid;
  grid-template-columns: 3fr 8fr 2fr;
}
#initilals {
  margin-left: 45%;

  h1 {
    font-size: 40px;
    position: relative;
    bottom: 4vh;
    left: 0.3vw;
    
  }
}

.userInfo {
  // width: 100%;
  margin-top: 5vh ;
  min-height: 60%;
  width: 70%;


  input {
    width: 90%;
    height: 4vh;
    border-radius: 10px 10px 10px 10px;
    font-family: "Courier New", Courier, monospace;
  }
  textarea {
    height: 8vh;
   
  }
 
  
  }

  
}

</style>
