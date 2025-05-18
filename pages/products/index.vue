<template>
    <div :class=" ScreenType === 'mobile' ? 'px-6' : 'paddingContainerDesktop'">

        <v-row no-gutters >
            <v-col :cols=" ScreenType === 'mobile' ? '12' : '4'" >
<!-- search -->
                <v-sheet class="CardSheet  my-4">
                    <div class="f14 fw500 text-grey700">
                        فیلتر و جستجو
                    </div>

                    <v-text-field
                        v-model="needle"
                        hide-details
                        clearable
                        rounded
                        color="pry"
                        class=" mt-5 border16"
                        variant="outlined"
                        @input="applyFilters()"
                    >
                        <template v-slot:prepend-inner >
                            <v-icon color="pry">mdi-magnify</v-icon>
                        </template>
                    </v-text-field>

                    <div class="d-flex">
                        <v-btn class="flex-1-0 mt-3 border16 fw700 f12 bg-pry" flat @click="applyFilters()">
                            جستجو
                        </v-btn>
                    </div>
                </v-sheet>
<!-- sorting-->
                <v-sheet class="CardSheet  my-4">
                    <div class="d-flex align-center justify-space-between f14 fw500 text-grey700">
                        مرتب سازی
                        <v-icon color="grey500" size="large">mdi-chevron-down</v-icon>
                    </div>
                </v-sheet>
<!-- categories-->
                <v-sheet class="CardSheet  my-4">
                    <div class="d-flex align-center justify-space-between f14 fw500 text-grey700">
                        دسته بندی
                        <v-icon color="grey500" size="large">mdi-chevron-down</v-icon>
                    </div>
                </v-sheet>
            </v-col>


            <v-col :cols=" ScreenType === 'mobile' ? '12' : '8'"
                   >
<!--filters-->
            <v-sheet class="CardSheet d-flex align-center justify-space-between  my-4 mx-4" height="65">
                    <div class="f14 fw500 text-grey900">
                        فیلتر های اعمال شده
                    </div>

                    <div v-if="needle"
                         class="bg-lightPry pa-3 border16">
                        <v-icon size="small" class="me-2">mdi-magnify</v-icon>
                        {{needle}}
                        <v-icon size="xs" class="ms-2" @click="deleteFilter()">mdi-close</v-icon>
                    </div>
                </v-sheet>

<!-- products-->
            <div v-if="filteredProducts" class=" mx-4">
                <ProductCard :products="filteredProducts"/>
            </div>

            </v-col>
        </v-row>

    </div>
</template>

<script>
import ProductCard from "~/components/products/ProductCard.vue";

export default {
    components: {ProductCard},
    data(){
        return {
            ScreenType: null,
            allProducts: null,
            filteredProducts: null,
            needle: null,
            countSorting: null,
            ratingSorting: null,
            categoryFilter: null,

            randomTitles: [
            "کوله‌پشتی مردانه",
            "شلوار جین کلاسیک",
            "پیراهن رسمی",
            "کفش راحتی",
            "عینک آفتابی شیک",
            "کت اسپرت",
            "ساعت مچی لوکس",
            "کیف پول چرمی",
            "تیشرت نخی ساده",
            "جوراب اسپرت",
            "هودی زمستانی",
            "کمربند چرمی",
            "دستکش لمسی",
            "کفش ورزشی سبک",
            "کلاه کپ مردانه"
            ]
        }
    },
    methods:{
        applyFilters(){
            this.filteredProducts = this.allProducts.filter(product => {
                if (this.needle) {
                    return product.title.toLowerCase().includes(this.needle.trim().toLowerCase());
                } else {
                    return true;
                }
            });
            console.log(this.filteredProducts)
        },

        deleteFilter(){
            this.needle = '';
            this.applyFilters();
        },

        getProduct(){
            this.$Axios.get('/products')
                .then((res) => {
                    const Categories = ['Building', 'Health', 'Industrial'];
                    const Ratings = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

                    this.allProducts = res.data.map(product => {
                        const randomTitle = this.randomTitles[Math.floor(Math.random() * this.randomTitles.length)];
                        const randomCount = Math.floor(Math.random() * 101);
                        const randomCategory = Categories[Math.floor(Math.random() * Categories.length)];
                        const randomRating = Ratings[Math.floor(Math.random() * Ratings.length)];

                        return {
                            ...product,
                            title: randomTitle,
                            count: randomCount,
                            rating: randomRating,
                            category: randomCategory
                        };
                    });

                    this.filteredProducts = this.allProducts
                })
                .catch((error) => {
                });

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

        this.getProduct()
    }
}
</script>