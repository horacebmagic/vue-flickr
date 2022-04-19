const base_url = "https://www.flickr.com/services/rest/";
const api_key = "2683066e9e14dbd9c1c6bb639da955cc&";
const api_url = `${base_url}?api_key=${api_key}`;
const options =
  "extras=views,url_w,url_z&format=json&nojsoncallback=1&per_page=24";

export const methods = {
  search: "flickr.photos.search",
  interestingness: "flickr.interestingness.getList",
};

export const tags = {
  blue: "blue",
  blossom: "blossom",
  trees: "trees",
  garden: "garden",
  dog: "dog",
  cat: "cat",
  lake: "lake",
  landscape: "landscape",
  sky: "sky",
  blackandwhite: "blackandwhite",
  winter: "winter",
  macro: "macro",
  white: "white",
  sun: "sun",
  river: "river",
  nature: "nature",
  music: "music",
  bird: "bird",
  people: "people",
  old: "old",
  house: "house",
  city: "city",
  park: "park",
  beach: "beach",
  portrait: "portrait",
  flower: "flower",
  moon: "moon",
  sunset: "sunset",
  light: "light",
  bridge: "bridge",
  yellow: "yellow",
  flowwers: "flowwers",
  art: "art",
  pink: "pink",
  snow: "snow",
  christmast: "christmast",
  street: "street",
  orange: "orange",
  tree: "tree",
  summer: "summer",
  sea: "sea",
  art: "art",
  night: "night",
  bw: "bw",
  water: "water",
  pink: "pink",
  clouds: "clouds",
  green: "green",
  car: "car",
  food: "food",
  family: "family",
  new: "new",
};

export const getInterestingness = (page = 1) => {
  return `${api_url}&method=${methods.interestingness}&${options}&page=${page}`;
};

export const getByTag = (tag, page) => {
  if (tag == "") {
    return getInterestingness();
  }
  return `${api_url}&method=${methods.search}&sort=interestingness-desc&safe_search=1&tags=${tag}&${options}&page=${page}`;
};
