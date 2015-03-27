var React = require('react-native');
var { TabBarIOS, NavigatorIOS } = React;

var styles = require("../styles/styles");
var Movies = require("./Movies");
var Shows = require("./Shows");
var Downloads = require("./Downloads");

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
          onPress={() => this.selectTab('movies')}>
          <NavigatorIOS initialRoute={moviesRoute} style={styles.container}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="TvShows"
          selected={this.state.selectedTab === "tvshows"}
          icon={{uri: "ios7-monitor"}}
          onPress={() => this.selectTab('tvshows')}>
          <NavigatorIOS initialRoute={tvshowsRoute} style={styles.container}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="TvShows"
          selected={this.state.selectedTab === "downloads"}
          icon={{uri: "ios7-cloud-download"}}
          onPress={() => this.selectTab('downloads')}>
          <NavigatorIOS initialRoute={downloadsRoute} style={styles.container}/>
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
});

module.exports = Tabs;