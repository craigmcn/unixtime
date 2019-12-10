import chrono from 'chrono-node'
import moment from 'moment'
import 'moment-timezone'

import autocomplete from './autocomplete'
import getParameterByName from './getParameterByName'
import addAlert, { removeAlert } from './addAlert'

import '../styles/index.scss'

const initCurrentTime = new Event('submit', { cancelable: true })

const converter = document.getElementById('converter')
converter.addEventListener('submit', e => {
  e.preventDefault()
  const form = e.target,
    button = document.getElementById('converter-submit'),
    submitTime = document.getElementById('time').value,
    submitTimezone = document.getElementById('timezone').value,
    submitTimezoneSelect = document.getElementById('timezone_select').value
  let time,
    timezone,
    momentDate,
    chronoTime,
    error,
    warning,
    title = 'Converted time'
  form.disabled = button.disabled = true
  if (submitTime) {
    time = submitTime
  } else if (getParameterByName('time')) {
    time = getParameterByName('time')
  } else {
    var d = new Date()
    time = Math.round(d.getTime() / 1000)
    title = 'Current time'
  }
  if (submitTimezone) {
    timezone = submitTimezone
  } else if (submitTimezoneSelect) {
    timezone = submitTimezoneSelect
  } else if (getParameterByName('timezone')) {
    timezone = getParameterByName('timezone')
  }

  if (!timezone || !moment.tz.zone(timezone)) {
    warning = timezone ? 'Invalid timezone provided. Switched to UTC.' : ''
    timezone = 'UTC'
  }
  if (isNaN(parseFloat(time))) {
    chronoTime = chrono.parse(time)
    if (chronoTime[0]) {
      const nowRegex = /^[now\(\)\;?]+$/i // for `now()` no offset calculation is required
      if (!time.match(nowRegex)) chronoTime[0].start.assign('timezoneOffset', 0)
      momentDate = moment(chronoTime[0].start.date())
      if (timezone !== 'UTC') {
        const timezoneOffset = moment.tz.zone(timezone).parse(Date.UTC(chronoTime[0].start.get('year'), chronoTime[0].start.get('month'), chronoTime[0].start.get('day'), chronoTime[0].start.get('hour'), chronoTime[0].start.get('minute'), chronoTime[0].start.get('second')))
        if (!time.match(nowRegex)) {
          momentDate = moment.unix(momentDate.unix() + (timezoneOffset * 60))
        }
      }
    } else {
      error = 'Invalid time provided'
    }
  } else {
    momentDate = moment.unix(parseFloat(time))
  }

  if (error) {
    addAlert(
      document.getElementById('results'),
      'results-error',
      'error',
      error
    )
  } else {
    if (warning) {
      addAlert(
        document.getElementById('results'),
        'results-error',
        'warning',
        warning
      )
    } else {
      removeAlert('results-error')
    }
    document.getElementById('results-title').innerHTML = title
    document.getElementById('results-timestamp').innerHTML = momentDate.unix()
    document.getElementById(
      'results-utc'
    ).innerHTML = `${momentDate
      .utc()
      .format('dddd, MMMM D YYYY h:mm:ss a z')}<br>${momentDate
        .utc()
        .format('YYYY-MM-DD HH:mm:ss z')}`
    document.getElementById('results-timezone-name').innerHTML = moment.tz.zone(
      timezone
    )
      ? moment.tz.zone(timezone).name
      : 'UTC'
    document.getElementById('results-timezone').innerHTML = `${momentDate
      .tz(timezone)
      .format('dddd, MMMM D YYYY h:mm:ss a z')}<br>${momentDate.format(
        'YYYY-MM-DD HH:mm:ss z'
      )}`
    if (timezone === 'UTC') {
      document.getElementById(
        'results-timezone-name'
      ).style.display = document.getElementById(
        'results-timezone'
      ).style.display = 'none'
    } else {
      document.getElementById(
        'results-timezone-name'
      ).style.display = document.getElementById(
        'results-timezone'
      ).style.display = 'block'
    }
    document.getElementById('results-iso8601').innerHTML = momentDate.format(
      'YYYY-MM-DDTHH:mm:ssZZ'
    )
    document.getElementById('results-rfc2822').innerHTML = momentDate.format(
      'ddd, DD MMM YYYY HH:mm:ss ZZ'
    )
    document
      .getElementById('results-links-web')
      .setAttribute(
        'href',
        `https://www.craigmcn.com/unixtime/?time=${time}&timezone=${timezone ||
        ''}`
      )
  }

  form.disabled = button.disabled = false
  document.getElementById('timezone').value = ''
  form.reset()
  return false
})

converter.dispatchEvent(initCurrentTime)
