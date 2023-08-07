const { db, Users } = require("./db");

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Users.create({
      name: "Keven",
      email: "coco.keven@gmail.com",
    });
  } catch (err) {
    console.log(err);
  }
};

async function runSeed() {
  try {
    await seed();
    console.log("Seeding success!");
  } catch (err) {
    console.error("something went wrong when seeding!");
    console.error(err);
  } finally {
    db.close();
  }
}

runSeed();
