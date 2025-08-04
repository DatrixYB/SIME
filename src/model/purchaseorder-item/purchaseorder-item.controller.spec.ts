import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseorderItemController } from './purchaseorder-item.controller';
import { PurchaseorderItemService } from './purchaseorder-item.service';

describe('PurchaseorderItemController', () => {
  let controller: PurchaseorderItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseorderItemController],
      providers: [PurchaseorderItemService],
    }).compile();

    controller = module.get<PurchaseorderItemController>(PurchaseorderItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
