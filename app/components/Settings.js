var React = require('react-native');
var {
  View,
  Text,
  SwitchIOS,
  ScrollView,
  AsyncStorage,
  PushNotificationIOS
  } = React;

const STORAGE_KEY = "SettingsState";

var Settings = React.createClass({
  statics: {
    title: "Settings",
    tabIcon: "ios7-monitor"
  },
  getInitialState() {
    return {notificationsEnabled: false}
  },

  componentDidMount() {
    AsyncStorage.getItem(STORAGE_KEY, (error, value) => {
      if (!error && value !== null) {
        this.setState(JSON.parse(value));
      }
    })
  },

  onSwitchChange(value) {
    this.setState({notificationsEnabled: value});

    if (value) {
      PushNotificationIOS.requestPermissions();
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state), (error) => {
      if (error) {
        console.log("error saving to async storage", error);
      }
    });
  },

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.label}>Notificaciones</Text>
          <SwitchIOS
            style={styles.switch}
            onValueChange={(value) => this.onSwitchChange(value)}
            style={{marginBottom: 10}}
            value={this.state.notificationsEnabled}/>
        </View>
      </ScrollView>
    )
  }
});

var styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  label: {
    flex: 1
  },
  switch: {}
};

module.exports = Settings;