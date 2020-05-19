import React from 'react'
import { View, FlatList, Text, TouchableOpacity } from 'react-native'
import { Styles, RoundedButton } from './common'
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

import { connect } from 'react-redux'
import { addNewGoal } from '../redux/Action/booksActions';
import { getBookItemWithGoal } from '../redux/helper';



class BookList extends React.Component {

    state = {
        showGoalDialog: false,
        selectedDate: moment().add(1, 'day').format("YYYY-MM-DD"),
        selectedItem: ''
    }

    componentDidMount() {
        console.log("===========>>MMMMMM>>>>??????" + this.props.data.books.length)
    }

    renderListItem = (item) => {
        return (
            <View style={Styles.menuItem}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View style={{
                        borderRadius: 20,
                        width: 80,
                        padding: 5,
                        justifyContent: 'center',
                        alignContent: 'center',
                        borderColor: "#cc7a00",
                        backgroundColor: "#ffd699",
                        borderStyle: "solid",
                        borderWidth: 0.7,
                    }}>
                        <Text style={{ width: "100%", textAlign: 'center', fontSize: 8 }}>{item.type}</Text>

                    </View>
                    <Text style={{
                        color: "#003399",
                        fontWeight: 'bold',
                        fontSize: 12

                    }}>{item.price + "$"}</Text>
                </View>


                <Text style={{
                    width: "100%",
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 14,
                    marginTop: 10
                }}>
                    {item.title}
                </Text>

                <Text numberOfLines={3} ellipsizeMode={'tail'} style={{
                    width: "100%",
                    textAlign: 'justify',
                    height: 50,
                    fontSize: 12,
                    marginTop: 20
                }}>
                   { item.description}
                </Text>

                <View style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#f4f8fe",
                    marginBottom: 10
                }}></View>

                {this.renderItemFooter(item)}

            </View >
        )
    }

    onGoalDone = async (item) => {
        
        this.props.addNewGoal(getBookItemWithGoal(
            item.type,
            item.title,
            item.description,
            item.price,
            item.dueDate,
            true,
            true)
        )

        setTimeout(()=>{
            this.props.onGoalDone()
        },250)
        
    }

    renderItemFooter = (item) => {
        if (item.isGoalCompleted) {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={{
                        color : "green",
                        fontWeight : 'bold',
                        marginTop : 3,
                        fontSize : 13
                    }}>Goal is completed</Text>
                </View>
            )
        }

        if (item.isCreateGoal) {
            let message = ""
            let dayCount = 0
            if (moment(item.dueDate).isAfter(moment().format("YYYY-MM-DD"))) {
                let start = moment(item.dueDate);
                // let end = moment().di.format("YYYY-MM-DD").;
                dayCount = moment(item.dueDate + " 24:00:00").diff(moment(), 'days')
                message = "You have " + dayCount +" days"
            }
            else {
                message = "Expired"
            }

            return (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text>
                        {item.dueDate}
                    </Text>

                    <Text style={dayCount == 1 ? { color: "red" } : { color: "green" }}>
                        {message}
                    </Text>

                    <TouchableOpacity
                        onPress={() => this.onGoalDone(item)}
                        style={{
                            borderRadius: 20,

                            padding: 7,
                            justifyContent: 'center',
                            alignContent: 'center',
                            borderColor: "#0066ff",
                            backgroundColor: "#b3d1ff",
                            borderStyle: "solid",
                            borderWidth: 0.7,
                        }}>
                        <Text style={{ width: "100%", textAlign: 'center', fontSize: 16, color: "#003300" }}>{"DONE"}</Text>

                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <TouchableOpacity
                onPress={() => this.setState({ showGoalDialog: true, selectedItem: item })}
                style={{
                    borderRadius: 20,

                    padding: 7,
                    justifyContent: 'center',
                    alignContent: 'center',
                    borderColor: "#00ff00",
                    backgroundColor: "#ccffcc",
                    borderStyle: "solid",
                    borderWidth: 0.7,
                }}>
                <Text style={{ width: "100%", textAlign: 'center', fontSize: 16, color: "#003300" }}>{"CREATE GOAL"}</Text>

            </TouchableOpacity>

        )
    }

    onAddGoal = async () => {
        if (this.state.selectedItem == null) {

            return
        }
        let item = this.state.selectedItem

        this.props.addNewGoal(getBookItemWithGoal(
            item.type,
            item.title,
            item.description,
            item.price,
            this.state.selectedDate,
            true,
            false)
        )

        this.setState({ showGoalDialog: false })

    }

    handleScroll = (event: Object) => {
        this.props.onScroll(event)
    }


    render() {

        return (
            <View>
                <FlatList
                    data={this.props.data.books}
                    onScroll={this.handleScroll}
                    renderItem={({ item }) => (
                        this.renderListItem(item)
                    )}
                // keyExtractor={item => item.id}

                />
                <View>
                    <Modal onBackdropPress={() => this.setState({ showGoalDialog: false })} isVisible={this.state.showGoalDialog}>
                        <View style={{ flex: 1, marginTop: "90%", padding: 50, backgroundColor: "white", borderRadius: 20 }}>
                            <Text style={{ width: "100%", textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>ADD NEW GOAL</Text>

                            <DatePicker
                                style={{ width: 200, marginTop: 50 }}
                                date={this.state.selectedDate}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate={moment().format("YYYY-MM-DD")}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => this.setState({ selectedDate: date })}
                            />

                            <View>
                                <RoundedButton

                                    onPress={() => this.onAddGoal()}
                                    backgroundColor={"#3b39f3"}
                                    textColor={"#ffffff"}

                                >
                                    {"ADD"}
                                </RoundedButton>
                            </View>
                        </View>
                    </Modal>
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
        addNewGoal: (data) =>  dispatch(addNewGoal(data)),
    };
};



// Exports
export default connect(mapStateToProps, mapDispatchToProps)(BookList);