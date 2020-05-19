import React from 'react'
import { View, Text, TouchableOpacity ,Image,Keyboard,ActivityIndicator} from 'react-native'
import auth from '@react-native-firebase/auth';
import { InputField, RoundedButton, Styles } from '../common'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux'


export default class Login extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            userName : '',
            password : '',
            errorText : '',
            loading : false
        }
    }


    onValidate = () =>{
       
        if(this.state.userName.length > 0 && this.state.password.length > 0 ){
            return true;
        }
        return false
    }

    componentDidMount() {

        // auth().signInWithEmailAndPassword('sarah.lane@gmail.com', 'SuperSecretPassword!').then(res => {
        //     console.log("==========>>>>>" + res.user.email)
        // })
        // auth()
        //     .createUserWithEmailAndPassword('sarah.lane@gmail.com', 'SuperSecretPassword!')
        //     .then(() => {
        //         console.log('User account created & signed in!');
        //     })
        //     .catch(error => {
        //         if (error.code === 'auth/email-already-in-use') {
        //             console.log('That email address is already in use!');
        //         }

        //         if (error.code === 'auth/invalid-email') {
        //             console.log('That email address is invalid!');
        //         }

        //         console.error(error);
        //     });
    }


    onLogin = async () => {
        this.setState({errorText : "", loading : true})
        auth().signInWithEmailAndPassword(this.state.userName, this.state.password).then(res => {
            console.log("==========>>>>>" + res.user.email)
            this.setState({ loading : false})
            Actions.Dashboard()
        }).catch(err =>{
            this.setState({ loading : false})
            this.setState({errorText : "Something went wrong, Please check again"})
        })
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
                <KeyboardAwareScrollView scrollBa >
                    <View style={{ flex:1 , justifyContent: 'center', alignContent: 'center', height: '100%', marginTop : 50 }} >

                        <Image
                        source={require('../../images/books.jpg')}
                        style = {{height : 170, width : "100%", resizeMode : 'center'}}
                        />

                        <View style={{ marginTop: 20 }}>
                            <InputField
                                ref={(input) => { this.userName = input; }}
                                label={"Email"}
                                value={this.state.userName}
                                keyboardType={'email-address'}
                                returnKeyType={"next"}
                                onChangeText={(text) => this.setState({userName : text})}
                                onSubmitEditing={() => { this.password.focus() }}
                                autoCapitalize={"none"}

                            />

                            {/* <Text style={styles.errorStyle}> Error </Text> */}

                        </View>

                        <View style={{ marginTop: 20, marginBottom: 30 }}>
                            <InputField
                                ref={(input) => { this.password = input; }}
                                label={"Password"}
                                secureTextEntry={true} 
                                value={this.state.password}
                                returnKeyType={"done"}
                                onChangeText={(text) => this.setState({password : text})}
                                onSubmitEditing={() => { Keyboard.dismiss() }}
                                autoCapitalize={"none"}

                            />

                            {/* <Text style={styles.errorStyle}> Error </Text> */}


                        </View>

                        

                        
                        <Text style={{color : 'red'}}>{this.state.errorText} </Text>

                       
                    </View>
                </KeyboardAwareScrollView>
                <View style={{ backgroundColor: 'transparent', marginBottom: 5, marginLeft: 20, marginRight: 20 }}>
                            <RoundedButton
                                disabled={!this.onValidate()}
                                onPress={() => this.onLogin()}
                                backgroundColor={"#3b39f3"}
                                textColor={"#ffffff"}

                            >
                                {"LOGIN"}
                            </RoundedButton>
                        </View>

                        <View style={{ backgroundColor: 'transparent', marginBottom: 20, marginLeft: 20, marginRight: 20 }}>
                            <RoundedButton
                                disabled={false}
                                onPress={() => this.onLogin()}
                                backgroundColor={"#050514"}
                                textColor={"#ffffff"}
                                onPress={()=>Actions.CreateAcount()}
                            >
                                {"CREATE ACCOUNT"}
                            </RoundedButton>
                        </View>
            </View>

        )
    }
}