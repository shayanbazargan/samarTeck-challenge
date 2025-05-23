<template>
    <v-sheet class="Card_sheet my-4 pa-4">
        <div class="f14 fw500 text-grey700 mx-3">
            فیلتر و جستجو
        </div>

        <v-text-field
            :model-value="modelValue"
            hide-details
            clearable
            rounded
            color="pry"
            class=" mt-5 mx-2 border16"
            variant="outlined"
            @update:modelValue="inputChange"
        >
            <template v-slot:prepend-inner >
                <v-icon color="pry">mdi-magnify</v-icon>
            </template>
        </v-text-field>

        <div class="d-flex mx-2">
            <v-btn class="flex-1-0 mt-3 border16 fw700 f12 bg-pry" flat @click="searchClick">
                جستجو
            </v-btn>
        </div>
    </v-sheet>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            localNeedle: this.modelValue,
        }
    },

    methods: {
        inputChange(value) {
            this.localNeedle = value
            this.$emit('update:modelValue', value) //built in update, emit for calling other options.
        },
        searchClick() {
            this.$emit('update:modelValue', this.localNeedle)
        },
    },
}
</script>