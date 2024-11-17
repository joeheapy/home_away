import { calculateDaysBetween } from "./calendar";

type BookingDetails = {
    checkIn: Date;
    checkOut: Date;
    price: number;
}


export function calculateTotals({checkIn, checkOut, price}: BookingDetails) {
    const totalNights = calculateDaysBetween({checkIn, checkOut});
    const subTotal = price * totalNights;
    const cleaningFee = 21;
    const serviceFee = 0.05 * subTotal;
    const tax = subTotal * 0.1;
    const orderTotal = subTotal + cleaningFee + serviceFee + tax;
    return { totalNights, subTotal, cleaningFee, serviceFee, tax, orderTotal };
}