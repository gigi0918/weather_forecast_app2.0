<template>
  <div class="home">
    <!-- <mt-button @click="weather()">天氣</mt-button> -->
    <br />

    <div class="weather">
      <!-- <p id="pic"></p> -->
      <img class="pic" src="../assets/w5.png" />
      <p id="description" class="description"></p>
      <p id="time2"></p>
      <p id="temp"></p>
      <p id="wind"></p>
      <p id="humidity"></p>
      <p id="visibility"></p>
      <p id="sunrise"></p>
      <p id="sunset"></p>
    </div>

    <mt-header class="title" fixed title="小云的天气预报"></mt-header>
    <!-- <mt-button type="primary" @click="getWeather()">經緯度</mt-button> -->
    <br />
    <textarea class="commit" placeholder="請輸入內容" name="user_text" v-model="msg" cols="50" rows="10"></textarea>
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

    <router-link class="footer" to="/about">About</router-link>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

import { Toast } from "mint-ui";

//const axios = require('axios'); //es5
import axios from "axios"; //es6
// Vue.prototype.$axios = axios;  //此处根据项目情况来配置

import $ from "jquery";

import { db } from "../firebase/init";

import '../font/font.css';

export default {
  name: "Home",

  //掛載
  mounted() {
    let self = this;

    // //監聽
    // //參考 : https://ithelp.ithome.com.tw/articles/10185076
    document.addEventListener("deviceready", onDeviceReady.bind(this), false);
    //deviceready要先準備好才進行以下
    function onDeviceReady() {
      console.log("navigator.geolocation works well");
    }

    let Latitude;
    let Longitude;

    // navigator.geolocation.getCurrentPosition(
    //   onWeatherSuccess,
    //   onWeatherError,
    //   { enableHighAccuracy: true }
    // );

    // Success callback for get geo coordinates

    function onSuccess(position) {
      Latitude = position.coords.latitude;
      Longitude = position.coords.longitude;
      console.log(Latitude);
      console.log(Longitude);

      getWeather(Latitude, Longitude);
    }

    // Get weather by using coordinates

    function getWeather(latitude, longitude) {
      // Get a free key at http://openweathermap.org/. Replace the "Your_Key_Here" string with that key.
      var OpenWeatherAppKey = "8668a71fbca66a7811cf7b8f31ab6312";

      var queryString =
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        OpenWeatherAppKey +
        "&units=imperial";

      $.getJSON(queryString, function(results) {
        if (results.weather.length) {
          $.getJSON(queryString, function(results) {
            if (results.weather.length) {
              console.log("data=", results);
              $("#description").text("地區 : " + results.name);
              
              let temp1 = (results.main.temp-32)*5/9;

              $("#temp").text( temp1.toFixed(1) + " °C ");
              $("#wind").text("風速 : " + results.wind.speed);
              $("#humidity").text("濕度 : " + results.main.humidity);
              $("#visibility").text("天氣 : " + results.weather[0].main);

              $("#pic").attr("../assets/w5.png");

              //https://blog.csdn.net/fanrenxiang/article/details/80531649
              //(results.dt)*1000 將原本10位的秒级别的時間戳換成13位的秒级别的時間戳
              var timeDate = new Date(results.dt * 1000);
              $("#time2").text("時間 : " + timeDate.toLocaleTimeString());

              var sunriseDate = new Date(results.sys.sunrise * 1000);
              $("#sunrise").text("日出 : " + sunriseDate.toLocaleTimeString());
              //.toLocaleTimeString()
              console.log(sunriseDate);

              var sunsetDate = new Date(results.sys.sunset * 1000);
              $("#sunset").text("日落 : " + sunsetDate.toLocaleTimeString());
              console.log(sunsetDate);
            }
          });
        }
      }).fail(function() {
        console.log("error getting location");
      });
    }

    // Error callback

    function onError(error) {
      console.log(
        "code: " + error.code + "\n" + "message: " + error.message + "\n"
      );
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true
    });

    // axios
    //   .get(
    //     "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-85D582C5-890D-4F4C-B0A8-2E61238A1210"
    //   )
    //   //我在這邊已經把授權碼移除,還請讀者自行申請
    //   .then(response => {
    //     console.log(response);
    //     self.weather = response.data.records.location;
    //     self.weathert = response.data.records;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     self.loading = false;
    //   });

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

        // 加入元素到第一個位置
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
.home {
  margin: auto;
 
}
.title {
  font-family: 'start';
  font-size: 20px;
  
}

.weather {

  position: static;
  margin: auto;
  width: 60%;
	height: 200px; 
  box-shadow: 0 10px 10px rgba(0,0,0,.5);
	border-radius: 25px;/*讓框框的角變圓*/
  background-color:white;
  position: relative;
  
}

.pic {
  position: absolute;
  left: 5%;
  bottom: 5%;
}
 #description {
  position: absolute;
  top: 5%;
  left: 5%;
}
#visibility {
  position: absolute;
  left: 5%;
  top: 20%;
}
#time2 {
  position: absolute;
  bottom: 5%;
  right: 5%;
  
 }
#temp { 
  position: absolute;
  top: 50%;
  right: 15%;
  font-size: 32px;
  color:rgb(104, 165, 226);
}
#wind {
  position: absolute;
  top: 25%;
  right: 5%;
}
#humidity {
  position: absolute;
  top: 35%;
  right: 5%;
}

#sunrise {
  position: absolute;
  top: 5%;
  right: 5%;
}
#sunset {
  position: absolute;
  top: 15%;
  right: 5%;
}

.commit {
  display: flex;
  width: 70%;
  margin: auto; 
}

.item_header {
  display: flex;
  width: 70%;
  margin: auto;
  /* height: 50px; */
  background-color: rgb(104, 165, 226);
  border-radius: 10px; /*讓框框的角變圓*/
  /* padding-left: 3px; */
}
.item_header div {
  width: 30%; /*發文內容位置*/
  color: white;
  /* line-height: 80%; */
}

.item_body {
  margin-top: 2%; /* 發文框間隔*/
  height: 100%;
  align-items: center;
  position: relative; /*時間的位置以此為相對位置*/
}

.amount {
  text-align: center;
}
.time {
  position: absolute;
  text-align: right;
  font-size: 50%;
  right: 5%;
  bottom: 5%;
}
.table {
  border-collapse: collapse;
}

.footer {
  position: relative;
  top: 50%;
  height: 50%;
  /* position: absolute;
    bottom: 0; */
}
</style>


