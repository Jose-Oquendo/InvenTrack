<script setup>
// import { Column, Table } from '@tanstack/vue-table';
import { computed } from 'vue'
// import DebouncedInput from './DebouncedInput.vue'
import tableInputs from './tableInputs.vue'

const props = defineProps({
    column: {
        type: Object,
        required: true,
    },
    table: {
        type: Object,
        required: true,
    },
})

const firstValue = computed(() =>
    props.table.getPreFilteredRowModel().flatRows[0]?.getValue(props.column.id)
)

const columnFilterValue = computed(() => props.column.getFilterValue())

const sortedUniqueValues = computed(() =>
    typeof firstValue.value === 'number'
        ? []
        : Array.from(props.column.getFacetedUniqueValues().keys()).sort()
)

</script>

<template>
    <div v-if="typeof firstValue === 'number'">
        <div class="d-flex space-x-2">
            <tableInputs type="number" :min="Number(column.getFacetedMinMaxValues()?.[0] ?? '')"
                :max="Number(column.getFacetedMinMaxValues()?.[1] ?? '')" :modelValue="(columnFilterValue)?.[0] ?? ''"
                @update:modelValue="
                    value =>
                        column.setFilterValue((old) => [value, old?.[1]])
                " :placeholder="`Min ${column.getFacetedMinMaxValues()?.[0]
                ? `(${column.getFacetedMinMaxValues()?.[0]})`
                : ''
            }`" class="w-36 border shadow rounded"></tableInputs>
            <tableInputs type="number" :min="Number(column.getFacetedMinMaxValues()?.[0] ?? '')"
                :max="Number(column.getFacetedMinMaxValues()?.[1] ?? '')" :modelValue="(columnFilterValue)?.[1] ?? ''"
                @update:modelValue="
                    value =>
                        column.setFilterValue((old) => [old?.[0], value])
                " :placeholder="`Max ${column.getFacetedMinMaxValues()?.[1]
                ? `(${column.getFacetedMinMaxValues()?.[1]})`
                : ''
            }`" class="w-36 border shadow rounded"></tableInputs>
        </div>
        <div class="h-1"></div>
    </div>
    <div v-else>
        <datalist :id="column.id + 'list'">
            <option v-for="value in sortedUniqueValues.slice(0, 5000)" :key="value" :value="value"></option>
        </datalist>
        <tableInputs type="text" :modelValue="(columnFilterValue ?? '')"
            @update:modelValue="value => column.setFilterValue(value)"
            :placeholder="`Buscar... (${column.getFacetedUniqueValues().size})`" class="w-36 border shadow rounded"
            :list="column.id + 'list'"></tableInputs>
        <div class="h-1"></div>
    </div>
</template>
