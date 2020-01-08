import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  counter: {
    width: '25%',
    flex: 1,
  },
  counterText: {
    fontSize: 40,
    textAlign: 'center',
  },
  counterLabel: {
    fontSize: 13,
    fontWeight: '100',
    color: '#a3a3a3',
    textAlign: 'center',
    paddingTop: 0,
  },
});

function EventCounterPart({counter, label}) {
  return (
    <View style={styles.counter}>
      <Text style={styles.counterText}>{counter}</Text>
      <Text style={styles.counterLabel}>{label}</Text>
    </View>
  );
}

EventCounterPart.propTypes = {
  counter: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
}

export default EventCounterPart;

