<template>
    <div id="products">
        <h2>Productos</h2>
        <b-table striped hover :items="items" responsive></b-table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            items:[]
        }
    },
    mounted(){
        axios.get('http://localhost:3000/product')
        .then(res => {
            this.items = res.data;
        })
        .catch(err => {
            console.log(err);
        });
    }
}
</script>

<style scoped>

</style>