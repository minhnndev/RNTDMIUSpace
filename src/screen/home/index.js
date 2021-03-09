import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
/* Component */
import BackgroundHeader from '../../component/BackgroundHeader';
import {COLORS} from '../../utils/theme';
import {currentDay, dayInWeek} from '../../utils/supportData/date';
/* --------- */
import DataNews from '../../common/database/data.json';
import {URL} from '../../api/config';

const URL_API = 'http://45.119.212.43:5000/api/schedule/1824801030015';

const {width, height} = Dimensions.get('window');

const IconGroup = (props) => {
  return (
    <View>
      <TouchableOpacity style={styles.touch} onPress={props.onPress}>
        <FontAwesome name={props.icon} size={29} color="#174A91" />
        <Text style={styles.txtIcon}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({navigation, route}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [information, setInfomation] = useState([]);
  const [timetableToday, setTimetableToday] = useState([]);

  useEffect(() => {
    fetch(URL_API)
      .then((response) => response.json())
      .then((json) => {
        setData(json.timeTable);
        setInfomation(json.information);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  var dayz = dayInWeek();
  var daysEN = dayz.getDayInWeek;
  var daysVN = dayz.getThu;

  return (
    <View style={styles.container}>
      <BackgroundHeader height={(height / 100) * 26} width={width} />
      <View style={styles.mainView}>
        <View style={styles.viewMember}>
          <View>
            <Text style={styles.nameMember}>Xin chào,</Text>
            <Text style={styles.nameMember}>{information.name}</Text>
            <Text style={styles.date}>
              Hôm nay, {daysVN} ngày {currentDay()}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', {information})}>
            <Image
              source={require('../../assets/img/minhdev.jpg')}
              style={styles.imageMember}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.menuTb}>
        <View style={styles.iconGroup}>
          <IconGroup icon="id-card" title="Thẻ SV" />
          <IconGroup
            icon="list-alt"
            title=" TKB "
            onPress={() => navigation.navigate('Timeline', {information})}
          />
          <IconGroup icon="bell-o" title="Tbáo" />
          <IconGroup
            icon="newspaper-o"
            title="Tin tức"
            onPress={() => navigation.navigate('News')}
          />
          <IconGroup
            icon="navicon"
            title="Khác"
            onPress={() => navigation.navigate('Extend', {information})}
          />
        </View>
      </View>

      <View style={styles.bodyScreen}>
        <View>
          <Text style={styles.title}>Lịch học hôm nay</Text>
          <ScrollView>
            <FlatList
              data={data.monday}
              keyExtractor={(item) => item.classroom + item.start}
              renderItem={({item}) => (
                <View>
                  <View style={styles.calcuView}>
                    <View style={styles.roomView}>
                      <Text style={styles.roomTxt}>{item.classroom}</Text>
                    </View>
                    <View style={styles.detailCal}>
                      <Text style={styles.nameSubject}>{item.subject}</Text>
                      <Text>
                        Tiết: {item.start} đến {item.end}
                      </Text>
                      <Text>{item.teacher}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </ScrollView>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Tin tức</Text>
          <FlatList
            data={DataNews}
            keyExtractor={(item) => item.id_name}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Detail', {item})}>
                  <View style={styles.viewImgTitNews}>
                    <Image
                      source={{
                        uri: item.img,
                      }}
                      style={styles.imgNewsProject}
                      resizeMode="cover"
                    />
                    <View style={styles.titledesc}>
                      <Text style={styles.txtNews} numberOfLines={2}>
                        {item.name || item.title}
                      </Text>
                      <Text style={styles.textTitleNews} numberOfLines={2}>
                        {item.desc.substring(0, 60)}...
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    position: 'absolute',
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    color: '#001242',
    fontWeight: 'bold',
  },
  viewMember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 20,
  },
  nameSubject: {
    fontSize: 16,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  nameMember: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
    marginTop: 20,
  },
  imageMember: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#fff9',
    marginLeft: 40,
  },
  bodyScreen: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 5,
  },
  roomView: {
    width: 70,
    height: 70,
    borderRadius: 15,
    backgroundColor: COLORS.secondary,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomTxt: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  calcuView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailCal: {
    marginLeft: 11,
  },
  txtNews: {
    fontSize: 16,
    color: '#001242',
    fontWeight: '700',
  },
  //---------------TABS----------------//
  menuTb: {
    width: width - 40,
    height: 80,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 11,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: -40,
  },
  touch: {
    alignItems: 'center',
    width: 50,
  },
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  txtIcon: {
    fontSize: 12,
    marginTop: 3,
  },
  //---------------FLATLIST_NEWS----------------//
  viewImgTitNews: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  imgNewsProject: {
    width: 120,
    height: 70,
    borderRadius: 3,
    marginHorizontal: 10,
  },
  titledesc: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 5,
  },
  textTitleNews: {
    fontSize: 14,
  },
});
