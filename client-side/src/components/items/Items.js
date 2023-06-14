import { useEffect, useState } from "react"
import { fetchItems, searchItems } from "../../APIManager"
import { ItemCard } from "./ItemCard"
import { useNavigate } from "react-router-dom"

export const Items = ({ setSeriesFilter, seriesFilter, setTypeFilter, typeFilter, setIsFilterActive, setSearchState, searchState }) => {

    const navigate = useNavigate()

    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [sort, setSort] = useState("Most Popular")
    const [sortedItems, setSortedItems] = useState([])

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
        if (searchState) {
            itemsArray = await searchItems(searchState, null)
        } else {
            itemsArray = await fetchItems()
        }
        setItems(itemsArray)
        getFilteredItems(itemsArray)
    }

    useEffect(() => {
        getItems()
    },[seriesFilter,typeFilter,searchState])

    const comparePurchaseCount = ( a, b ) => {
        if ( a.purchaseCount < b.purchaseCount ){
            return -1;
        }
        if ( a.purchaseCount > b.purchaseCount ){
            return 1;
        }
        return 0;
    }

    const comparePrice = ( a, b ) => {
        if ( a.price < b.price ){
            return -1;
        }
        if ( a.price > b.price ){
            return 1;
        }
        return 0;
    }

    const compareWidth = ( a, b ) => {
        if ( a.width < b.width ){
            return -1;
        }
        if ( a.width > b.width ){
            return 1;
        }
        return 0;
    }

    const getSortedItems = () => {
        const copy = [...filteredItems]
        switch(sort) {
            case "Most Popular":
                copy.sort(comparePurchaseCount).reverse()
                break;
            case "Price - High":
                copy.sort(comparePrice).reverse()
                break;
            case "Price - Low":
                copy.sort(comparePrice)
                break;
            case "Size - Big":
                copy.sort(compareWidth).reverse()
                break;
            case "Size - Small":
                copy.sort(compareWidth)
                break;
            default:
                break;
        }
        setSortedItems(copy)
    }

    useEffect(() => {
        getSortedItems()
    },[sort,filteredItems])


    return (
        <main className="float-right w-5/6 my-nav-height-plus">

            {
                !searchState
                    ? ""
                    : <div className="mb-4 flex justify-center items-baseline gap-4">
                        <h3 className="text-center text-2xl font-thin">You searched: "{searchState}"</h3>
                        <button
                            className="text-accent-primary-color-light underline"
                            onClick={() => {
                                document.getElementById("search").value = ""
                                setSearchState("")
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

            {/* Sort */}
            <div className="text-right pr-8">
                <span className="text-xl">Sort by </span>
                <select
                    className="rounded border border-text-secondary-color bg-bg-primary-color text-lg font-thin"
                    onChange={(evt) => setSort(evt.target.value)}
                >
                    <option value="Most Popular">Most Popular</option>
                    <option value="Price - High">Price - High</option>
                    <option value="Price - Low">Price - Low</option>
                    <option value="Size - Big">Size - Big</option>
                    <option value="Size - Small">Size - Small</option>
                </select>
            </div>

            {/* Items Container */}
            <section className="mt-16 flex justify-center gap-x-2 gap-y-12 flex-wrap">
                {
                    !items
                        ? ""
                        : sortedItems.map((item) => {
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