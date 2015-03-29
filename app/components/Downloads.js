var React = require('react-native');
var Loading = require("./Loading");
var TimerMixin = require("react-timer-mixin");
var prettyBytes = require("pretty-bytes");
var prettySeconds = require("pretty-seconds");
var _ = require("underscore");
var apiClient = require("../ApiClient");

var {
  ListView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
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
          var row = _.pick(item, "id", "name", "percentDone", "rateDownload", "eta", "status");
          row.statusText = this.statusText(row.status);
          return row;
        });

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rows),
          loaded: true
        });
      })
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={styles.listView}
        />
    );
  },

  renderRow(download) {

    var button;
    if (download.statusText === "DOWNLOAD" ) {
      button = <TouchableHighlight onPress={ () => this.stopDownload(download) } style={styles.buttonHighlight}>
        <View style={styles.button}>
          <Image style={styles.buttonImage} source={require("image!ios7-pause")}/>
        </View>
      </TouchableHighlight>
    } else if(download.statusText === "STOPPED") {
      button = <TouchableHighlight onPress={ () => this.startDownload(download) } style={styles.buttonHighlight}>
        <View style={styles.button}>
          <Image style={styles.buttonImage} source={require("image!ios7-play")}/>
        </View>
      </TouchableHighlight>
    }

    return (
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Text style={styles.title}>{download.name}</Text>
          <View style={styles.subtitle}>
            <Text style={styles.status}>{this.statusText(download.status)}</Text>
            <Text style={styles.percentDone}>{(download.percentDone * 100).toFixed(2)}%</Text>
            <Text style={styles.rateDownload}>{prettyBytes(download.rateDownload)}/s</Text>
            <Text style={styles.eta}>{download.eta > 0 ? prettySeconds(download.eta) : "N/A"}</Text>
          </View>
        </View>
        <View style={styles.rowRight}>
          {button}
        </View>

      </View>
    );
  },

  statusText(statusCode) {
    var statuses = {
      0: "STOPPED",  //Torrent is stopped
      1: "CHECK_WAIT", // Queued to check files
      2: "CHECK",  // Checking files
      3: "DOWNLOAD_WAIT",  // Queued to download
      4: "DOWNLOAD",  // Downloading
      5: "SEED_WAIT",  // Queued to seed
      6: "SEED",  // Seeding
      7: "ISOLATED"  // Torrent can't find peers
    };
    return statuses[statusCode];
  },

  startDownload(download) {
    apiClient.get(`downloads/${download.id}/start`)
  },

  stopDownload(download) {
    apiClient.get(`downloads/${download.id}/stop`)
  }

});



var styles = StyleSheet.create({
  row: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10

    //justifyContent: 'center',
    //alignItems: 'center'
  },
  rowLeft: {
    flexDirection: "column",
    width: 50,
    flex: 1
  },
  rowRight: {
    flexDirection: "column",
    width: 44 + 10
  },
  title: {
    marginBottom: 8
  },
  subtitle: {
    flexDirection: 'row'
  },
  status: {
    fontSize: 12,
    marginRight: 10
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
  },
  button: {
    width: 44,
    height: 44,
    backgroundColor: "#292C33",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonHighlight: {
    width: 44,
    height: 44,
    marginLeft: 10,
    borderRadius: 5
  },
  buttonImage: {
    width: 20,
    height: 20
  }
});

module.exports = Downloads;