import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';

const RoundedButton = ({ onPress, children, backgroundColor, textColor, icon, disabled }) => {
    return (
        <View style={disabled ? {opacity : 0.4} : {opacity :1} }>
            <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.buttonStyle, { backgroundColor: backgroundColor }]}>
                <Text style={[styles.textStyle, { color: textColor, }]}>
                    {children}
                </Text>

               

            </TouchableOpacity>
        </View>

    );
};

const styles = {
    buttonStyle: {

        alignSelf: 'stretch',


        borderWidth: 1,
        borderRadius: 40,
        borderColor: '#3b39f3',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20


    },


    textStyle: {
      
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
       
    }
}

export { RoundedButton };