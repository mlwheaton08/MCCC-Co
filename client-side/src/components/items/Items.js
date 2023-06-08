import { useEffect, useState } from "react"
import { fetchItems } from "../../APIManager"
import { ItemCard } from "./ItemCard"

export const Items = ({ seriesFilter, typeFilter }) => {

    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])

    const filterBySeriesAndType = (itemsArray) => {
        const newItemsArray = []
        for (const item of itemsArray) {
            if (item.series.name === seriesFilter && item.type.name === typeFilter) {
                newItemsArray.push(item)
            }
        }
        setFilteredItems(newItemsArray)
    }

    const filterBySeries = (itemsArray) => {
        const newItemsArray = []
        for (const item of itemsArray) {
            if (item.series.name === seriesFilter) {
                newItemsArray.push(item)
            }
        }
        setFilteredItems(newItemsArray)
    }

    const filterByType = (itemsArray) => {
        const newItemsArray = []
        for (const item of itemsArray) {
            if (item.type.name === typeFilter) {
                newItemsArray.push(item)
            }
        }
        setFilteredItems(newItemsArray)
    }

    const getFilteredItems = (itemsArray) => {
        if (seriesFilter && typeFilter) {
            filterBySeriesAndType(itemsArray)
        } else if (seriesFilter && !typeFilter) {
            filterBySeries(itemsArray)
        } else if (!seriesFilter && typeFilter) {
            filterByType(itemsArray)
        } else {
            setFilteredItems(itemsArray)
        }
    }

    const getItems = async () => {
        const itemsArray = await fetchItems()
        setItems(itemsArray)
        getFilteredItems(itemsArray)
    }

    useEffect(() => {
        getItems()
    },[seriesFilter,typeFilter])


    return (
        <main className="float-right w-5/6 my-nav-height-plus">

            <h3 className="text-center text-3xl font-thin">Results: {filteredItems ? filteredItems.length : 0}</h3>

            {/* Items Container */}
            <section className="mt-16 flex justify-center gap-x-2 gap-y-12 flex-wrap">
                {
                    !items
                        ? ""
                        : filteredItems.map((item) => {
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