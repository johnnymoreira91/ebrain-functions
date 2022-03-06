const { ChangeDate, ReduceTotal, Media } = require('../index')

let array = [
  { id: 1, data: '2022-03-06T19:02:03.704Z', qtde_passagem_dia: 1542 },
  { id: 2, data: '2022-03-05T19:02:03.704Z', qtde_passagem_dia: 12 },
  { id: 3, data: '2022-03-04T19:02:03.704Z', qtde_passagem_dia: 95654 },
  { id: 4, data: '2022-02-28T19:02:03.704Z', qtde_passagem_dia: 100 },
  { id: 5, data: '2022-03-01T19:02:03.704Z', qtde_passagem_dia: 1 }
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
    let total = ReduceTotal(array)
    expect(total).toBe(97309)
  });

  test('Should Reduce qtde_passagem_dia', () => {
    expect(Media(array)).toBe(16218.17)
  });
});