import {StyleSheet} from 'react-native'

 const Styles = StyleSheet.create({

    mainContainer : {
        marginTop : 50,
        marginRight : 20,
        marginLeft : 20,
        marginBottom : 20,
       
    },
    menuItem: {
        marginTop : 15,
        marginBottom : 10,
        width: "100%",
        paddingTop: 10,
        paddingBottom : 10,
        paddingRight : 10,
        paddingLeft : 10,
        borderRadius: 4,
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderWidth: 0.7,
        borderColor: "#9fafdb",
        shadowColor: "#072c4fb3",
      
        shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 3,

    },

})


export { Styles }