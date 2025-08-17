import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TabListProducts from './tab-list-products';

jest.mock('../../db/use-get-all-products', () => () => ({
  data: { data: [{ id: 1, name: 'محصول تست', price: 1000, category_name: 'دسته', image: '', exist: true, details: '', discount_percentage: 0, create_date: '2024-01-01' }] }
}));
jest.mock('../../db/use-delete-product', () => () => ({ mutate: jest.fn() }));
jest.mock('../../db/use-get-product-category', () => () => ({
  data: { data: [{ id: 1, name: 'دسته' }] }
}));
jest.mock('../../db/use-patch-product', () => () => ({ mutate: jest.fn(), isLoading: false }));

describe('TabListProducts', () => {
  it('نمایش مودال ویرایش هنگام کلیک روی دکمه ویرایش', () => {
    render(<TabListProducts />);
    // دکمه ویرایش را پیدا کن و کلیک کن
    const editButton = screen.getAllByText('ویرایش')[0];
    fireEvent.click(editButton);

    // انتظار داریم مودال ویرایش باز شود و فیلد نام محصول را ببینیم
    expect(screen.getByPlaceholderText('نام محصول')).toBeInTheDocument();
    expect(screen.getByText('ذخیره')).toBeInTheDocument();
  });
});