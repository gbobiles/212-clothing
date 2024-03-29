import { createContext, useState } from "react";

import PRODUCTS from '../shopdata.json';

export const ProductsContext = createContext({
    product: [],
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products };
    return (
        <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>
    )
}