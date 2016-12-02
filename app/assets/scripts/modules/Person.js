class Person {
  constructor(fullName, favColor){
    this.name = fullName;
    this.favColor = favColor;
  }

  greet() {
    console.log("Hey there, my name is " + this.name + " and my favorite color ever is " + this.favColor + ".");
  }
}

// module.exports = Person;
export default Person;
