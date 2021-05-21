const express = require('express');                         //Modules
const cors = require('cors');
const app = express();
const tf = require("@tensorflow/tfjs-node");
const { Tokenizer } = require("tf_node_tokenizer");
const csv = require('csvtojson');
const axios = require('axios').default;
const asyncHandler = require('express-async-handler')
var emojiStrip = require('emoji-strip');
require('dotenv').config();

const rapidkey = process.env.RAPIDKEY
const rapidhost = process.env.RAPIDHOST


const path = './';
const tokenizer = new Tokenizer();

function pad_array(arr, len, fill) {                        // Padding Array

    return arr.concat(Array(len).fill(fill)).slice(0, len);

}
// async function collectReviews(products, country) {
//     console.log('COLLECTING REVIEWS ***********************************')
//     var reviews = [];
//     var counter = 0;

//     for (var product of products) {
//         counter++;

//         console.log("***********************")
//         console.log(counter);
//         console.log(product.title)
//         console.log(product.asin)
//         console.log("***********************")
//         const options = {
//             method: 'GET',
//             url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/reviews',
//             params: { asin: product.asin, country: country, variants: '1', top: '0' },
//             headers: {
//                 'x-rapidapi-key': rapidkey,
//                 'x-rapidapi-host': rapidhost
//             }
//         };

//         var reviewsResponse = await axios.request(options)
//         var reviewsArray = reviewsResponse.data.reviews
//         // console.log(reviewsResponse.data.reviews)
//         for (var review of reviewsArray) {
//             // var text = review.text;
//             var text = review.review;
//             console.log(text)
//             // var trim = text.trim();
//             var removedEmojis = emojiStrip(text)
//             reviews.push(removedEmojis)
//         }

//     }

//     return reviews;
// }
async function getReviews(product, country) {
    console.log('COLLECTING REVIEWS ***********************************')
    var reviews = [];
    var counter = 0;

    const options = {
        method: 'GET',
        url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/reviews',
        params: { asin: product.asin, country: country, variants: '1', top: '0' },
        headers: {
            'x-rapidapi-key': rapidkey,
            'x-rapidapi-host': rapidhost
        },
        timeout: 5000
    };


    console.log("***********************")
    console.log(counter);
    console.log(product.title)
    console.log(product.asin)
    console.log("***********************")



    try {
        var reviewsResponse = await axios.request(options)
        // console.log(reviewsResponse)
        var reviewsArray = reviewsResponse.data.reviews
        console.log(reviewsResponse.data.reviews)
        for (var review of reviewsArray) {
            // var text = review.text;
            var text = review.review;
            // console.log(text)
            // var trim = text.trim();
            var removedEmojis = emojiStrip(text)
            reviews.push(removedEmojis)
        }

    } catch (error) {

    }





    return reviews;
}


async function predict(arrayOfTexts) {                              // Predict Text
    const sentiment = await csv().fromFile("output1.csv");
    const array = [];
    var resultArray = [];

    for (i = 0; i < sentiment.length; i++) {
        array.push(sentiment[i].content);
    }

    const model = await tf.node.loadSavedModel(path);


    tokenizer.fitOnTexts(array);
    var posCounter = 0;
    var negCounter = 0;
    for (var text of arrayOfTexts) {
        text = tokenizer.textsToSequences([text]);
        padded = pad_array(text[0], 50, 0);
        text = [padded]
        console.log(text);
        const pred = tf.tensor(text);
        const prediction = model.predict(pred).dataSync()[0];
        console.log(prediction)
        if (prediction >= 0.5) {
            posCounter++;
        } else {
            negCounter++;
        }
    }

    resultArray.push(posCounter);
    resultArray.push(negCounter);

    return resultArray
}
async function predict2(reviews) {                              // Predict Text
    const sentiment = await csv().fromFile("output1.csv");
    const vocab = [];

    for (i = 0; i < sentiment.length; i++) {
        vocab.push(sentiment[i].content);
    }

    const model = await tf.node.loadSavedModel(path);


    tokenizer.fitOnTexts(vocab);

    for (var review of reviews) {
        console.log(review.review);
        text = tokenizer.textsToSequences([review.review]);
        padded = pad_array(text[0], 50, 0);
        text = [padded]
        console.log(text);
        const pred = tf.tensor(text);
        const prediction = model.predict(pred).dataSync()[0];
        console.log(prediction)
        review.prediction = prediction;
        console.log(review.prediction)
    }

    return reviews
}
app.get('/api/test', cors(), asyncHandler(async (req, res) => {



    var response = {
        products: [
            {
                title: "New Apple iPhone SE (64GB, (Product) RED) [Locked] + Cricket Wireless Plan",
                asin: "B087623TMW",
                price: {
                    current_price: "399.9"
                },
                reviews: {
                    rating: 4.6,
                    total_reviews: 100
                },
                amazonChoice: false,
                amazonPrime: true,
                bestSeller: false,
                sponsored: false,
                thumbnail: "https://m.media-amazon.com/images/I/810DvHOZ9nL._AC_UL320_.jpg",
                pricee: "399.9",
                rate: 4.6,
                totalReviews: 100
            },

        ],
        predictions: [100, 50],
        avgPrice: 50,
        avgRating: 50,
        soldUnits: 50
    };

    console.log(response.products[0].reviews.rating)

    res.send(response);


}));

