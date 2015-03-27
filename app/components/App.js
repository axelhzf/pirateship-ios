'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  NavigatorIOS,
  Text,
  View
  } = React;

var Movies = React.createClass({
  render() {
    return (
      <View style={styles.content}>
        <Text>Movies</Text>
      </View>
    )
  }
});

var Shows = React.createClass({
  render() {
    return (
      <View style={styles.content}>
        <Text>shows</Text>
      </View>
    )
  }
});

var Downloads = React.createClass({
  render() {
    return (
      <View style={styles.content}>
        <Text>Downloads</Text>
      </View>
    )
  }
});


var Tabs = React.createClass({
  getInitialState() {
    return {
      selectedTab: "movies"
    }
  },

  selectTab(tab) {
    this.setState({
      selectedTab: tab
    });
  },

  render: function () {
    var moviesRoute = {
      component: Movies,
      title: "Movies"
    };

    var tvshowsRoute = {
      component: Shows,
      title: "TvShows"
    };

    var downloadsRoute = {
      component: Downloads,
      title: "Downloads"
    };



    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Movies"
          selected={this.state.selectedTab === "movies"}
          icon={{uri: "ios7-film"}}
          onPress={() => this.selectTab('movies')} >
          <NavigatorIOS initialRoute={moviesRoute} style={styles.container}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="TvShows"
          selected={this.state.selectedTab === "tvshows"}
          icon={{uri: "ios7-monitor"}}
          onPress={() => this.selectTab('tvshows')} >
          <NavigatorIOS initialRoute={tvshowsRoute} style={styles.container}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="TvShows"
          selected={this.state.selectedTab === "downloads"}
          icon={{uri: "ios7-cloud-download"}}
          onPress={() => this.selectTab('downloads')} >
          <NavigatorIOS initialRoute={downloadsRoute} style={styles.container}/>
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
});

var App = React.createClass({
  render: function () {
    return (
      <Tabs/>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

AppRegistry.registerComponent('App', () => App);
