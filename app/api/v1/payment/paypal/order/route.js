import paypal from 'paypal-rest-sdk';
import { NextResponse } from 'next/server';

paypal.configure({
    'mode': 'sandbox', // sandbox or live
    'client_id': '',
    'client_secret': ''
});

export async function POST(req) {
    const data = await req.json();
    console.log(data);

    // Create items array based on cart items
    const items = data.cart.map((product) => ({
        name: product.name,
        sku: product._id, // You can use a unique identifier here
        price: product.price.toFixed(2), // Format price to 2 decimal places
        currency: 'USD',
        quantity: product.quantity
    }));

    // Total amount calculation based on cart total
    const totalAmount = data.cartTotal.toFixed(2);

    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: 'http://localhost:3000/api/v1/payment/paypal/success', // Adjust to your Next.js frontend URL
            cancel_url: 'http://localhost:3000/failed'   // Adjust to your Next.js frontend URL
        },
        transactions: [{
            item_list: {
                items: items
            },
            amount: {
                currency: 'USD',
                total: totalAmount
            },
            description: 'Payment for items in the cart.'
        }]
    };

    try {
        const payment = await createIntent(create_payment_json);

        // Here save the payid and other details to 
console.log(payment.transactions[0].item_list.items);

        return NextResponse.json({
            message: 'Order Created successful!',
            redirectUrl: payment.links.find(link => link.rel === 'approval_url').href
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Payment failed!' });
    }
}

function createIntent(create_payment_json) {
    return new Promise((resolve, reject) => {
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                reject(error);
                return;
            }
            resolve(payment);
        });
    });
}
