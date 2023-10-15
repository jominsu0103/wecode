// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function process() {
//   console.log('안녕하세요!');
//   await sleep(2000); // 1초쉬고
//   console.log('반갑습니다!');
// }

// process().then(() => {
//   console.log('작업이 끝났어요!');
// });

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const makeError = async () => {
  await sleep(2000);
  const error = new Error();
  throw error;
}

const process = async () => {
  try {
    await makeError();
  } catch (e) {
    console.error(e);
  }
}

process();