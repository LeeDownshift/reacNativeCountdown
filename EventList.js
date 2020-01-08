import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import EventCard from './EventCard';
import { getEvents } from './api';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#F3F3F3',
    marginBottom: 100,
  }
});

class EventList extends Component {
  state = {
    events: []
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        events: this.state.events.map(event => ({
          ...event,
          timer: Date.now(),
        }))
      });
    }, 1000);

    this.props.navigation.addListener('didFocus', () => {
      getEvents().then(events => this.setState({ events }));
    });
  }

  listItem(item) {
    return <EventCard event={item} />;
  }

  handleAddEvent = () => {
    this.props.navigation.navigate('form');
  }

  render() {
    return [
      <FlatList
        key="flatlist"
        data={this.state.events}
        renderItem={({ item }) => this.listItem(item)}
        keyExtractor={item => item.id}
        style={styles.list}
      />,
      <ActionButton 
        key="actionbutton"
        onPress={this.handleAddEvent}
        buttonColor="rgba(231, 76, 60,1)"
      />
    ]
  }
}

export default EventList;