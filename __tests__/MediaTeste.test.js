const { ChangeDate, ReduceTotalPassagens, ReduceTotalInfracao, Media, MediaDay, calcDate, sortDate } = require('../index')

let array = [
  { id: 1, data: '2022-03-06T19:02:03.704Z', _sum: { qtde_passagem_dia: 1542, qtde_infracao_dia: 5 }},
  { id: 2, data: '2022-03-05T19:02:03.704Z', _sum: { qtde_passagem_dia: 12, qtde_infracao_dia: 1} },
  { id: 3, data: '2022-03-04T19:02:03.704Z', _sum: { qtde_passagem_dia: 95654, qtde_infracao_dia: 100 } },
  { id: 4, data: '2022-02-28T19:02:03.704Z', _sum: { qtde_passagem_dia: 100, qtde_infracao_dia: 3 } },
  { id: 5, data: '2022-03-01T19:02:03.704Z', _sum: { qtde_passagem_dia: 1, qtde_infracao_dia: 0 } }
]

describe('my beverage', () => {
  test('Should convert date', () => {
    let arrayDate = [{
      id: 1,
      data: '2022-03-06T19:02:03.704Z'
    }]
    arrayDate = ChangeDate(arrayDate)
    expect(arrayDate[0].data).toBe('2022-03-06')
  });

  test('Should Reduce qtde_passagem_dia', () => {
    let total = ReduceTotalPassagens(array)
    expect(total).toBe(97309)
  });

  test('Should Reduce qtde_passagem_dia and diff', () => {
    expect(Media(array).media_passagens).toBe(16218.17)
    expect(Media(array).diff).toBe(6)
  });

  test('Should Reduce qtde_infracao_dia', () => {
    let infracaoDia = ReduceTotalInfracao(array)
    expect(infracaoDia).toBe(109)
    expect(Media(array).diff).toBe(6)
  });

  test('Should get diff', () => {
    let changeDate = ChangeDate(array)
    changeDate = changeDate.sort(sortDate)
    let dates = []
    for (let obj of changeDate) {
      dates.push(obj.data)
    }
    let allDates = calcDate(dates[0], dates[4])
    expect(allDates.days).toBe(6)
  });

  test('Should get MediaDay', () => {
    array.push({
      id: 6,
      data: '2022-02-28T19:02:03.704Z',
      _sum: {
        qtde_passagem_dia: 1,
        qtde_infracao_dia: 0
      }
    })
    let arrayOfData = MediaDay(array)
    expect(arrayOfData[0].media_passagens).toBe(16.83)
    expect(arrayOfData[0].diff).toBe(6)
  });
});