import { useEffect, useState } from "react"
import { fetchDistributors } from "../../APIManager"
import { DistributorCard } from "./DistributorCard"

export const Distributors = () => {

    const [distributors, setDistributors] = useState([])
    const [filteredDistributors, setFilteredDistributors] = useState([])

    const [countryFilterOptions, setCountryFilterOptions] = useState([])
    const [stateFilterOptions, setStateFilterOptions] = useState([])
    const [cityFilterOptions, setCityFilterOptions] = useState([])

    const [countryFilter, setCountryFilter] = useState("")
    const [stateFilter, setStateFilter] = useState("")
    const [cityFilter, setCityFilter] = useState("")

    const getDistributors = async () => {
        const distributorsArray = await fetchDistributors()
        setDistributors(distributorsArray)
        setFilteredDistributors(distributorsArray)
        getCountryFilterOptions(distributorsArray)
    }

    const getCountryFilterOptions = (distributorsArray) => {
        const countries = []
        for (const distributor of distributorsArray) {
            const foundCountry = countries.find((c) => c === distributor.country)
            if (!foundCountry) {
                countries.push(distributor.country)
            }
        }
        countries.sort()
        setCountryFilterOptions(countries)
    }

    const getStateFilterOptions = () => {
        if (countryFilter) {
            const states = []
            for (const distributor of distributors) {
                if (distributor.country === countryFilter) {
                    const foundState = states.find((s) => s === distributor.state)
                    if (!foundState) {
                        states.push(distributor.state)
                    }
                }
            }
            states.sort()
            setStateFilterOptions(states)
        } else {
            setStateFilterOptions([])
        }
    }

    const getCityFilterOptions = () => {
        if (stateFilter) {
            const cities = []
            for (const distributor of distributors) {
                if (distributor.state === stateFilter) {
                    const foundCity = cities.find((c) => c === distributor.city)
                    if (!foundCity) {
                        cities.push(distributor.city)
                    }
                }
            }
            cities.sort()
            setCityFilterOptions(cities)
        } else {
            setCityFilterOptions([])
        }
    }

    const filterByCountry = () => {
        setStateFilter("")
        setCityFilter("")

        const distArray = []
        if (countryFilter) {
            for (const distributor of distributors) {
                if (distributor.country === countryFilter) {
                    distArray.push(distributor)
                }
            }
            setFilteredDistributors(distArray)
        } else {
            setFilteredDistributors(distributors)
        }
    }

    const filterByState = () => {
        setCityFilter("")

        const distArray = []
        if (stateFilter) {
            for (const distributor of distributors) {
                if (distributor.state === stateFilter) {
                    distArray.push(distributor)
                }
            }
            setFilteredDistributors(distArray)
        } else {
            filterByCountry()
        }
    }

    const filterByCity = () => {
        const distArray = []
        if (cityFilter) {
            for (const distributor of distributors) {
                if (distributor.city === cityFilter) {
                    distArray.push(distributor)
                }
            }
            setFilteredDistributors(distArray)
        } else {
            filterByState()
        }
    }

    useEffect(() => {
        getDistributors()
    },[])

    useEffect(() => {
        getStateFilterOptions()
        getCityFilterOptions()
    },[filteredDistributors])

    useEffect(() => {
        filterByCountry()
    },[countryFilter])

    useEffect(() => {
        filterByState()
    },[stateFilter])

    useEffect(() => {
        filterByCity()
    },[cityFilter])


    return (
        <main className="w-4/5 mx-auto my-nav-height-plus flex flex-col gap-10">
            <h1 className="text-4xl font-thin">Distributors</h1>

            {/* Filter */}
            <section className="relative flex gap-2">
                <span className="text-xl">Filter:</span>
                <select
                    className="rounded border border-text-secondary-color bg-bg-primary-color text-lg font-thin"
                    onChange={(evt) => setCountryFilter(evt.target.value)}
                >
                    <option value="">All Countries</option>
                    {
                        countryFilterOptions.map((country, index) => {
                            return (
                                <option
                                    key={`country--${index}`}
                                    value={country}
                                >
                                    {country}
                                </option>
                            )
                        })
                    }
                </select>
                {
                    !countryFilter
                        ? ""
                        : <select
                            className="rounded border border-text-secondary-color bg-bg-primary-color text-lg font-thin"
                            onChange={(evt) => setStateFilter(evt.target.value)}
                        >
                            <option value="">All States</option>
                            {
                                stateFilterOptions.map((state, index) => {
                                    return (
                                        <option
                                            key={`state--${index}`}
                                            value={state}
                                        >
                                            {state}
                                        </option>
                                    )
                                })
                            }
                        </select>
                }
                {
                    !stateFilter
                        ? ""
                        : <select
                            className="rounded border border-text-secondary-color bg-bg-primary-color text-lg font-thin"
                            onChange={(evt) => setCityFilter(evt.target.value)}
                        >
                            <option value="">All Cities</option>
                            {
                                cityFilterOptions.map((city, index) => {
                                    return (
                                        <option
                                            key={`city--${index}`}
                                            value={city}
                                        >
                                            {city}
                                        </option>
                                    )
                                })
                            }
                        </select>
                }
            </section>

            {/* Distributors container */}
            <section className="flex flex-wrap justify-center gap-x-6 gap-y-10">
                {
                    filteredDistributors.map((distributor) => {
                        return (
                            <DistributorCard
                                key={distributor.id}
                                distributor={distributor}
                            />
                        )
                    })
                }
            </section>
        </main>
    )
}