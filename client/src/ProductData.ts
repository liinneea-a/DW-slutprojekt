export interface ProductData {
    id: string;
    name: string;
    description: string;
    price: number;
    //image: string;
    imageId?: string;
    stock: number;
    categories: string[];
    quantity: number;
    imageUrl?: string;
  }