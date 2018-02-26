import {
    AsyncStorage
} from 'react-native';

import MyUtil from './MyUtil'
// let angryMood = require('./image/angry.png');
// let peaceMood = require('./image/peace.png');
// let happyMood = require('./image/happy.png');
// let sadMood = require('./image/sad.png');
// let miseryMood = require('./image/misery.png');

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
                                for(let counter = 0; counter<results.length; counter++) {
                                    //取得数据并利用JSON类的parse方法生成对象，插入日记列表
                                    DataHandler.realDiaryList[counter] = JSON.parse(results[counter][1]);
                                }
                                // DataHandler.bubleSortDiaryList(); //日记列表排序
                                if(DataHandler.realDiaryList.length > 0) { //日记列表中有数据，取出最后一条数据
                                    resultsLength--;
                                    DataHandler.listIndex = resultsLength;
                                    let newTitle = DataHandler.realDiaryList[resultsLength].title;
                                    let newBody = DataHandler.realDiaryList[resultsLength].body;
                                    let ctime = new Date(DataHandler.realDiaryList[resultsLength].time);
                                    let rValue = {
                                        diaryMood: DataHandler.getMoodImage(DataHandler.realDiaryList[resultsLength].mood),
                                        diaryTime: DataHandler.formateTime2String(ctime),
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
        if(DataHandler.listIndex === 0) return null;
        DataHandler.listIndex--;
        let resultsLength = DataHandler.listIndex;
        let newTitle = DataHandler.realDiaryList[resultsLength].title;
        let newBody = DataHandler.realDiaryList[resultsLength].body;
        let ctime = new Date(DataHandler.realDiaryList[resultsLength].time);
        return {
            diaryMood: DataHandler.getMoodImage(DataHandler.realDiaryList[resultsLength].mood),
            diaryTime: DataHandler.formateTime2String(ctime),
            diaryTitle: newTitle,
            diaryBody: newBody
        }
    }
    static getNextDiary() { //下一篇日记
        if(DataHandler.listIndex >= (DataHandler.realDiaryList.length -1) ) return null;
        DataHandler.listIndex++;
        let resultsLength = DataHandler.listIndex;
        let newTitle = DataHandler.realDiaryList[resultsLength].title;
        let newBody = DataHandler.realDiaryList[resultsLength].body;
        let ctime = new Date(DataHandler.realDiaryList[resultsLength].time);
        return {
            diaryMood: DataHandler.getMoodImage(DataHandler.realDiaryList[resultsLength].mood),
            diaryTime: DataHandler.formateTime2String(ctime),
            diaryTitle: newTitle,
            diaryBody: newBody
        }
    }
    static saveDiary(newDiaryMood, newDiaryBody, newDiaryTitle) { //保存日记
        return new Promise(
            function(resolve, reject) {
                //Date对应的日期格式：2018-02-26T10:20:44.245Z
                let currentTime = new Date();
                let aDiary = Object();
                aDiary.title = newDiaryTitle;
                aDiary.body = newDiaryBody;
                aDiary.mood = newDiaryMood;
                aDiary.time = currentTime;
                //sectionID用来对日记列表进行分段显示（见第8章）
                aDiary.sectionID = ''+currentTime.getFullYear() + '年' + (currentTime.getMonth() + 1) + '月';
                aDiary.index = Date.parse(currentTime);
                AsyncStorage.setItem(''+aDiary.index, JSON.stringify(aDiary)).then(
                    () => {
                        let totalLength = DataHandler.realDiaryList.length;
                        DataHandler.realDiaryList[totalLength] = aDiary;
                        DataHandler.listIndex = totalLength;
                        let aValue = {
                            uiCode: 1,
                            diaryTime: DataHandler.formateTime2String(currentTime),
                            diaryTitle: newDiaryTitle,
                            diaryMood: DataHandler.getMoodImage(newDiaryMood),
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
    static getMoodImage(moodCode) {
        let mood;
        switch(moodCode) {
            case 2:
                mood = require('./image/angry.png');
                break;
            case 3:
                mood = require('./image/sad.png');
                break;
            case 4:
                mood = require('./image/happy.png');
                break;
            case 5:
             mood = require('./image/misery.png');
                break;
            default:
                mood = require('./image/peace.png');
        }
        return mood;
    }
    static formateTime2String(diaryTime) {
        return ''+diaryTime.getFullYear() + '年' + (diaryTime.getMonth() + 1) + '月' + diaryTime.getDate() + 
        '日 星期' + diaryTime.getDay() + ' ' + diaryTime.getHours() + ':' + diaryTime.getMinutes();
    }
}