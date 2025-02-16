import pkg from 'pg';
import express from "express";
import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json()); 
dotenv.config();


const {Pool} = pkg;
const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;
const inference = new HfInference(HF_ACCESS_TOKEN);
const pool = new Pool({
    user: process.env.NODE_ENV === 'production' ? 'avnadmin' : 'postgres',
    host: process.env.NODE_ENV === 'production' ? 'pg-3c07e5b5-george-4b12.b.aivencloud.com' : 'localhost',
    database: process.env.NODE_ENV === 'production' ? 'sentiment' : 'amazon_product_db',
    password: process.env.NODE_ENV === 'production' ? process.env.PROD_DB_PASSWORD : 'zuma123',
    port: process.env.NODE_ENV === 'production' ? 25134 : 5432,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false,
    } : undefined,
});

console.log(pool);

const model = "cardiffnlp/twitter-roberta-base-sentiment-latest";

app.get('/', (req, res) => {
    res.send('Hello from Express!');
  });

app.get('/products', (req, res) => {
	pool.query('SELECT * FROM products', (err, result) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(result.rows);
		}
	});
});

app.get('/products/:asin', (req, res) => {
	const asin = req.params.asin;

	pool.query('SELECT * FROM products WHERE asin = $1', [asin], (err, result) => {
		if (err) {
			res.status(500).send(err);
		} else if (result.rows.length === 0) {
			res.status(404).send({ message: 'Product not found' });
		} else {
			res.send(result.rows[0]);
		}
	});
});

app.get('/search/:asin', (req, res) => {
	const asin = req.params.asin;
    
	pool.query('SELECT * FROM products WHERE asin = $1', [asin], (err, result) => {
		if (err) {
			res.status(500).send(err);
            
		} else if (result.rows.length === 0) {
			res.status(404).send({ message: 'Product not found' });
		} else {
			const productId = result.rows[0].product_id;
            const products = result.rows
            
			pool.query('SELECT * FROM Reviews WHERE product_id = $1', [productId], async (err, result) => {
				if (err) {
					res.status(500).send(err);
                    console.log(err);
                    
				} else if (result.rows.length === 0) {
					res.status(404).send({ message: 'Review not found' });
				} else {
                    const reviews = result.rows
                    const totalReviews = result.rows.length;
                    const text = result.rows.map(review => review.comment);
                    // console.log(text);
                    
                    try {
                        const sentiment = await inference.textClassification({
                            inputs: text,
                            model: model,
                        });
                
                        res.status(200).json({ sentiment, reviews,products,totalReviews,averageRating:products[0].rating });
                    } catch (error) {
                        console.error("Error:", error);
                        res.status(500).json({ error: "Failed to analyze text" });
                    }
					
				}
			});
		}
	});
});

app.get('/search', (req, res) => {
    const keyword = req.query.keyword;
    if (!keyword) {
        res.status(400).send({ message: 'Keyword is required' });
        return;
    }

    pool.query('SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1', [`%${keyword}%`], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const products = result.rows;
            
            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found matching your search.' });
            }

            const averageRating = products.reduce((total, product) => total + Number(product.rating), 0) / products.length;
            const productIds = products.map(product => product.product_id);
            console.log(products);

            pool.query('SELECT * FROM Reviews WHERE product_id = ANY($1)', [productIds], async (err, result) => {
                if (err) {
                    res.status(500).send(err);
                    console.log(err);
                } else {
                    const comments = result.rows.map(review => review.comment);
                    const reviews = result.rows
                    const totalReviews = result.rows.length;
                    try {
                        const sentimentResult = await inference.textClassification({
                            inputs: comments,
                            model: model,
                        });
                
                        res.status(200).json({ sentiment: sentimentResult, reviews, products, totalReviews, averageRating });
                    } catch (error) {
                        console.error("Error:", error);
                        res.status(500).json({ error: "Failed to analyze text" });
                    }
                }
            });
        }
    });
});


app.listen(3000, () => {
	console.log('Listening on port 3000');
});

