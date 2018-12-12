import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Vibration, ScrollView } from 'react-native';
import { Constants } from 'expo';

class Counter extends Component {
  state = {
	buttonState: 'Start',
	breakState:  'Break',
	count:        0,
	studyTime:    0,     // time for current study session
	breakTime:    0,     // time for current break
	secondCount:  0,
	minuteCount:  0,
	hourCount:    0,
	secondCountB: 0,
	minuteCountB: 0,
	hourCountB:   0,
	studyAmount:  1800, // time studying before alert
	breakAmount:  1200, // time on break before alert
	breakTimes:   [],
	studyTimes:   [],
	startTime:    {},
	stopTime:     {},
  }
  
  incrementCount = () => {	  
	if(this.state.breakState === 'Break') {
	  if(this.state.secondCount < 59)
	    this.setState(prevState => ({count: prevState.count + 1, secondCount: prevState.secondCount + 1}));
	  else {
	    if(this.state.minuteCount < 59)
	      this.setState(prevState => ({count: prevState.count + 1, secondCount: 0, minuteCount: prevState.minuteCount + 1}));
	    else
		  this.setState(prevState => ({count: prevState.count + 1, secondCount: 0, minuteCount: 0, hourCount: prevState.hourCount + 1}));
	  }
	  this.setState(prevState => ({studyTime: prevState.studyTime + 1}));
	  if(this.state.studyTime === this.state.studyAmount)
		  Vibration.vibrate();
	}
	else {
	  if(this.state.secondCount < 59)
	    this.setState(prevState => ({count: prevState.count + 1, secondCountB: prevState.secondCountB + 1}));
	  else {
	    if(this.state.minuteCount < 59)
	      this.setState(prevState => ({count: prevState.count + 1, secondCountB: 0, minuteCountB: prevState.minuteCountB + 1}));
	    else
		  this.setState(prevState => ({count: prevState.count + 1, secondCountB: 0, minuteCountB: 0, hourCountB: prevState.hourCountB + 1}));
	  }
	  this.setState(prevState => ({breakTime: prevState.breakTime + 1}));
	  if(this.state.breakTime === this.state.breakAmount)
		  Vibration.vibrate();
	}	
  }
  
  startStop = () => {
	if(this.state.buttonState === 'Start') {
	  this.timer = setInterval(this.incrementCount, 1000);
	  if(this.state.count <= 0)
        this.setState({buttonState: 'Stop', startTime: new Date(), stopTime: {}});
	  else
		this.setState({buttonState: 'Stop', stopTime: {}});
	}
	else {
	  clearInterval(this.timer);
	  this.setState({buttonState: 'Start', stopTime: new Date()});
	}
  }
  
  resetTimer = () => {
	this.setState({count: 0, hourCount: 0, minuteCount: 0, secondCount: 0, hourCountB: 0, minuteCountB: 0, secondCountB: 0, breakTimes: [], studyTimes: [], startTime: {}, stopTime: {}});
  }
  
  breakSwitch = () => {
	if(this.state.breakState === 'Break') {
      this.setState(prevState => ({breakState: 'Study', studyCount: prevState.studyCount + 1, studyTime: 0, studyTimes: [...prevState.studyTimes, prevState.studyTime]}));
	}
	else {
	  this.setState(prevState => ({breakState: 'Break', breakCount: prevState.breakCount + 1, breakTime: 0, breakTimes: [...prevState.breakTimes, prevState.breakTime]}));
	}
  }
  
  render() {
    return (
	  <View style={styles.container}>
		{(this.state.buttonState === 'Stop') &&
		  <Button title = {this.state.breakState} onPress = {this.breakSwitch}/>}
	    {(this.state.buttonState === 'Start' && this.state.count > 0) &&
		  <Button title = 'Reset' onPress = {this.resetTimer}/>}
	    <Text style={styles.textm}>{'Study Time Total: ' + ((this.state.hourCount < 10) ? '0' : '') + this.state.hourCount
	      + ":" + ((this.state.minuteCount < 10) ? '0' : '') + this.state.minuteCount
	      + ":" + ((this.state.secondCount < 10) ? '0' : '') + this.state.secondCount}</Text>
		<Text style={styles.textm}>{'Break Time Total: ' + ((this.state.hourCountB < 10) ? '0' : '') + this.state.hourCountB
	      + ":" + ((this.state.minuteCountB < 10) ? '0' : '') + this.state.minuteCountB
	      + ":" + ((this.state.secondCountB < 10) ? '0' : '') + this.state.secondCountB}</Text>
		<Button title = {this.state.buttonState} onPress = {this.startStop}/>
		{(this.state.count > 0) &&
		  <Text>{'Started at: ' + ((this.state.startTime.getHours() < 10) ? '0' : '') + this.state.startTime.getHours()
		    + ':' + ((this.state.startTime.getMinutes() < 10) ? '0' : '') + this.state.startTime.getMinutes() 
			+ ':' + ((this.state.startTime.getSeconds() < 10) ? '0' : '') + this.state.startTime.getSeconds()}</Text>}
		{(this.state.buttonState === 'Start' && this.state.count > 0) &&
		  <Text>{'Stopped at: ' + ((this.state.stopTime.getHours() < 10) ? '0' : '') + this.state.stopTime.getHours() 
		    + ':' + ((this.state.stopTime.getMinutes() < 10) ? '0' : '') + this.state.stopTime.getMinutes() 
			+ ':' + ((this.state.stopTime.getSeconds() < 10) ? '0' : '') + this.state.stopTime.getSeconds()}</Text>}
			
		<View style={styles.container2}>
		  {(this.state.studyTimes.length > 0) && 
		    <ScrollView style={styles.scrollv}>{this.state.studyTimes.map(time => 
		      <Text style={styles.row2}>{'Study Time: ' + ((time/3600 < 10) ? '0' : '') + Math.floor(time/3600) 
			    + ':' + ((time/60 < 10) ? '0' : '') + Math.floor(time/60) 
				+ ':' + ((time < 10) ? '0' : '') + time}</Text>)}
		    </ScrollView>}
		  {(this.state.breakTimes.length > 0) && 
		    <ScrollView style={styles.scrollv2}>{this.state.breakTimes.map(time => 
		      <Text style={styles.row}>{'Break Time: ' + ((time/3600 < 10) ? '0' : '') + Math.floor(time/3600) 
			    + ':' + ((time/60 < 10) ? '0' : '') + Math.floor(time/60) 
				+ ':' + ((time < 10) ? '0' : '') + time}</Text>)}
		    </ScrollView>}
		</View>
	  </View>
	);
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Counter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
	flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  textm: {
	fontSize: 22,
	fontWeight: 'bold',
  },
  row: {
	color: 'orangered',
    flex: 1,
    padding: 10,
  },
  row2: {
	color: 'green',
    flex: 1,
    padding: 10,
  },
  scrollv: { },
  scrollv2: { },
  me: {
    fontSize: 20,
  }
});
