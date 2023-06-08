import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchItems } from "../../APIManager"
import { ItemCard } from "./ItemCard"

export const Items = ({ filter, seriesFilter, typeFilter }) => {

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

    const filterByOneCriterion = (itemsArray) => {
        const newItemsArray = []
        for (const item of itemsArray) {
            if (item.series.name === filter || item.type.name === filter) {
                newItemsArray.push(item)
            }
        }
        setFilteredItems(newItemsArray)
    }

    const getFilteredItems = (itemsArray) => {
        if (seriesFilter && typeFilter) {
            filterBySeriesAndType(itemsArray)
        } else if (filter) {
            filterByOneCriterion(itemsArray)
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
    },[filter,seriesFilter,typeFilter])


    return (
        <main className="float-right w-5/6 my-nav-height-plus">

            <h3 className="text-center text-3xl font-thin">Results: {filteredItems ? filteredItems.length : 0}</h3>

            {/* Items Container */}
            <section className="mt-16 flex justify-around gap-y-12 flex-wrap">
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