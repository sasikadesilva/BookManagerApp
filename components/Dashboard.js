import React from 'react'
import { View, Dimensions, SafeAreaView, FlatList, Text } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,

} from "react-native-chart-kit";
import { TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux'
import { addNewBook } from '../redux/Action/booksActions';
import { Styles, RoundedButton } from './common'

import { SCIENCE, MATHEMATICS, NOVEL, TRAVEL, RELIGION, DRAMA } from '../redux/constant';
import BookList from './BookList';
import NewBook from './NewBook';


const screenWidth = Dimensions.get("window").width
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 2) => `rgba(26, 255, 255, ${opacity})`,
  strokeWidth: 6, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};



class Dashboard extends React.Component {

  state = {

    showList: true,
    data: [
      {
        name: SCIENCE,
        population: 0,
        color: "#000066",
        legendFontColor: "#7F7F7F",
        legendFontSize: 10
      },
      {
        name: MATHEMATICS,
        population: 0,
        color: "#000099",
        legendFontColor: "#7F7F7F",
        legendFontSize: 10
      },
      {
        name: NOVEL,
        population: 0,
        color: "#0000e6",
        legendFontColor: "#7F7F7F",
        legendFontSize: 10
      },
      {
        name: DRAMA,
        population: 0,
        color: "#3333ff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 10
      },
      {
        name: TRAVEL,
        population: 0,
        color: "#8080ff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 10
      },
      {
        name: RELIGION,
        population: 0,
        color: "#ccccff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 10
      },


    ]
  }

  componentDidMount(){
    this.loadGraph()
  }

 




  loadGraph = async () => {

    const drama = this.props.data.books.filter(item =>{
      return item.type == DRAMA && item.isGoalCompleted
    })

    const math = this.props.data.books.filter(item =>{
      return item.type == MATHEMATICS && item.isGoalCompleted
    })

    const novel = this.props.data.books.filter(item =>{
      return item.type == NOVEL && item.isGoalCompleted
    })

    const science = this.props.data.books.filter(item =>{
      return item.type == SCIENCE && item.isGoalCompleted
    })

    const travel = this.props.data.books.filter(item =>{
      return item.type == TRAVEL&& item.isGoalCompleted
    })

    const religion = this.props.data.books.filter(item =>{
      return item.type == RELIGION && item.isGoalCompleted
    })


    let dataList = this.state.data
    dataList[0].population = science.length
    dataList[1].population = math.length
    dataList[2].population = novel.length
    dataList[3].population = drama.length
    dataList[4].population = travel.length
    dataList[5].population = religion.length
    


    this.setState({
      data : dataList
    })




  }

  onScroll = (event: Object) => {

  }

  renderContent = () => {
    if (this.state.showList) {
      return (
        <BookList
        onGoalDone={()=>this.loadGraph()}
          data={this.props.data.books}
          onScroll={(event) => this.onScroll(event)}
        />
      )
    }
    else {
      return (
        <NewBook onCreated={() => this.setState({ showList: true })} />
      )

    }
  }

  renderHeader = () => {
    return (
      <View style={[Styles.mainContainer]}>
        <PieChart
          data={this.state.data}
          width={screenWidth}
          height={180}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
        <View style={{ width: 100 }}>
          <RoundedButton
            backgroundColor={"#00b386"}
            textColor={"#ffffff"}
            onPress={() => this.state.showList ? this.setState({ showList: false }) : this.setState({ showList: true })}>
            {this.state.showList ? "ADD" : "BACK"}
          </RoundedButton>
        </View>

      </View>
    )
  }


  render() {

    return (

      <ParallaxScrollView
        backgroundColor="#e6fff5"
        contentBackgroundColor="white"
        parallaxHeaderHeight={300}
        renderForeground={() => (
          this.renderHeader()
        )}>

        <View style={[Styles.mainContainer]}>
          {this.renderContent()}

        </View>

      </ParallaxScrollView>



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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
