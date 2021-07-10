import React, { useEffect, useState, useRef } from 'react';
import { Text, SafeAreaView, FlatList, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RBSheet from 'react-native-raw-bottom-sheet';
import Moment from 'moment';
import { CustomButton } from '../../components';
import { InterFaceTypeData } from '../../staticData';
import Theme from '../../theme/Theme';
import styles from './styles';

export default function TasksScreenMain(_props: any) {
  // ##### Main Const #####
  let sheetAddItem: any = useRef();
  const [textFirebaseToken, setTextFirebaseToken] = useState<string>('');
  const [textUserEmail, setTextUserEmail] = useState<string>('');
  const [textUserId, setTextUserId] = useState<string>('');
  const [listTasksMain, setListTasksMain] = useState<InterFaceTypeData[]>([]);
  const [listTasksType, setListTasksType] = useState<InterFaceTypeData[]>([]);

  const [isAddItemTypeVisible, setIsAddItemTypeVisible] = useState<boolean>(false);

  const [textAddTitle, setTextAddTitle] = useState<string>('');
  const [textAddDate, setTextAddDate] = useState<string>('DD - MM - YYYY');
  const [textAddTime, setTextAddTime] = useState<string>('hh:mm A');
  const [textAddType, setTextAddType] = useState<string>('Other');
  const [colorAddType, setColorAddType] = useState<string>(Theme.colors.appGray1);
  const [textRemindMe, setTextRemindMe] = useState<string>('DD - MM - YYYY  hh:mm A');
  const [textFinalRemindMe, setTextFinalRemindMe] = useState<string>('');
  // #####

  // ##### Use Effect #####
  useEffect(() => {
    const data: any = []
    getFirebaseToken()
    const unsubscribe = firestore()
      .collection('TaskTypeList')
      .orderBy("created_at", "asc")
      .onSnapshot(snap => {
        snap.docs.map((doc) => {
          const item = doc.data();
          item.id = doc.id;
          data.push(item)
        })

        const newListType: InterFaceTypeData[] = []
        data.map((itemObject: any) => {
          if (itemObject.title !== 'All Tasks' && itemObject.title !== 'Add Tasks') {
            newListType.push(itemObject)
          }
        })
        setListTasksType(newListType)

        const newFinalList: InterFaceTypeData[] = data
        setListTasksMain(newFinalList)
      });

    // const newFinalList: InterFaceTypeData[] = []
    //   data.map(async (item: any) => {
    //     item.image = '/taskTypeImages/' + item.image;
    //     const ref = storage().ref(item.image);
    //     item.image = await ref.getDownloadURL();
    //     newFinalList.push(item)
    //   })
    //   setListTasksMain(newFinalList)

    return () => unsubscribe()
  }, []);

  const getFirebaseToken = async () => {
    try {
      const fcmToken = await AsyncStorage.getItem('fcmToken');
      const userEmail = await AsyncStorage.getItem('userEmail');
      const userId = await AsyncStorage.getItem('userId');
      if (fcmToken !== null) {
        setTextFirebaseToken(fcmToken)
      }
      if (userEmail !== null) {
        setTextUserEmail(userEmail)
      }
      if (userId !== null) {
        setTextUserId(userId)
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  // #####

  // ##### Date - Time Picker #####
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const showDatePicker = () => { setDatePickerVisible(true) }
  const hideDatePicker = () => { setDatePickerVisible(false) }

  const [isTimePickerVisible, setTimePickerVisible] = useState(false)
  const showTimePicker = () => { setTimePickerVisible(true) }
  const hideTimePicker = () => { setTimePickerVisible(false) }

  const [isReminderPickerVisible, setReminderPickerVisible] = useState(false)
  const showReminderPicker = () => { setReminderPickerVisible(true) }
  const hideReminderPicker = () => { setReminderPickerVisible(false) }

  const renderDate = () => {
    let text: any = Moment(Date.now()).format('MMMM DD, YYYY hh:mm:ss')
    // console.log(text);
    let date: Date = new Date(text);
    return (
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={date}
        headerTextIOS="Pick a Date"
        onConfirm={(date) => { handleConfirmDate(date) }}
        onCancel={hideDatePicker}
      />)
  }

  const renderTime = () => {
    let text: any = Moment(Date.now()).format('MMMM DD, YYYY hh:mm:ss')
    // console.log(text);
    let date: Date = new Date(text);
    return (
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        minimumDate={date}
        headerTextIOS="Pick a Time"
        onConfirm={(time) => { handleConfirmTime(time) }}
        onCancel={hideTimePicker}
      />)
  }

  const renderReminder = () => {
    let text: any = Moment(Date.now()).format('MMMM DD, YYYY hh:mm:ss')
    // console.log(text);
    let date: Date = new Date(text);
    return (
      <DateTimePickerModal
        isVisible={isReminderPickerVisible}
        mode="datetime"
        minimumDate={date}
        headerTextIOS="Pick Reminder"
        onConfirm={(time) => { handleConfirmReminder(time) }}
        onCancel={hideReminderPicker}
      />)
  }

  const handleConfirmDate = (date: any) => {
    Moment.locale('en')
    var dt = Moment(date).format('DD - MM - YYYY')
    setTextAddDate(dt)
    hideDatePicker()
  };

  const handleConfirmTime = (time: any) => {
    Moment.locale('en')
    var tm = Moment(time).format('hh:mm A')
    setTextAddTime(tm)
    hideTimePicker()
  };

  const handleConfirmReminder = (time: any) => {
    Moment.locale('en')
    var tm = Moment(time).format('DD - MM - YYYY  hh:mm A')
    setTextRemindMe(tm)
    setTextFinalRemindMe(time)
    hideReminderPicker()
  };
  // #####

  // ##### Render Items #####
  const _renderListMain = (item: any, index: number) => {
    let typeTask = typeof item.tasks
    let tasks = '';
    if (typeTask === 'number') {
      tasks = item.tasks + ' items';
    } else if (typeTask === 'string') {
      tasks = item.tasks;
    }
    
    // console.log("FFFF ::: " + JSON.stringify(item));
    console.log("FFFF ::: " + JSON.stringify(item.image));

    return (
      <TouchableOpacity style={styles.cardListMain} onPress={() => {
        if (item.title === 'Add Tasks') {
          sheetAddItem.current.open()
        }
      }}>
        <View style={{ height: '100%', width: '100%' }}>
          <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              style={styles.tasksIconStyle}
              resizeMode={'contain'}
              source={{ uri: item.image }}
            />
          </View>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.textItemTitle}>{item.title}</Text>
            <Text style={styles.textItemSubTitle}>{tasks}</Text>
          </View>
        </View>
        <View style={{ position: 'absolute', padding: 10 }}>
          {
            (item.isFullCircle) ?
              <View style={{ height: 15, width: 15, backgroundColor: item.color, borderRadius: 100 }} />
              :
              <View style={{ height: 15, width: 15, borderColor: item.color, borderWidth: 3, borderRadius: 100 }} />
          }
        </View>
      </TouchableOpacity>
    );
  };

  const _renderAddItemType = (item: any, index: number) => {
    // console.log("+++++++++++++" + JSON.stringify(item));

    return (
      <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {
        setIsAddItemTypeVisible(false)
        setTextAddType(item.title)
        setColorAddType(item.color)
      }}>
        <View style={{ flexDirection: 'row', backgroundColor: Theme.colors.white, borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, alignItems: 'center' }}>
          <View style={{ borderColor: item.color, borderRadius: 100, borderWidth: 2, height: 15, width: 15 }} />
          <Text style={{ color: Theme.colors.textColor1, fontSize: Theme.fontSize.size15, fontFamily: Theme.fontFamily.fontSFProBold, fontWeight: 'bold', paddingHorizontal: 15, }}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  // #####

  // ##### Add Update Data #####
  const addUpdateDataToList = () => {

    listTasksMain.map((objectData) => {
      if (objectData.title === 'All Tasks' || objectData.title === textAddType) {
        let num: any = objectData.tasks
        let itemTasks: number = num + 1;

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

    let date: any = textFinalRemindMe
    let dateFinal: Date = date;

    let dataObject = {
      title: textAddTitle,
      type: textAddType,
      color: colorAddType,
      isChecked: false,
      userEmail: textUserEmail,
      userId: textUserId,
      created_at: firestore.FieldValue.serverTimestamp(),
      reminder_at: dateFinal,
      updated_at: firestore.FieldValue.serverTimestamp(),
    }

    firestore()
      .collection('TodoTaskList')
      .add(dataObject)
      .then(() => {
        scheduleNotification(dataObject);
        console.log('Data added!');
      });


    sheetAddItem.current.close()
  }

  const scheduleNotification = (data: any) => {
    console.log(JSON.stringify(data));

  }
  // #####

  // ##### Bottom sheet #####
  const CategoriesListSheet = () => {
    return (
      <RBSheet
        ref={sheetAddItem}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={420}
        openDuration={300}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          }
        }}>
        {(!isAddItemTypeVisible) ?
          <KeyboardAwareScrollView style={{ flex: 1, marginTop: 15 }}>
            <View style={{ marginVertical: 5, marginHorizontal: 25 }}>
              <TextInput
                placeholder={'Enter Title'}
                onChangeText={(text: string) => setTextAddTitle(text)}
                style={[styles.fromInputStyle, { marginHorizontal: 5 }]}
                keyboardType={'default'}
                autoCapitalize='none'
                numberOfLines={1} />
              <View style={{ marginVertical: 5, marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'center', flex: 1, marginHorizontal: 10 }}>
                    <Text style={styles.textSheet}>{'Task Date'}</Text>
                  </View>
                  <View style={{ justifyContent: 'center', flex: 1, marginHorizontal: 10 }}>
                    <Text style={styles.textSheet}>{'Task Time'}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ flex: 1, marginHorizontal: 5 }} onPress={() => {
                    showDatePicker()
                  }}>
                    <View style={[styles.viewBgSelector, { justifyContent: 'center' }]}>
                      <Text style={styles.textSheet}>{textAddDate}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, marginHorizontal: 5 }} onPress={() => {
                    showTimePicker()
                  }}>
                    <View style={[styles.viewBgSelector, { justifyContent: 'center' }]}>
                      <Text style={styles.textSheet}>{textAddTime}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginVertical: 5 }}>
                <View style={{ justifyContent: 'center', flex: 1, marginHorizontal: 10 }}>
                  <Text style={styles.textSheet}>{'Task Type'}</Text>
                </View>
                <TouchableOpacity style={{ flex: 1, marginHorizontal: 5 }} onPress={() => {
                  setIsAddItemTypeVisible(true);
                }}>
                  <View style={[styles.viewBgSelector, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }]}>
                    <View style={{ borderColor: colorAddType, borderRadius: 100, borderWidth: 2, height: 10, width: 10 }} />
                    <Text style={[styles.textSheet, { paddingHorizontal: 15 }]}>{textAddType}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ marginVertical: 5 }}>
                <View style={{ justifyContent: 'center', flex: 1, marginHorizontal: 10 }}>
                  <Text style={styles.textSheet}>{'Remind me'}</Text>
                </View>
                <TouchableOpacity style={{ flex: 1, marginHorizontal: 5 }} onPress={() => {
                  showReminderPicker()
                }}>
                  <View style={[styles.viewBgSelector, { justifyContent: 'center' }]}>
                    <Text style={styles.textSheet}>{textRemindMe}</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
            <CustomButton
              buttonStyle={{ backgroundColor: Theme.colors.appBgColor, marginTop: 30, marginVertical: 15 }}
              titleStyle={{ color: Theme.colors.black }}
              containerStyle={{}}
              title={'Add'}
              onPress={() => {
                addUpdateDataToList()
              }}
              options={{}}
            />
          </KeyboardAwareScrollView>
          :
          <View style={{ flex: 1, marginHorizontal: 25 }}>
            <FlatList
              data={listTasksType}
              contentContainerStyle={styles.containerListStyle}
              keyExtractor={(_item: any, _index: any) => _index}
              renderItem={({ item, index }) => _renderAddItemType(item, index)}
            />
          </View>
        }
      </RBSheet>
    )
  }
  // #####

  return (
    <>
      <SafeAreaView style={styles.mainview}>
        <FlatList
          numColumns={2}
          data={listTasksMain}
          contentContainerStyle={[styles.containerListStyle, { alignItems: 'center' }]}
          keyExtractor={(_item: any, _index: any) => _index}
          renderItem={({ item, index }) => _renderListMain(item, index)}
        />
      </SafeAreaView>
      {CategoriesListSheet()}
      {renderDate()}
      {renderTime()}
      {renderReminder()}
    </>
  );
}
