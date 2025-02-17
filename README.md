# Sentiment Analysis Project

This project performs sentiment analysis on Amazon product data using a Hugging Face model. Users can input a keyword or ASIN number to retrieve product details, sentiment results, and reviews from a hosted PostgreSQL database that replicates Amazon product data. **The live demo below showcases the complete functionality of the project.**

## Live Demo

- **Frontend**: [amazon-react-self.vercel.app](https://amazon-react-self.vercel.app)
- **Backend**: [amazon-server-three.vercel.app](https://amazon-server-three.vercel.app)

## Tech Stack

- **Frontend**: React (Vite) with [pnpm](https://pnpm.io/)
- **Backend**: Node.js with [Express](https://expressjs.com/)
- **Database**: PostgreSQL (hosted)
- **Machine Learning**: Hugging Face Sentiment Model ([Hugging Face](https://huggingface.co/))
- **Hosting**: Vercel ([Vercel](https://vercel.com/))

## Features

- **Live Data:** Retrieve product information based on a keyword or ASIN from a hosted PostgreSQL database.
- **Sentiment Analysis:** Analyze product reviews using a Hugging Face model.
- **Intuitive Interface:** A user-friendly interface for quick and efficient product search and review analysis.
- **Scalable & Fast:** Built with modern technologies for a robust and performant user experience.

## How to Use

This application offers two primary functions:

1. **Keyword Search:** Simply type in a general product keyword (e.g., "laptop", "hub", or "phone") into the search field. The app will display corresponding product details along with sentiment analysis statistics and reviews.

2. **ASIN Search:** Alternatively, enter a specific ASIN number to retrieve detailed sentiment analysis, product information, and customer reviews for that product.

Try out these features on the live demo to explore product sentiments and reviews!

## About

This project demonstrates the integration of machine learning with a dynamic user interface. It combines the power of React, Node.js, and PostgreSQL with the sentiment analysis capabilities of a Hugging Face model to deliver real-time insights into Amazon product reviews—all showcased via a live demo.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For inquiries or feedback, please reach out to [your email/contact info].
