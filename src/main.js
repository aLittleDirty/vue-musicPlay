import Vue from 'vue'
import App from './App.vue'
import './assets/style/global.scss'
import router from './router/index'
import './mock/mock.js'


class Person {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    sayHello(){
        console.log(`Hello,my name is ${this.name}`);
    }
}

const person = new Person('zst',25);
person.sayHello();

// 创建Vue实例
new Vue({
    router,
    render:h => h(App)
}).$mount('#app');