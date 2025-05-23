<template>
    <v-sheet class="Card_sheet  my-4 pa-4">
        <div class="d-flex align-center justify-space-between f14 fw500 text-grey700 mx-2">
            مرتب سازی
            <v-icon color="grey500" size="large">mdi-chevron-down</v-icon>
        </div>

        <v-radio-group hide-details :model-value="sortingCount"  @update:modelValue="changeSortingToCount" class="f13" :ripple="false">
            <v-radio value="asc"    color="pry">
                <template v-slot:label>
                            <span class="f12 fw500 text-grey500"
                                  :class="{'text-grey800 f13': sortingCount === 'asc' }"
                            >
                                تعداد : کم به زیاد
                            </span>
                </template>
            </v-radio>

            <v-radio  value="des" color="pry">
                <template v-slot:label>
                            <span class="f12 fw500 text-grey500"
                                  :class="{'text-grey800 f13': sortingCount === 'des' }">
                                تعداد : زیاد به کم
                            </span>
                </template>
            </v-radio>
        </v-radio-group>

        <v-radio-group hide-details :model-value="sortingRating" @update:modelValue="changeSortingToRating" class="f13" :ripple="false">
            <v-radio value="asc"  color="pry">
                <template v-slot:label>
                            <span class="f12 fw500 text-grey500"
                                  :class="{'text-grey800 f13': sortingRating === 'asc' }">
                                رتبه : کم به زیاد
                            </span>
                </template>
            </v-radio>

            <v-radio value="des" color="pry">
                <template v-slot:label>
                            <span class="f12 fw500 text-grey500"
                                  :class="{'text-grey800 f13': sortingRating === 'des' }">
                                رتبه : زیاد به کم
                            </span>
                </template>
            </v-radio>
        </v-radio-group>

    </v-sheet>
</template>

<script>
export default {
    props: {
        sortingCount: {
            type: String,
            default: null,
        },
        sortingRating: {
            type: String,
            default: null,
        },
    },

    methods: {
        changeSortingToCount(value){
            this.$emit('update:sortingRating', null);
            this.$emit('update:sortingCount', value);
            this.$emit('updateSorting');
        },
        changeSortingToRating(value){
            this.$emit('update:sortingCount', null);
            this.$emit('update:sortingRating', value);
            this.$emit('updateSorting');
        },
    },
}
</script>