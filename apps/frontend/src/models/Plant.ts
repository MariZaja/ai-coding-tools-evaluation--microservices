export type Plant = {
  id: string;
  name: string;
  notes: string;
  species_id: string;
  image?: string | null;
};

export type CreatePlantInput = {
  name: string;
  notes?: string;
  gardenId: number;
  speciesId: number;
  image?: string | null;
};