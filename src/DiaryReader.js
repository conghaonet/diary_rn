/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text, View, TextInput, TouchableOpacity, Image, StatusBar
} from 'react-native';
import MCV from './MCV'
let angryMood = require('./image/angry.png')

export default class DiaryReader extends Component {
  render() {
    return (
      <View style={MCV.container}>
        <StatusBar hidden={true}/>
        <View style={MCV.firstRow}>
          <TouchableOpacity>
            <Text style={MCV.middleButton}>
              返回
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={MCV.middleButton}>
              上一篇
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={MCV.middleButton}>
              下一篇
            </Text>
          </TouchableOpacity>
        </View>
        <View style={MCV.secondRow}>
          <Image style={MCV.moodStyle} 
            source={angryMood}/> 
            {/* 这里应该是变量，填入angryMood是为了测试界面 */}
          <View style={MCV.subViewInReader}>
            <Text style={MCV.textInReader}>
              日记标题：某变量
            </Text>
            <Text style={MCV.textInReader}>
              时间：某变量
            </Text>
          </View>
        </View>
        <TextInput style={[MCV.diaryBodyStyle, {color: 'black'}]} 
          multiline={true}
          editable={false}
          value='日记内容正文，只读'/>
      </View>
    );
  }
}