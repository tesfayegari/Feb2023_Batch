
export class Animal {
    //define all properties and methods ( function )
    name: string;
    owner: string;
    dateOfBirth: Date;
}

export class Dog extends Animal{
    constructor(_name: string, _owner: string){
        super();
        this.name = _name;
        this.owner = _owner;
    }
    type: string;
    //method give sound 
    giveSound(){
        console.log("Wuf Wuf Wuf ");
    }
}


let pupy:Dog;
pupy = new Dog("My Puppy", "Tesfaye Gari");
pupy.giveSound()
