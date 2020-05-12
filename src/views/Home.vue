<template>
  <div class="home">

   
    <mt-header fixed title="小云的天氣預報"></mt-header>
    <textarea placeholder="請輸入內容" name ="user_text" v-model="msg" cols="50" rows="10"></textarea><br/>
    <mt-button type="primary" @click="handle() " >發佈</mt-button><br/>
    <br/>

    <div class="item_container" v-for="(item) in itemList" :key="item.id" >
                    <div class="item_header item_body">                     
                            <div class="amount">{{item.msg}}</div>
                            <div class="time">{{item.time}}</div>  
                          
                    </div>
            </div><br/>
            <br/>
    <!-- <mt-button @click="axios()">查看已存在發文</mt-button> -->

    
    <!-- <ul>
    <li class="item_container" v-for="(item) in itemList" :key="item.id" >{{item.msg}}</li>
    </ul>  -->
    
    <router-link class="footer" to="/about">About</router-link>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src

import { Toast } from "mint-ui";


//const axios = require('axios'); //es5
import axios from 'axios'  //es6


export default {
  name: 'Home', 
  data(){
    return{   

      msg : '',
      itemList:[ ],
      time:''
       
    }   
  },



  methods:{
     axios(){
      

 // Make a request for a user with a given ID
   axios.get('http://localhost:3000/gigidata')
   .then(function (response) {
     // handle success
     console.log(response.data[0].msg);
     
   })
   .catch(function (error) {
     // handle error
     console.log(error);
   })

     },

    handle() {

      if (this.msg === '') {
        alert('未輸入文字')
      }
      else{

        Toast({
        message: '發文成功',
        position: 'center', /*位置*/
        duration: 4000,
        });

        //加入元素到第一個位置
        this.itemList.unshift({
          msg: this.msg ,
          time:this.$moment().format('YYYY-MM-DD hh:mm:ss')
        });
        
        //將發文資料存於gigidata
        axios.post('http://localhost:3000/gigidata', {
          msg: this.msg ,
          time:this.$moment().format('YYYY-MM-DD hh:mm:ss')   
    })
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });


        this.msg =''
        
        }
    }
  },
}
</script>

<style scoped>


    .item_header{
      display:flex;
      width: 500px;
      margin: 0 auto;
      /* height: 50px; */
      background-color:rgb(104, 165, 226);
      border-radius: 10px; /*讓框框的角變圓*/
      /* padding-left: 3px; */
}
.item_header div{
    width: 200px;
    color:white;
    line-height: 30px;
}

.item_body{
    margin-top: 20px;
    height: 100px;
    align-items: center;  
    position: relative;  /*時間的位置以此為相對位置*/
}

.amount{
    text-align: center;
}
.time{
    position: absolute;
    text-align: right;
    font-size: 10%;
    right: 5%;
    bottom: 5%;

}
.table{
    border-collapse: collapse;
    
}


  .footer{
    position: relative;
    top: 200px;
    height: 50px; 
    /* position: absolute;
    bottom: 0; */
  }

</style>


