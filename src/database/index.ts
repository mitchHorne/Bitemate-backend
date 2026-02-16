import { Sequelize } from "sequelize-typescript";

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

const sequelize = new Sequelize({
  database: DB_DATABASE,
  dialect: "mysql",
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  models: [__dirname + "/models"],
});

// Initialize the database
(async () => {
  try {
    await sequelize.sync();
  } catch (err: any) {
    console.error("Unable to connect or sync database:", err);
  }
})();

export default sequelize;
