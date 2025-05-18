<template>
    <v-row no-gutters class=" justify-space-between mx-n4">
        <v-col  v-for="(product, i) in products" :key="i" class="my-4"
        >
            <v-sheet class=" productCard h-100  d-flex flex-column align-center ma-4 pa-2">
                <img :src="product.image" alt="product" class="border16" :style="{'max-width': ScreenType === 'desktop' ? '245px' : '166px', 'height': '256px'}">

                <v-spacer></v-spacer>
                <div class="f14 fw500 text-grey900 mt-4">
                    {{ product.title }}
                </div>
                <v-btn class="checkSingleProduct my-2 fw700 f14 text-pry" flat @click="singleProduct(product.id)">
                    مشاهده جزیات
                </v-btn>
            </v-sheet>
        </v-col>
    </v-row>
</template>



<script>

export default {
    props:{
        products:{
            type: Array,
            default: false
        },
    },

    data(){
        return {
            ScreenType: null,
        }
    },
    methods:{
        singleProduct(id){
            this.$router.push('/products/' + id)
        },

        checkInnerWidth(){
            if(window.innerWidth > 1028 ){
                this.ScreenType = 'desktop'
            }
            else if(window.innerWidth > 500 ){
                this.ScreenType = 'tablet'
            }else{
                this.ScreenType = 'mobile'
            }
        },
    },
    mounted() {
        this.checkInnerWidth()
        window.addEventListener('resize', this.checkInnerWidth)
    }
}
</script>

<style scoped >
.checkSingleProduct{
    letter-spacing: 0;
    border-radius: 16px !important;
    border: 1.5px solid #E9EDF5;
}
</style>/