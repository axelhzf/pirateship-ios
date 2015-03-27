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
var Movie = require("./Movie");


var API_URL = 'http://imac:3000/api/movies';

var Movies = React.createClass({

  statics : {
    title: "Movies",
    tabIcon: "ios7-film"
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 != row
      }),
      loaded: false
    }
  },

  componentDidMount() {
    this.fetchData();
  },

  fetchData() {
    this.setState(this.getInitialState());

    fetch(API_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true
        });
      })
      .done();
  },

  render() {
    if (!this.state.loaded) {
      return <Loading/>
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
        />
    );
  },

  renderMovie(movie) {
    return (
      <View>
        <TouchableHighlight onPress={() => this.selectMovie(movie)}>
          <View style={styles.row}>
            <Image
              source={{uri: movie.images.poster.thumb}}
              style={styles.thumbnail}
              />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.year}>{movie.year}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  },

  selectMovie(movie) {
    this.props.navigator.push({
      title: movie.title,
      component: Movie,
      passProps: {movie}
    });
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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
  year: {
    marginLeft: 10
  },
  thumbnail: {
    width: 53,
    height: 81
  }
});

module.exports = Movies;



module.exports = Movies;