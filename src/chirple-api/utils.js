// sleep function, takes in time in ms
async function sleep(time) {
  await new Promise((r) => setTimeout(r, time));
}

module.exports = { sleep };
