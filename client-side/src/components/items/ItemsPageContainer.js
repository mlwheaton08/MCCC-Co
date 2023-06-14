import { useParams } from "react-router-dom"
import { Items } from "./Items"
import { ItemsFilter } from "./ItemsFilter"

export const ItemsPageContainer = ({ setSeriesFilter, seriesFilter, setTypeFilter, typeFilter, isFilterActive, setIsFilterActive, setSearchState, searchState }) => {

    return <>
        <ItemsFilter
            setSeriesFilter={setSeriesFilter}
            seriesFilter={seriesFilter}
            setTypeFilter={setTypeFilter}
            typeFilter={typeFilter}
            isFilterActive={isFilterActive}
            setIsFilterActive={setIsFilterActive}
        />
        <Items
            setSeriesFilter={setSeriesFilter}
            seriesFilter={seriesFilter}
            setTypeFilter={setTypeFilter}
            typeFilter={typeFilter}
            setIsFilterActive={setIsFilterActive}
            setSearchState={setSearchState}
            searchState={searchState}
        />
    </>
}