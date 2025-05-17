<template>
    <div :class=" ScreenType === 'desktop' ? 'paddingContainerDesktop' : 'px-6'">

        <v-row no-gutters>
            <v-col :cols=" ScreenType === 'desktop' ? '4' : '12'">
                1
            </v-col>

            <v-col :cols=" ScreenType === 'desktop' ? '8' : '12'"
                   v-if="products">
                {{products[0]}}

            </v-col>
        </v-row>

    </div>
</template>

<script>
export default {
    data(){
        return {
            ScreenType: null,
            products: null,

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
        getProduct(){
            this.$Axios.get('/products')
                .then((res) => {
                    const Categories = ['Building', 'Health', 'Industrial'];
                    const Ratings = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

                    let product = res.data
                    console.log(product)

                    this.products = res.data.map(product => {
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

                    console.log(this.products);
                })
                .catch((error) => {
                });

        },

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

        this.getProduct()
    }
}
</script>
