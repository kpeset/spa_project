interface Shelter {
  id: number;
  name: string;
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

interface AniMalSpecies {
  animals: Animal[];
  species: Specie[];
}
