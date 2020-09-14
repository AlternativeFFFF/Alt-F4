---
---
function getLanguage() {
  return localStorage.getItem("language") || '{{ site.default_lang }}';
}

function setLanguage(lang) {
  if (lang === undefined || lang === '') { // make sure that the lang parameter was properly passed in
    return 1
  }
  if (typeof lang !== 'string') {
    throw new typeError("argument 'lang' must be a string");
  }
  if (lang.length !== 2) { // language abbreviations are 2 letters long
    return 1
  }

  localStorage.setItem('language', lang);
  return 0
}
