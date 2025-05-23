<template>
    <v-sheet class="footer_shadow footer_border">

        <v-row no-gutters class="py-10 padding_container">
            <v-col    v-if="screenType === 'desktop'"
                     class="mb-4 mb-lg-0 d-flex align-end justify-center"
            >
                    <div class="f13 fw500 text-grey700 me-2">
                        هفت روز هفته از ۸ صبح تا ۱۲ شب پاسخگو هستیم.
                    </div>
            </v-col>

            <v-col cols="12" lg="8"  >
                <v-row no-gutters>
                    <v-col :cols=" screenType === 'desktop' ? '4' : '6'" v-for="(tab, i) in footer" :key="i" class="justify-end">
                        <div class="f20 fw700 text-grey900 mb-5"
                            >
                            {{tab.category}}
                        </div>

                        <div v-for="(tab, i) in tab.titles" :key="i"
                             class="f13 fw500  pointer d-flex align-center mb-4 "
                             :class="{'text-pry': activeTitle === tab.title, 'text-grey800': activeTitle !== tab.title}"
                             @click="setActiveTitle(tab.title)"
                            >
                            <img v-if="tab.icon" :src="tab.icon"  class="pointer me-2" />
                            {{tab.title}}
                        </div>

                    </v-col>
                </v-row>
            </v-col>
        </v-row>

<!-- second section-->
        <v-row no-gutters
               class="padding_container footer_border bg-grey50 py-7"
        >

            <v-col v-if="screenType === 'desktop'" cols="4">
            </v-col>

            <v-col :cols=" screenType === 'desktop' ? '8' : '12'">
                <v-row no-gutters class="d-flex align-center">

                    <v-col >
                        <div class="f13 fw700 text-grey700 text-center">
                            تمامی حقوق مادی و معنوی این وبسایت متعلق به می‌باشد و هر گونه کپی برداری پیگرد قانونی دارد.
                        </div>
                        <div class="d-flex justify-center mt-3">
                            <img v-for="(item, i) in socialMedia" :key="i" :src="item"  class="pointer ms-2" />
                        </div>
                    </v-col>

                    <v-col class="d-flex mt-4"
                         :class=" screenType === 'mobile' ? 'justify-center' : 'justify-end'"
                    >
                        <v-sheet class="pointer rounded pa-3" >
                            <img src="/img/icons/Enamad2.png"/>
                        </v-sheet>

                        <v-sheet class="pointer ms-5 rounded pa-3" >
                            <img src="/img/icons/Enamad.png"/>
                        </v-sheet>
                    </v-col>

                </v-row>
            </v-col>
        </v-row>

    </v-sheet>
</template>

<script >
import {defineComponent} from 'vue'

export default defineComponent({

    data(){
        return{
            screenType: null,
            activeTitle: null,

            footer:[
                {category: 'لیست محصولات', titles: [{title: 'درباره ما'},{title: 'بلاگ'},{title: 'تماس با ما'}, {title: 'خدمات پس از فروش'}]},
                {category: 'راهنمای سایت', titles: [{title: 'قوانین و مقررات'},{title: 'دریافت مشاوره'},{title: 'انتقادات و پیشنهادات'}]},
                {category: 'شبکه‌های اجتماعی', titles: [{title: 'تلگرام',icon: '/img/icons/telegram-grey.png'},{title: 'اینستاگرام',icon: '/img/icons/instagram-grey.png'},{title: 'لینکدین',icon: '/img/icons/linkedIn-grey.png'}]},
            ],
            socialMedia: [
                '/img/icons/linkedIn.png',
                '/img/icons/youtube.png',
                '/img/icons/twitter.png',
                '/img/icons/instagram.png',
                '/img/icons/telegram.png',
            ],
            enamads: [
                '/img/icons/enamad2.png',
                '/img/icons/enamad.png',
            ]
        }
    },

    methods: {
        setActiveTitle(title) {
            this.activeTitle = title;
        },

        checkInnerWidth(){
            if(window.innerWidth > 1280 ){
                this.screenType = 'desktop'
            }
            else{
                this.screenType = 'mobile'
            }
        }
    },

    mounted() {
        this.checkInnerWidth()
        window.addEventListener('resize', this.checkInnerWidth)
    }
})
</script>

<style scoped>
.footer_shadow{
    box-shadow: 0 4px 16px 0 #dadee6 ;
}
.footer_border{
    border-radius:16px 16px 0 0 ;
}
</style>