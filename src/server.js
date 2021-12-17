const TEST_NAMES = [
  'Petar',
  'Milko',
  'Anna',
  'Dimitar',
  'Zhenya',
  'Angel',
  'Vasko',
  'Iliyan',
  'Ivan',
  'Georgi',
];

const STATUSES = ['paid', 'canceled', 'invoiced', 'pending', 'new-account'];
const PAYMENT_TYPES = ['credit card', 'debit card', 'tokens'];
const BOOLEANS = [true, false];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const randomSelect = (amount, array) => {
  const chooser = randomNoRepeats(array);
  let result = [];
  for (let i = 0; i < amount; i++) {
    result.push(chooser());
  }
  return result;
};

function randomNoRepeats(array) {
  var copy = array.slice(0);
  return function () {
    if (copy.length < 1) {
      copy = array.slice(0);
    }
    var index = Math.floor(Math.random() * copy.length);
    var item = copy[index];
    copy.splice(index, 1);
    return item;
  };
}

export const fetchMockData = async () => {
  let mockData = createMockData(20);
  await sleep(5000);
  return mockData;
};

const createMockData = (amount) => {
  const result = [];
  for (let i = 0; i < amount; i++) {
    result.push({
      id: `id_${Math.random().toString(36).substr(2, 9)}`,
      orderId: Math.random().toString(36).substr(2, 9),
      name: TEST_NAMES[Math.floor(Math.random() * TEST_NAMES.length)],
      amount: Math.floor(Math.random() * 999),
      date: randomDate(new Date(2012, 0, 1), new Date()),
      paymentType: randomSelect(1, PAYMENT_TYPES)[0],
      newClient: randomSelect(1, BOOLEANS)[0],
      statuses: randomSelect(
        Math.floor(Math.random() * STATUSES.length),
        STATUSES
      ),
    });
  }
  return result;
};
