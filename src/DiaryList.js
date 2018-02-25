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
import MyUtil from './MyUtil';

let angryMood = require('./image/angry.png');
export default class DiaryList extends Component {
    constructor(props) {
        super(props);
        this.updateSearchKeyword = this.updateSearchKeyword.bind(this);
    }
    updateSearchKeyword(newText) {
        //将用户输入的搜索关键字交给上层组件，有上层组件对日记列表进行处理。
        //只显示日记标题中包含关键字的日记
        this.props.searchKeyword(newText);
    }
    pressWriteDiary = () => {
        this.props.writeDiary();
    };
    render() {
        return (
            <View style={MCV.container}>
                <StatusBar hidden={true} />
                <View style={MCV.firstRow}>
                    <View style={{ borderWidth: 1 }}>
                        <TextInput autoCapitalize="none"
                            placeholder='请输入搜索关键字'
                            clearButtonMode="while-editing"
                            onChangeText={this.updateSearchKeyword}
                            style={MCV.searchBarTextInput}
                            underlineColorAndroid={'white'} />
                    </View>
                    {/* 调用回调函数 */}
                    <TouchableOpacity onPress={this.pressWriteDiary}>
                        <Text style={MCV.middleButton}>
                            写日记
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* 下面的代码需要在代码7-18的基础上修改四处，修改完成后，最后写的一篇日记的心情图片、标题、时间会出现在日记列表界面，
                点击后可以查看日记，最为作业留给自己 */}
                <View style={MCV.diaryAbstractList}>
                    <View style={MCV.secondRow}>
                        <Image style={MCV.moodStyle}
                            source={angryMood} />
                        {/* 这里应该是变量，填入angryMood是为了测试界面 */}
                        <View style={MCV.subViewInReader}>
                            <TouchableOpacity onPress={this.props.selectLististItem}>
                                <Text style={MCV.textInReader}>
                                    某变量记录假日记列表标题
                                </Text>
                            </TouchableOpacity>
                            <Text style={MCV.textInReader}>
                                某变量记录假日记列表标题
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}