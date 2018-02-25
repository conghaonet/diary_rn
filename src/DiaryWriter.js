/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text, View, TextInput, TouchableOpacity, Alert, StatusBar
} from 'react-native';
import MCV from './MCV'
export default class DiaryWriter extends Component {
  constructor(props) {
    super(props);
    this.diaryTitle = null;
    this.diaryBody = null;
    this.moodCode = 0;
    this.state = {
      moodText: '请选择心情'
    };
    this.returnPressed = this.returnPressed.bind(this);
    this.selectMood = this.selectMood.bind(this);
  }
  returnPressed() {
    Alert.alert(
      '请确认',
      '你确定要退回日记列表码？',
      [
        {text: '取消', onPress: (() => {}), style: 'cancel'},
        {text: '确定', onPress: this.props.returnPressed} //上层传入的回调函数被调用
      ],
    );
  }
  selectMood() {
    let tempString = '请选择心情';
    if(this.moodCode >= 5) this.moodCode = 1;
    else this.moodCode = this.moodCode + 1;
    switch(this.moodCode) {
      case 1:
        tempString = '心情：平静';
        break;
      case 2:
        tempString = '心情：愤怒';
        break;
      case 3:
        tempString = '心情：悲伤';
        break;
      case 4:
        tempString = '心情：高兴';
        break;
      case 5:
        tempString = '心情：痛苦';
        break;
      default:
        tempString = '请选择心情';
    }
    this.setState({moodText: tempString});
  }
  render() {
    return (
      <View style={MCV.container}>
        <StatusBar hidden={true} />
        <View style={MCV.firstRow}>
        <TouchableOpacity onPress={this.returnPressed}>
            <Text style={MCV.middleButton}>
              返回
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectMood}>
            <Text style={MCV.longButton}>
              {this.state.moodText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.saveDiary(this.moodCode, this.diaryBody, this.diaryTitle)}>
            <Text style={MCV.smallButton}>
              保存
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput style={MCV.titleInputStyle} 
          placeholder={'写个日记标题吧'}
          onChangeText={(text) => {this.diaryTitle=text}}
          />
        <TextInput style={MCV.diaryBodyStyle} 
          placeholder={'日记正文请再次输入'}
          onChangeText={(text) => {this.diaryBody=text}}
          multiline={true}/>
      </View>
    );
  }
}