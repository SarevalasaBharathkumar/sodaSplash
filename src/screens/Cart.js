import React from "react";
import trash from "../trash.svg";
import Head from "../components/Head";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    const userEmail = localStorage.getItem('currentUserEmail');

    if (data.length === 0) {
        return (
            <div>
                <Head />
                <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
            </div>
        );
    }

    let totalPrice = data.reduce((total, item) => total + item.price * item.qty, 0);

    return (
        <div>
            <Head />
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <div className="mb-3">
                    <strong>User Email: </strong>{userEmail}
                </div>
                <table className="table table-hover">
                    <thead className="fs-5">
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.qty}</td>
                                <td>{item.qty * item.price}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn p-0"
                                        onClick={() => { dispatch({ type: "REMOVE", index: index }) }}
                                    >
                                        <img src={trash} alt="delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-3">
                    <h4>Total Price: ₹{totalPrice}</h4>
                    <button className="btn bg-success mt-3">Check Out</button>
                </div>
            </div>
        </div>
    );
}
