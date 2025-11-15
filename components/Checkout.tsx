import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { RootState, AppDispatch } from "../store";
import { createOrder } from "../store/orderSlice";
import { clearCart } from "../store/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { loading, error } = useSelector((state: RootState) => state.order);
  const { user } = useSelector((state: RootState) => state.auth);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    pincode: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  useEffect(() => {
    if (user?.location) {
      setShippingInfo({
        name: user.name || "",
        address: user.location.address || "",
        city: user.location.city || "",
        pincode: user.location.pincode || "",
        state: user.location.state || "",
        landmark: user.location.landmark || "",
      });
    }
  }, [user]);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.id]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, [e.target.id]: e.target.value });
  };

  const subtotal = cartItems
    .filter((item) => item && item.price)
    .reduce((acc, item) => {
      const price = parseFloat(item.price.replace("₹", "") || "0");
      return acc + price * item.quantity;
    }, 0);

  const handlePlaceOrder = async () => {
    const orderData = {
      items: cartItems,
      shippingInfo,
      paymentMethod: "Card", // Or get from a form input
      totalAmount: subtotal,
    };

    const result = await dispatch(createOrder(orderData));
    if (createOrder.fulfilled.match(result)) {
      dispatch(clearCart());
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full mt-4">Checkout</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Confirm your order</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>{item.price}</span>
                </div>
              ))}
              <Separator className="my-4" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>
                Enter your shipping details below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={shippingInfo.name}
                  onChange={handleShippingChange}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="123 Main St"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    value={shippingInfo.state}
                    onChange={handleShippingChange}
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="San Francisco"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="landmark">Land Mark</Label>
                  <Input
                    id="landmark"
                    placeholder="Land Mark"
                    value={shippingInfo.landmark}
                    onChange={handleShippingChange}
                  />
                </div>

                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    placeholder="94103"
                    value={shippingInfo.pincode}
                    onChange={handleShippingChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                Enter your payment information to complete the purchase.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="**** **** **** 1234"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={paymentInfo.expiryDate}
                    onChange={handlePaymentChange}
                  />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={paymentInfo.cvc}
                    onChange={handlePaymentChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            className="w-full mt-6"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Checkout;
