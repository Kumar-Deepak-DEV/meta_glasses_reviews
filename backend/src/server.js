require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
