import React, { useContext, useState } from "react";
import qrCode from '../assets/qr_code.png';
import { AuthContext } from "../helpers/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
const Payment = () => {

    const apiUrl = process.env.REACT_APP_API_URL;
    const { authState } = useContext(AuthContext);
    let finalPrice = 100;
    let navigate=useNavigate();

    const [creditCard, setCreditCard] = useState(true);
    const [payPal, setPayPal] = useState(false);
    const [payByUpi, setPayByUpi] = useState(false);
    const [items, setItems] = useState([]);


    useEffect(() => {
        axios.get(`${apiUrl}/carts/?user_id=${authState.user_id}`).then(
            (res) => { 
                if(res.data.length)
                {
                    setItems(res.data);
                    console.log(res.data);
                }
                else
                navigate('/')
            }
        )
    }, [authState])



    function toggleDisplay(section) {
        if (section === 'creditCard') {
            setCreditCard(true); setPayPal(false); setPayByUpi(false);
        } else if (section === 'payByUpi') {
            setCreditCard(false); setPayPal(false); setPayByUpi(true);
        }
        else if (section === 'payPal') {
            setCreditCard(false); setPayPal(true); setPayByUpi(false);
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent:'center', margin:'30px', backgroundColor: 'white' }}>
            <div className="maindiv d-flex flex-row gap-5"  >
                <div className="payment d-flex flex-column gap-4">
                    <div className="creditcard d-flex flex-column gap-2  p-3" style={{ width: '550px', backgroundColor: '#CDE8E5' }} >
                        <div className="d-flex gap-2 align-items-center">
                            <div style={{ height: '20px', width: '20px', border: creditCard ? '5px solid #7AB2B2' : '5px solid #7AB2B2', backgroundColor: creditCard ? '#7AB2B2' : 'white', borderRadius: '50%' }} onClick={() => toggleDisplay('creditCard')}></div>
                            <label>Credit / Debit Card</label>
                        </div>

                        {creditCard && <div className="hide d-flex flex-column gap-4" id='creditCard' >
                            <div className="cardnumber" >
                                <input type="text" className='inputPayment' style={{ width: '100%' }} placeholder="Card Number"></input>
                            </div>

                            <div className="cardname">
                                <input type="text" className='inputPayment' style={{ width: '100%' }} placeholder="Card Holder Name"></input>
                            </div>

                            <div className="expiry d-flex justify-content-between gap-4">
                                <div className="expirtymm">
                                    <input type="text" className='inputPayment' placeholder="Expiry(mm)"></input>
                                </div>
                                <div className="expirtyyy">
                                    <input type="text" className='inputPayment' placeholder="Expiry(yy)"></input>
                                </div>
                            </div>

                            <div className="cvvpostalcode d-flex justify-content-between">
                                <div className="cvv">
                                    <input type="text" className='inputPayment' placeholder="CVV"></input>
                                </div>
                                <div className="postal">
                                    <input type="text" className='inputPayment' placeholder="postal/zip code"></input>
                                </div>
                            </div>
                            <div className="paybuton">
                                <button className="pay-now">Pay Now</button>
                            </div>
                        </div>}
                    </div>
                    <div className="paypal  p-3" style={{ width: '550px', backgroundColor: '#CDE8E5' }}>
                        <div className="d-flex flex-column gap-2">
                            <div className="d-flex gap-2 align-items-center">
                                <div style={{ height: '20px', width: '20px', borderRadius: '50%', border: payPal ? '5px solid #7AB2B2' : '5px solid #7AB2B2', backgroundColor: payPal ? '#7AB2B2' : 'white' }} onClick={() => toggleDisplay('payPal')}></div>
                                <label>Paypal </label>
                            </div>
                            {payPal && <div className="hide d-flex flex-column gap-4" id='payPal' >
                                <div className="d-flex flex-column">
                                    <b>Email Id</b>
                                    <label>Enter Email ID of your paypal account</label>
                                    <input className='inputPayment' type="email" placeholder="example@email.com"></input>
                                </div>
                                <div className="d-flex flex-column">
                                    <b>Password</b>
                                    <label>Enter Password of your paypal account</label>
                                    <input type="password" className='inputPayment'></input>
                                </div>
                                <div className="paybuton d-flex flex-column">
                                    <button className="pay-now">Pay Now</button>
                                </div>
                            </div>}
                        </div>
                    </div>

                    <div className="paybyupi d-flex flex-column gap-3 p-3" style={{ width: '550px', backgroundColor: '#CDE8E5' }}>
                        <div className="d-flex gap-2 align-items-center">
                            <div style={{ height: '20px', width: '20px', borderRadius: '50%', border: payByUpi ? '5px solid #7AB2B2' : '5px solid #7AB2B2', backgroundColor: payByUpi ? '#7AB2B2' : 'white' }} onClick={() => toggleDisplay('payByUpi')}></div>
                            <label>Pay By UPI </label>
                        </div>
                        {payByUpi && <div id='payByUpi' className="hide d-flex justify-content-between align-items-center gap-3" >
                            <div className="d-flex flex-column gap-2">
                                <b>UPI ID</b>
                                <label>Enter ID of UPI available to you</label>
                                <div className="d-flex flex-row justify-content-between align-items-center gap-5">
                                    <div className="d-flex gap-2 flex-column">
                                        <input type='text' className='inputPayment w-100' placeholder="example@ybl.com"></input>
                                        <button className="pay-now">Pay Now</button>
                                    </div>
                                    <div style={{ fontFamily: 'sans-serif' }}>OR</div>
                                    <div>
                                        <img src={qrCode} height='110px' width='120px' alt='QR '></img>
                                    </div>

                                </div>
                            </div>

                        </div>}

                    </div>
                </div>
                <div className="product" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    <div className="text-center" style={{ fontFamily: 'fantasy', fontSize: '35px', letterSpacing: '1px', color: '#7AB2B2', textDecoration: 'underline' }}>Summary</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {
                            items && (
                                items.map((item, index) => {
                                    finalPrice += item.price * item.quantity
                                    return (
                                        <div className="d-flex  justify-content-between gap-5 p-2" style={{backgroundColor:'#fff9f9'}}>
                                            <div>
                                                <div style={{ fontFamily: 'fantasy', fontSize: '20px', letterSpacing: '1px', color: '#7AB2B2' }}>{item.name}</div>
                                                <div style={{ fontFamily: 'sans-serif', color: 'grey', fontSize: '15px' }}>Quantity {item.quantity} | &#8377;{item.price} each </div>
                                            </div>
                                            <div>
                                                <div style={{ fontFamily: "sans-serif" ,backgroundColor:'#fff9f9'}}>&#8377;{item.price * item.quantity}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                        <div className="d-flex justify-content-between" style={{backgroundColor:'#fff9f9'}}>
                            <div style={{ fontFamily: 'fantasy', fontSize: '20px', letterSpacing: '1px', color: '#7AB2B2' }}>Shipping</div>
                            <div style={{ fontFamily: 'sans-serif', fontSize: '20px', letterSpacing: '1px', color: 'black' }}> &#8377;100</div>
                        </div>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <hr></hr>
                    </div>
                    <div className="d-flex justify-content-between p-3" style={{backgroundColor:'#fff9f9'}}>
                        <div style={{ fontFamily: 'fantasy', fontSize: '25px', letterSpacing: '1px', color: '#7AB2B2' }}>Total</div>
                        <div style={{ fontFamily: 'fantasy', fontSize: '25px', letterSpacing: '1px', color: '#7AB2B2' }}>&#8377;{finalPrice}</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Payment;


//if item alredy in cart show optioin of payment
