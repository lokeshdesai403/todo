import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Moment from 'moment';
import {InterFaceListData, InterFaceTypeData} from '../../staticData';
import Theme from '../../theme/Theme';
import styles from './styles';

export default function HomeScreen(_props: any) {
  // ##### Main Const #####
  const [listOfTodayData, setListOfTodayData] = useState<InterFaceListData[]>([]);
  const [listOfAllDataCount, setListOfAllDataCount] = useState<InterFaceTypeData[]>([]);
  const [listOfDataCount, setListOfDataCount] = useState<InterFaceTypeData[]>([]);
  // #####

  // ##### Use Effect #####
  useEffect(() => {

    Moment.locale('en')
    var today = Moment(Date.now()).format('DD - MM - YYYY')
    // console.log("> > > > > >" + JSON.stringify(today));
    
    
    const getList = firestore()
      .collection('TodoTaskList')
      .orderBy("created_at", "asc")
      .onSnapshot(snap => {
        const data: any = []
        snap.docs.map((doc) => {
          const item = doc.data();
          item.id = doc.id;
          data.push(item)
        })
        const newFinalList: InterFaceListData[] = data
        setListOfTodayData(newFinalList)
      });

    const data: any = []
    const getCount = firestore()
      .collection('TaskTypeList')
      .orderBy("created_at", "asc")
      .onSnapshot(snap => {
        snap.docs.map((doc) => {
          const item = doc.data();
          item.id = doc.id;
          data.push(item)
        })

        const newListType: InterFaceTypeData[] = []
        data.map((dataObject: any) => {
          if (dataObject.title !== 'All Tasks' && dataObject.title !== 'Add Tasks') {
            newListType.push(dataObject)
          }
        })
        setListOfDataCount(newListType)

        const newFinalList: InterFaceTypeData[] = data
        setListOfAllDataCount(newFinalList)
      });

    return () => { getList(), getCount() }
  }, [])
  // #####

  // ##### Update - Delete Data #####
  const updateCheckList = (item: any) => {
    let checked = item.isChecked
    if (checked === false) {
      checked = true;
    } else {
      checked = false;
    }

    firestore()
      .collection('TodoTaskList')
      .doc(item.id)
      .update({
        isChecked: checked
      })
      .then(() => {
        console.log('Data Updated!');
      })
  }

  const deleteCheckList = (item: any) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteData(item) }
      ]
    );
  }

  const deleteData = (item: any) => {

    listOfAllDataCount.map((objectData) => {
      if (objectData.title === 'All Tasks' || objectData.title === item.type) {
        let num: any = objectData.tasks
        let itemTasks: number = num - 1;

        firestore()
          .collection('TaskTypeList')
          .doc(objectData.id)
          .update({
            tasks: itemTasks
          })
          .then(() => {
            console.log('count updated');
          })
      }
    })

    firestore()
      .collection('TodoTaskList')
      .doc(item.id)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
  }
  // #####

  // ##### Render Items #####
  const _renderTopList = (item: any, _index: number) => {
    let typeTask = typeof item.tasks
    let tasks = '';
    if (typeTask === 'number') {
      tasks = item.tasks + ' items';
    } else if (typeTask === 'string') {
      tasks = item.tasks;
    }
    
    return (
      <View style={styles.cardTopList}>
        <View style={{ flex: 3 }}>
          <Text style={styles.textListMainTitle}>{item.title}</Text>
          <Text style={styles.subTextListMainTitle}>{tasks}</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              padding: 5,
              borderRadius: 100,
              backgroundColor: item.color,
            }}
          />
        </View>
      </View>
    );
  };

  const _renderListMain = (item: any, index: number) => {
    // console.log(JSON.stringify(item));

    // let fulldate = new Date(item.created_at.seconds * 1000 + item.created_at.nanoseconds / 1000000)
    // let date = Moment(fulldate).format('MMMM DD, YYYY')
    // let time = Moment(fulldate).format('hh:mm:ss')
    // console.log(date);
    // console.log(time);

    return (
      <TouchableOpacity style={styles.cardListMain} onLongPress={() => {
        deleteCheckList(item)
      }}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => {
            updateCheckList(item)
          }}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {item.isChecked === false ? (
              <Image
                style={styles.homeCheckIconStyle}
                resizeMode={'contain'}
                source={Theme.icons.ic_item_unchecked}
              />
            ) : (
              <Image
                style={styles.homeCheckIconStyle}
                resizeMode={'contain'}
                source={Theme.icons.ic_item_checked}
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={{ flex: 5, justifyContent: 'center' }}>
          <Text style={styles.textListMainTitle}>{item.title}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              padding: 5,
              borderRadius: 100,
              borderColor: item.color,
              borderWidth: 2,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  // #####

  return (
    <>
      <SafeAreaView style={styles.mainview}>
        <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={listOfDataCount}
            renderItem={({ item, index }) => _renderTopList(item, index)}
            keyExtractor={(_item: any, _index: any) => _index}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 20 }}
            data={listOfTodayData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => _renderListMain(item, index)}
            keyExtractor={(_item: any, _index: any) => _index}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
