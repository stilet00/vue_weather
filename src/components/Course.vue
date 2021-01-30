<template>
    <div class="options-container">
        <button class="border-button"
            @click="showRadioList"
        >Currency rate

        </button>
        <div class="radios" v-if="showRadio">
            <transition name="firstRadio" appear>
                <a class="sq-btn btn-one" href="" @click.prevent="getCourse" v-if="courseUSD">{{ courseUSD }}</a>

            </transition>
            <div class="lds-dual-ring" v-if="!courseUSD || !courseEUR"></div>
            <transition name="secondRadio" appear>
            <a class="sq-btn" href="" v-if="courseEUR"> {{ courseEUR }}</a>
            </transition>

        </div>


    </div>

</template>

<script>
    export default {
        name: "Options",
        data() {
            return {
                showRadio: false,
                courseUSD: null,
                courseEUR: null

            }
        },
        methods: {
            showRadioList() {
                this.showRadio = !this.showRadio;
                if (!this.courseUSD) {
                    setTimeout(this.getCourse, 2000);
                }
                this.courseUSD = null;
                this.courseEUR = null;
            },
            getCourse() {
                let promise = fetch(' https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
                promise.then(res => {
                    if (res.ok && res.status === 200) {
                        return res.json()
                    }
                })
                .then(res => {
                    this.courseUSD = `${res[0].ccy} / ${res[0].base_ccy} : ${res[0].buy} / ${res[0].sale}`;
                    this.courseEUR = `${res[1].ccy} / ${res[1].base_ccy} : ${res[1].buy} / ${res[1].sale}`;
                })
                .catch(err => console.log(err))

            }
        }
    }
</script>

<style scoped>
    .border-button {
        width: 49%;
        position: relative;
    }
    ul {
        position: absolute;
        list-style-type: none;
        top: 0px;
        right: -120px;
    }
 .options-container {
     margin-top: 20px;
 }
 .slideUp-enter-active {
     transition-delay: 0.2s;
 }

    /* radio style */
    .radios {
        position: relative;
        right: -50px;

    }
    .sq-btn {
        display: inline-block;
        position: relative;
        min-width: 178px;
        margin: 6px 28px;
        padding: 15px 40px;
        font-weight: 800;
        font-family: sans-serif;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #313131;
        background: rgba(255, 255, 255, 0.5);;
        transition: .15s ease-out;
        box-sizing: border-box;
        text-decoration: none;
    }
    .btn-one {
        color: #313131;;
    }
    .sq-btn:last-of-type {
        margin: 6px 28px;
    }
    .sq-btn:before {
        content: "";
        position: absolute;
        top: -6px;
        left: 0;
        height: calc(100% + 12px);
        width: 100%;
        border: 2px solid grey;
        box-sizing: border-box;
        transition: .2s ease-in-out;
    }
    .btn-one:before {
        border: 2px solid grey;
    }
    .sq-btn:after {
        content: "";
        position: absolute;
        top: 0;
        left: -8px;
        height: 100%;
        width: calc(100% + 16px);
        border: 1px solid white;
        box-sizing: border-box;
        transition: .2s ease-in-out;
    }
    .btn-one:after {
        border: 1px solid white;
    }
    .sq-btn:hover:before {
        top: 0;
        left: -8px;
        height: 100%;
        width: calc(100% + 16px);
    }
    .sq-btn:hover:after {
        top: -6px;
        left: 0;
        height: calc(100% + 12px);
        width: 100%;
    }
    .firstRadio-enter-active {
        transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .firstRadio-enter {
        transform: rotate(360deg);
        opacity: 0;
    }
    .secondRadio-enter-active {
        transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        transition-delay: 0.5s;
    }
    .secondRadio-enter {
        transform: rotate(-360deg);
        opacity: 0;
    }
    .lds-dual-ring {
        display: inline-block;
        width: 80px;
        height: 80px;
        color: white;
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }





</style>