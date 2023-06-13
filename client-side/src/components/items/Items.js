import { useEffect, useState } from "react"
import { fetchItems, searchItems } from "../../APIManager"
import { ItemCard } from "./ItemCard"
import { useNavigate } from "react-router-dom"

export const Items = ({ setSeriesFilter, seriesFilter, setTypeFilter, typeFilter, setIsFilterActive, searchTerms }) => {

    const navigate = useNavigate()

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
        let itemsArray = []
        if (searchTerms) {
            itemsArray = await searchItems(searchTerms, null)
        } else {
            itemsArray = await fetchItems()
        }
        setItems(itemsArray)
        getFilteredItems(itemsArray)
    }

    useEffect(() => {
        getItems()
    },[seriesFilter,typeFilter,searchTerms])


    return (
        <main className="float-right w-5/6 my-nav-height-plus">

            {
                !searchTerms
                    ? ""
                    : <div className="mb-4 flex justify-center items-baseline gap-4">
                        <h3 className="text-center text-2xl font-thin">You searched: "{searchTerms}"</h3>
                        <button
                            className="text-accent-primary-color-light underline"
                            onClick={() => {
                                document.getElementById("search").value = ""
                                setSeriesFilter("")
                                setTypeFilter("")
                                setIsFilterActive(false)
                                navigate("/cymbals")
                            }}
                        >
                            clear search
                        </button>
                    </div>
            }
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