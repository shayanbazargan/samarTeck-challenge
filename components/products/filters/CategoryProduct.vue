<template>
    <v-sheet class="Card_sheet  my-4 pa-4">
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
                                    :value="category.value"

                                    :model-value="categoryFilter"
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
</template>

<script>
export default {
    props: {
        categoryFilter: {
            type: String,
            default: null,
        },
        allProducts: {
            type: Array,
            default: null,
        },
    },

    data(){
        return {
            categoryOptions: [
                {value: 'Building', label: 'مسکن و ساختمان'},
                {value: 'Health', label: 'بهداشت و درمان'},
                {value: 'Industrial', label: 'صنعتی و کارخانه'},
            ],
        }
    },

    methods: {
        categoryCount(category){
            return this.allProducts.filter(product => { return product.category === category;}).length;
        },

        changeCategory(category){
            const newCategory = this.categoryFilter === category ? null : category;

            this.$emit('update:categoryFilter', newCategory);
            this.$emit('updatedCategory');
        },
    },
}
</script>