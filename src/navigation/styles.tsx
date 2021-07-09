import {StyleSheet} from 'react-native';
import Theme from '../theme/Theme';

const styles = StyleSheet.create({
  menuIconStyle: {
    height: 25,
    width: 25,
    marginStart: 15,
  },
  iconDrawer: {
    width: 200,
    height: 100,
  },
  textTopHeader: {
    fontSize: Theme.fontSize.size15,
    color: Theme.colors.textColor1,
    fontFamily: Theme.fontFamily.fontSFProBold,
    fontWeight: 'bold',
  },
  tabBottomImage: {
    height: 25,
    width: 20,
  },
  flexStyle: {
    flex: 1,
  },
  drawerMainContainer: {
    backgroundColor: Theme.colors.navigation,
    height: 130,
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
  },
  drawerCloseIconStyle: {
    height: 25,
    width: 25,
  },
  drawerMainIconStyle: {
    width: 200,
    height: 100,
    marginStart: 30,
  },
  drawerSection: {
    marginTop: 15,
  },
  drawerLabelStyle: {
    color: Theme.colors.textColor1,
    fontSize: Theme.fontSize.size15,
    fontFamily: Theme.fontFamily.fontSFProBold,
    fontWeight: 'bold',
  },
  drawerLogoutBg: {
    backgroundColor: Theme.colors.navigation,
  },
  logoutStyle: {
    color: Theme.colors.appColor,
    fontSize: Theme.fontSize.size15,
    fontFamily: Theme.fontFamily.fontSFProBold,
  },
});

export default styles;
