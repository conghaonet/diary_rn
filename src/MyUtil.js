import React, { Component } from 'react';

//等同于：export default SimpleApp;
export default class MyUtil extends Component {
    static log(msg) {
        if(__DEV__){
            console.log(msg);
        }
    }
}
