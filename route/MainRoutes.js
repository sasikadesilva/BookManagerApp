import React from 'react';
import { Scene, Router, Actions, TabBar } from 'react-native-router-flux';
import auth from '@react-native-firebase/auth';

//scenes
import Login from  '../components/auth/Login'
import Create from  '../components/auth/Create'
import Dashboard from '../components/Dashboard'






const onBackAndroid = () => {
    console.log("here1");
    return false; // Return true to stay, or return false to exit the app.
};
const RouterComponent = () => {


    return (
        <Router
            titleStyle={{
                paddingTop: 10,
                fontSize: 18,
                fontWeight: "bold",
                width: "100%"
            }}
            backAndroidHandler={onBackAndroid}
        >

            <Scene key="root">
            <Scene key="Login" type="reset"  component={Login} initial={ auth().currentUser === null}  hideNavBar={true} />
            <Scene key="Dashboard" type="reset"  component={Dashboard} initial={ auth().currentUser != null}  hideNavBar={true} />
            <Scene key="CreateAcount" component={Create} initial={ false}  hideNavBar={true} />
                {/* <Scene key="LoginVerify" component={LoginVerify} initial={ false}  hideNavBar={true} />

                <Scene key="ChosePolicyType" type="reset" component={ChosePolicyType} initial={store.getState().userReducer.token != null} hideNavBar={true} />
                <Scene key="ChoseVehicleType" component={ChoseVehicleType} initial={false} hideNavBar={true} />
                <Scene key="ChoseVehicleSubSelection" component={ChoseVehicleSubSelection} initial={false} hideNavBar={true} />
                
                <Scene key="OtherDetails" component={OtherDetails} hideNavBar={true} navigationBarStyle={{ elevation: 0, backgroundColor: '#f6f8fc', borderBottomWidth: 0, }}  />
                <Scene key="PaymentOptions" component={PaymentOptions} hideNavBar={true} navigationBarStyle={{ elevation: 0, backgroundColor: '#f6f8fc', borderBottomWidth: 0, }}  />
                <Scene key="RenewalOption" component={RenewalOption} hideNavBar={true} navigationBarStyle={{ elevation: 0, backgroundColor: '#f6f8fc', borderBottomWidth: 0, }}  />
                <Scene key="VerifyOption" component={VerifyOption} hideNavBar={true} navigationBarStyle={{ elevation: 0, backgroundColor: '#f6f8fc', borderBottomWidth: 0, }}  />
                <Scene key="QrCodeGenerator" component={QrCodeGenerator} hideNavBar={true} navigationBarStyle={{ elevation: 0, backgroundColor: '#f6f8fc', borderBottomWidth: 0, }}  />
                <Scene key="RenewalDetails" component={RenewalDetails} hideNavBar={true} navigationBarStyle={{ elevation: 0, backgroundColor: '#f6f8fc', borderBottomWidth: 0, }}  />
               
                <Scene key="PolicyCertificate" component={PolicyCertificate} hideNavBar={true} navigationBarStyle={{ elevation: 0, backgroundColor: '#f6f8fc', borderBottomWidth: 0, }}  />
                <Scene key="CreditCardView" component={CreditCardView} hideNavBar={true} navigationBarStyle={{ elevation: 0, backgroundColor: '#f6f8fc', borderBottomWidth: 0, }}  />
            */}
                
            </Scene>
        </Router>
    )


}

export default RouterComponent;