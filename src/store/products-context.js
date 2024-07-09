import { createContext, useReducer } from "react";

export const ProductsContext = createContext({
    products: [],
    //TODO: reviews: [],
    addProduct: ({ url, pName, description, date, reviews }) => { },
    setProduct: (products) => { },
    deleteProduct: (id) => { },
    updateProduct: (id, { url, pName, description, date, reviews }) => { },
});

function productsReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableProductIndex = state.findIndex(
                (product) => product.id === action.payload.id
            );
            const updatableProduct = state[updatableProductIndex];
            const updatedItem = { ...updatableProduct, ...action.payload.data };
            const updatedProduct = [...state];
            updatedProduct[updatableProductIndex] = updatedItem;
            return updatedProduct;
        case 'DELETE':
            return state.filter((product) => product.id !== action.payload);
        default:
            return state;
    }
}

function ProductsContextProvider({ children }) {
    const [productsState, dispatch] = useReducer(productsReducer, []);

    function addProduct(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function setProduct(products) {
        dispatch({ type: 'SET', payload: products });
    }

    function deleteProduct(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateProduct(id, productData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: productData } });
    }

    const value = {
        products: productsState,
        setProducts: setProduct,
        addProduct: addProduct,
        deleteProduct: deleteProduct,
        updateProduct: updateProduct,
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}

export default ProductsContextProvider;