# Sentiment Analysis Project

This project performs sentiment analysis on Amazon product data using a Hugging Face model. Users can input a keyword or ASIN number to retrieve product details, sentiment results, and reviews from a PostgreSQL database that replicates Amazon product data.

## Live Demo

- **Frontend**: [amazon-react-self.vercel.app](https://amazon-react-self.vercel.app)
- **Backend**: [Deployed Backend URL] (replace with your actual backend URL)

## Tech Stack

- **Frontend**: React (Vite) with pnpm
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Machine Learning**: Hugging Face Sentiment Model
- **Hosting**: Vercel
- **Package Manager**: pnpm

## Features

- Retrieve product information based on keyword or ASIN
- Perform sentiment analysis on product reviews using a Hugging Face model
- Store and manage data with PostgreSQL
- Fast and efficient frontend built with React and Vite
- Scalable backend using Express.js
- Hosted and deployed on Vercel

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [PostgreSQL](https://www.postgresql.org/)
- [pnpm](https://pnpm.io/)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. Install dependencies for both frontend and backend:
   ```sh
   pnpm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     DATABASE_URL=postgres://user:password@localhost:5432/yourdatabase
     PORT=5000
     ```

## Running the Project Locally

### Backend

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Start the backend server:
   ```sh
   pnpm start
   ```

### Frontend

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Start the development server:
   ```sh
   pnpm dev
   ```

## Deploying to Vercel

1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy the frontend:
   ```sh
   cd frontend
   vercel
   ```
3. Deploy the backend:
   ```sh
   cd backend
   vercel
   ```

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## Contact

For inquiries, reach out to [your email/contact info].
