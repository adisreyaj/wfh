import fetch from 'node-fetch';
import chalk from 'chalk';
import { BRANDS } from './brands.mjs';
import { CATEGORIES } from './categories.mjs';

const seedBrands = async () => {
  try {
    await Promise.all(
      BRANDS.map((brand) =>
        fetch('http://localhost:3333/api/brands', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(brand),
        })
      )
    );
    console.log(chalk.green('Brands seeded successfully'));
  } catch (e) {
    console.log(chalk.red('Error seeding brands', e));
  }
};
const seedCategories = async () => {
  try {
    await Promise.all(
      CATEGORIES.map((category) =>
        fetch('http://localhost:3333/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(category),
        })
      )
    );
    console.log(chalk.green('Categories seeded successfully'));
  } catch (e) {
    console.log(chalk.red('Error seeding categories', e));
  }
};

const seed = async () => {
  await seedBrands();
  await seedCategories();
};

await seed();
