import React from 'react'
import { View, Text, TouchableOpacity, Image, Keyboard,ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth';
import { InputField, RoundedButton, Styles } from '../common'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux';


export default class Create extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            password: '',
            passwordConfirm : '',
            errorText : '',
            loading : false
        }
    }


    onValidate = () => {
       
        if (this.state.userName.length > 0 && this.state.password.length > 0) {
            if(this.state.password == this.state.passwordConfirm){
                return true;
            }
            
        }
        return false
    }

    componentDidMount() {

    }


    onCreate = () => {
        this.setState({errorText : "",loading : true})
        auth()
            .createUserWithEmailAndPassword(this.state.userName,this.state.passwordConfirm)
            .then(() => {
                this.setState({ loading : false})
                console.log('User account created & signed in!');
                Actions.Dashboard()
            })
            .catch(error => {
                this.setState({ loading : false})
                console.log("========err===="+error)
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    this.setState({errorText : "That email address is already in use!"})
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    this.setState({errorText : "That email address is invalid!"})
                }

                if(error.code === "auth/weak-password"){
                    this.setState({errorText : "Password should be at least 6 characters!"})
                }

                
            });

           
    }



    render() {
        if(this.state.loading){
            return(
                <View style={{flex : 1, justifyContent : 'center', alignContent : 'center'}}>
                    <ActivityIndicator color={"black"}></ActivityIndicator>
                </View>
            )
        }
        return (

            

            <View style={[Styles.mainContainer, { flex: 1, justifyContent: 'center', alignContent: 'center', }]}>
                <KeyboardAwareScrollView >
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', height: '100%', marginTop: 30 }} >


                        <View style={{ marginTop: 60 }}>
                            <InputField
                                ref={(input) => { this.userName = input; }}
                                label={"Email"}
                                value={this.state.userName}
                                keyboardType={'email-address'}
                                returnKeyType={"next"}
                                onChangeText={(text) => this.setState({ userName: text })}
                                onSubmitEditing={() => { this.password.focus() }}
                                autoCapitalize={"none"}

                            />

                            {/* <Text style={styles.errorStyle}> Error </Text> */}

                        </View>

                        <View style={{ marginTop: 20 }}>
                            <InputField
                                ref={(input) => { this.password = input; }}
                                label={"Password"}
                                secureTextEntry={true}
                                value={this.state.password}
                                returnKeyType={"next"}
                                onChangeText={(text) => this.setState({ password: text })}
                                onSubmitEditing={() => { this.passwordConfirm.focus() }}
                                autoCapitalize={"none"}

                            />

                            {/* <Text style={styles.errorStyle}> Error </Text> */}


                        </View>

                        <View style={{ marginTop: 20, marginBottom: 30 }}>
                            <InputField
                                ref={(input) => { this.passwordConfirm = input; }}
                                label={"Confirm Password"}
                                secureTextEntry={true}
                                value={this.state.passwordConfirm}
                                returnKeyType={"done"}
                                onChangeText={(text) => this.setState({ passwordConfirm: text })}
                                onSubmitEditing={() => { Keyboard.dismiss() }}
                                autoCapitalize={"none"}

                            />

                            


                        </View>

                        <Text style={{color : 'red'}}>{this.state.errorText} </Text>


                    </View>
                </KeyboardAwareScrollView>

                <View style={{ backgroundColor: 'transparent', marginBottom: 5, marginLeft: 20, marginRight: 20 }}>
                    <RoundedButton
                        disabled={!this.onValidate()}
                        onPress={() => this.onCreate()}
                        backgroundColor={"#050514"}
                        textColor={"#ffffff"}

                    >
                        {"CREATE"}
                    </RoundedButton>
                </View>
            </View>

        )
    }
}