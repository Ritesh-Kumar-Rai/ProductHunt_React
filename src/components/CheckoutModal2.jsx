import { useState } from "react";
import { Dialog, Tabs, Box, Text, Callout } from "@radix-ui/themes";
import { FaUser } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { BsExclamationTriangleFill } from "react-icons/bs";

const CheckoutModal2 = ({ cartItems }) => {
    const [checkoutData, setCheckoutData] = useState({
        selectedAddress: null,
        savedAddresses: [],
        paymentMethod: null,
    });

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    title="Proceed to Checkout button"
                >
                    Proceed to Checkout
                </button>
            </Dialog.Trigger>

            <Dialog.Content
                maxWidth="100vw"
                maxHeight="100vh"
                height="90vh"
                className="p-2"
            >
                <section className="w-full h-full grid grid-cols-1 md:grid-cols-[70%_30%] gap-2">
                    {/* LEFT COLUMN */}
                    <div className="order-1 p-2 border-r">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-3 border-b pb-2">
                            <div>
                                <Dialog.Title className="uppercase font-semibold text-xl">
                                    Checkout
                                </Dialog.Title>
                                <Dialog.Description className="uppercase text-sm text-gray-500">
                                    Review and place your order
                                </Dialog.Description>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-blue-600 flex items-center gap-1">
                                    <FaUser /> Username
                                </div>
                                <Dialog.Close className="cursor-pointer hover:text-red-700 md:hidden">
                                    <IoCloseSharp size="30" />
                                </Dialog.Close>
                            </div>
                        </div>

                        <Callout.Root color="amber" role="alert">
                            <Callout.Icon>
                                <BsExclamationTriangleFill />
                            </Callout.Icon>
                            <Callout.Text>
                                Hold On. This website is under production, the Checkout feature is incomplete!
                            </Callout.Text>
                        </Callout.Root>

                        {/* TAB NAVIGATION */}
                        <Tabs.Root defaultValue="address">
                            <Tabs.List className="flex gap-3 mb-3 border-b pb-1">
                                <Tabs.Trigger value="address">Address</Tabs.Trigger>
                                <Tabs.Trigger value="payment">Payment</Tabs.Trigger>
                                <Tabs.Trigger value="review">Review</Tabs.Trigger>
                            </Tabs.List>

                            <Box pt="3">
                                <Tabs.Content value="address">
                                    <AddressTab
                                        checkoutData={checkoutData}
                                        setCheckoutData={setCheckoutData}
                                    />
                                </Tabs.Content>

                                <Tabs.Content value="payment">
                                    <PaymentTab
                                        checkoutData={checkoutData}
                                        setCheckoutData={setCheckoutData}
                                    />
                                </Tabs.Content>

                                <Tabs.Content value="review">
                                    <ReviewTab checkoutData={checkoutData} cartItems={cartItems} />
                                </Tabs.Content>
                            </Box>
                        </Tabs.Root>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="order-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-inner">
                        <OrderSummary cartItems={cartItems} checkoutData={checkoutData} />
                    </div>
                </section>
            </Dialog.Content>
        </Dialog.Root>
    );
};


const AddressTab = ({ checkoutData, setCheckoutData }) => {
    const { savedAddresses, selectedAddress } = checkoutData;

    const handleSelectAddress = (addr) => {
        setCheckoutData((prev) => ({ ...prev, selectedAddress: addr }));
    };

    return (
        <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg">Select or Add Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savedAddresses.length ? (
                    savedAddresses.map((addr, i) => (
                        <div
                            key={i}
                            onClick={() => handleSelectAddress(addr)}
                            className={`p-3 border rounded-md cursor-pointer ${selectedAddress === addr
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-300"
                                }`}
                        >
                            <p>{addr.name}</p>
                            <p className="text-sm text-gray-600">{addr.addressLine}</p>
                            <p className="text-sm text-gray-600">{addr.city}</p>
                        </div>
                    ))
                ) : (
                    <Text size="2" className="text-gray-600">
                        No saved addresses yet.
                    </Text>
                )}
            </div>

            <button className="self-start bg-blue-600 text-white rounded-md px-3 py-1 mt-2">
                + Add New Address
            </button>
        </div>
    );
};


const PaymentTab = ({ checkoutData, setCheckoutData }) => {
    const paymentOptions = ["Credit Card", "UPI", "Net Banking", "COD"];

    return (
        <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg">Select Payment Method</h3>
            {paymentOptions.map((method) => (
                <label
                    key={method}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={checkoutData.paymentMethod === method}
                        onChange={() =>
                            setCheckoutData((prev) => ({ ...prev, paymentMethod: method }))
                        }
                    />
                    {method}
                </label>
            ))}
        </div>
    );
};


const ReviewTab = ({ checkoutData, cartItems }) => {
    const { selectedAddress, paymentMethod } = checkoutData;

    return (
        <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg mb-2">Review Your Order</h3>
            <div className="p-3 border rounded-md">
                <h4 className="font-semibold">Delivery Address</h4>
                {selectedAddress ? (
                    <>
                        <p>{selectedAddress.name}</p>
                        <p>{selectedAddress.addressLine}</p>
                        <p>{selectedAddress.city}</p>
                    </>
                ) : (
                    <Text size="2" className="text-gray-600">
                        No address selected
                    </Text>
                )}
            </div>

            <div className="p-3 border rounded-md">
                <h4 className="font-semibold">Payment Method</h4>
                {paymentMethod ? (
                    <p>{paymentMethod}</p>
                ) : (
                    <Text size="2" className="text-gray-600">
                        No payment method chosen
                    </Text>
                )}
            </div>

            <div className="p-3 border rounded-md">
                <h4 className="font-semibold">Items</h4>
                {cartItems.map((item) => (
                    <p key={item.id} className="text-sm">
                        {item.title} × {item.quantity}
                    </p>
                ))}
            </div>

            <button className="bg-green-600 text-white rounded-md px-4 py-2 mt-3 hover:bg-green-700">
                Place Order
            </button>
        </div>
    );
};


const OrderSummary = ({ cartItems, checkoutData }) => {
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    return (
        <div>
            <div className="flex gap-2 items-center justify-between">
                <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
                <Dialog.Close className="cursor-pointer hover:text-red-700 hidden md:block">
                    <IoCloseSharp size="30" />
                </Dialog.Close>
            </div>
            <div className="flex flex-col gap-1 text-sm">
                <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
                <p>Tax (5%): ₹{tax.toFixed(2)}</p>
                <p className="font-semibold mt-2">Total: ₹{total.toFixed(2)}</p>
            </div>
            {checkoutData.paymentMethod && (
                <p className="text-xs text-green-700 mt-2">
                    Paying via {checkoutData.paymentMethod}
                </p>
            )}
        </div>
    );
};




export default CheckoutModal2;


