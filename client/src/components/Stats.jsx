import React from 'react';
import { FaSmileBeam } from "react-icons/fa";
import { IoChatbubblesSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { PiSmileySadFill } from "react-icons/pi";
import { RiEmotionNormalFill } from "react-icons/ri";
import CountUp from 'react-countup';
import Card from './Card';
import Reviews from './Reviews';

const Stats = React.memo(({ data }) => {
    const sentiment = data.sentiment;

    const maxSentiment = sentiment.reduce((max, current) => {
        return current.score > max.score ? current : max;
    });

    return (
        <>
            <div className="stats shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Overall Sentiment */}
                <div className="stat flex flex-col items-center justify-center p-4">
                    <div className="stat-figure text-secondary">
                        {maxSentiment.label === "positive" ? <FaSmileBeam className='inline-block h-8 w-8 stroke-current text-green-500' /> :
                            maxSentiment.label === "negative" ? <PiSmileySadFill className='inline-block h-8 w-8 stroke-current text-red-700' /> :
                                <RiEmotionNormalFill className='inline-block h-8 w-8 stroke-current text-yellow-400' />}
                    </div>
                    <div className="stat-title text-sm sm:text-base">Overall Sentiment</div>
                    <div className="stat-value">
                        <CountUp start={0} end={maxSentiment.score * 100} duration={3} suffix="%" />
                    </div>
                    <div className="stat-desc text-xs sm:text-sm">{maxSentiment.label}</div>
                </div>

                {/* Total Reviews */}
                <div className="stat flex flex-col items-center justify-center p-4">
                    <div className="stat-figure text-secondary">
                        <IoChatbubblesSharp className='inline-block h-8 w-8 stroke-current text-blue-600' />
                    </div>
                    <div className="stat-title text-sm sm:text-base">Total Reviews</div>
                    <div className="stat-value">
                        <CountUp start={0} end={data.totalReviews} duration={3} />
                    </div>
                    <div className="stat-desc text-xs sm:text-sm">From products</div>
                </div>

                {/* Average Rating */}
                <div className="stat flex flex-col items-center justify-center p-4">
                    <div className="stat-figure text-secondary">
                        <FaStar className='inline-block h-8 w-8 stroke-current text-amber-400' />
                    </div>
                    <div className="stat-title text-sm sm:text-base">Average Rating</div>
                    <div className="stat-value">
                        <CountUp start={0} end={data.averageRating} duration={3} decimals={1} />
                    </div>
                    <div className="stat-desc text-xs sm:text-sm">Out of 5 Stars</div>
                </div>
            </div>

            {/* Product Cards */}
            <div className='flex flex-wrap justify-center gap-4'>
                {data.products.map((product, index) => (
                    <Card key={index} product={product} />
                ))}
            </div>

            {/* Reviews Section */}
            <Reviews reviews={data.reviews} />
        </>
    );
});

export default Stats;
