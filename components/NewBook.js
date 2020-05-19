import React from 'react'
import { View, Text, TouchableOpacity, Image, Keyboard, Picker } from 'react-native'

import { InputField, RoundedButton, DropDown, Styles } from './common'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux'
import { addNewBook } from '../redux/Action/booksActions';
import { DRAMA, MATHEMATICS, SCIENCE, NOVEL, TRAVEL, RELIGION } from '../redux/constant'
import Animated, { abs, Easing } from 'react-native-reanimated';
import {getBookItem} from '../redux/helper'


class NewBook extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            type: DRAMA,
            title: '',
            description: '',
            price: '',
            errorText : ''
        }
    }


    onValidate = () => {

        if (this.state.title.length > 0 &&
            this.state.description.length > 0 &&
            this.state.price.length > 0) {
            return true
        }
        return false
    }

    componentDidMount() {

    }


    onCreate = () => {

       let history = this.props.data.books.filter(item =>{
            return item.title.toLowerCase() == this.state.title.toLowerCase()
        })
        this.setState({errorText : ""})
        if(history.length > 0){
            this.setState({errorText : "This book is already added.."})
            return;
        }

        this.props.addNewBook(getBookItem(
            this.state.type
            , this.state.title,
            this.state.description,
            this.state.price),)

            this.props.onCreated()

    }



    render() {
        return (

            <View >
                <KeyboardAwareScrollView >
                    <View style={{ flex: 1, height: '100%' }} >


                        <Animated.View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                            <Text style={{ marginTop: 15 }}>Type</Text>
                            <Picker
                                selectedValue={this.state.type}
                                style={{ width: 150 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ type: itemValue }, this.title.focus())}
                            >
                                <Picker.Item label={DRAMA} value={DRAMA} />
                                <Picker.Item label={MATHEMATICS} value={MATHEMATICS} />
                                <Picker.Item label={SCIENCE} value={SCIENCE} />
                                <Picker.Item label={NOVEL} value={NOVEL} />
                                <Picker.Item label={TRAVEL} value={TRAVEL} />
                                <Picker.Item label={RELIGION} value={RELIGION} />
                            </Picker>

                            {/* <Text style={styles.errorStyle}> Error </Text> */}

                        </Animated.View>

                        <View style={{ marginTop: 20 }}>
                            <InputField
                                ref={(input) => { this.title = input; }}
                                label={"Title"}
                                value={this.state.title}
                                returnKeyType={"next"}
                                onChangeText={(text) => this.setState({ title: text })}
                                onSubmitEditing={() => { this.description.focus() }}
                                autoCapitalize={"none"}

                            />

                            {/* <Text style={styles.errorStyle}> Error </Text> */}

                        </View>

                        <View style={{ marginTop: 60 }}>
                            <InputField
                                ref={(input) => { this.description = input; }}
                                label={"Description"}
                                value={this.state.description}

                                returnKeyType={"next"}
                                onChangeText={(text) => this.setState({ description: text })}
                                onSubmitEditing={() => { this.price.focus() }}
                                autoCapitalize={"none"}

                            />

                            {/* <Text style={styles.errorStyle}> Error </Text> */}

                        </View>

                        <View style={{ marginTop: 60 }}>
                            <InputField
                                ref={(input) => { this.price = input; }}
                                label={"Price"}
                                value={this.state.price}
                                keyboardType={'decimal-pad'}
                                returnKeyType={"done"}
                                onChangeText={(text) => this.setState({ price: text })}
                                onSubmitEditing={() => { Keyboard.dismiss() }}
                                autoCapitalize={"none"}

                            />

                            {/* <Text style={styles.errorStyle}> Error </Text> */}

                        </View>


                        <Text style={{ color: 'red' }}>{this.state.errorText} </Text>


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


// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
        data: state.bookItemReducer,

    }
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        addNewBook: (data) => dispatch(addNewBook(data)),
    };
};



// Exports
export default connect(mapStateToProps, mapDispatchToProps)(NewBook);
