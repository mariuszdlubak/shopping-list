import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import ListItem from './ListItem.jsx';

import './App.css';

const LOCAL_STORAGE_KEY = 'listApp.products';

const App = () => {
    const [products, setProducts] = useState([]);
    const [addName, setAddName] = useState('');
    const [amountOfItems, setAmountOfItems] = useState('');

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedProducts) setProducts(storedProducts);
    }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
        setAmountOfItems(products.filter(p => p.Active === true).length);
    }, [products]);


    const addProduct = (name) => {
        let exists = false;
        if(name.length === 0) return;
        if(products.length > 0) {
            products.map(p => {
                if(p.Name.toLowerCase() === name.toLowerCase()) {
                    if(p.Active) {
                        p.Amount++;
                    } else {
                        p.Amount = 1;
                        p.Active = true;
                    }
                    exists = true;
                }
            });
        }

        if(!exists) {
            setProducts(prevProducts => {
                return [...prevProducts, {
                    Id: uuidv4(),
                    Name: name,
                    Amount: 1,
                    Active: true
                }]
            });
        } else {
            setProducts(prevProducts => {
                return[...prevProducts]
            })
        }

        setAddName('');
    }

    const changeActive = (id) => {
        const newProducts = [...products];
        const product = newProducts.find(product => product.Id === id);
        product.Active = !product.Active;
        setProducts(newProducts);
    }

    const changeAmount = (id, add) => {
        let newProducts = [...products];
        const product = newProducts.find(product => product.Id === id);
        let amount = product.Amount;
        if(add) {
            if(product.Active) {
                product.Amount = amount + 1;
            } else {
                product.Amount = 1;
                product.Active = true;
            }
        } else {
            if(amount > 1 && product.Active) {
                product.Amount = amount - 1;
            } else {
                newProducts = [...products].filter(p => p.Id !== id);
            }
        }
        setProducts(newProducts);
    }

    return (
        <div className='container'>
            <h1>Shopping list</h1>
            <div className='add-item'>
                <input
                    type='text'
                    placeholder='Add product'
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    onKeyUp={(e) => {
                        if(e.key === 'Enter') addProduct(addName)
                    }}
                />
                <button className='material-symbols-outlined' onClick={() => {addProduct(addName)}}>add</button>
            </div>
            <div className="items-left">
                <span>{amountOfItems > 0 ? amountOfItems + ' left' : ''}</span>
            </div>

            {products?.length > 0
                ? (
                    <div className='items'>
                        {products.map(product => {
                            if(product.Active)
                                return <ListItem key={product.Id} product={product} changeActive={changeActive} changeAmount={changeAmount} />
                        })}
                        {products.map(product => {
                            if(!product.Active)
                                return <ListItem key={product.Id} product={product} changeActive={changeActive} changeAmount={changeAmount} />
                        })}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No products on list</h2>
                    </div>
            )}
        </div>
    );
}

export default App;