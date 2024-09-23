import paypal from 'paypal-rest-sdk';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation'

paypal.configure({
    'mode': 'sandbox', // sandbox or live
    'client_id': '',
    'client_secret': ''
});

export async function GET(req) {
    
    const searchParams = req.nextUrl.searchParams
    const paymentId = searchParams.get('paymentId')
    const token = searchParams.get('token')
    const PayerID = searchParams.get('PayerID')


    console.log('Received PayPal Success Callback:');
    console.log('paymentId:', paymentId);
    console.log('token:', token);
    console.log('PayerID:', PayerID);
    

    const execute_payment_json = {
        "payer_id": PayerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "998.00"
            }
        }]
    }


    try {
        const payment = await createIntent(paymentId,execute_payment_json);

        console.log(payment);

        
        return NextResponse.json({
            message: 'Payment successful!'
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Payment failed!' });
    }

}

function createIntent(paymentId,execute_payment_json) {
    return new Promise((resolve, reject) => {
        paypal.payment.execute(paymentId,execute_payment_json, function (error, payment) {
            if (error) {
                reject(error);
                return;
            }
            resolve(payment);
        });
    });
}


