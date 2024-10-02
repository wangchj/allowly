let entries = [
  {
    "dayDiff": 0,
    "hour": 14,
    "minute": 22,
    "value": 1000,
  },
  {
    "dayDiff": 0,
    "hour": 9,
    "minute": 30,
    "value": -2500,
  },
  {
    "dayDiff": -1,
    "hour": 17,
    "minute": 5,
    "value": 1000,
  },
  {
    "dayDiff": -1,
    "hour": 8,
    "minute": 0,
    "value": -1500,
  },
  {
    "dayDiff": -2,
    "hour": 11,
    "minute": 22,
    "value": 1000,
  },
  {
    "dayDiff": -2,
    "hour": 9,
    "minute": 20,
    "value": 1000,
  },
  {
    "dayDiff": -3,
    "hour": 10,
    "minute": 20,
    "value": -2500,
  },
  {
    "dayDiff": -4,
    "hour": 13,
    "minute": 30,
    "value": -2500,
  },
  {
    "dayDiff": -8,
    "hour": 18,
    "minute": 34,
    "value": 4000,
  },
  {
    "dayDiff": -9,
    "hour": 10,
    "minute": 41,
    "value": -1000,
  },
  {
    "dayDiff": -10,
    "hour": 13,
    "minute": 5,
    "value": -500,
  },
  {
    "dayDiff": -11,
    "hour": 19,
    "minute": 0,
    "value": -1000,
  },
  {
    "dayDiff": -12,
    "hour": 20,
    "minute": 0,
    "value": 2000,
  },
  {
    "dayDiff": -20,
    "hour": 23,
    "minute": 23,
    "value": -500,
  },
  {
    "dayDiff": -30,
    "hour": 20,
    "minute": 14,
    "value": -500,
  },
  {
    "dayDiff": -60,
    "hour": 21,
    "minute": 0,
    "value": 1000,
  },
  {
    "dayDiff": -90,
    "hour": 22,
    "minute": 30,
    "value": -4000,
  },
  {
    "dayDiff": -120,
    "hour": 23,
    "minute": 50,
    "value": 4000,
  },
  {
    "dayDiff": -200,
    "hour": 0,
    "minute": 0,
    "value": -1000,
  },
  {
    "dayDiff": -300,
    "hour": 1,
    "minute": 1,
    "value": 1000,
  },
  {
    "dayDiff": -600,
    "hour": 2,
    "minute": 2,
    "value": 2000,
  }
];

for (let i = entries.length - 1; i >= 0; i--) {
  let entry = entries[i];

  if (i === entries.length -1) {
    entry.total = entry.value;
  }
  else {
    entry.total = entries[i + 1].total + entry.value;
  }

  let date = new Date();
  date.setDate(date.getDate() + entry.dayDiff);
  date.setHours(entry.hour, entry.minute);
  entry.time = date.getTime();

  delete entry.dayDiff;
  delete entry.hour;
  delete entry.minute;
}

console.log(JSON.stringify(entries, null, 2));
