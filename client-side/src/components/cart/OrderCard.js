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
                    <Accordion.Title className="h-20 bg-bg-secondary-color text-2xl hover:bg-bg-tertiary-color hover:text-black">
                        <div className="flex gap-2">
                            <span className="font-bold">
                                {new Date(order.dateCompleted).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}
                            </span>
                            <span>
                                -
                            </span>
                            <span className="font-medium">
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
                        <section className="mt-6 flex justify-between">
                            <span>Confirmation Number: {order.confirmationNumber}</span>
                            <span>Total Value: ${order.totalValue}</span>
                            <span>Total Paid: ${order.totalPaid}</span>
                            <span>
                                Rewards Used:
                                {
                                    !order.rewardsUsed
                                        ? " 0"
                                        : ` ${order.rewardsUsed}`
                                }
                            </span>
                        </section>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </main>
    )
}