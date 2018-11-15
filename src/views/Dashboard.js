import React, {Component} from 'react';
import {DatePickerIOS, AlertIOS, Animated, Easing, StyleSheet, Text, View} from 'react-native';
import DashboardFooter from '../components/DashboardFooter';
import DashboardHeader from '../components/DashboardHeader';
import axios from 'axios';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      date: new Date(),
      datePickerShow: false,
      left: new Animated.Value(0)
    };
  }

  componentDidMount() {
    axios.get('http://localhost:44444/test').then(data => {
      this.setState({
        data: data.data
      });
    });
  }

  actionAnimate() {
    Animated.timing(
      this.state.left,
      {
        toValue: 100,
        easing: Easing.quad,
        duration: 5000,
      }
    ).start();
  }

  actionAlert() {
    AlertIOS.alert(
     'alert',
     'Hello World.'
    );
  }

  actionDatePicker() {
    this.setState({
      datePickerShow: true
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <DashboardHeader />
        <View style={styles.content}>
        <Text style={styles.welcome}>{this.state.data}</Text>
          <Text style={styles.welcome} onPress={this.actionAnimate.bind(this)}>Animate</Text>
          <Text style={styles.welcome} onPress={this.actionAlert.bind(this)}>Alert</Text>
          <Text style={styles.welcome} onPress={this.actionDatePicker.bind(this)}>DatePicker</Text>
        </View>
        { this.state.datePickerShow ?
          <View>
            <DatePickerIOS date={this.state.date} />
          </View>
        : null }
        <Animated.View style={{
          position: 'absolute',
          zIndex: 1,
          top: 100,
          width: 100,
          height: 50,
          backgroundColor: 'red',
          left: this.state.left.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
        }}>
          <Text>Animated</Text>
        </Animated.View>
        <DashboardFooter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000'
  }
});

export default Dashboard
