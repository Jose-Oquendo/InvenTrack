<script setup>
import { ref, reactive, computed, onMounted, watchEffect } from 'vue';
import { useStore } from '../../store';

import jszip from 'jszip';
import pdfmake from 'pdfmake';
import {
    FlexRender,
    createColumnHelper,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useVueTable,
} from '@tanstack/vue-table'

let store = useStore()
const props = defineProps(['colnum', 'len', 'defaultData'])

let filters = ref(false);
let pinning = ref(false);

let columnHelper = createColumnHelper();
let columns = reactive(computed(() => {
    let aux = [];
    for (const key in props.defaultData[0]) {
        if (Object.prototype.hasOwnProperty.call(props.defaultData[0], key)) {
            aux.push(columnHelper.accessor(key, {
                id: key,
                header: () => key,
            }),);
        }
    }

    return aux;
}))

const INITIAL_PAGE_INDEX = ref(0);
const data = ref(props.defaultData)
const goToPageNumber = ref(INITIAL_PAGE_INDEX.value + 1)
const pageSizes = ref([5, 10, 15])
const sorting = ref([]);
const columnFilters = ref([])
const columnPinning = ref([])
const columnOrder = ref([])
const columnVisibility = ref([])
const globalFilter = ref('')

if(props.len == 0){
    pageSizes.value.push(20);
    pageSizes.value.push(30);
} else {
    if(!pageSizes.value.includes(props.len) ){
        pageSizes.value.push(props.len)
        pageSizes.value.sort((a, b) => a - b)
    }
}

