var React = require('react-native');
var Loading = require("./Loading");

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
  } = React;

var globalStyles = require("../styles/styles");
var Show = require("./Show");
var apiClient = require("../ApiClient");
var EventEmitter = require("component-emitter");

var Shows = React.createClass({

  statics: {
    title: "Tv Shows",
    tabIcon: "ios7-monitor"
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 != row2
      }),
      loaded: false
    }
  },

  componentDidMount() {
    this.eventEmitter = new EventEmitter();
    this.fetchData();
  },

  fetchData() {
    apiClient.get("shows")
      .then((response) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response),
          loaded: true
        });
      });
  },

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderShow}
          style={styles.listView}
          />
        <Loading visible={!this.state.loaded}/>
      </View>
    );
  },

  renderShow(show) {
    return (
      <View>
        <TouchableHighlight onPress={() => this.selectRow(show)}>
          <View style={styles.row}>
            <Image
              source={{uri: show.images.poster.thumb}}
              style={styles.thumbnail}
              />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{show.title}</Text>
              <Text style={styles.rating}>Rating: {show.rating.toFixed(1)}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  },

  selectRow(show) {
    this.props.navigator.push({
      title: show.title,
      component: Show,
      passProps: {show, eventEmitter: this.eventEmitter, tabs: this.props.route.tabs},
    });
  }

});

var styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 10
  },
  rating: {
    marginLeft: 10
  },
  thumbnail: {
    width: 53,
    height: 81
  }
});

module.exports = Shows;