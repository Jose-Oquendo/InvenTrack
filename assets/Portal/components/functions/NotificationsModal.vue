<template lang="">
    <!-- Modal -->
    <div class="modal fade" :id="index" tabindex="-1" :aria-labelledby="label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" :id="label"><i class="bi bi-exclamation-diamond"></i> Notificaciones</h1>
                </div>
                <div class="modal-body">
                    {{message}}
                </div>
                <div class="modal-footer">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { onMounted, watchEffect } from 'vue';
    const props = defineProps(['message', 'index', 'label'])
</script>
<style lang="css"></style>