// sleep function, takes in time in ms
export async function sleep(time) {
  await new Promise((r) => setTimeout(r, time));
}
