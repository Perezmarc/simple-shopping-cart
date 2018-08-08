const _API_SRC = "https://verse-frontend-test.firebaseapp.com/"

export function formatUri(uri: TemplateStringsArray, ...values: any[]) {
  let result = "";
  for (let i = 0; i < values.length; ++i) {
      result += uri[i];
      result += encodeURIComponent(String(values[i]));
  }
  result += uri[uri.length - 1];
  return result;
}

export function formatAPIUri(uri: TemplateStringsArray, ...values: any[]) {
  return _API_SRC + formatUri(uri)
}