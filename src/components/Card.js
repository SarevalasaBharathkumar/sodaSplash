import React, { useState, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    const data = useCart();
    const dispatch = useDispatchCart();
    const [qty, setQty] = useState(1); // Set initial quantity to 1

    // Debugging: Log props to check the received data
    useEffect(() => {
        console.log('Props:', props);
    }, [props]);

    const handleAddToCart = async () => {
        let itemExists = false;

        for (const cart_item of data) {
            if (cart_item.id === props.item_name._id) {
                itemExists = true;
                break;
            }
        }

        // Ensure price is a valid number
        const price = props.item_name.price?.$numberInt
            ? parseInt(props.item_name.price.$numberInt, 10)
            : props.item_name.price
            ? parseInt(props.item_name.price, 10)
            : 0; // Default price to 0 if undefined

        // Debugging: Log the parsed price
        console.log('Parsed Price:', price);

        if (!itemExists) {
            await dispatch({
                type: "ADD",
                id: props.item_name._id,
                name: props.item_name.name,
                desc: props.item_name.description,
                img: props.item_name.img,
                price: price,
                qty: qty
            });
        } else {
            await dispatch({
                type: "UPDATE",
                id: props.item_name._id,
                qty: qty
            });
        }

        console.log('Cart:', data);
    };

    return (
        <div className="card h-100 fs-6" style={{ maxHeight: '360px', overflow: 'hidden' }}>
            <img 
                src={props.item_name.img}
                alt={props.item_name.name}
                className="card-img-bottom"
                style={{ objectFit: 'cover', maxHeight: '200px' }}
            />
            <div className="card-body" style={{ overflowY: 'auto' }}>
                <h5 className="card-title">{props.item_name.name}</h5>
                <p className="card-text" style={{ fontSize: '0.9em', maxHeight: '60px', overflowY: 'auto' }}>
                    {props.item_name.description}
                </p>
                <div className='container w-100'>
                    <select 
                        className='m-2 h-100 bg-success rounded'
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                    >
                        {
                            Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))
                        }
                    </select>
                    <div className='d-inline fs-5 text-danger'>
                    {`₹${props.item_name.price}/-`}
                    </div>
                    <button 
                        className='btn btn-info justify-center ms-2' 
                        onClick={handleAddToCart}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}