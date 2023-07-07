import { Duration } from 'luxon';
const { DateTime } = require('luxon');

export const getDiffTime = (was: Date, now: Date, type: 'seconds' | null = null) => {
  const momentWas = DateTime.fromJSDate(was);
  const momentNow = DateTime.fromJSDate(now);

  const diff: Duration = momentNow.diff(momentWas, type === 'seconds' ? 'seconds' : ['days', 'hours', 'minutes'])
  return diff.toObject();
}
