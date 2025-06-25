import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  describe('create a crud product', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
    it('should create a product', () => {
      const createProductDto = {
        name: 'Test Product',
        price: 100,
        description: 'This is a test product',
        stock: 50,
        // category: 'Test Category',
        isactivated: true,
      };
      expect(service.create(createProductDto)).toBe(
        'This action adds a new product',
      );
    });
    it('should find all products', () => {
      expect(service.findAll()).toBe('This action returns all product');
    });
    it('should find one product by id', () => {
      const id = 1;
      expect(service.findOne(id)).toBe(`This action returns a #${id} product`);
    });
    it('should update a product by id', () => {
      const id = 1;
      const updateProductDto = { name: 'Updated Product', price: 150 };
      expect(service.update(id, updateProductDto)).toBe(
        `This action updates a #${id} product`,
      );
    });
  });
});
