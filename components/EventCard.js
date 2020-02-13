import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { formatDate, getCountdownParts } from '../api';
import EventCounterPart from './EventCounterPart';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 20,
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  date: {
    fontWeight: '200',
    fontSize: 15,
    color: '#bdbdbd',
    width: '30%',
    textAlign: 'right',
  },
  title: {
    fontSize: 15,
    fontWeight: '300',
    marginLeft: 7,
    textAlign: 'left',
  },
  counterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
});

function EventCard({event}) {
  const { days, hours, minutes, seconds } = getCountdownParts(event.date); 

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{formatDate(event.date)} </Text>
        <Text style={styles.title}>{event.title}</Text>
      </View>
      <View style={styles.counterContainer}>
        <EventCounterPart counter={days} label={'DAYS'} />
        <EventCounterPart counter={hours} label={'HOURS'} />
        <EventCounterPart counter={minutes} label={'MINUTES'} />
        <EventCounterPart counter={seconds} label={'SECONDS'} />
      </View>
    </View>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date)
  }),
}

export default EventCard;