app.get('/api/reviewProduct', cors(), asyncHandler(async (req, res) => {

    var asin = req.query.asin;
    var country = req.query.country;
    var top = req.query.top;
    console.log(asin)
    console.log(country)
    console.log(top)

    var reviewsProduct = {
        method: 'GET',
        url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/reviews',
        params: { asin: asin, country: country, variants: '0', top: top },
        headers: {
            'x-rapidapi-key': rapidkey,
            'x-rapidapi-host': rapidhost
        }
    };

    axios.request(reviewsProduct).then(async function (result) {

        var reviews = result.data.reviews;

        console.log(result.data)

        // for (var review of reviews) {
        //     console.log(review.review);
        // }

        reviews = await predict2(reviews);



        if (reviews.length != 0) {
            res.send(reviews);
        } else {
            var response = {
                status: true,
                message: "No reviews Found",

            };
            res.send(response);
        }


    }).catch(function (error) {
        console.error(error);
        if (error.response.status == 504) {
            var response = {
                status: true,
                message: error.response.data.messages,

            };
        } else {
            var response = {
                status: true,
                message: error.response.data.message,

            };
        }
        res.send(response);
    });


}));

app.get('/api/chart3', cors(), asyncHandler(async (req, res) => {

    var keywords = req.query.keywords;
    var country = req.query.country;
    console.log(keywords)
    console.log(country)

    var search = {
        method: 'GET',
        url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/search',
        params: { keyword: keywords, country: country, category: 'aps' },
        headers: {
            'x-rapidapi-key': rapidkey,
            'x-rapidapi-host': rapidhost,
        }
    };

    axios.request(search).then(async function (result) {
        var requestProducts = result.data.products;

        var products = requestProducts.slice(0, 10);
        console.log('************')
        console.log(products.length)
        console.log('************')

        var priceCounter = 0;
        var ratingCounter = 0;
        var reviewCounter = 0;
        var counter = 0;

        for (var product of products) {
            counter++
            console.log('****************');
            console.log(counter);
            console.log('****************');

            console.log(product.title)
            asin = product.asin;
            priceCounter += Number(product.price.current_price);
            console.log(priceCounter);
            ratingCounter += product.reviews.rating;
            console.log(ratingCounter)

            reviewCounter += product.reviews.total_reviews;
            console.log(reviewCounter)

            product.pricee = parseInt(product.price.current_price);
            product.rate = product.reviews.rating;
            product.totalReviews = product.reviews.total_reviews;



        }

        var avgPrice = priceCounter / products.length;
        var avgRating = ratingCounter / products.length;
        var soldUnits = reviewCounter / 0.06;

        // var half_length = Math.ceil(products.length / 2);
        // console.log(half_length)

        // var array1 = products.slice(0, half_length);
        // var array2 = products.slice(half_length, products.length);

        const promises = products.map(
            function (x) { return getReviews(x, country) }
        );
        // const promises1 = array1.map(
        //     function (x) { return getReviews(x, country) }
        // );


        // const promises2 = array2.map(
        //     function (x) { return getReviews(x, country) }
        // );

        var reviews = await Promise.all(promises);
        // var reviews1 = await Promise.all(promises1);
        // var reviews2 = await Promise.all(promises2);
        var texts = []

        for (var array of reviews) {
            texts = texts.concat(array)
        }
        // for (var array of reviews1) {
        //     texts = texts.concat(array)
        // }
        // for (var array of reviews2) {
        //     texts = texts.concat(array)
        // }
        try {
            predictions = await predict(texts);
        } catch (error) {
            console.log(error);
        }
        var response = {
            products: products,
            predictions: predictions,
            avgPrice: Math.round(avgPrice),
            avgRating: Math.round(avgRating),
            soldUnits: Math.round(soldUnits),
            error: false
        };

        res.send(response);

    }).catch(function (error) {

        if (error.response.status == 504) {
            var response = {
                status: true,
                message: error.response.data.messages,

            };
        } else {
            var response = {
                status: true,
                message: error.response.data.message,

            };
        }

        // console.error(error);
        res.send(response);
    });


}));

if (process.env.NODE_ENV === 'production') {
    console.log("hello")
    // Exprees will serve up production assets
    app.use(express.static('client/build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);