import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  mainview: {
    height: '100%',
    width: '100%',
    backgroundColor: Theme.colors.appBgColor,
  },
  listStyle: {
    marginVertical: 5,
    marginHorizontal: 5,
  },
  cardTopList: {
    flex: 1,
    width: 150,
    marginVertical: 5,
    marginBottom: 15,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: Theme.colors.white,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    flexDirection: 'row',
  },
  textListMainTitle: {
    fontSize: Theme.fontSize.size13,
    color: Theme.colors.textColor1,
    fontWeight: 'bold',
    fontFamily: Theme.fontFamily.fontSFProBold,
  },
  subTextListMainTitle: {
    fontSize: Theme.fontSize.size10,
    color: Theme.colors.textColor1,
    fontFamily: Theme.fontFamily.fontSFProRegular,
  },
  cardListMain: {
    flexDirection: 'row',
    marginVertical: 5,
    marginBottom: 10,
    marginHorizontal: 25,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: Theme.colors.white,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  homeCheckIconStyle: {
    height: 25,
    width: 25,
  },
  textListTitle: {
    fontSize: Theme.fontSize.size16,
    color: Theme.colors.textColor1,
    fontWeight: 'bold',
    fontFamily: Theme.fontFamily.fontSFProBold,
  },
});

export default styles;
