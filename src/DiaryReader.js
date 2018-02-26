/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text, View, TextInput, TouchableOpacity, Image, StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import MCV from './MCV'
let angryMood = require('./image/angry.png')

export default class DiaryReader extends Component {
  render() {
    return (
      <View style={MCV.container}>
        <StatusBar hidden={true}/>
        <View style={MCV.firstRow}>
          <TouchableOpacity>
            <Text style={MCV.middleButton} onPress={this.props.returnPressed}>
              返回
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={MCV.middleButton} onPress={this.props.readingPreviousPressed}>
              上一篇
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={MCV.middleButton} onPress={this.props.readingNextPressed}>
              下一篇
            </Text>
          </TouchableOpacity>
        </View>
        <View style={MCV.secondRow}>
          <Image style={MCV.moodStyle} 
            source={this.props.diaryMood}/> 
            {/* 这里应该是变量，填入angryMood是为了测试界面 */}
          <View style={MCV.subViewInReader}>
            <Text style={MCV.textInReader}>
              {this.props.diaryTitle}
            </Text>
            <Text style={MCV.textInReader}>
            {this.props.diaryTime}
            </Text>
          </View>
        </View>
        <TextInput style={[MCV.diaryBodyStyle, {color: 'black'}]} 
          multiline={true}
          editable={false}
          value={this.props.diaryBody}/>
      </View>
    );
  }
}

DiaryReader.propTypes = {
  diaryTitle: PropTypes.string.isRequired,
  diaryMood: PropTypes.number.isRequired,
  diaryTime: PropTypes.string.isRequired,
  diaryBody: PropTypes.string.isRequired,
  returnToDiaryList: PropTypes.func.isRequired,
  readingPreviousPressed: PropTypes.func.isRequired,
  readingNextPressed: PropTypes.func.isRequired,
  returnPressed: PropTypes.func.isRequired
}