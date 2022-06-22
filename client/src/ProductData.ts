export interface ProductData {
    id: string;
    name: string;
    description: string;
    price: number;
    imageId?: string;
    stock: number;
    categories: string[];
    quantity: number;
    imageUrl?: string;
  }