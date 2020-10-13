<template>
    <div class="adds desktop">
        <div class="add">
            <h4> Adds Area</h4>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div class="add">
            <h4> Adds Area </h4>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>

        </div>
        <div class="add"> <h4> Adds Area </h4>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </div>

    </div>
</template>

<script>
    export default {
        name : "add-page"
        
    }
</script>

<style lang="scss" scoped>

.add{
    display: grid;
    align-items: center;
    justify-items: center;
    text-align: center;
    width: 100%;
    h4{
        width: 100%;
        border-bottom: 1px solid #92b4a7;
    }
    p{
        font-size:20px ;
    }

}

</style>