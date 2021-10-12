// general - start

function httpGet(path) {
  return fetch(path, getOptions("GET"));
}

function httpPost(path, data) {
  return fetch(path, getOptions("POST", data));
}

function httpPut(path, data) {
  return fetch(path, getOptions("PUT", data));
}

function httpDelete(path) {
  return fetch(path, getOptions("DELETE"));
}

function getOptions(verb, data) {
  var options = {
    dataType: "json",
    method: verb,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  return options;
}

function element(path) {
  return document.querySelector(path);
}

function switchHiddenElement(element, hidden) {
  if (element) {
    element.classList[hidden ? "add" : "remove"]("hidden");
  }
}

function switchConflictingHiddenElements(stateToElementMap, state) {
  Object.entries(stateToElementMap).forEach(([key, element]) => {
    switchHiddenElement(element(), state !== key);
  });
}

// general - end

// selectors - start

function urlInput() {
  return element("#url-input");
}

function loadingIndicator() {
  return element("#loading-indicator");
}
const LOADING_STATE = "loading";

function result() {
  return element("#result");
}
const RESULT_STATE = "result";

function resultUrl() {
  return element("#result__url");
}

function errorIndicator() {
  return element("#error-indicator");
}
const ERROR_STATE = "error";

const STATE_TO_ELEMENT_MAP = {
  [LOADING_STATE]: loadingIndicator,
  [ERROR_STATE]: errorIndicator,
  [RESULT_STATE]: result,
};

// selectors - end

// event listeners - start

function onShortenClick(event) {
  event.preventDefault();
  switchConflictingHiddenElements(STATE_TO_ELEMENT_MAP, LOADING_STATE);
  httpPost("/api/url/add", { url: urlInput().value })
    .then((res) => {
      if (res.status === 201) {
        return res.json();
      } else {
        return Promise.reject(new Error(res.statusText));
      }
    })
    .then((data) => {
      const url = `${location.href}shrt/${data.result}`;
      resultUrl().innerHTML = `<a href="${url}">${url}</a>`;
      switchConflictingHiddenElements(STATE_TO_ELEMENT_MAP, RESULT_STATE);
    })
    .catch((err) => {
      errorIndicator().innerHTML = err.message;
      switchConflictingHiddenElements(STATE_TO_ELEMENT_MAP, ERROR_STATE);
    });

  return false;
}

// event listeners - end
