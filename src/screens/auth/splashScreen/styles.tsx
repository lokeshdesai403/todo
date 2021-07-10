import {StyleSheet} from 'react-native';
import Theme from '../../../theme/Theme';

const styles = StyleSheet.create({
  mainContainerStyle: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.appBgColor,
  },
  mainview: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.appBgColor,
  },
  iconMain: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAppTitle: {
    fontSize: Theme.fontSize.size25,
    color: Theme.colors.textColor1,
    fontWeight: 'bold',
    fontFamily: Theme.fontFamily.fontSFProBold,
    textAlign: 'center',
  },
  subTextAppTitle: {
    fontSize: Theme.fontSize.size12,
    color: Theme.colors.textColor1,
    fontWeight: 'bold',
    fontFamily: Theme.fontFamily.fontSFProBold,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  imageStyle: {
    height: 200,
    width: 200,
  },
  copyRightMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCopyRight: {
    fontSize: Theme.fontSize.size10,
    color: Theme.colors.textColor1,
    fontFamily: Theme.fontFamily.fontSFProRegular,
  },
});

export default styles;
