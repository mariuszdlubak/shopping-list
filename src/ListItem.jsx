import { useState, useEffect } from "react";

const ListItem = ({ product, changeActive, changeAmount }) => {
    const [amount, setAmount] = useState(product.amount);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        setAmount(product.Amount);
    }, [product.Amount]);

    useEffect(() => {
        if(hover) {
            setAmount('X');
        } else {
            product.Amount > 1 ? setAmount(product.Amount) : setAmount('');
        }
    }, [hover]);


    const handleActiveChange = () => {
        changeActive(product.Id);
    }

    const handleHover = () => {
        setHover(!hover);
    }
    
    const handleRemoveAmount = () => {
        changeAmount(product.Id, false);
    }

    const handleAddAmount = () => {
        changeAmount(product.Id, true);
    }

    return (
        <div className={product.Active ? 'item' : 'item done'}>
            <div className='check'>
                <input type='checkbox' id={product.Name} checked={!product.Active} onChange={handleActiveChange} />
                <label htmlFor={product.Name} className='material-symbols-outlined'>done</label>
            </div>
            <span type='text' className='name'>{product.Name}</span>
            <div className="amount-box" onMouseEnter={handleHover} onMouseLeave={handleHover}>
                <button className='material-symbols-outlined' onClick={handleRemoveAmount}>remove</button>
                   <span>{hover ? product.Amount : (product.Amount > 1 ? product.Amount : '')}</span> 
                <button className='material-symbols-outlined' onClick={handleAddAmount}>add</button>
            </div>
        </div>
    );
}

export default ListItem;