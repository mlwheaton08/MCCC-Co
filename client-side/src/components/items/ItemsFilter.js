import { useEffect, useState } from "react"
import { fetchSeries, fetchTypes } from "../../APIManager"
import { resetFilterIcon } from "../../icons"
import { useNavigate } from "react-router-dom"

export const ItemsFilter = ({ filter, seriesFilter, typeFilter }) => {
    const navigate = useNavigate()

    const [types, setTypes] = useState([])
    const [series, setSeries] = useState([])

    const [isFiltered, setIsFiltered] = useState(false)

    const getFilterOptions = async () => {
        const typesArray = await fetchTypes()
        setTypes(typesArray)
        const seriesArray = await fetchSeries()
        setSeries(seriesArray)
    }

    useEffect(() => {
        getFilterOptions()
        getIsFiltered()
    },[])

    const getFilteredClass = (filterName, filterType) => {
        if (filterName === filterType || filterName === filter) {
            return "bg-accent-primary-color-dark"
        } else {
            return ""
        }
    }

    const getIsFiltered = () => {
        if (filter || seriesFilter || typeFilter) {
            setIsFiltered(true)
        }
    }


    return (
        <main className="fixed top-16 h-screen-minus-nav-height w-1/6 border-r border-bg-tertiary-color bg-bg-tertiary-color">
            <div className="my-8 flex flex-col items-center">
                <h4 className="text-center text-2xl">Filters</h4>
                {
                    filter || seriesFilter || typeFilter
                        ? <span
                            className="p-3 rounded-full hover:bg-bg-tint-color-3 hover:cursor-pointer"
                            onClick={() => navigate("/cymbals")}
                        >
                            {resetFilterIcon()}
                        </span>
                        : ""
                }
            </div>
            <div className="flex flex-col gap-10 text-xl font-thin">
                <section>
                    <h5 className="mb-3 text-center underline">By Type</h5>
                    <div className="flex flex-col">
                        {
                            types.map((type) => {
                                return (
                                    <span
                                        key={type.id}
                                        className={`${getFilteredClass(type.name, typeFilter)} pl-6 py-1 hover:bg-accent-primary-color-dark hover:cursor-pointer`}
                                        onClick={() => navigate(`/cymbals/${type.name}`)}
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
                                        onClick={() => navigate(`/cymbals/${series.name}`)}
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