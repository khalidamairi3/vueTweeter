<template>
    <div id="notification">
        <p v-bind:class ="{ bold: !notification.viewStatus }">  {{ notification.username +" "+ notification.message}} </p>               

    </div>
</template>

<script>
    export default {
        name:"notification-item",
        props: {
            notification: {
                type: Object,
                required: true 
            },
        },
        
    }

</script>

<style lang="scss" scoped>
#notification{
    padding: 10px;
}
.bold{
    font-weight: bold;
}
</style>