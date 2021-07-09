import React from 'react';
import {Button} from 'react-native-elements';
import {CustomButtonProps} from './';
import styles from './styles';

const CustomButton: React.FC<CustomButtonProps> = ({buttonStyle, titleStyle, containerStyle, title, onPress, options}) => {

  return (
    <Button
      {...options}
      buttonStyle={
        [styles.buttonStyle, buttonStyle]
      }
      titleStyle={
        [styles.titleStyle, titleStyle]
      }
      containerStyle={
        [containerStyle]
      }
      title={title}
      onPress={onPress}
    />
  )

}

export default CustomButton;
