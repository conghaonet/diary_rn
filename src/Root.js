/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';
import MyUtil from './MyUtil';
import DiaryList from './DiaryList';
import DiaryWriter from './DiaryWriter';
import DiaryReader from './DiaryReader';
import DataHandler from './DataHandler';

export default class Root extends Component {
    static loading = '读取中...';
    constructor(props) {
        super(props);
        this.state = {
            uiCode: 1,
            diaryMood: null,
            diaryTime: Root.loading,
            diaryTitle: Root.loading,
            diaryBody: Root.loading
        };
        this.bindAllFunction();
        // AsyncStorage.clear().then(
        //     () => {
        //         MyUtil.log("AsyncStorage.clear is OK!");
        //     }
        // ).catch(
        //     (error) => {
        //         MyUtil.log("AsyncStorage.clear is error: " + error);
        //     }
        // );
        DataHandler.getAllTheDiary().then(
            (result) => {
                this.setState(result);
            }
        ).catch(
            (error) => {
                MyUtil.log(error);
            }
        );
    }
    bindAllFunction() {
        this.selectLististItem = this.selectLististItem.bind(this);
        this.writeDiary = this.writeDiary.bind(this);
        this.returnPressed = this.returnPressed.bind(this);
        this.saveDiaryAndReturn = this.saveDiaryAndReturn.bind(this);
        this.readingPreviousPressed = this.readingPreviousPressed.bind(this);
        this.readingNextPressed = this.readingNextPressed.bind(this);
    }
    readingPreviousPressed() {

    }
    readingNextPressed() {

    }
    //阅读日记界面、写日记界面返回日记列表界面的处理函数
    returnPressed() {
        this.setState({uiCode: 1});
    }
    //写日记界面保存日记并返回日记列表界面的处理函数
    saveDiaryAndReturn(newDiaryMood, newDiaryBody, newDiaryTitle) {
        DataHandler.saveDiary(newDiaryMood, newDiaryBody, newDiaryTitle).then(
            (result) => {
                this.setState(result);
            }
        ).catch(
            (error) => {
                MyUtil.log(error);
            }
        );
    }

    //写日记按钮被按下时的处理函数
    writeDiary() {
        this.setState(() => {
            return {
                uiCode: 3
            }
        });
    }
    //日记列表中某条记录被选中时的处理函数
    selectLististItem() {
        this.setState({uiCode: 2});
    }
    //搜索框中有输入时的处理函数
    searchKeyword(keyword) {
        MyUtil.log('search keyword is: ' + keyword);
    }

    showDiaryList() {
        return (    //注意，如何将状态机常量作为属性向下层组件传递
            <DiaryList fakeListTitle={this.state.diaryTitle}
                fakeListTime={this.state.diaryTime}
                fakeListMood={this.state.diaryMood}
                selectLististItem={this.selectLististItem}
                searchKeyword={this.searchKeyword}
                writeDiary={this.writeDiary}/>
        );
    }
    showDiaryWriter() {
        return (    //注意，如何将上层组件的某些函数作为回调函数利用属性向下层传递
            <DiaryWriter returnPressed={this.returnPressed}
                saveDiary={this.saveDiaryAndReturn}/>
        );
    }
    showDiaryReader() {
        return (
            <DiaryReader returnToDiaryList={this.returnPressed}
                diaryTitle={this.state.diaryTitle}
                diaryMood={this.state.diaryMood}
                diaryTime={this.state.diaryTime}
                diaryBody={this.state.diaryBody}
                readingPreviousPressed={this.readingPreviousPressed}
                readingNextPressed={this.readingNextPressed}
                returnPressed={this.returnPressed}
                />
        );
    }
    render() {
        MyUtil.log('MyUtil.log: DiaryList')
        if(this.state.uiCode === 1) return this.showDiaryList();
        if(this.state.uiCode === 2) return this.showDiaryReader();
        if(this.state.uiCode === 3) return this.showDiaryWriter();
    }
}

