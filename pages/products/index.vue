<template>
    <div class="padding_container">

        <v-row no-gutters >
            <v-col cols="12" sm="4">

<!-- search -->
                <NeedleProduct  v-model="needle" @update:modelValue="applyFilters()"/>

<!-- sorting  -->
                <SortingProduct
                    v-model:sortingCount="sortingCount"
                    v-model:sortingRating="sortingRating"
                    @updateSorting="applyFilters()"
                />

<!-- categories  -->
                <CategoryProduct
                    v-model:categoryFilter="categoryFilter"
                    :allProducts="allProducts"
                    @updatedCategory="applyFilters()"
                />
            </v-col>


            <v-col cols="12" sm="8">

<!--filters-->
            <v-sheet class="Card_sheet d-flex align-center justify-space-between pa-4 my-4 mx-4" height="65">
                    <div class="f14 fw500 text-grey900">
                        فیلتر های اعمال شده
                    </div>

                <div class="d-flex">
                    <div v-if="needle"
                         class="bg-lightPry pa-3 border16 ms-5">
                        <v-icon size="small" class="me-2">mdi-magnify</v-icon>
                        {{needle}}
                        <v-icon size="xs" class="ms-2" @click="deleteNeedleFilter()">mdi-close</v-icon>
                    </div>

                    <div v-if="sortingCount || sortingRating"
                         class="bg-lightPry pa-3 border16 ms-5">
                        <v-icon size="small" class="me-2"> {{ sortingCount === "asc" || sortingRating === "asc" ?  'mdi-sort-ascending' : 'mdi-sort-descending' }}</v-icon>
                        {{ sortingCount ? 'تعداد' : 'رتبه'}}
                        <v-icon size="xs" class="ms-2" @click="deleteSorting()">mdi-close</v-icon>
                    </div>
                </div>

                </v-sheet>

<!-- products-->
            <div v-if="filteredProducts" class=" mx-4">
                <CardProduct :products="filteredProducts"/>
            </div>

            </v-col>
        </v-row>

    </div>
</template>

<script>
import CardProduct from "~/components/products/CardProduct.vue";
import NeedleProduct from "~/components/products/filters/NeedleProduct.vue";
import SortingProduct from "~/components/products/filters/SortingProduct.vue";
import CategoryProduct from "~/components/products/filters/CategoryProduct.vue";

export default {
    components: {
        CardProduct,
        NeedleProduct,
        SortingProduct,
        CategoryProduct
    },

    data(){
        return {
            allProducts: null,
            filteredProducts: null,
            needle: null,
            categoryFilter: null,
            sortingCount: null,
            sortingRating: null,

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
        // filters for search & category
            this.filteredProducts = this.allProducts.filter(product => {
                const matchesSearch = this.needle
                    ? product.title.toLowerCase().includes(this.needle.trim().toLowerCase())
                    : true; // we dont have search value

                const matchesCategory = this.categoryFilter
                    ? product.category === this.categoryFilter
                    : true; // we dont have category value

                return matchesSearch && matchesCategory; // filter products if both matches are true
            });



        // sorting
            if(this.sortingCount  || this.sortingRating){

                if(this.sortingCount === 'asc'){
                    return this.filteredProducts.sort((a, b) => a.count - b.count);
                }
                else if(this.sortingCount === 'des') {
                    return this.filteredProducts.sort((a, b) => b.count - a.count);
                }
                if(this.sortingRating === 'asc'){
                    return this.filteredProducts.sort((a, b) => a.rating - b.rating);
                }
                else if(this.sortingRating === 'des') {
                    return this.filteredProducts.sort((a, b) => b.rating - a.rating);
                }
            }
        },


        deleteNeedleFilter(){
            this.needle = null;
            this.applyFilters();
        },
        deleteSorting(){
            this.sortingCount = null;
            this.sortingRating = null;
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
                .catch(() => {
                }
            );
        },
    },
    mounted() {
        this.getProduct()
    }
}
</script>