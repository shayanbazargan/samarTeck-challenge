<template>
    <v-row no-gutters class=" mx-n4">
        <v-col v-for="(product, i) in products" :key="i"
               class="my-4" md="4" cols="12" >

            <v-sheet class=" Card_sheet h-100  d-flex flex-column align-center ma-4 pa-2"
            >
                <img :src="product.image" alt="product" class="product_image"/>

                <v-spacer></v-spacer>

                <div class="f14 fw500 text-grey900 mt-4">
                    {{ product.title }}
                </div>
                <v-btn class="detail_check my-2 fw700 f14 text-pry" flat @click="goToSingleProduct(product.id)">
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

    methods:{
        goToSingleProduct(id){
            this.$router.push('/products/' + id)
        },
    },
}
</script>

<style scoped >
.detail_check{
    letter-spacing: 0;
    border-radius: 16px !important;
    border: 1.5px solid #E9EDF5 !important;
}
.product_image{
    border-radius: 16px !important;
    max-width: 100% !important;
    aspect-ratio: 16 / 9;
/*
    object-fit: cover;
    object-position: top center;
    display: block;
    height: auto;
*/
}
</style>/