import axios from '../mocks/axios';
import getProducts from './product.service';

jest.mock('axios', () => require('../mocks/axios').default);

describe('productService', () => {
  test('Retorna produtos da API', async () => {
    const mockProducts = [{ id: 1, name: 'Produto Teste' }];
    axios.get.mockResolvedValue({ data: mockProducts });

    const response = await getProducts();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/products');
    expect(response).toEqual(mockProducts);
  });

  test('Lança erro quando a API falha', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));
    await expect(getProducts()).rejects.toThrow(errorMessage);
  });
});
