var React = require("react-native");
var {StyleSheet, ActivityIndicatorIOS, View, Text, Animation} = React;

var Loading = React.createClass({

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      if (!prevProps.visible) {
        this.animateIn();
      } else {
        this.animateOut();
      }
    }
  },

  componentDidMount() {
    if (this.props.visible) {
      this.animateIn();
    }
  },

  animateIn() {
    setTimeout(() => {
      Animation.startAnimation(this.refs['this'], 500, 0, 'easeInOutQuad', {opacity: 1});
    }, 0);
  },

  animateOut() {
    setTimeout(() => {
      Animation.startAnimation(this.refs['this'], 500, 0, 'easeInOutQuad', {opacity: 0});
    }, 0);
  },

  render() {
    return (
      <View style={styles.overlay} ref="this">
        <View style={styles.content}>
          <ActivityIndicatorIOS style={styles.spinner} color="#94A1BA"/>
          <Text style={styles.text}>Loading</Text>
        </View>
      </View>
    )
  }

});

var styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    opacity: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: 'center',
    alignItems: "center"
  },
  content: {
    backgroundColor: "#292C33",
    borderRadius: 5,
    alignItems: "center",
    padding: 20
  },
  text: {
    color: "#94A1BA"
  },
  spinner: {
    marginBottom: 10
  }
});

module.exports = Loading;

