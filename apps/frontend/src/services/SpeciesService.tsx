import axios from 'axios';
import { handleError } from '../helpers/ErrorHandler';
import { Species, SpeciesList } from '../models/Species';

// const port = process.env.REACT_APP_GATEWAY_PORT;
const port = 3000;
const api = `http://localhost:${port}/`;

export const getAllSpeciesNames = async () => {
  try {
    const response = await axios.get<Species[]>(api + 'species');
    const data = response.data;
    const speciesList: SpeciesList[] = data.map((species) => {
      const speciesItem: SpeciesList = {
        id: species.id,
        name: species.name,
      };
      return speciesItem;
    });
    return speciesList;
  } catch (error) {
    handleError(error);
  }
};

export const getAllSpecies = async () => {
  try {
    const response = await axios.get<Species[]>(api + 'species');
    const data = response.data;
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getSpecieById = async (id: string) => {
  try {
    const response = await axios.get<Species>(api + `species/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    handleError(error);
  }
}
