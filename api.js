import moment from 'moment';
import Constants from 'expo-constants';
import uuid from 'uuid';

const { manifest } = Constants;
const api = manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(':').shift().concat(':3000')
  : 'productionurl.com';

const url = `http://${api}/events`;

const date = (date) => {
  return new Date(date);
}

export function getEvents() {
  return fetch(url)
    .then(response => response.json())
    .then(events => events.map(event => ({
      ...event,
      date: new Date(event.date)
    })
  ));
}

export function saveEvent({title, date}) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      title,
      date,
      id: uuid(),
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
  .then(res => res.json())
  .catch(err => console.error(err));
}

export function formatDateTime(dateString) {
  const parsed = moment(date(dateString));
  if (!parsed.isValid()) dateString;
  return parsed.format('H:MM on D MMM YYYY');
}

export function formatDate(dateString) {
  const parsed = moment(date(dateString));
  if (!parsed.isValid()) dateString;
  return parsed.format('D MMM YYYY');
}

export function getCountdownParts(eventDate) {
  const duration = moment.duration(moment(date(eventDate)).diff(new Date()));

  return {
    days: parseInt(duration.as('days')),
    hours: duration.get('hours'),
    minutes: duration.get('minutes'),
    seconds: duration.get('seconds'),
  };
}