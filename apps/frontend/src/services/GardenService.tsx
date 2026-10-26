import axios from 'axios';
import { handleError } from '../helpers/ErrorHandler';
import { CreateGarden, Garden} from '../models/Garden';
import { CreatePlantInput } from 'src/models/Plant';

// const port = process.env.REACT_APP_GATEWAY_PORT;
const port = 3000;
const api = `http://localhost:${port}/`;

export const getAllUserGardens = async (userId: String) => {
  try {
    const data = await axios.get<Garden[]>(api + 'gardens/' + userId);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const addGarden = async (garden: CreateGarden) => {
  try {
    const data = await axios.post(api + 'gardens', garden);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getPlantsByGardenId = async (gardenId: string) => {
  try {
    const data = await axios.get(api + 'gardens/' + gardenId + '/plants/');
    return data.data;
  } catch (error) {
    handleError(error);
  }
}

export const getPlantById = async (gardenId: string, id: string) => {
  try {
    console.log('request', api + 'gardens/' + gardenId + '/plants/' + id);
    const data = await axios.get(api + 'gardens/' + gardenId + '/plants/' + id);
    console.log('data', data);
    return data.data;
  } catch (error) {
    handleError(error);
  }
};

export const addGardenPlant = async (gardenId: number, plant: CreatePlantInput) => {
  try {
    const response = await axios.post(
      api + `gardens/${gardenId}/plants`,
      plant
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};