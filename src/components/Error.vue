<template>
    <transition name="slide-fade" appear>
        <h1>{{errText}}</h1>
    </transition>
</template>

<script>
    export default {
        name: "Error",
        data() {
            return {
                errText: 'Wrong city name!'
            }

        }
    }
</script>

<style scoped>
    h1 {
        color: white;
        font-weight: 300;
        font-size: 20px;
        font-family: 'Montserrat', sans-serif;
        /*text-transform: uppercase;*/
        position: absolute;
        bottom: -25px;
        right: 10px;
    }
    .slide-fade-enter-active {
        transition: all 1s ease;
    }
    .slide-fade-leave-active {
        transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter {
        opacity: 0;
    }
    .slide-fade-leave-to {
        opacity: 0;
    }
</style>