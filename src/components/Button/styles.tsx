import { StyleSheet } from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Theme.colors.white,
    borderRadius: 10,
    marginHorizontal: 50,
    borderColor: Theme.colors.buttonBorderColor,
    borderWidth: 1,
  },
  titleStyle: {
    color: Theme.colors.textColor1,
    fontSize: Theme.fontSize.size16,
    fontFamily: Theme.fontFamily.fontSFProBold
  }
})

export default styles;