var React = require("react-native");
var apiClient = require("../ApiClient");
var Loading = require("./Loading");
var TimerMixin = require('react-timer-mixin');
var {
  View,
  Text,
  ListView,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  ActivityIndicatorIOS
  } = React;

var Search = React.createClass({

  mixins: [TimerMixin],

  statics: {
    title: "Search",
    tabIcon: "ios7-film"
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 != row2
      }),
      isLoading: false
    }
  },

  searchTorrents(query) {
    if (query.trim().length === 0) {
      return;
    }

    var url = `torrents?query=${encodeURIComponent(query)}`;
    this.setState({isLoading: true});
    apiClient.get(url)
      .then((response) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response),
          isLoading: false
        });
      })
  },

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          onSearchChange={this.onSearchChange}
          isLoading={this.state.isLoading}
          onFocus={() => this.refs.listview.getScrollResponder().scrollTo(0, 0)}
          />
        <View style={styles.separator}/>
        <ListView
          ref="listview"
          dataSource={this.state.dataSource}
          renderRow={this.renderTorrent}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="onDrag"
          keyboardShouldPersistTaps={true}
          />
      </View>
    );
  },

  renderTorrent(torrent) {
    return (
      <View>
        <TouchableHighlight onPress={() => this.selectRow(torrent)}>
          <View style={styles.row}>
            <Text style={styles.title}>{torrent.title}</Text>
            <Text style={styles.info}>{torrent.seeds} / {torrent.leechers}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },

  selectRow(torrent) {
    var url = `torrents/download/${encodeURIComponent(torrent.link)}`;
    apiClient.get(url)
      .then(() => {
        // improve navigation using events?
        this.props.route.tabs.selectTab("Downloads");
      })
      .catch((e) => {
        console.error("error", e)
      })
  },

  onSearchChange(event) {
    var query = event.nativeEvent.text.toLowerCase();
    this.clearTimeout(this.timeoutID);
    this.timeoutID = this.setTimeout(() => this.searchTorrents(query), 100);
  }

});

var SearchBar = React.createClass({
  render: function () {
    return (
      <View style={styles.searchBar}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChange={this.props.onSearchChange}
          placeholder="Search a torrent..."
          onFocus={this.props.onFocus}
          style={styles.searchBarInput}
          />
        <ActivityIndicatorIOS
          animating={this.props.isLoading}
          style={styles.spinner}
          />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 5
  },
  title: {
    fontSize: 15,
    marginBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    flex: 1
  },
  info: {
    fontSize: 12,
    paddingLeft: 8,
    paddingRight: 8
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee'
  },
  searchBar: {
    marginTop: 64,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: 30
  },
  spinner: {
    width: 30
  }
});

module.exports = Search;