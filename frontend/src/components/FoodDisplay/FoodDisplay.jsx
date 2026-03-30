import React, { useContext, useState } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category, searchText }) => {

    const { food_list } = useContext(StoreContext)
    const [showAll, setShowAll] = useState(false)

    // Category + Search filter
    const filteredFood = food_list.filter((item) =>
        (category === "All" || category === item.category) &&
        item.name.toLowerCase().includes(searchText.toLowerCase())
    )

    // Show only 20 initially
    const visibleFood = showAll ? filteredFood : filteredFood.slice(0, 20)

    return (
        <div className='food-display' id='food-display'>

            <h2>Freshly Made, Instantly Loved</h2>

            <div className="food-display-list">
                {visibleFood.map((item) => (
                    <div key={item._id} className="food-wrapper">

                        {/* NEW Badge */}
                        {item.isNew && <span className="new-badge">NEW</span>}

                        <FoodItem
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            image={item.image}
                            price={item.price}
                        />

                    </div>
                ))}
            </div>

            {/* View All Button */}
            {filteredFood.length > 20 && !showAll && (
                <div className="view-all">
                    <button onClick={() => setShowAll(true)}>
                        View All →
                    </button>
                </div>
            )}

        </div>
    )
}

export default FoodDisplay