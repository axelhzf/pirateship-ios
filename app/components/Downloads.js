var React = require('react-native');
var Loading = require("./Loading");
var TimerMixin = require("react-timer-mixin");
var prettyBytes = require("pretty-bytes");
var prettySeconds = require("pretty-seconds");
var _ = require("underscore");

var {
  ListView,
  StyleSheet,
  Text,
  View
  } = React;

var apiClient = require("../ApiClient");

var Downloads = React.createClass({

  mixins: [TimerMixin],

  statics: {
    title: "Downloads",
    tabIcon: "ios7-cloud-download"
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
    this.fetchData();
    this.setInterval(() => {
      this.fetchData();
    }, 1000);
  },

  fetchData() {
    apiClient.get("downloads")
      .then((response) => {
        var rows = response.map((item) => {
          return _.pick(item, "name", "percentDone", "rateDownload", "eta");
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rows),
          loaded: true
        });
      })
  },

  render() {
    if (!this.state.loaded) {
      return <Loading/>
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={styles.listView}
        />
    );
  },

  renderRow(download) {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>{download.name}</Text>
        <View style={styles.subtitle}>
          <Text style={styles.percentDone}>{(download.percentDone * 100).toFixed(2)}%</Text>
          <Text style={styles.rateDownload}>{prettyBytes(download.rateDownload)}/s</Text>
          <Text style={styles.eta}>{download.eta > 0 ? prettySeconds(download.eta) : "N/A"}</Text>
        </View>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 10
  },
  title: {
    marginBottom: 8
  },
  subtitle: {
    flexDirection: 'row'
  },
  percentDone: {
    fontSize: 12,
    marginRight: 10
  },
  rateDownload: {
    fontSize: 12,
    marginRight: 10
  },
  eta: {
    fontSize: 12
  }
});

module.exports = Downloads;