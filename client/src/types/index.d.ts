interface Shelter {
  id: number;
  name: string;
  picture: string;
}

interface Animal {
  id: number;
  name: string;
}

interface Specie {
  id: number;
  name: string;
}

interface Species {
  species: Specie[];
}

interface Shelters {
  shelters: Shelter[];
}

interface AniMalSpecies {
  animals: Animal[];
  species: Specie[];
}
