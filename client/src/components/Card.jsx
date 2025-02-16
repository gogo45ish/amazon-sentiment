import React from 'react'

const Card = ({ product }) => {

    return (
        <div className="card bg-base-100 w-full sm:w-80 md:w-96 shadow-xl m-4">
            <figure>
                <img
                    src="https://placehold.co/150"
                    alt="Placeholder Image"
                    className="rounded-md"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg sm:text-xl">
                    {product.name}
                    <div className="badge badge-warning ml-2">{product.rating}</div>
                </h2>
                <p className="text-sm sm:text-base">{product.description}</p>
                <div className="card-actions justify-end mt-4">
                    <div className="badge badge-outline">{product.price}$</div>
                    <div className="badge badge-outline ml-2">{product.asin}</div>
                </div>
            </div>
        </div>
    )
}

export default Card;
