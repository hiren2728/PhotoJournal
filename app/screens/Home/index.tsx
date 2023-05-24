import React from 'react';
import {SafeAreaView,useWindowDimensions} from 'react-native';

// Third Party Library
import {TabView} from 'react-native-tab-view';
import {StackNavigationProp} from "@react-navigation/stack";

// Components
import HomeCustomTab from "../../component/HomeCustomTab";
import FeedList from "./component/FeedList";
import Summary from "./component/Summary";

// Utility
import CommonStyle from "../../utility/CommonStyle";
import Routes from "../../navigation/Routes";

interface Props {
  navigation : StackNavigationProp<any,any>,
}

/*
* render the Feed List and Summary of records.
* */
const Home = (props: Props) => {

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'feedList'},
    { key: 'summary'},
  ]);

  const btnPlusClick = () => {
    props.navigation.navigate(Routes.CapturePhoto)
  };

  const renderScene = (data : any) => {
    switch (data.route.key) {
      case 'feedList':
        return <FeedList navigation={props.navigation}/>;
      case 'summary':
        return <Summary navigation={props.navigation}/>;
      default:
        return null;
    }
  };

  return (
      <SafeAreaView style={CommonStyle.SafeAreaView}>
        <TabView onIndexChange={setIndex}
                 renderTabBar={props => <HomeCustomTab {...props} onPlusClick={btnPlusClick}/>}
                 navigationState={{index, routes}}
                 renderScene={renderScene}
                 tabBarPosition={"bottom"}
                 initialLayout={{width: layout.width}}/>
      </SafeAreaView>
  )
};

export default Home
