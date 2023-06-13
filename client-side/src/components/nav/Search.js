import { useEffect, useState } from "react"
import { searchItems } from "../../APIManager"
import { useNavigate } from "react-router-dom"

export const Search = ({ searchState, setSearchState }) => {

    const navigate = useNavigate()

    const [topSearchResults, setTopSearchResults] = useState([])
    const [searchDropdown, setSearchDropdown] = useState(false)

    const getTopFiveSearchResults = async () => {
        if (searchState) {
            const response = await searchItems(searchState, 5)
            setTopSearchResults(response)
            setSearchDropdown(true)
        } else {
            setSearchDropdown(false)
        }
    }

    useEffect(() => {
        getTopFiveSearchResults()
    },[searchState])

    document.body.addEventListener("click", () => {
        if (document.activeElement.id !== "search" || !searchState) {
            setSearchDropdown(false)
        } else {
            setSearchDropdown(true)
        }
    })


    return (
        <div className="w-2/5">
            <input
                id="search"
                autoComplete="off"
                className="w-full h-9 px-2 bg-bg-tint-color-3 text-text-primary-color font-thin focus:outline-none"
                placeholder="search..."
                onChange={(evt) => setSearchState(evt.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        navigate(`/cymbals/search/${searchState}`)
                        setSearchDropdown(false)
                    }
                }}
            />
            {
                !searchDropdown
                    ? ""
                    : <div className="absolute w-2/5 bg-bg-quaternary-color">
                        {
                            topSearchResults.map((item, index) => {
                                return <div className="flex flex-col items-center">
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center font-thin hover:bg-bg-tint-color-2 hover:cursor-pointer"
                                        onClick={() => {
                                            navigate(`/cymbal/${item.id}`)
                                            setSearchState("")
                                            document.getElementById("search").value = ""
                                    }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={`Cymbal - ${item.width} ${item.series.name} ${item.type.name}`}
                                            className="w-1/6"
                                        />
                                        <div className="mr-auto">
                                            <span>{item.width}" </span>
                                            <span>{item.series.name} </span>
                                            <span>{item.type.name} </span>
                                        </div>
                                        <span className="mr-4">Alloy: {item.series.alloy}</span>
                                    </div>
                                    {
                                        index === (topSearchResults.length - 1)
                                            ? ""
                                            : <span className="w-11/12 h-px bg-bg-tint-color-3"></span>
                                    }
                                </div>
                            })
                        }
                    </div>
            }
        </div>
    )
}