<template>
    <div id="message">

        <p  @mousedown="hovered = !hovered" @mouseup="hovered = !hovered" v-if="message.userId != userId" class="left"> {{ message.message }} </p>
        <p @mousedown="hovered = !hovered" @mouseup="hovered = !hovered" v-else class="right"> {{ message.message }}</p>
        <span v-if="hovered" > {{message.date }} </span>


    </div>
</template>

<script>
import cookies from "vue-cookies"
    export default {
        name:"message-item",
        props: {
            message: {
                type: Object,
                required:true 
            },

        },
        data() {
            return {
                userId: cookies.get("userId"),
                hovered:false
            }
        },
        
    }
</script>

<style lang="scss" scoped>
#message{
    align-self: end;
    width: 100%;
    .left{
        padding : 10px;
        float: left;
        background-color: #E1E8ED;
        color: black;
        width: fit-content;
        border-radius: 20px;
    }
    .right{
        padding : 10px;
        background-color: #1da1f2;
        color: white;
        width: fit-content;
        border-radius: 20px;
        float: right;
    }
    .right + span{
        float: right;
    }
}

</style>