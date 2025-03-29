const { errMsg } = require("./helper_objects.js");

class Animal {
  #name;
  constructor(name) {
    this.#name = name;
  }

  sound() {
    return "sound...";
  }

  eat() {
    return this.#name + " eats";
  }
}

class Dog extends Animal {
  #hasHome;
  constructor(name = "Rax") {
    super(name);
    this.#hasHome = false;
  }

  sound() {
    return "Bark";
  }

  getAdoptionStatus() {
    return this.#hasHome;
  }

  setAdoptionStatus() {
    this.#hasHome = true;
  }
}

class Cat extends Animal {
  constructor(name = "Storm") {
    super(name);
  }

  sound() {
    return "Meow";
  }
}

class Home {
  constructor() {
    this.pets = [];
  }
  adoptPet(pet) {
    if (!(pet instanceof Animal)) {
      throw new Error(errMsg.invalidInstance);
    } else if (this.pets.includes(pet)) {
      throw new Error(errMsg.invalidNumAdoptions);
    } else if (pet instanceof Dog) {
      if (pet.getAdoptionStatus() === false) {
        pet.setAdoptionStatus();
      } else {
        throw new Error(errMsg.petHasHome);
      }
    }

    this.pets.push(pet);
    return this.pets.length;
  }

  removePet(pet) {
    if (!this.pets.includes(pet)) {
      throw new Error(errMsg.petNotFound);
    }

    this.pets = this.pets.filter((animal) => pet !== animal);

    return this.pets.length;
  }

  makeAllSounds() {
    return this.pets.map((pet) => pet.sound());
  }
}

module.exports = { Dog, Cat, Home };