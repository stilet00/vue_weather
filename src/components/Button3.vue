<template>
    <div class="options-container">
        <button class="border-button"
            @click="getAstro"
        >Astronomical picture</button>
    </div>
</template>

<script>
    export default {
        name: "Button3",
        methods: {
            getAstro() {
                let promise = fetch('https://api.nasa.gov/planetary/apod?api_key=QMNA5qFk5XAuTguxFgCM4pGTdmqA5a227eUqVH7S');
                promise
                    .then(res => {
                    if (res.ok && res.status === 200) {
                        return res.json()
                    }
                })
                .then(res => this.$emit('astroClicked', {
                    astroData: res
                }))
                .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>
    .border-button {
        width: 48%;
    }
    .options-container {
        margin-top: 20px;
    }
    .slideUp-enter-active {
        transition-delay: 0.3s;
    }
</style>