<template>
  <div class="home">
    <mt-header class="title" fixed title="小云的天氣預報"></mt-header>
    <!-- <mt-button type="primary" @click="getWeather()">經緯度</mt-button> -->
    <br />
    <textarea placeholder="請輸入內容" name="user_text" v-model="msg" cols="50" rows="10"></textarea>
    <br />
    <mt-button type="primary" @click="addDistrict() ">發佈</mt-button>
    <br />
    <br />

    <div class="item_container" v-for="(item) in itemList" :key="item.id">
      <div class="item_header item_body">
        <div class="amount">{{item.msg}}</div>
        <div class="time">{{item.time}}</div>
      </div>
    </div>
    <br />
    <br />
    <!-- <mt-button @click="axios()">查看已存在發文</mt-button> -->

    <!-- <ul>
    <li class="item_container" v-for="(item) in itemList" :key="item.id" >{{item.msg}}</li>
    </ul>-->

    <router-link class="footer" to="/about">About</router-link>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

import { Toast } from "mint-ui";

//const axios = require('axios'); //es5
import axios from "axios"; //es6

//import $ from "jquery";

import { db } from "../firebase/init";

export default {
  name: "Home",

  //掛載
  mounted() {
    let self = this;

    //暫存
    // axios
    //   .get("http://localhost:3000/gigidata")
    //   .then(function(response) {
    //     //revel
    //     self.itemList = response.data;
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });


    //參考 : https://www.oxxostudio.tw/articles/201905/firebase-firestore.html
     var ref = db.collection("gigidata").orderBy("time", "asc");
    


      ref.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, doc.data());
          console.log(doc.data().msg);         
          self.itemList.unshift({
          msg: doc.data().msg,
          time: doc.data().time
        });

        });
      });
    //將發文資料存於gigidata

    //監聽
    // document.addEventListener("deviceready", onDeviceReady, false);
    //deviceready要先準備好才進行以下
   
  },

  data() {
    return {
      msg: "",
      itemList: [],
      time: ""
    };
  },

  firestore() {
    return {
      districts: db.collection("districts").orderBy("name")
    };
  },

  methods: {

    addDistrict() {

      if (this.msg === "") {
        alert("未輸入文字");
      } else {
        //doc 類似post把資料加到 gigidata
      db.collection("gigidata")
        .add({
          msg: this.msg,
          time: this.$moment().format("YYYY-MM-DD hh:mm:ss")
        })
        .then(function(response) {
          Toast({
            message: "發文成功",
            position: "center" /*位置*/,
            duration: 4000
          });
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
        
        //加入元素到第一個位置
        this.itemList.unshift({
          msg: this.msg,
          time: this.$moment().format("YYYY-MM-DD hh:mm:ss")
        });
      }
      

      //參考 : https://www.oxxostudio.tw/articles/201905/firebase-firestore.html
      // var ref = db.collection("gigidata");

      // ref.get().then(querySnapshot => {
      //   querySnapshot.forEach(doc => {
      //     console.log(doc.id, doc.data());

      //   });
      // });
    },

    axios() {
      // Make a request for a user with a given ID
      axios
        .get("http://localhost:3000/gigidata")
        .then(function(response) {
          // handle success
          console.log(response.data[0].msg);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },

    handle() {
      if (this.msg === "") {
        alert("未輸入文字");
      } else {
        Toast({
          message: "發文成功",
          position: "center" /*位置*/,
          duration: 4000
        });

        //加入元素到第一個位置
        this.itemList.unshift({
          msg: this.msg,
          time: this.$moment().format("YYYY-MM-DD hh:mm:ss")
        });

        //將發文資料存於gigidata
        // axios
        //   .post("http://localhost:3000/gigidata", {
        //     msg: this.msg,
        //     time: this.$moment().format("YYYY-MM-DD hh:mm:ss")
        //   })
        //   .then(function(response) {
        //     console.log(response);
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });

        this.msg = "";
      }
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 120%;
}

.item_header {
  display: flex;
  width: 500px;
  margin: 0 auto;
  /* height: 50px; */
  background-color: rgb(104, 165, 226);
  border-radius: 10px; /*讓框框的角變圓*/
  /* padding-left: 3px; */
}
.item_header div {
  width: 200px;
  color: white;
  line-height: 30px;
}

.item_body {
  margin-top: 20px;
  height: 100px;
  align-items: center;
  position: relative; /*時間的位置以此為相對位置*/
}

.amount {
  text-align: center;
}
.time {
  position: absolute;
  text-align: right;
  font-size: 10%;
  right: 5%;
  bottom: 5%;
}
.table {
  border-collapse: collapse;
}

.footer {
  position: relative;
  top: 200px;
  height: 50px;
  /* position: absolute;
    bottom: 0; */
}
</style>


