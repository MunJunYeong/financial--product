<template>
    <v-container>
      <Navi />
      <router-view></router-view>
    </v-container>
</template>

<script>
    import Navi from '@/components/Navi.vue'

    export default {
        name: 'coreLayout',
        components: {
            Navi,
        },
    };
</script>