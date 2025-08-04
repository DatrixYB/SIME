import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseorderItemService } from './purchaseorder-item.service';

describe('PurchaseorderItemService', () => {
  let service: PurchaseorderItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseorderItemService],
    }).compile();

    service = module.get<PurchaseorderItemService>(PurchaseorderItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
