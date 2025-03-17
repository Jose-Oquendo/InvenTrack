<template lang="">
    <div class="box-load-bars">
        <div class="load-bars"></div>
    </div> 
</template>
<script setup>
</script>
<style lang="css">
    .box-load-bars{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .load-bars {
        width: 25px;
        aspect-ratio: .75;
        --c: no-repeat linear-gradient(#000 0 0);
        background: 
            var(--c) 0%   100%,
            var(--c) 50%  100%,
            var(--c) 100% 100%;
        background-size: 20% 65%;
        animation: l5 1s infinite linear;
    }
    @keyframes l5 {
        20% {background-position: 0% 50% ,50% 100%,100% 100%}
        40% {background-position: 0% 0%  ,50% 50% ,100% 100%}
        60% {background-position: 0% 100%,50% 0%  ,100% 50% }
        80% {background-position: 0% 100%,50% 100%,100% 0%  }
    }
</style>