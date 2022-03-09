const moment = require('moment-timezone')

let arrayObj = [
  { id: 1, data: '2022-03-06T19:02:03.704Z', _sum: { qtde_passagem_dia: 1542, qtde_infracao_dia: 5 }},
  { id: 2, data: '2022-03-05T19:02:03.704Z', _sum: { qtde_passagem_dia: 12, qtde_infracao_dia: 1} },
  { id: 3, data: '2022-03-04T19:02:03.704Z', _sum: { qtde_passagem_dia: 95654, qtde_infracao_dia: 100 } },
  { id: 4, data: '2022-02-28T19:02:03.704Z', _sum: { qtde_passagem_dia: 100, qtde_infracao_dia: 3 } },
  { id: 5, data: '2022-03-01T19:02:03.704Z', _sum: { qtde_passagem_dia: 1, qtde_infracao_dia: 0 } }
]
module.exports = {
  arrayObj
}

arrayObj = arrayObj.sort((a, b) => {
  if (a.data < b.data) {
    return -1;
  }
  if (a.data > b.data) {
    return 1;
  }
  // a deve ser igual a b
  return 0;
})

let a = moment(arrayObj[0].data).format('YYYY-MM-DD')
let b = moment().format('YYYY-MM-DD')
let c = moment(b).diff(a, 'days')
console.log(c)
