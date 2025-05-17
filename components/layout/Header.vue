<template>
    <v-sheet class="f13 headerBoxShadow d-flex align-center "
             :height=" ScreenType === 'mobile'  ? '72' : '120'"
             :class=" ScreenType === 'desktop' ? 'paddingContainerDesktop' : 'px-6'"
    >

        <template v-if="ScreenType === 'desktop' ">
            <div v-for="(tab, i) in tabs" :key="i">

                <div  @click="$router.push(tab.slug)" class="ms-5 pointer">

                    <!-- index-->
                    <div v-if="$route.path === tab.slug || $route.path.includes(tab.slug)"  class="f15 fw700 text-pry">
                        <v-icon class="me-2" size="small" color="pry"> {{ tab.selectedIcon }} </v-icon>
                        {{tab.title}}
                    </div>

                    <!--others-->
                    <div v-else>
                        <v-icon class="me-2" size="small" > {{ tab.icon }} </v-icon>
                        {{tab.title}}
                    </div>
                </div>

            </div>

            <v-spacer></v-spacer>
            <v-btn class=" f14 fw700 ms-2 px-4  bg-pry border16 pointer">
                    تماس
                    <v-icon class="ms-2" size="small"> mdi-phone</v-icon>
            </v-btn>

        </template>

        <template v-if="ScreenType === 'mobile' ">
            <img src="/img/icons/app-bar.png"  class="pointer" />

            <v-spacer></v-spacer>

            <img src="/img/icons/contact.png" class="pointer" @click="$router.push('contactUs')"/>

        </template>
    </v-sheet>
</template>

<script >
import {defineComponent} from 'vue'

export default defineComponent({

    data(){
        return{
            ScreenType: null,

            tabs:[
                {title: 'لیست محصولات', slug: '/products', icon: 'mdi-rhombus-split', selectedIcon: 'mdi-rhombus-split-outline' },
                {title: 'سوالات متداول', slug: '/commonQuestions', icon: 'mdi-comment-question', selectedIcon: 'mdi-comment-question-outline' },
                {title: 'دریافت مشاوره', slug: '/consulting', icon: 'mdi-handshake', selectedIcon: 'mdi-handshake' },
                {title: 'تماس با ما', slug: '/contactUs', icon: 'mdi-phone', selectedIcon: 'mdi-phone-outline' },
            ]
        }
    },

    methods: {
        checkInnerWidth(){
            if(window.innerWidth > 500 ){
                this.ScreenType = 'desktop'
            }
            else{
                this.ScreenType = 'mobile'
            }
        },
    },

    mounted() {
        this.checkInnerWidth()
        window.addEventListener('resize', this.checkInnerWidth)
    }
})
</script>

<style scoped>

.headerBoxShadow {
    box-shadow: 0 6px 10px 0 #dadee6 ;
    backdrop-filter: blur(40px);
    border-radius: 0 0 16px 16px;
}
</style>