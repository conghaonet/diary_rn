import {
    AsyncStorage
} from 'react-native';

import MyUtil from './MyUtil'
let angryMood = require('./image/angry.png');
let peaceMood = require('./image/peace.png');
let happyMood = require('./image/happy.png');
let sadMood = require('./image/sad.png');
let miseryMood = require('./image/misery.png');

export default class DataHandler {
    static realDiaryList =[];
    static listIndex = 0;
    static getAllTheDiary() { //获取全部日记数据
        return new Promise (
            function(resolve, reject) {
                AsyncStorage.getAllKeys().then(
                    (Keys) => {
                        if(Keys.length ===0) {
                            let returnValue = {
                                diaryTime: '没有历史日记',
                                diaryTitle: '没有历史日记',
                                diaryBody: ''
                            }
                            resolve(returnValue);
                            MyUtil.log('注意，resolve之后的语句还会被执行，因此resolve后如果有代码，结束处理必须要跟return语句！');
                            return;
                        }
                        AsyncStorage.multiGet(Keys).then(
                            (results) => {
                                let resultsLength = results.length;
                                for(let counter = 0; counter<results.resultsLength; counter++) {
                                    //取得数据并利用JSON类的parse方法生成对象，插入日记列表
                                    DataHandler.realDiaryList[counter] = JSON.parse(results[counter][1]);
                                }
                                // DataHandler.bubleSortDiaryList(); //日记列表排序
                                if(resultsLength > 0) { //日记列表中有数据，取出最后一条数据
                                    resultsLength--;
                                    DataHandler.listIndex = resultsLength;
                                    let newMoodIcon;
                                    switch(DataHandler.realDiaryList[resultsLength].mood) {
                                        case 2:
                                            newMoodIcon = angryMood;
                                            break;
                                        case 3:
                                            newMoodIcon = sadMood;
                                            break;
                                        case 4:
                                            newMoodIcon = happyMood;
                                            break;
                                        case 5:
                                            newMoodIcon = miseryMood;
                                            break;
                                        default:
                                            newMoodIcon = peaceMood;
                                    }
                                    let newTitle = DataHandler.realDiaryList[resultsLength].title;
                                    let newBody = DataHandler.realDiaryList[resultsLength].body;
                                    let ctime = new Date(DataHandler.realDiaryList[resultsLength].time);
                                    let timeString = ''+ctime.getFullYear() + '年' + (ctime.getMonth() + 1) + '月' + ctime.getDate() + 
                                                        '日 星期' + (ctime.getDay() + 1) + ' ' + ctime.getHours() + ':' + ctime.getMinutes();
                                    let rValue = {
                                        diaryMood: newMoodIcon,
                                        diaryTime: timeString,
                                        diaryTitle: newTitle,
                                        diaryBody: newBody,
                                    }
                                    resolve(rValue); //Promise 机制中的成功返回
                                } else { //日记列表中没有数据
                                    let returnValue = {
                                        diaryTime: '没有历史日记',
                                        diaryTitle: '没有历史日记',
                                        diaryBody: ''
                                    }
                                    resolve(returnValue);
                                }
                            }
                        ).catch(
                            (error) => {
                                MyUtil.log(error);
                            }
                        );
                    }
                ).catch(
                    (error) => {
                        MyUtil.log('A error happens while read all the diary.');
                        MyUtil.log(error);
                        AsyncStorage.clear();
                        let aValue = {
                            diaryTime: '没有历史日记',
                            diaryTitle: '没有历史日记',
                            diaryBody: ''
                        }
                        resolve(aValue);
                    }
                );
            }
        );
    }
    static bubleSortDiaryList() { //因为AsyncStorage API不能保证读取的顺序，故使用冒泡法排序
        // let tempObj;
        // for(let i=0; i<DataHandler.realDiaryList.length; i++) {
        //     for(let j=0; j<DataHandler.realDiaryList.length - i - 1; j++) {
        //         if(DataHandler.realDiaryList[j].index > DataHandler.realDiaryList[j+1].index) {
        //             tempObj = DataHandler.realDiaryList[j];
        //             DataHandler.realDiaryList[j] = DataHandler.realDiaryList[j+1];
        //             DataHandler.realDiaryList[j+1] = tempObj;
        //         }
        //     }
        // }
    }
    static getPreviousDiary() { //上一篇日记

    }
    static getNextDiary() { //下一篇日记

    }
    static saveDiary(newDiaryMood, newDiaryBody, newDiaryTitle) { //保存日记
        return new Promise(
            function(resolve, reject) {
                let currentTime = new Date();
                let timeString = ''+currentTime.getFullYear() + '年' + (currentTime.getMonth() + 1) + '月' + currentTime.getDate() + 
                                    '日 星期' + (currentTime.getDay() + 1) + ' ' + currentTime.getHours() + ':' + currentTime.getMinutes();
                let aDiary = Object();
                aDiary.title = newDiaryTitle;
                aDiary.body = newDiaryBody;
                aDiary.mood = newDiaryMood;
                aDiary.time = timeString;
                //sectionID用来对日记列表进行分段显示（见第8章）
                aDiary.sectionID = ''+currentTime.getFullYear() + '年' + (currentTime.getMonth() + 1) + '月';
                aDiary.index = Date.parse(currentTime);
                AsyncStorage.setItem(''+aDiary.index, JSON.stringify(aDiary)).then(
                    () => {
                        let totalLength = DataHandler.realDiaryList.length;
                        DataHandler.realDiaryList[totalLength] = aDiary;
                        DataHandler.listIndex = totalLength;
                        let newMoodIcon;
                        switch(newDiaryMood) {
                            case 2:
                                newMoodIcon = angryMood;
                                break;
                            case 3:
                                newMoodIcon = sadMood;
                                break;
                            case 4:
                                newMoodIcon = happyMood;
                                break;
                            case 5:
                                newMoodIcon = miseryMood;
                                break;
                            default:
                                newMoodIcon = peaceMood;
                        }
                        let aValue = {
                            uiCode: 1,
                            diaryTime: timeString,
                            diaryTitle: newDiaryTitle,
                            diaryMood: newMoodIcon,
                            diaryBody: newDiaryBody
                        }
                        resolve(aValue); //返回新写的日记数据
                    }
                ).catch(
                    (error) => {
                        MyUtil.log('Saveing failed, error: '+error);
                    }
                );
            }
        );
    }
}