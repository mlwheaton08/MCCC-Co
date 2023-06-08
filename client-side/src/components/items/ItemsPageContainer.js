import { Route, Routes, useParams } from "react-router-dom"
import { Items } from "./Items"
import { ItemsFilter } from "./ItemsFilter"

export const ItemsPageContainer = () => {

    const {filter} = useParams()
    const {seriesFilter} = useParams()
    const {typeFilter} = useParams()


    return <>
        <ItemsFilter
            filter={filter}
            seriesFilter={seriesFilter}
            typeFilter={typeFilter}
        />
        <Items
            filter={filter}
            seriesFilter={seriesFilter}
            typeFilter={typeFilter}
        />
    </>
}