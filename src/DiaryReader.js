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
import DataHandler from './DataHandler';

export default class DiaryReader extends Component {
  render() {
  let isFirst = DataHandler.listIndex === 0 ? true: false;
  let isLast = (DataHandler.listIndex + 1) === DataHandler.realDiaryList.length ? true : false;
  let disableColor = '#C0C0C0';

  return (
      <View style={MCV.container}>
        <StatusBar hidden={true}/>
        <View style={MCV.firstRow}>
          <TouchableOpacity onPress={this.props.returnPressed}>
            <Text style={MCV.middleButton}>
              返回
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.readingPreviousPressed} disabled={isFirst ? true : false}>
            <Text style={[MCV.middleButton, isFirst ? {backgroundColor: disableColor} : '']}>
              上一篇
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.readingNextPressed} disabled={isLast ? true : false}>
            <Text style={[MCV.middleButton, isLast ? {backgroundColor: disableColor} : '']}>
              下一篇
            </Text>
          </TouchableOpacity>
        </View>
        <View style={MCV.secondRow}>
          <Image style={MCV.moodStyle} 
            source={this.props.diaryMood}/>
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