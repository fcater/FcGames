const getUrlQuery = (): URLSearchParams => {
  return new URLSearchParams(window.location.hash.split("?").pop());
};

export { getUrlQuery };
