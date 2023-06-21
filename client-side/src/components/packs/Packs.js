import { useEffect, useState } from "react"
import { fetchPacks } from "../../APIManager"
import { PackCard } from "./PackCard"

export const Packs = ({ setSeriesFilter, setTypeFilter, setIsFilterActive }) => {

    const [packs, setPacks] = useState([])

    const getPacks = async () => {
        const response = await fetchPacks()
        setPacks(response)
    }

    useEffect(() => {
        getPacks()
    },[])


    return (
        <main className="w-3/4 mx-auto my-nav-height-plus">
            <h1 className="mb-10 text-4xl font-thin">Packs</h1>
            {/* Packs container */}
            <div className="flex flex-wrap justify-center gap-8">
                {
                    packs.map((pack) => {
                        return (
                            <PackCard
                                key={pack.id}
                                pack={pack}
                            />
                        )
                    })
                }
            </div>
        </main>
    )
}