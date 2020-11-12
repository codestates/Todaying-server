require("dotenv").config();

module.exports = {
  "development": {
    "username": 'root',
    "password": '5341',
    "database": 'todaying',
    "host": '127.0.0.1',    
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_HOST,
    "port": process.env.PORT,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_HOST,
    "port": process.env.PORT,
    "dialect": "mysql"
  }
}
