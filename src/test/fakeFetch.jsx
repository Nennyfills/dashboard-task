const fakeFetch = (option) => new Promise(
  (resolve) => {
    setTimeout(() => {
      resolve(option);
    }, 4000);
  }
);

export default fakeFetch;
