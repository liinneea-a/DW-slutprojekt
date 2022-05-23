import console from 'console';
import { NextFunction, Request, Response } from 'express';
import { ProductModel } from './product.model';

/** GET ALL Products */
export const getAllProducts = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  const products = await ProductModel.find({});
  if (!products.length) {
    return res.status(400).json(products);
  }

  // TEST TO GET QUANTITY OF PRODUCT
  //  const priceTotal = 1000;
  //  const priceSingle = 200;

  //  for (let x = 0; priceTotal / x > priceSingle; x++) {
  //    console.log(x);
  //  };
  // TEST END

  res.status(200).json(products);
};

/** GET ONE Product */
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json(product);
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
  // TODO: Who is allowed to use this endpoint?
  // const Products = await ProductModel.findById({}).populate<{ customer: User }>("customer");
};

export const getOneCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  let categoryProducts = [];

  try {
    const products = await ProductModel.find({});

    if (!products) {
      return res.status(404).json(products);
    }
    
    for (let product of products) {
      for (let i=0; i < product.categories.length; i++) {
        if (product.categories[i] === category) {
          categoryProducts.push(product);
        }
      }
    }
    
    if(!categoryProducts.length) {
      return res.status(404).json(categoryProducts)
    }

    res.status(200).json(categoryProducts);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: How do we handle errors in async middlewares?

  try {
    const product = new ProductModel(req.body);

    await product.save();
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    console.log(product);

    if (!product) {
      return res.status(400).json(product);
    }

    await product.save();
    res.status(200).json({
      old: product,
      new: req.body,
    });
  } catch (err) {
    console.log('update Product error');
    res.status(400).json(err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndDelete(id);

    res.status(200).json(product);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json(err.message);
    }
  }
};
