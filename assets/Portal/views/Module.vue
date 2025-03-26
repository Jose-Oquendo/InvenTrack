<template>
    <object style="width: 100%; height: 100vh;" :data="'https://localhost/oquendo/modules/'+app+'/dist'">{{ name }}</object>
</template>
<script setup>
    import { ref } from 'vue'

    defineProps({
        app: String
    })
    let name = 'module'
</script>
<style lang="css">
    
</style>