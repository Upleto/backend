function promiseRaceTrue(promises: Promise<any>[]) {
  return new Promise(function(resolve, reject) {
    promises.forEach(promise => promise.then(val => (val === true ? resolve() : reject())));
  })
    .then(() => true)
    .catch(() => false);
}

export default promiseRaceTrue;
