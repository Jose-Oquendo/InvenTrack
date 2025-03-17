<template lang="">
    <div class="toast-container end-0" style="left: auto;">
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header"
                :class="'bg-'+store.notification.color"
            >
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                <strong><i class="bi bi-exclamation-circle me-auto"></i> {{ store.notification.text }}</strong>
            </div>
        </div>
    </div>
</template>
<script setup>
  import { useStore } from '../../store/index.js'
  const store = useStore()

</script>
<style lang="css">
    .toast-container{
        left: -3px;
        bottom: 100px;
    }
    .toast-header {
        justify-content: flex-end;
    }
    .toast {
        --bs-toast-bg: rgba(var(--bs-body-bg-rgb)) !important;
    }
</style>