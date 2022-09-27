import { Test, TestingModule } from '@nestjs/testing';
import { FeatureController } from './feature.controller';

describe('FeatureController', () => {
  let controller: FeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatureController],
    }).compile();

    controller = module.get<FeatureController>(FeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
   * Test findAll function
   */
  describe('findAll', () => {
    it('should return "This action returns all examples"', () => {

      const expected = 'This action returns all examples';
      
      const actual = controller.findAll();

      expect(actual).toBe(expected);
      
    });
  });

});
