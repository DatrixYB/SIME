import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseorderController } from './purchaseorder.controller';
import { PurchaseorderService } from './purchaseorder.service';

describe('PurchaseorderController', () => {
  let controller: PurchaseorderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseorderController],
      providers: [PurchaseorderService],
    }).compile();

    controller = module.get<PurchaseorderController>(PurchaseorderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
