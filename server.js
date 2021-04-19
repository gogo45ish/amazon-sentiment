const express = require('express');                         //Modules
const cors = require('cors');
const app = express();
const tf = require("@tensorflow/tfjs-node");
const { Tokenizer } = require("tf_node_tokenizer");
const csv = require('csvtojson');
const axios = require('axios').default;
const asyncHandler = require('express-async-handler')
var reviewsCrawler = require('amazon-reviews-crawler')
var emojiStrip = require('emoji-strip');
require('dotenv').config();

const rapidkey = process.env.RAPIDKEY
const rapidhost = process.env.RAPIDHOST


const path = './';
const tokenizer = new Tokenizer();

function pad_array(arr, len, fill) {                        // Padding Array

    return arr.concat(Array(len).fill(fill)).slice(0, len);

}
async function collectReviews(products) {
    console.log('COLLECTING REVIEWS ***********************************')
    var reviews = [];
    var counter = 0;
    for (var product of products) {
        counter++;

        console.log("***********************")
        console.log(counter);
        console.log(product.title)
        console.log(product.asin)
        console.log("***********************")

        var reviewsResponse = await reviewsCrawler(product.asin);
        for (var review of reviewsResponse.reviews) {
            var text = review.text;
            var trim = text.trim();
            var removedEmojis = emojiStrip(trim)
            reviews.push(removedEmojis)
        }

    }

    return reviews;
}
async function getReviews(product) {
    console.log('COLLECTING REVIEWS ***********************************')
    var reviews = [];
    var counter = 0;


    console.log("***********************")
    console.log(counter);
    console.log(product.title)
    console.log(product.asin)
    console.log("***********************")

    var reviewsResponse = await reviewsCrawler(product.asin);
    for (var review of reviewsResponse.reviews) {
        var text = review.text;
        var trim = text.trim();
        var removedEmojis = emojiStrip(trim)
        reviews.push(removedEmojis)
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


app.get('/api/chart', cors(), asyncHandler(async (req, res) => {

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
        // if (result.error) throw new Error(result.error);
        var products = result.data.products;
        var asin = "";
        var text = '';
        var texts = [];
        var trim;
        var removedEmojis;
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

            reviewsResponse = await reviewsCrawler(asin);
            for (var review of reviewsResponse.reviews) {
                text = review.text
                trim = text.trim();
                removedEmojis = emojiStrip(trim)
                // console.log(removedEmojis)
                texts.push(removedEmojis)
            }
        }

        var avgPrice = priceCounter / products.length;
        var avgRating = ratingCounter / products.length;
        var soldUnits = reviewCounter / 0.06;

        try {
            predictions = await predict(texts);
        } catch (error) {
            console.log(error);
        }

        //console.log(result.body.products);

        var response = {
            products: result.data.products,
            predictions: predictions,
            avgPrice: Math.round(avgPrice),
            avgRating: Math.round(avgRating),
            soldUnits: Math.round(soldUnits),
            error: false
        };

        res.send(response);

    }).catch(function (error) {
        var response = {
            status: true,
            message: error.response.data.message,

        };
        console.error(error.response.status);
        res.send(response);
    });


}));
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
                thumbnail: "https://m.media-amazon.com/images/I/810DvHOZ9nL._AC_UL320_.jpg"
            }

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
        var response = {
            status: true,
            message: error.response.data.message,

        };
        console.error(error.response.status);
        res.send(response);
    });


}));


app.get('/api/chart2', cors(), asyncHandler(async (req, res) => {

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
        var products = result.data.products;
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


        }

        var avgPrice = priceCounter / products.length;
        var avgRating = ratingCounter / products.length;
        var soldUnits = reviewCounter / 0.06;

        // var array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        var half_length = Math.ceil(products.length / 2);
        console.log(half_length)

        var array1 = products.slice(0, half_length);
        var array2 = products.slice(half_length, products.length);


        var [result1, result2] = await Promise.all([collectReviews(array1), collectReviews(array2)]);

        console.log('************COLLECTING REVIEWS DONE**************')

        var texts = result1.concat(result2);

        try {
            predictions = await predict(texts);
        } catch (error) {
            console.log(error);
        }

        var response = {
            products: result.data.products,
            predictions: predictions,
            avgPrice: Math.round(avgPrice),
            avgRating: Math.round(avgRating),
            soldUnits: Math.round(soldUnits),
            error: false
        };



        res.send(response);

    }).catch(function (error) {
        // var response = {
        //     status: true,
        //     message: error.response.data.message,

        // };
        // console.error(error.response.status);
        res.send(error);
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
        var products = result.data.products;
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


        }

        var avgPrice = priceCounter / products.length;
        var avgRating = ratingCounter / products.length;
        var soldUnits = reviewCounter / 0.06;

        // var array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        // var half_length = Math.ceil(products.length / 2);
        // console.log(half_length)

        // var array1 = products.slice(0, half_length);
        // var array2 = products.slice(half_length, products.length);


        // var [result1, result2] = await Promise.all([collectReviews(array1), collectReviews(array2)]);

        // console.log('************COLLECTING REVIEWS DONE**************')

        // var texts = result1.concat(result2);





        const promises = products.map(getReviews);

        var reviews = await Promise.all(promises);
        var texts = []

        for (var array of reviews) {
            texts = texts.concat(array)
        }
        try {
            predictions = await predict(texts);
        } catch (error) {
            console.log(error);
        }
        var response = {
            products: result.data.products,
            predictions: predictions,
            avgPrice: Math.round(avgPrice),
            avgRating: Math.round(avgRating),
            soldUnits: Math.round(soldUnits),
            error: false
        };

        res.send(response);

    }).catch(function (error) {
        // var response = {
        //     status: true,
        //     message: error.response.data.message,

        // };
        // console.error(error.response.status);
        res.send(error);
    });


}));

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);