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
        color: whitesmoke;
        font-style: italic;
        text-shadow: 1px 3px rgba(0, 0, 0 0.25);
    }
    .slide-fade-enter-active {
        transition: all 1s ease;
    }
    .slide-fade-leave-active {
        transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter {
        transform: translateX(1000px);
        opacity: 0;
    }
    .slide-fade-leave-to {
        transform: translateX(-200px);
        opacity: 0;
    }
</style>