import { Accordion } from "flowbite-react"
import { OrderItem } from "./OrderItem"

export const OrderCard = ({ order }) => {
    const getOrderItemCount = () => {
        let count = 0
        for (const orderItem of order.orderItems) {
            count += orderItem.itemQuantity
        }
        if (count === 1) {
            return "1 item"
        } else {
            return `${count} items`
        }
    }


    return (
        <main>
            <Accordion collapseAll className="border-none">
                <Accordion.Panel>
                    <Accordion.Title className="h-20 bg-bg-secondary-color text-2xl hover:bg-border-color-1 hover:text-bg-primary-color">
                        <div className="flex gap-2">
                            <span>
                                {new Date(order.dateCompleted).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}
                            </span>
                            <span>
                                -
                            </span>
                            <span className="font-thin">
                                {getOrderItemCount()}
                            </span>
                        </div>
                    </Accordion.Title>
                    <Accordion.Content className="pb-2 bg-bg-secondary-color">
                        {
                            order.orderItems.map((orderItem) => {
                                return (
                                    <OrderItem
                                        key={orderItem.id}
                                        orderItem={orderItem}
                                    />
                                )
                            })
                        }
                        {/* Payment and Shipping */}
                        <section className="mt-6 flex justify-between items-end">
                            {/* Payment */}
                            <div className="flex flex-col">
                                <p>Total Value: ${order.totalValue}</p>
                                <p>Total Paid: ${order.totalPaid}</p>
                                <p>
                                    Rewards Used:
                                    {
                                        !order.rewardsUsed
                                        ? " 0"
                                        : ` ${order.rewardsUsed}`
                                    }
                                </p>
                                <p>Confirmation Number: {order.confirmationNumber}</p>
                            </div>
                            {/* Shipping */}
                            <div className="flex flex-col text-right">
                                <p className="font-semibold">Shipped to:</p>
                                {!order.shipCompanyName ? "" : <p>{order.shipCompanyName}</p>}
                                <p>{order.shipLineOne}</p>
                                {!order.shipLineTwo ? "" : <p>{order.shipLineTwo}</p>}
                                <p>{order.shipCity}, {order.shipState} {order.shipZIPCode}</p>
                                <p>{order.shipCountry}</p>
                            </div>
                        </section>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </main>
    )
}