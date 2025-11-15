"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  fetchCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Trash2 } from "lucide-react";
import Checkout from "./Checkout";
import Image from "next/image";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const userInfo = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchCart());
    }
  }, [dispatch, userInfo]);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const subtotal = cartItems
    .filter((item) => item && item.price)
    .reduce((acc, item) => {
      const price = parseFloat(item.price.replace("₹", "") || "0");
      return acc + price * item.quantity;
    }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        className="
          cart-sidebar-content 
          bg-white text-gray-900 
          dark:bg-[#0c0c0e] dark:text-gray-100 
          border-l border-gray-200 dark:border-gray-800
          flex flex-col
        "
      >
        {/* Header */}
        <SheetHeader className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <SheetTitle className="text-lg font-semibold dark:text-white">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        {/* Body */}
        <div className="cart-sidebar-body space-y-4 py-4 max-h-[70vh] overflow-y-auto flex-1">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
          ) : (
            cartItems.filter(Boolean).map((item) => (
              <div
                key={item.id}
                className="
                  cart-item 
                  flex justify-between items-center 
                  p-3 rounded-xl 
                  border border-gray-200 dark:border-gray-800 
                  bg-gray-50 dark:bg-[#141417]
                  transition
                "
              >
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image rounded-md"
                    width={64}
                    height={64}
                  />

                  <div className="cart-item-details ml-3">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.price}
                    </p>

                    <div className="cart-item-quantity flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="
                          h-6 w-6 
                          dark:border-gray-700 
                          dark:text-gray-300 
                          dark:hover:bg-gray-800
                        "
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        -
                      </Button>

                      <span className="mx-3 text-gray-900 dark:text-gray-100">
                        {item.quantity}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="
                          h-6 w-6 
                          dark:border-gray-700 
                          dark:text-gray-300 
                          dark:hover:bg-gray-800
                        "
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="
                    text-gray-600 dark:text-gray-400 
                    hover:text-red-500 dark:hover:text-red-400
                  "
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-sidebar-footer mt-4 border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="flex justify-between font-semibold mb-3">
              <span className="text-gray-900 dark:text-gray-200">Subtotal</span>
              <span className="text-gray-900 dark:text-gray-100">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>

            <Checkout />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
