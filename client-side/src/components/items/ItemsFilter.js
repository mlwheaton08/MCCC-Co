import { useEffect, useState } from "react"
import { fetchSeries, fetchTypes } from "../../APIManager"
import { resetFilterIcon } from "../../icons"
import { useNavigate } from "react-router-dom"

export const ItemsFilter = ({ seriesFilter, typeFilter, isFilterActive, setIsFilterActive }) => {

    const navigate = useNavigate()

    const [types, setTypes] = useState([])
    const [series, setSeries] = useState([])

    const getFilterOptions = async () => {
        const typesArray = await fetchTypes()
        setTypes(typesArray)
        const seriesArray = await fetchSeries()
        setSeries(seriesArray)
    }

    const getIsFilterActive = () => {
        if (seriesFilter || typeFilter) {
            setIsFilterActive(true)
        }
    }

    useEffect(() => {
        getFilterOptions()
        getIsFilterActive()
    },[seriesFilter,typeFilter])

    const createTypeFilterUrl = (criterion) => {
        if ((!seriesFilter && !typeFilter) || (!seriesFilter && typeFilter)) {
            return `/cymbals/type/${criterion}`
        } else if ((seriesFilter && typeFilter) || (seriesFilter && !typeFilter)) {
            return `/cymbals/series/${seriesFilter}/type/${criterion}`
        }
    }

    const createSeriesFilterUrl = (criterion) => {
        if ((!seriesFilter && !typeFilter) || (seriesFilter && !typeFilter)) {
            return `/cymbals/series/${criterion}`
        } else if ((seriesFilter && typeFilter) || (!seriesFilter && typeFilter)) {
            return `/cymbals/series/${criterion}/type/${typeFilter}`
        }
    }

    const getFilteredClass = (filterOption, currentFilter) => {
        if (filterOption === currentFilter) {
            return "bg-accent-primary-color-dark"
        } else {
            return ""
        }
    }


    return (
        <main className="fixed top-nav-height h-screen-minus-nav-height w-1/6 border-r border-bg-tertiary-color bg-bg-tertiary-color">
            <div className="mt-8 mb-4 flex justify-center items-center gap-2">
                <h4 className="text-center text-2xl">Filter</h4>
                {
                    isFilterActive
                        ? <span
                            className="p-3 rounded-full hover:bg-bg-tint-color-3 hover:cursor-pointer"
                            onClick={() => {
                                navigate("/cymbals")
                                setIsFilterActive(false)
                            }}
                        >
                            {resetFilterIcon()}
                        </span>
                        : ""
                }
            </div>
            <div className="w-11/12 h-px mx-auto mb-8 bg-border-color-1"></div>
            <div className="flex flex-col gap-10 text-xl font-thin">
                <section>
                    <h5 className="mb-3 text-center underline">By Type</h5>
                    <div className="flex flex-col gap-px">
                        {
                            types.map((type) => {
                                return (
                                    <span
                                        key={type.id}
                                        className={`${getFilteredClass(type.name, typeFilter)} pl-6 py-1 hover:bg-accent-primary-color-dark hover:cursor-pointer`}
                                        onClick={() => navigate(createTypeFilterUrl(type.name))}
                                    >
                                        {type.name}
                                    </span>
                                )
                            })
                        }
                    </div>
                </section>
                <section>
                    <h5 className="mb-3 text-center underline">By Series</h5>
                    <div className="flex flex-col">
                        {
                            series.map((series) => {
                                return (
                                    <span
                                        key={series.id}
                                        className={`${getFilteredClass(series.name, seriesFilter)} pl-6 py-1 hover:bg-accent-primary-color-dark hover:cursor-pointer`}
                                        onClick={() => navigate(createSeriesFilterUrl(series.name))}
                                    >
                                        {series.name}
                                    </span>
                                )
                            })
                        }
                    </div>
                </section>
            </div>
        </main>
    )
}