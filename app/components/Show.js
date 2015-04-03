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

var Movie = require("./Movie");
var apiClient = require("../ApiClient");
var EventEmitter = require("component-emitter");

var Show = React.createClass({

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 != row2,
        sectionHeaderHasChanged: (row1, row2) => row1 != row2
      }),
      loaded: false
    }
  },

  componentDidMount() {
    this.eventEmitter = new EventEmitter();
    this.fetchData();
  },

  fetchData() {
    var show = this.props.show;

    apiClient.get(`shows/${show.ids.imdb}`).then((response) => {

      var dataBlob = {};
      var sectionIds = [];
      var rowsIds = [];

      var seasons = response.seasons.reverse();

      seasons.forEach((season, index) => {
        var sectionName = `Season ${season.number}`;
        sectionIds.push(sectionName);
        dataBlob[sectionName] = {};

        rowsIds[index] = [];

        season.episodes.forEach((episode) => {
          var rowName = `episode-S${episode.season}E${episode.number}`;
          rowsIds[index].push(rowName);

          dataBlob[sectionName][rowName] = episode;
        });

      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIds, rowsIds),
        loaded: true
      });

    });
  },

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
          style={styles.listView}
          />
        <Loading visible={!this.state.loaded}/>
      </View>
    );
  },

  renderSectionHeader: function (sectionData, sectionId) {
    return (
      <View style={styles.section}>
        <Text style={styles.text}>
          {sectionId}
        </Text>
      </View>
    );
  },

  renderRow(rowData) {
    var episode = rowData;
    return (
      <View>
        <TouchableHighlight onPress={() => this.selectRow(episode)}>
          <View style={styles.row}>
            <Text style={styles.title}>S{episode.season}E{episode.number} - {episode.title}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },

  selectRow(episode) {

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
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 6,
    backgroundColor: '#5890ff'
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

module.exports = Show;