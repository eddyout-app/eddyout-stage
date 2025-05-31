## 🔌 Connecting to MongoDB Atlas (Backend Setup)

To contribute to EDDYOUT's backend, follow these steps to connect to our shared MongoDB Atlas database and verify your GraphQL setup.

### 1. Request Access to the Atlas Cluster

Ask a project lead (e.g., Elli) to invite you to the MongoDB Atlas project with **read/write access**.

---

### 2. Environment Setup

Edit the`.env_example` file in the `server/` directory and add the following:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@booksearch-cluster.cuh3hj7.mongodb.net/eddyout?retryWrites=true&w=majority&appName=booksearch-cluster
JWT_SECRET=yourJWTSecretHere
PORT=3001
```

MongoDB EddyOut database credentials shared via Slack.

> **Note:** Do **not** commit `.env` files to GitHub. A `.env_example` file is included for reference.

---

### 3. Install Dependencies & Run Server

```bash
cd server
npm install
npm run dev
```

The backend should be available at:  
📍 `http://localhost:3001/graphql`

---

### 4. Run a Test Query

Open your browser and navigate to:  
👉 `http://localhost:3001/graphql`

Paste in the following test query to confirm everything is working:

```graphql
query GetTrips {
  trips {
    _id
    riverName
    startDate
    endDate
  }
}
```

If the server responds with trip data or an empty array, you're good to go! 🎉
