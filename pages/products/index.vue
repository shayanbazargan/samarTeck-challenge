<template>
    <div :class=" ScreenType === 'mobile' ? 'px-6' : 'paddingContainerDesktop'">

        <v-row no-gutters >
            <v-col :cols=" ScreenType === 'mobile' ? '12' : '4'" >

<!-- search -->
                <v-sheet class="CardSheet my-4">
                    <div class="f14 fw500 text-grey700 mx-3">
                        فیلتر و جستجو
                    </div>

                    <v-text-field
                        v-model="needle"
                        hide-details
                        clearable
                        rounded
                        color="pry"
                        class=" mt-5 mx-2 border16"
                        variant="outlined"
                        @input="applyFilters()"
                    >
                        <template v-slot:prepend-inner >
                            <v-icon color="pry">mdi-magnify</v-icon>
                        </template>
                    </v-text-field>

                    <div class="d-flex mx-2">
                        <v-btn class="flex-1-0 mt-3 border16 fw700 f12 bg-pry" flat @click="applyFilters()">
                            جستجو
                        </v-btn>
                    </div>
                </v-sheet>

<!-- sorting-->
                <v-sheet class="CardSheet  my-4">
                    <div class="d-flex align-center justify-space-between f14 fw500 text-grey700 mx-2">
                        مرتب سازی
                        <v-icon color="grey500" size="large">mdi-chevron-down</v-icon>
                    </div>

                    <v-radio-group hide-details v-model="sorting" @change="applyFilters()" class="f13" :ripple="false">
                        <v-radio  value="count-ascending"  color="pry">
                            <template v-slot:label>
                                <span class="f12 fw500 text-grey500"
                                        :class="{'text-grey800' : sorting === 'count-ascending'}">تعداد : کم به زیاد</span>
                            </template>
                        </v-radio>
                        <v-radio  value="count-descending" color="pry">
                            <template v-slot:label>
                                <span class="f12 fw500 text-grey500" :class="{'text-grey800' : sorting === 'count-descending'}">تعداد : زیاد به کم
                                </span>
                            </template>
                        </v-radio>
                        <v-radio value="rating-ascending"  color="pry">
                            <template v-slot:label>
                                <span class="f12 fw500 text-grey500" :class="{'text-grey800' : sorting === 'rating-ascending'}">رتبه : کم به زیاد</span>
                            </template>
                        </v-radio>
                        <v-radio value="rating-descending" color="pry">
                            <template v-slot:label>
                                <span class="f12 fw500 text-grey500" :class="{'text-grey800' : sorting === 'rating-descending'}">رتبه : زیاد به کم</span>
                            </template>
                        </v-radio>
                    </v-radio-group>

                </v-sheet>

<!-- categories-->
                <v-sheet class="CardSheet  my-4">
                    <div class="d-flex align-center justify-space-between f14 fw500 text-grey700 mx-2">
                        دسته بندی
                        <v-icon color="grey500" size="large">mdi-chevron-down</v-icon>
                    </div>

                    <div v-if="allProducts"
                            v-for="(category, i) in categoryOptions" :key="i" class="d-flex justify-space-between align-center me-2"
                    >
                            <v-checkbox
                                color="pry"
                                class="f12"
                                hide-details
                                :ripple="false"
                                v-model="categoryFilter"
                                :value="category.value"
                                @click="changeCategory(category.value)"
                            >
                                <template v-slot:label>
                                        <span class="f12 fw500 text-grey500"
                                              :class="{'text-grey800' : categoryFilter === category.value}"
                                        >
                                            {{category.label}}
                                        </span>
                                </template>
                            </v-checkbox>

                            <v-sheet  height="25px" width="25px" style="border-radius: 6px"
                                      class=" f12 fw500 d-flex align-center justify-center"
                                      :class="categoryFilter === category.value ? 'bg-pry' : 'bg-black'"
                            >
                                {{ categoryCount(category.value) }}
                            </v-sheet>

                        </div>

                </v-sheet>
            </v-col>


            <v-col :cols=" ScreenType === 'mobile' ? '12' : '8'">

<!--filters-->
            <v-sheet class="CardSheet d-flex align-center justify-space-between  my-4 mx-4" height="65">
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

                    <div v-if="countSortingActive"
                         class="bg-lightPry pa-3 border16 ms-5">
                        <v-icon size="small" class="me-2"> {{ sorting === "count-ascending" ?  'mdi-sort-ascending' : 'mdi-sort-descending' }}</v-icon>
                        تعداد
                        <v-icon size="xs" class="ms-2" @click="deleteSorting()">mdi-close</v-icon>
                    </div>

                    <div v-if="ratingSortingActive"
                         class="bg-lightPry pa-3 border16 ms-5">
                        <v-icon size="small" class="me-2"> {{ sorting === "rating-ascending" ?  'mdi-sort-ascending' : 'mdi-sort-descending' }}</v-icon>
                        رتبه
                        <v-icon size="xs" class="ms-2" @click="deleteSorting()">mdi-close</v-icon>
                    </div>
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
            categoryFilter: null,
            sorting: null,

            categoryOptions: [
                {value: 'Building', label: 'مسکن و ساختمان'},
                {value: 'Health', label: 'بهداشت و درمان'},
                {value: 'Industrial', label: 'صنعتی و کارخانه'},
            ],
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

    computed: {
        countSortingActive() {
            if(this.sorting) {
                return this.sorting.includes('count');
            }
        },
        ratingSortingActive() {
            if(this.sorting){
                return this.sorting.includes('rating');
            }
        },
    },

    methods:{
        checkAscending(array, order, key) {
            if (order === 'ascending') {
                return array.sort((a, b) => a[key] - b[key]);
            } else if (order === 'descending') {
                return array.sort((a, b) => b[key] - a[key]);
            } else {
                return array;    // no sorting if order is not specified
            }
        },

        categoryCount(category){
            const lengthCategories = this.allProducts.filter(product => {
                return product.category === category;
            });

            return lengthCategories.length
        },

        changeCategory(category){
            if(this.categoryFilter === category){
                this.categoryFilter = null
            }else{
                this.categoryFilter = category
            }
            this.applyFilters();
        },

        applyFilters(){
        // filters for needle
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
            if(this.sorting){

                const order = this.sorting.includes('ascending') ? "ascending" : "descending";

                if (this.sorting.includes('count')) {
                    this.filteredProducts = this.checkAscending(this.filteredProducts, order, 'count');
                }
                if (this.sorting.includes('rating')) {
                    this.filteredProducts = this.checkAscending(this.filteredProducts, order, 'rating');
                }
            }

            this.checkAscending()
        },


        deleteNeedleFilter(){
            this.needle = null;
            this.applyFilters();
        },
        deleteSorting(){
            this.sorting = null;
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