const table = useVueTable({
    get data() {
        return props.defaultData;
    },
    get columns() {
        return columns.value
    },
    filterFns: {},
    state: {
        get columnVisibility() {
            return columnVisibility.value
        },
        get columnOrder() {
            return columnOrder.value
        },
        get columnPinning() {
            return columnPinning.value
        },
        get columnFilters() {
            return columnFilters.value
        },
        get globalFilter() {
            return globalFilter.value
        },
        get sorting() {
            return sorting.value
        },
    },
    initialState: {
        pagination: {
            pageIndex: 0,
            pageSize: props.len == 0 ? 10 : props.len,
        }
    },
    onColumnFiltersChange: updaterOrValue => {
        columnFilters.value =
            typeof updaterOrValue === 'function'
                ? updaterOrValue(columnFilters.value)
                : updaterOrValue
    },
    onGlobalFilterChange: updaterOrValue => {
        globalFilter.value =
            typeof updaterOrValue === 'function'
                ? updaterOrValue(globalFilter.value)
                : updaterOrValue
    },
    onSortingChange: updaterOrValue => {
        sorting.value =
            typeof updaterOrValue === 'function'
                ? updaterOrValue(sorting.value)
                : updaterOrValue
    },
    onColumnOrderChange: order => {
        columnOrder.value =
            order instanceof Function ? order(columnOrder.value) : order
    },
    onColumnPinningChange: pinning => {
        columnPinning.value =
            pinning instanceof Function ? pinning(columnPinning.value) : pinning
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugColumns: true,
});

function toggleColumnVisibility(column) {
    columnVisibility.value = {
        ...columnVisibility.value,
        [column.id]: !column.getIsVisible(),
    }
}
function toggleAllColumnsVisibility() {
    table.getAllLeafColumns().forEach(column => {
        toggleColumnVisibility(column)
    })
}
function handleGoToPage(e) {
    const page = e.target.value ? Number(e.target.value) - 1 : 0
    goToPageNumber.value = page + 1
    table.setPageIndex(page)
}

function handlePageSizeChange(e) {
    table.setPageSize(Number(e.target.value))
}

</script>
<template lang="">
    <div class="d-flex flex-column gap-3">
        <div class="table-responsive overflow-scroll" style="max-height: 500px;">
            <table  class="table table-bordered table-striped" border="1">
                <thead class="table-dark">
                    <tr>
                        <th :colspan="colnum">
                            <div class="d-flex gap-5 justify-content-between align-items-center">
                                <div class="flex-fill d-flex gap-2">
                                    <button class="btn btn-dark border" @click="() => table.setPageIndex(0)" :disabled="!table.getCanPreviousPage()" ><i class="bi bi-skip-backward"></i></button>
                                    <button class="btn btn-dark border" @click="() => table.previousPage()" :disabled="!table.getCanPreviousPage()" ><i class="bi bi-skip-start"></i></button>
                                    <button class="btn btn-dark border" @click="() => table.nextPage()" :disabled="!table.getCanNextPage()" ><i class="bi bi-skip-end"></i></button>
                                    <button class="btn btn-dark border" @click="() => table.setPageIndex(table.getPageCount() - 1)" :disabled="!table.getCanNextPage()" ><i class="bi bi-skip-forward"></i></button>
                                    <div class="d-flex align-items-center">{{ table.getRowModel().rows.length }} Rows</div>
                                </div>
                                <div class="d-flex gap-2 align-items-center">
                                    <span class="d-flex align-items-center">
                                        <div> Pagina </div>
                                        <strong>
                                            {{ table.getState().pagination.pageIndex + 1 }} de {{ table.getPageCount() }} 
                                        </strong> 
                                    </span>
                                    <select class="form-select w-auto " :value="table.getState().pagination.pageSize" @change="handlePageSizeChange" > 
                                        <option :key="pageSize" :value="pageSize" v-for="pageSize in pageSizes" > Show {{ pageSize }} </option> 
                                    </select>
                                    <button @click="pinning = !pinning" class="border p-2">Ordenar <i :class="pinning ? '' : ''"></i></button>
                                    <button @click="filters = !filters" class="border p-2">Filtros <i :class="filters ? '' : ''"></i></button>
                                </div>
                            </div>
                        </th>
                    </tr>
                    <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id" >
                        <th v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan" :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''">
                            <div @click="header.column.getToggleSortingHandler()?.($event)">
                                <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" ></FlexRender>
                                <span> {{ { asc: ' 🔼', desc: ' 🔽' }[ header.column.getIsSorted()] }} </span>
                            </div>
                            <div v-if="pinning">
                                <div v-if="!header.isPlaceholder && header.column.getCanPin()" class="flex justify-center gap-1" >
                                    <button v-if="header.column.getIsPinned() !== 'left'" @click="header.column.pin('left')" class="btn btn-sm btn-dark p-0" > {{ '⏪' }} </button>
                                    <button v-if="header.column.getIsPinned()" @click="header.column.pin(false)" class="btn btn-sm btn-dark p-0" > ⏹ </button>
                                    <button v-if="header.column.getIsPinned() !== 'right'" @click="header.column.pin('right')" class="btn btn-sm btn-dark p-0" > {{ '⏩' }}</button>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in table.getRowModel().rows" :key="row.id">
                        <td v-for="cell in row.getVisibleCells()" :key="cell.id" @click="$emit('click-table', cell.getContext().row.original)">
                            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style lang="css">
/* .dt-layout-full{
        display: inline-block !important;
    }
    .dt-column-order{
        color: white;
    }
    .dt-container{
        border-radius: 5px;
        overflow: hidden;
    }
    .dt-container div.row.mt-2.justify-content-between{
        padding: 0.5em 0px;
        margin: 0px !important;
    }
    .dt-container .pagination{
        --bs-pagination-color: var(--darkmedium);
        --bs-pagination-hover-color: rgba(45, 126, 52, 0.759);
        --bs-pagination-focus-color: rgba(45, 126, 52, 0.568);
        --bs-pagination-active-bg: rgb(45, 126, 52);
        --bs-pagination-active-border-color: rgb(45, 126, 52);
        --bs-pagination-focus-box-shadow: 0 0 0 0.25rem rgb(44 91 50 / 25%)
    }
    #myTable colgroup:nth-child(2) {
        display: none;
    }
    .dt-search, .dt-length label{
        display: flex;
        gap: 1em;
    }
    .dt-search input.form-control-sm{
        padding: .375rem .75rem;
        font-size: 1rem;
    }
    .dt-container .selected{
        background-color: rgb(215, 234, 250) !important;
    }
    @media (min-width: 768px) {
        .dt-buttons{
            margin-left: 1em;
        }
    }
    @media (max-width: 768px) {
        .dt-layout-end{
            margin: 15px 0px;
            display: flex;
        }
    } */
</style>