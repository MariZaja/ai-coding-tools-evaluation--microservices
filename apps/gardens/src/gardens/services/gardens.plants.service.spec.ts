import { Test, TestingModule } from '@nestjs/testing';
import { GardenPlantService } from './gardens.plants.service';
import { ClientProxy } from '@nestjs/microservices';
import { CalendarService } from '../../../../gar-api-gateway/src/calendar/calendar/calendar.service';
import { of } from 'rxjs';
import { CreatePlantDto, PlantDto, UpdatePlantDto } from '@app/contracts';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Plant } from '../entities/plant.entity';
import { Gardens } from '../entities/garden.entity';

/*
* author: chatGPT
*/
describe('GardenPlantService', () => {
    let service: GardenPlantService;
    let clientProxy: ClientProxy;
    let calendarService: CalendarService;
    let plantRepository: any; // Mocked repository

    beforeEach(async () => {
        plantRepository = {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GardenPlantService,
                {
                    provide: 'GARDENS_CLIENT',
                    useValue: {
                        send: jest.fn(),
                    },
                },
                {
                    provide: CalendarService,
                    useValue: {
                        addEvent: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(Plant),
                    useValue: plantRepository,
                },
                {
                    provide: getRepositoryToken(Gardens),
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<GardenPlantService>(GardenPlantService);
        clientProxy = module.get<ClientProxy>('GARDENS_CLIENT');
        calendarService = module.get<CalendarService>(CalendarService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a plant and schedule a watering event', async () => {
            const gardenId = 1;
            const speciesId = '1';
            const createPlantDto: CreatePlantDto = { name: 'Rose', gardenId, speciesId };
            const plant: PlantDto = { id: 1, name: 'Rose', gardenId };

            jest.spyOn(clientProxy, 'send').mockReturnValue(of(plant));
            jest.spyOn(calendarService, 'addEvent').mockResolvedValue(undefined);
            plantRepository.create.mockReturnValue(plant);
            plantRepository.save.mockResolvedValue(plant);

            const result = await service.create(createPlantDto);

            expect(result).toEqual(plant);
            expect(plantRepository.save).toHaveBeenCalledWith(plant);
        });

        it('should throw an error if plant creation fails', async () => {
            const gardenId = 1;
            const speciesId = '1';
            const createPlantDto: CreatePlantDto = { name: 'Rose', gardenId, speciesId };
        
            // Mock the clientProxy.send to return null, indicating the creation failed
            jest.spyOn(clientProxy, 'send').mockReturnValue(of(null));
        
            // Mock the plantRepository methods to simulate a failure
            jest.spyOn(plantRepository, 'create').mockReturnValue(null);
            jest.spyOn(plantRepository, 'save').mockRejectedValue(new Error('Plant creation failed'));
        
            // Assert that the service throws the expected error
            await expect(service.create(createPlantDto)).rejects.toThrow('Plant creation failed');
        });
    });

    describe('findAll', () => {
        it('should return all plants for a garden', async () => {
            const gardenId = 1;
            const plants: PlantDto[] = [{ id: 1, name: 'Rose', gardenId }];

            plantRepository.find.mockResolvedValue(plants);
            jest.spyOn(clientProxy, 'send').mockReturnValue(of(plants));

            const result = await service.findAllByGarden(gardenId);

            expect(result).toEqual(plants);
            expect(plantRepository.find).toHaveBeenCalledWith({ where: { gardenId } });
        });
    });

    describe('getPlant', () => {
        it('should return a plant by id', async () => {
            const gardenId = 1;
            const plantId = 1;
            const plant: PlantDto = { id: plantId, name: 'Rose', gardenId };

            plantRepository.findOne.mockResolvedValue(plant);
            jest.spyOn(clientProxy, 'send').mockReturnValue(of(plant));

            const result = await service.findOneByGarden(gardenId, plantId);

            expect(result).toEqual(plant);
            expect(plantRepository.findOne).toHaveBeenCalledWith({ where: { gardenId, id: plantId } });
        });
    });

    describe('updatePlant', () => {
        it('should update a plant', async () => {
            const id = 1;
            const updatePlantDto: UpdatePlantDto = { id, name: 'Tulip' };
            const updatedPlant: PlantDto = { id, name: 'Tulip', gardenId: 1 };

            plantRepository.update.mockResolvedValue(updatedPlant);
            jest.spyOn(clientProxy, 'send').mockReturnValue(of(updatedPlant));

            const result = await service.update(updatePlantDto);

            expect(plantRepository.update).toHaveBeenCalledWith(id, updatePlantDto);
        });
    });

    describe('deletePlant', () => {
        it('should delete a plant', async () => {
            const gardenId = 1;
            const plantId = 1;
            const plant: PlantDto = { id: plantId, name: 'Rose', gardenId };

            plantRepository.findOne.mockResolvedValue(plant);
            plantRepository.remove.mockResolvedValue(plant);

            const result = await service.remove(gardenId, plantId);

            expect(result).toEqual(plant);
            expect(plantRepository.remove).toHaveBeenCalledWith(plant);
        });
    });
});
