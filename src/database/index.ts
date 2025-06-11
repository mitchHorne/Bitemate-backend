import { Sequelize } from "sequelize-typescript";

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize({
  database: "main",
  dialect: "mysql",
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  models: [__dirname + "/models"],
});

// Initialize the database
(async () => {
  try {
    // await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    // await sequelize.sync({ force: true });
    // await sequelize.query("SET FOREIGN_KEY_CHECKS =1");
    await sequelize.sync();
  } catch (err: any) {
    console.error("Unable to connect or sync database:", err);
  }
})();

export default sequelize;
