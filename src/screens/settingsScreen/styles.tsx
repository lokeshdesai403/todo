import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  mainview: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.appBgColor,
  },
  textAppTitle: {
    fontSize: Theme.fontSize.size25,
    color: Theme.colors.textColor1,
    fontWeight: 'bold',
    fontFamily: Theme.fontFamily.fontSFProBold,
    textAlign: 'center',
  },
});

export default styles;
