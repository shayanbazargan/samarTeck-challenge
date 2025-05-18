<template>
    <div :class=" ScreenType === 'mobile' ? 'px-6' : 'paddingContainerDesktop'">

<!--breadcrumb-->
        <div class="f14 fw700 text-grey500 d-flex align-center mb-6">
            <img src="/img/icons/home.png" class="pointer mb-1" @click="$router.push('/')"/>
            <v-icon class="mx-1">mdi-chevron-left</v-icon>
            <div class="pointer" @click="$router.push('/products')">لیست محصولات‌ها</div>
            <v-icon class="mx-1">mdi-chevron-left</v-icon>
            <div > {{ product?.category}}</div>
        </div>

<!--top card-->
        <v-sheet class="my-6  px-6 py-5 productCard">

            <div class=" fw700 text-blue900 mb-4"
                :class=" ScreenType === 'mobile' ? 'f20' : 'f24'">
               {{product?.title}}
            </div>

            <div v-if="product" class="position-relative">
                <img  :src="product?.image"  width="100%" class="border24" :height="ScreenType === 'mobile' ? '235' : '310'">
                <v-icon style="backdrop-filter: blur(1px); background: #00000080;" color="white"
                        class="border16 pa-4 position-absolute right-0 mt-5 ms-5 pointer" >
                    mdi-magnify-plus
                </v-icon>
            </div>


        </v-sheet>

<!--main card-->
        <v-sheet class="my-4  px-6 py-5 productCard">
            <div class="f20 fw700 text-blue900 mb-4">
                مشخصات فنی
            </div>

            <v-row no-gutters class="mx-n3">

<!--price-->
                <v-col sm="3" cols="12" class="mb-3">
                    <v-sheet class="f14 fw500 text-grey600 mx-3 titleCard"
                             :class="{'border16' :ScreenType === 'mobile'}">
                        قیمت
                    </v-sheet>
                </v-col>
                <v-col sm="9" cols="12" class="mb-3">
                    <v-sheet class="f13 fw700 text-grey800 mx-3 contentCard"
                             :class="{'border16' :ScreenType === 'mobile'}">
                        {{(product?.price * 1000).toLocaleString()}} تومان
                    </v-sheet>
                </v-col>

<!--description-->
                <v-col sm="3" cols="12" class="mb-3">
                    <v-sheet class="f14 fw500 text-grey600 mx-3 titleCard d-flex align-center"
                             :class="{'border16' :ScreenType === 'mobile'}"
                             :min-height="ScreenType !== 'mobile' ? 145 : undefined">
                        توضیحات
                    </v-sheet>
                </v-col>
                <v-col sm="9" cols="12" class="mb-3">
                    <v-sheet class="f13 fw700 text-grey800 mx-3 contentCard d-flex align-center" min-height="145"
                             :class="{'border16' :ScreenType === 'mobile'}">
                        <div>
                            <v-icon size="5"  class="me-2">mdi-circle</v-icon>
                            {{ product?.description}}
                        </div>
                    </v-sheet>
                </v-col>

<!--price-->
                <v-col sm="3" cols="12" class="mb-3">
                    <v-sheet class="f14 fw500 text-grey600 mx-3 titleCard"
                             :class="{'border16' :ScreenType === 'mobile'}">
                        دسته بندی
                    </v-sheet>
                </v-col>
                <v-col sm="9" cols="12" class="mb-3">
                    <v-sheet class="f13 fw700 text-grey800 mx-3 contentCard"
                             :class="{'border16' :ScreenType === 'mobile'}">
                        {{ product?.category}}
                    </v-sheet>
                </v-col>

<!--rating-->
                <v-col sm="3" cols="12" class="mb-3">
                    <v-sheet class="f14 fw500 text-grey600 mx-3 titleCard"
                             :class="{'border16' :ScreenType === 'mobile'}">
                        رتبه
                    </v-sheet>
                </v-col>
                <v-col sm="9" cols="12" class="mb-3">
                    <v-sheet class="f13 fw700 text-grey800 mx-3 contentCard"
                             :class="{'border16' :ScreenType === 'mobile'}">
                        {{ Math.floor(product?.rating?.rate) }}
                    </v-sheet>
                </v-col>

<!--count-->
                <v-col sm="3" cols="12" class="mb-3">
                    <v-sheet class="f14 fw500 text-grey600 mx-3 titleCard"
                             :class="{'border16' :ScreenType === 'mobile'}">
                        تعداد
                    </v-sheet>
                </v-col>
                <v-col sm="9" cols="12" class="mb-3">
                    <v-sheet class="f13 fw700 text-grey800 mx-3 contentCard"
                             :class="{'border16' :ScreenType === 'mobile'}">
                        {{ product?.rating?.count}}
                    </v-sheet>
                </v-col>


            </v-row>
        </v-sheet>
    </div>
</template>

<script>
export default {
    data(){
        return {
            ScreenType: null,
            product: null,
        }
    },

    methods:{
        getProduct(){
            this.$Axios.get('/products/'+ this.$route.params.id)
                .then((res) => {
                    this.product = res.data
                    this.product.description = 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.'
                })
                .catch((error) => {
                });
        },

        checkInnerWidth(){
            if(window.innerWidth > 600 ){
                this.ScreenType = 'desktop'
            }else{
                this.ScreenType = 'mobile'
            }
        },
    },
    mounted() {
        this.checkInnerWidth()
        window.addEventListener('resize', this.checkInnerWidth)

        this.getProduct()
    }
}
</script>