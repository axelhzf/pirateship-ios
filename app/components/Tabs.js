var React = require('react-native');
var { TabBarIOS, NavigatorIOS } = React;

var styles = require("../styles/styles");
var Movies = require("./Movies");
var Shows = require("./Shows");
var Downloads = require("./Downloads");
var Search = require("./Search");

var Tabs = React.createClass({
  getInitialState() {
    return {
      selectedTab: Movies.title
    }
  },

  selectTab(tab) {
    this.setState({
      selectedTab: tab
    });
  },

  render: function () {
    var components = [Movies, Shows, Search, Downloads];

    var tabs = components.map((component) => {
      var initialRoute = {
        component,
        title: component.title,
        tabs : this
      };
      return (
        <TabBarIOS.Item
          title={component.title}
          selected={this.state.selectedTab === component.title}
          icon={{uri: component.tabIcon}}
          onPress={() => this.selectTab(component.title)}>
          <NavigatorIOS initialRoute={initialRoute} style={styles.container}/>
        </TabBarIOS.Item>
      )
    });

    return (
      <TabBarIOS>{tabs}</TabBarIOS>
    )
  }
});

module.exports = Tabs;