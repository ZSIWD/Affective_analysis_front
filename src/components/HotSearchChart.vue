<script setup>
import request from '@/api/request';
import { onMounted,ref } from 'vue';
const listdata = ref([])
onMounted(()=>{
    request.getHotSearchChart().then((res)=>{
        console.log(res.data);
        listdata.value = res.data;
    })
})
</script>
<template>

    <div id="hot-search-chart">
        <ul>
            <li v-for="item in listdata">{{item}}</li>
        </ul>
    </div>
</template>

<style scoped lang="less">

    #hot-search-chart{
        width: 50%;
    }
    ul {
        list-style-type: none;
        padding-left: 0;
        counter-reset: my-awesome-counter;
    }
    ul li:before {
        content: "No" counter(my-awesome-counter) ". ";
        counter-increment: my-awesome-counter;
        display: inline-block;
        min-width: 20px;
        text-align: left;
        color: rgb(237, 75, 226);
    }
    ul {
        min-width: 50% !important;
    }
    

    ul li{
        background-color: #f5f5f5;
        border-radius: 5px;
        padding: 15px 10px;
        margin-bottom: 5px;
    }
    ul li:nth-child(odd){
        background-color: #becda7;
    }
    ul li:nth-child(even){
        background-color: #91c9ee;
    }

    ul li:hover{
        transform: scale(1.02);
    }



</style>
