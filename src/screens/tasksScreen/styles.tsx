import {StyleSheet, Dimensions} from 'react-native';
import Theme from '../../theme/Theme';

var {width, height} = Dimensions.get('window');
var cardWidth = (width - 50) / 2;

const styles = StyleSheet.create({
  mainview: {
    height: '100%',
    width: '100%',
    backgroundColor: Theme.colors.appBgColor,
  },
  containerListStyle: {
    paddingBottom: 20,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  cardListMain: {
    width: cardWidth,
    height: cardWidth,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  absoluteView: {
    position: 'absolute',
    height: 15,
    width: 15,
    marginVertical: 15,
    marginRight: 15,
    borderRadius: 100,
    backgroundColor: 'black',
  },
  tasksIconStyle: {
    height: 80,
    width: 80,
  },
  textItemTitle: {
    fontSize: Theme.fontSize.size16,
    color: Theme.colors.textColor1,
    fontWeight: 'bold',
    fontFamily: Theme.fontFamily.fontSFProBold,
  },
  textItemSubTitle: {
    fontSize: Theme.fontSize.size12,
    color: Theme.colors.textColor1,
    fontFamily: Theme.fontFamily.fontSFProRegular,
  },
  viewBgSelector: {
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderColor: Theme.colors.black,
    backgroundColor: Theme.colors.appBgColor,
  },
  textSheet: {
    color: Theme.colors.textColor1,
    fontSize: Theme.fontSize.size12,
    fontFamily: Theme.fontFamily.fontSFProMedium,
  },
  fromInputStyle: {
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    color: Theme.colors.textColor1,
    borderColor: Theme.colors.black,
    fontSize: Theme.fontSize.size12,
    backgroundColor: Theme.colors.appBgColor,
    fontFamily: Theme.fontFamily.fontSFProMedium,
  },
});

export default styles;
