import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchItems } from "../../APIManager"
import { ItemCard } from "./ItemCard"

export const Items = () => {
    const {sortBy} = useParams()
    const {asc} = useParams()

    const [items, setItems] = useState([])

    const getItems = async () => {
        const itemsArray = await fetchItems(sortBy, asc)
        setItems(itemsArray)
    }

    useEffect(() => {
        getItems()
    },[])


    return (
        <main className="my-nav-height-plus">

            <h3 className="text-center text-4xl">Results: {items ? items.length : ""}</h3>

            {/* Items Container */}
            <section className="mt-16 flex justify-around gap-y-12 flex-wrap">
                {
                    !items
                        ? ""
                        : items.map((item) => {
                            return <ItemCard
                                key={item.id}
                                item={item}
                            />
                        })
                }
            </section>
        </main>
    )
}