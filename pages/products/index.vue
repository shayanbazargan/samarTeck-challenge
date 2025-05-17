<template>
    <div class="text-center fw800 f20">
        product
    </div>
</template>

<script>
export default {
    data(){
        return {
            products: null
        }
    },
    methods:{
        getProduct(){
            this.$Axios.get('/products')
                .then((res) => {
                    let product = res.data

                    console.log(product)
                })
                .catch((error) => {
                });

        }
    },
    mounted() {
        this.getProduct()
    }
}
</script>
