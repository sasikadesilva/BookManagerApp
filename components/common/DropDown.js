import React,{Component} from 'react'
import {View} from 'react-native'
import DropdownMenu from 'react-native-dropdown-menu';

class DropDown extends Component {

  constructor(props) {
    super(props);
   
  }
  
  render() {
    
    return (
      <View style={{flex: 1}}>
        <View style={{height: 64}} />
        <DropdownMenu
          style={{flex: 1}}
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'green'}
          // arrowImg={}      
          // checkImage={}   
          // optionTextStyle={{color: '#333333'}}
          // titleStyle={{color: '#333333'}} 
          // maxHeight={300} 
          handler={(selection, row) => this.props.handler({text: data[selection][row]})}
          data={this.props.data}
        >

          

        </DropdownMenu>
      </View>
    );
  }
  
}

export {DropDown }