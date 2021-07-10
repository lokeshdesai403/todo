import {StyleSheet} from 'react-native';
import Theme from '../../../theme/Theme';

const styles = StyleSheet.create({
  mainContainerStyle: {
    height: '100%',
    width: '100%',
  },
  mainview: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Theme.colors.appBgColor,
  },
  errorStyle: {
    fontSize: Theme.fontSize.size10,
    color: Theme.colors.appRed,
    fontFamily: Theme.fontFamily.fontSFProBold,
    fontWeight: 'bold',
  },
  textTitleMain: {
    fontSize: Theme.fontSize.size13,
    color: Theme.colors.textColor1,
    fontFamily: Theme.fontFamily.fontSFProBold,
    fontWeight: 'bold',
    marginHorizontal: 5,
    marginTop: 15,
  },
  textInputBg: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.colors.appGray1,
    paddingHorizontal: 15,
    height: 45,
    marginVertical: 2,
  },
  textInputStyle: {
    fontSize: Theme.fontSize.size12,
    color: Theme.colors.textColor1,
    fontFamily: Theme.fontFamily.fontSFProRegular,
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: Theme.colors.black,
    paddingHorizontal: 15,
    justifyContent: 'center',
    height: 45,
  },
  textButtonStyle: {
    fontSize: Theme.fontSize.size15,
    color: Theme.colors.white,
    fontFamily: Theme.fontFamily.fontSFProBold,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewBottomRegister: {
    flex: 1,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  textRegisterStyle: {
    fontSize: Theme.fontSize.size12,
    color: Theme.colors.black,
    fontFamily: Theme.fontFamily.fontSFProRegular,
  },
  textRegisterStyleClick: {
    fontSize: Theme.fontSize.size12,
    color: Theme.colors.appLink,
    fontFamily: Theme.fontFamily.fontSFProBold,
    fontWeight: 'bold',
  },
});

export default styles;
