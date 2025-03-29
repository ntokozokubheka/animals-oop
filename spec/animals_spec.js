const { Dog, Cat, Home } = require("../src/animals.js");
const { errMsg } = require("../src/helper_objects.js");
describe("Dog Class", () => {
  let dog;

  beforeEach(() => {
    dog = new Dog("testDog");
  });

  describe("sound method", () => {
    it('should return "Bark"', () => {
      expect(dog.sound()).toBe("Bark");
    });
  });

  describe("eat method", () => {
    it("should return the eating message with the name of the dog", () => {
      expect(dog.eat()).toBe("testDog eats");
    });

    it('should return the eating message with the default name "Rax"', () => {
      dog = new Dog();
      expect(dog.eat()).toBe("Rax eats");
    });
  });
});

describe("Cat Class", () => {
  let cat;

  beforeEach(() => {
    cat = new Cat("testCat");
  });

  describe("sound method", () => {
    it('should return "Meow"', () => {
      expect(cat.sound()).toBe("Meow");
    });
  });

  describe("eat method", () => {
    it("should return the eating message with the name of the cat", () => {
      expect(cat.eat()).toBe("testCat eats");
    });

    it('should return the eating message with the default name "Storm"', () => {
      cat = new Cat();
      expect(cat.eat()).toBe("Storm eats");
    });
  });
});

describe("Home Class", () => {
  let home, dog, cat, catTwo, homeTwo, homeThree, dogTwo, dogThree;

  beforeEach(() => {
    home = new Home();
    dogTwo = new Dog("testDogTwo");
    dog = new Dog();
    homeTwo = new Home();
    homeThree = new Home();
    cat = new Cat("TestCat");
    catTwo = new Cat("TestCatTwo");
    dogThree = new Dog("TestDogThree");
  });

  describe("adoptPet method", () => {
    
    it("should adopt an animal instance and return the number of pets adopted", () => {
      expect(home.adoptPet(cat)).toBe(1);
      expect(home.adoptPet(catTwo)).toBe(2);
    });

    it("should adopt a cat to different homes", () => {
      expect(home.adoptPet(cat)).toBe(1);
      expect(homeThree.adoptPet(cat)).toBe(1);
    });

    it("should throw an error when adopting non-pet objects", () => {
      const nonPetObject = { name: "NotAPet" };
      expect(() => home.adoptPet(nonPetObject)).toThrowError(
        errMsg.invalidInstance
      );
    });

    it("should throw an error when adopting the same dog to different homes", () => {
      homeTwo.adoptPet(dog);
      expect(() => homeThree.adoptPet(dog)).toThrowError(errMsg.petHasHome);
    });

    it("should throw an error when adopting the same dog multiple times in the same home", () => {
      home.adoptPet(dog);
      expect(() => home.adoptPet(dog)).toThrowError(errMsg.invalidNumAdoptions);
    });

    it("should throw an error when adopting the same cat multiple times in the same home", () => {
      home.adoptPet(cat);
      expect(() => home.adoptPet(cat)).toThrowError(errMsg.invalidNumAdoptions);
    });
  });

  describe("makeAllSounds method", () => {
    it("should return an array of the sounds of pets found in the home", () => {
      home.adoptPet(cat);
      home.adoptPet(dog);

      expect(home.makeAllSounds()).toEqual(["Meow", "Bark"]);
    });
  });

  describe("removePet method", () => {
    it("should remove the pet and return the number of pets left in the home", () => {
      home.adoptPet(dogThree);
      expect(home.removePet(dogThree)).toEqual(0);
    });

    it("should throw an error that pet is not found in the home", () => {
      expect(() => home.removePet(dogThree)).toThrowError(errMsg.petNotFound);
    });
  });
});