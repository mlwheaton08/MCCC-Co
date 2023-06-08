import { Route, Routes, useParams } from "react-router-dom"
import { Items } from "./Items"
import { ItemsFilter } from "./ItemsFilter"

export const ItemsPageContainer = ({ isFilterActive, setIsFilterActive }) => {

    const {seriesFilter} = useParams()
    const {typeFilter} = useParams()


    return <>
        <ItemsFilter
            seriesFilter={seriesFilter}
            typeFilter={typeFilter}
            isFilterActive={isFilterActive}
            setIsFilterActive={setIsFilterActive}
        />
        <Items
            seriesFilter={seriesFilter}
            typeFilter={typeFilter}
        />
    </>
}