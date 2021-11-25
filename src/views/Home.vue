<template>
    <div class="text-center">
        <router-link to="/registration"> Registration to New User</router-link>
        <br>
        <br>
        <router-link to="/login"> Login as a Admin and see User list </router-link>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'Home',
}
</script>
<style scoped lang="scss">
.text-center{
    margin-top: 100px;
    a{
        font-size: 30px;
    }
}
</style>
