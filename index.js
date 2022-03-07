const moment = require('moment-timezone')

function Media(array) {
  let data = ChangeDate(array)
  data = data.sort(sortDate)
  let diffDays = DiffDays(data)
  const total = ReduceTotal(data) //qtde_passagem_dia
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
function ReduceTotal(array) {
  const passagens = []
  for (const obj of array) {
    passagens.push(obj.qtde_passagem_dia)
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

function DiffDays(arrayObj) {
  let a = moment(arrayObj[0].data).format('YYYY-MM-DD')
  let b = moment().format('YYYY-MM-DD')
  let c = moment(b).diff(a, 'days')
  return c
}


module.exports = {
  Media,
  ChangeDate,
  getMedia,
  ReduceTotal,
  sortDate,
  DiffDays
}
