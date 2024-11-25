export class TomatoTimer {
  #id;
  #name;
  #counter;

  constructor(name, counter = 0) {
    this.#id = this.#generateUniqueID();
    this.setName(name);
    this.setCounter(counter);
  }

  #generateUniqueID() {
    return Math.random()
      .toString()
      .substring(2, 11)
      .replace(/^0+/, '')
      .padEnd(9, '0');
  }

  getID() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  setName(name) {
    if (typeof name !== 'string' || name.trim() === '') {
      throw new Error('Имя должно быть непустой строкой');
    }

    this.#name = name;
    return this;
  }

  getCounter() {
    return this.#counter;
  }

  setCounter(counter) {
    if (typeof counter !== 'number' || counter < 0) {
      throw new Error('Счетчик должен быть числом не меньше нуля');
    }

    this.#counter = counter;
    return this;
  }

  incrementCounter() {
    this.#counter += 1;
    return this;
  }
}
