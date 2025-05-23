<template>
    <div class="padding_container">

<!--breadcrumb-->
        <div class="f14 fw700 text-grey500 d-flex align-center mb-6">
            <img src="/img/icons/home.png" class="pointer mb-1" @click="$router.push('/')"/>
            <v-icon class="mx-1">mdi-chevron-left</v-icon>
            <div class="pointer" @click="$router.push('/products')">لیست محصولات‌ها</div>
            <v-icon class="mx-1">mdi-chevron-left</v-icon>
            <div > {{ product?.category}}</div>
        </div>

<!--top card-->
        <v-sheet class="my-6  px-6 py-5 Card_sheet">

            <div class=" fw700 text-blue900 mb-4"
                :class=" screenType === 'mobile' ? 'f20' : 'f24'">
               {{product?.title}}
            </div>

            <div v-if="product" class="position-relative">

                <img  :src="product?.image"   class="banner_product_image"
                >

                <v-icon style="backdrop-filter: blur(1px); background: #00000080;" color="white"
                        class="border16 pa-4 position-absolute right-0 mt-5 ms-5 pointer" >
                    mdi-magnify-plus
                </v-icon>
            </div>

        </v-sheet>

<!--main card-->
        <v-sheet class="my-4  px-6 py-5 Card_sheet">
            <div class="f20 fw700 text-blue900 mb-4">
                مشخصات فنی
            </div>

            <v-row no-gutters class="mx-n3">

<!--price-->
                <v-col sm="3" cols="12" class="mb-3">
                    <v-sheet class="f14 fw500 text-grey600 mx-3 specifications_card">
                        قیمت
                    </v-sheet>
                </v-col>
                <v-col sm="9" cols="12" class="mb-3">
                    <v-sheet class="f13 fw700 text-grey800 mx-3 specifications_card_info">
                        {{(product?.price * 1000).toLocaleString()}} تومان
                    </v-sheet>
                </v-col>

<!--description-->
                <v-col sm="3" cols="12" class="mb-3">
                    <v-sheet class="f14 fw500 text-grey600 mx-3 specifications_card d-flex align-center"
                             :min-height="ScreenType !== 'mobile' ? 145 : undefined">
                        توضیحات
                    </v-sheet>
                </v-col>
                <v-col sm="9" cols="12" class="mb-3">
                    <v-sheet class="f13 fw700 text-grey800 mx-3 specifications_card_info d-flex align-center" min-height="145">
                        <div>
                            <v-icon size="5"  class="me-2">mdi-circle</v-icon>
                            {{ product?.description}}
                        </div>
                    </v-sheet>
                </v-col>

<!--category-->
                <v-col sm="3" cols="12" class="mb-3">
                    <v-sheet class="f14 fw500 text-grey600 mx-3 specifications_card">
                        دسته بندی
                    </v-sheet>
                </v-col>
                <v-col sm="9" cols="12" class="mb-3">
                    <v-sheet class="f13 fw700 text-grey800 mx-3 specifications_card_info">
                        {{ product?.category}}
                    </v-sheet>
                </v-col>

<!--rating-->
                <v-col sm="3" cols="12" class="mb-3">
                    <v-sheet class="f14 fw500 text-grey600 mx-3 specifications_card">
                        رتبه
                    </v-sheet>
                </v-col>
                <v-col sm="9" cols="12" class="mb-3">
                    <v-sheet class="f13 fw700 text-grey800 mx-3 specifications_card_info">
                        {{ Math.floor(product?.rating?.rate) }}
                    </v-sheet>
                </v-col>

<!--count-->
                <v-col sm="3" cols="12" class="mb-3">
                    <v-sheet class="f14 fw500 text-grey600 mx-3 specifications_card">
                        تعداد
                    </v-sheet>
                </v-col>
                <v-col sm="9" cols="12" class="mb-3">
                    <v-sheet class="f13 fw700 text-grey800 mx-3 specifications_card_info">
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
            screenType: null,
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
            if(window.innerWidth > 360 ){
                this.screenType = 'desktop'
            }else{
                this.screenType = 'mobile'
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

<style scoped>
.banner_product_image{
    border-radius: 24px !important;
    width: 100% !important;
    max-height: 310px !important;
    aspect-ratio: 16 / 9;
}

.specifications_card{
    border-radius: 4px 16px 16px 4px !important;
    padding: 12px 16px !important;
    background-color: #F5F7FA !important;

    @media (max-width: 361px) {
        border-radius: 16px !important;
    }
}

.specifications_card_info{
    border-radius: 16px 4px 4px 16px !important;
    padding: 12px 16px !important;
    background-color: #F5F7FA !important;

    @media (max-width: 361px) {
        border-radius: 16px !important;
    }
}
</style>