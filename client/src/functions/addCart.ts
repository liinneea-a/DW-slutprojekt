// @ts-ignore

interface testNft {
  productID: number;
  image: string;
  price: number;
  description: string;
}

export function addCart(setCart : any, cart: any, item: testNft | undefined) {
    let CartList = cart || [];
    let foundItem = CartList.find((listedItem : any) => listedItem.productID === item?.productID)
    if(foundItem) {
      foundItem.count += 1
    }else {
      CartList.push(item);
    }
    setCart(CartList)
    localStorage.setItem("cart", JSON.stringify(CartList));
}

export default addCart;