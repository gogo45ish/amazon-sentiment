import React from 'react'

export default function Reviews({ reviews }) {
    return (
        <ul role="list" className="divide-y divide-gray-100 w-full sm:w-[700px]">
            {reviews.map((review) => (
                <li key={review.review_id} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm sm:text-base font-semibold">{review.customer_name}</p>
                            <p className="mt-1 text-xs sm:text-sm whitespace-normal">{review.comment}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
