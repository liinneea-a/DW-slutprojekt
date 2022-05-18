// @ts-ignore

interface testNft {
  NFTid: number;
  image: string;
  price: number;
  description: string;
}

export function addCart(setCart : any, cart: any, item: testNft | undefined) {
    let CartList = cart || [];
    let foundItem = CartList.find((listedItem : any) => listedItem.NFTid === item?.NFTid)
    if(foundItem) {
      foundItem.count += 1
      console.log('Finns redan')
    }else {
      CartList.push(item);
    }
    setCart(CartList)
    localStorage.setItem("cart", JSON.stringify(CartList));
}

export default addCart;