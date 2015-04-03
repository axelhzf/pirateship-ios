var React = require("react-native");

var {View, Text, ScrollView, Image, TouchableHighlight, LinkingIOS} = React;
var apiClient = require("../ApiClient");
var Loading = require("./Loading");

var Movie = React.createClass({

  getInitialState() {
    return {
      loading: false
    }
  },

  componentDidMount() {
    if (this.props.eventEmitter) {
      this.props.eventEmitter.on("right-button", this.onPressRightButton);
    }
  },

  componentWillUnmount() {
    if (this.props.eventEmitter) {
      this.props.eventEmitter.off("right-button", this.onPressRightButton);
    }
  },

  onPressRightButton(event) {
    this.setState({loading: true});
    apiClient.get(`torrents?query=${encodeURIComponent(this.props.movie.title)}`)
      .then((torrents) => {
        var link = torrents[0].link;
        return apiClient.get(`torrents/download/${encodeURIComponent(link)}`)
      })
      .then(() => {
        this.setState({loading: false});
        this.props.tabs.selectTab("Downloads");
      })
      .catch(() => {
        this.setState({loading: false});
        console.error("error", e);
      });
  },

  openTrailer() {
    var movie = this.props.movie;
    LinkingIOS.openURL(movie.trailer);
  },

  render() {
    var movie = this.props.movie;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: movie.images.fanart.medium}}></Image>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.subtitle}>Year: {movie.year}, Rating: {movie.rating.toFixed(1)}</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
          <TouchableHighlight style={styles.buttonHighlight} onPress={() => this.openTrailer()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Trailer</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Loading visible={this.state.loading}/>
      </ScrollView>
    )
  }

});

var styles = {
  container: {
    flex: 1
  },
  image: {
    height: 150,
    flex: 1
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  subtitle: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  overview: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  buttonHighlight: {
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: "#007AFF",
    borderWidth: 1,
    backgroundColor: "#ffffff"
  },
  buttonText: {
    flex: 1,
    textAlign: "center"
  }
};

module.exports = Movie;
