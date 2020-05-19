import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Hoshi  from './Hoshi';
import Moment from 'moment'

class InputField extends Component {
    focus = () => {
        console.log("sbdsdsmndnsmdns")
        
        this.textInputField.focus()
    }

    render() {
        return (
            <View>
                <Hoshi
                    ref={(input) => { this.textInputField = input; }}
                    labelStyle={{ color: '#374f8e', fontSize: 12 }}
                    inputStyle={{ fontSize: 14, fontWeight: 'normal', color: '#061c55', fontWeight:"600"}}
                    // borderBottomColor="green"
                    label={this.props.label}
                    borderHeight={2}
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                    borderColor={"#050514"}
                    editable={this.props.editable}
                    onFocus={() => this.setState({ borderColorName: "#050514", errorName: '' })}
                    returnKeyType={this.props.returnKeyType}
                    blurOnSubmit={false}
                    onSubmitEditing={this.props.onSubmitEditing}
                    spellCheck={false}
                    inputPadding = {8}

                    secureTextEntry={this.props.secureTextEntry}
                    keyboardType = {this.props.keyboardType}
                    autoCapitalize={this.props.autoCapitalize}
                    
                />

              
            </View>


        )
    }

}

export { InputField }