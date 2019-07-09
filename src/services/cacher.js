import camelCase from "camel-case";

let instance;

export default class Cacher {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;
    this.cache = {};
  }

  setCacheValue(key, value) {
    this.cache[camelCase(key)] = value;
  }

  getCacheValue(key) {
    return this.cache[camelCase(key)];
  }
}
