import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDateTime, saveEvent } from './api';

const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  text: {
    height: 40,
    margin: 0,
    marginRight: 7,
    paddingLeft: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    alignSelf: 'stretch',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  borderTop: {
    borderColor: '#edeeef',
    borderTopWidth: 1, 
  }
});

class EventForm extends Component {
  state = {
    title: null,
    date: Date.now(),
    showDatePicker: false,
  }

  handleAddPress = () => {
    saveEvent(this.state)
      .then(() => this.props.navigation.navigate('list'));
  }

  handleChangeTitle = (value) => {
    this.setState({title: value });
  }

  handleDatePress  = () => {
    this.setState({showDatePicker: true });
  }

  handleHideDatePicker = () => {
    this.setState({showDatePicker: false });
  }

  handleDatePicked = (event, date) => {
    date = date || this.state.date;
    this.setState({
      date,
      showDatePicker: Platform.OS === 'ios' ? true : false,
    });
  }

  render() {
    const { title, date, showDatePicker } = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.fieldContainer}>
          <TextInput 
            style={styles.text}
            placeholder="Event title"
            spellCheck={false}
            onChangeText={this.handleChangeTitle}
            value={title} 
          />
          <TextInput 
            style={[styles.text, styles.borderTop]}
            placeholder="Event date"
            spellCheck={false}
            value={formatDateTime(date)}
            editable={!this.state.showDatePicker}
            onFocus={this.handleDatePress}
          />
          {showDatePicker &&
          <DateTimePicker
            mode="datetime"
            onChange={this.handleDatePicked}
            value={date}
          /> }
        </View>
        <TouchableHighlight onPress={this.handleAddPress} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default EventForm;