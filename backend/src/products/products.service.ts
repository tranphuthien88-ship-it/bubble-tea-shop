import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly products = [
    {
      id: 1,
      name: 'Trà Sữa Trân Châu',
      description: 'Trà sữa truyền thống với trân châu đen',
      price: 35000,
      image: '/images/milktea.jpg',
    },
    {
      id: 2,
      name: 'Trà Đào',
      description: 'Trà đào thanh mát',
      price: 30000,
      image: '/images/peach-tea.jpg',
    },
    {
      id: 3,
      name: 'Trà Sữa Matcha',
      description: 'Trà sữa matcha thơm béo',
      price: 40000,
      image: '/images/matcha.jpg',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
  return this.products.find((product) => product.id === id);
  }
}