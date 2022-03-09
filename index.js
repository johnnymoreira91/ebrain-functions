const moment = require('moment-timezone')

function MediaDay (array) {
  let data = ChangeDate(array)
  data = data.sort(sortDate)
  let diffDays = DiffDays(data)
  const dateArray = []
  let mapDates = data.map(obj => obj.data)
  mapDates = [...new Set(mapDates)]
  for (const date of mapDates) {
    let filterDay = data.filter(obj => obj.data === date)
    const total = ReduceTotalPassagens(filterDay)
    let media = getMedia(diffDays, total)
    media = Math.round(media * 100) / 100
    let result = {
      diff: diffDays,
      date: date,
      total_passagens: total,
      media_passagens: media
    }
    dateArray.push(result)
  }
  return dateArray
}


function Media(array) {
  let data = ChangeDate(array)
  data = data.sort(sortDate)
  let diffDays = DiffDays(data)
  const total = ReduceTotalPassagens(data) //qtde_passagem_dia
  let media = getMedia(diffDays, total)
  media = Math.round(media * 100) / 100
  let result = {
    diff: diffDays,
    total_passagens: total,
    media_passagens: media
  }
  return result
}

// qtde_passagem_dia
function ReduceTotalPassagens(array) {
  const passagens = []
  for (const obj of array) {
    passagens.push(obj._sum.qtde_passagem_dia)
  }
  const reduceArray = passagens.reduce((total, currentElement) => total + currentElement)
  return reduceArray
}

function ReduceTotalInfracao(array) {
  const passagens = []
  for (const obj of array) {
    passagens.push(obj._sum.qtde_infracao_dia)
  }
  const reduceArray = passagens.reduce((total, currentElement) => total + currentElement)
  return reduceArray
}

function getMedia(total, value) {
  const media = value / total
  return media
}

function ChangeDate(array) {
  const data = array
  const alteredData = []
  for (const obj of data) {
    obj.data = moment(obj.data).tz('Europe/Lisbon').format('YYYY-MM-DD')
    alteredData.push(obj)
  }
  return alteredData
}

function sortDate(a, b) {
  if (a.data < b.data) {
    return -1;
  }
  // if (a.data > b.data) {
  //   return 1;
  // }
  return 0;
}

function calcDate(date1, date2) {
  const past_date = new Date(date1);
  const current_date = date2 ? new Date(date2) : new Date();

  const diff = Math.floor(current_date.getTime() - past_date.getTime());
  const day = 1000 * 60 * 60 * 24;

  const days = Math.ceil(diff / day);
  const months = Math.ceil(days / 31);
  const years = Math.ceil(months / 12);

  return { days, months, years };
}

function DiffDays(arrayObj) {
  let a = moment(arrayObj[0].data).format('YYYY-MM-DD')
  let b = moment('2022-03-06').format('YYYY-MM-DD')
  let c = moment(b).diff(a, 'days')
  return c
}


module.exports = {
  Media,
  ChangeDate,
  getMedia,
  ReduceTotalPassagens,
  ReduceTotalInfracao,
  sortDate,
  DiffDays,
  MediaDay,
  calcDate
}
