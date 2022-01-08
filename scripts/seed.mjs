import fetch from 'node-fetch';
import chalk from 'chalk';
import { BRANDS } from './brands.mjs';
import { CATEGORIES } from './categories.mjs';
import fs from 'fs';
import dotenv from 'dotenv';
import { PRODUCTS } from './products.mjs';

dotenv.config({
  path: '../.env',
});

class Seeder {
  AUTH_HEADER = {
    'x-internal-token': `${process.env.INTERNAL_TOKEN}`,
  };

  status = {
    seedStatus: {
      brand: false,
      category: false,
      product: false,
    },
  };
  brands = null;
  categories = null;

  constructor(props) {}

  #loadStatusFile = async () => {
    try {
      const status = await fs.promises.readFile('./result.json', 'utf8');
      return JSON.parse(status);
    } catch (e) {
      return null;
    }
  };

  #seedBrands = async () => {
    if (this.status.seedStatus.brand) return;
    try {
      await Promise.all(
        BRANDS.map((brand) =>
          fetch('http://localhost:3333/api/brands', {
            method: 'POST',
            headers: {
              ...this.AUTH_HEADER,
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

  #seedCategories = async () => {
    if (this.status.seedStatus.category) return;

    try {
      await Promise.all(
        CATEGORIES.map((category) =>
          fetch('http://localhost:3333/api/categories', {
            method: 'POST',
            headers: {
              ...this.AUTH_HEADER,
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

  #getBrands = async () => {
    try {
      const response = await fetch('http://localhost:3333/api/brands', {
        headers: {
          ...this.AUTH_HEADER,
        },
      });
      const data = await response.json();
      console.log(chalk.green('Brands fetched successfully'));
      return data;
    } catch (e) {
      console.log(chalk.red('Error fetching brands', e));
    }
  };

  #getCategories = async () => {
    try {
      const response = await fetch('http://localhost:3333/api/categories', {
        headers: {
          ...this.AUTH_HEADER,
        },
      });
      const data = await response.json();
      console.log(chalk.green('Categories fetched successfully'));
      return data;
    } catch (e) {
      console.log(chalk.red('Error fetching categories', e));
    }
  };

  #getExistingData = async () => {
    const brands = (await this.#getBrands()) ?? [];
    this.brands = brands.map((brand) => ({
      name: brand.name,
      id: brand._id,
    }));
    await fs.promises.writeFile('./brands.json', JSON.stringify(this.brands));
    const categories = (await this.#getCategories()) ?? [];
    this.categories = categories.map((brand) => ({
      name: brand.name,
      id: brand._id,
    }));
    await fs.promises.writeFile('./categories.json', JSON.stringify(this.categories));
  };

  seed = async () => {
    this.status = await this.#loadStatusFile();
    await this.#getExistingData();
    if (this.status) {
      await this.#seedBrands();
      await this.#seedCategories();
      await this.#seedProducts();
    }
  };

  #seedProducts = async () => {
    if (this.status.seedStatus.product) return;
    try {
      await Promise.all(
        PRODUCTS.reduce((acc, curr) => {
          acc.push(
            curr.items.map((product) => {
              const brand = this.brands.find((brand) => brand.name === product.brand);
              const category = this.categories.find(
                (category) => category.name === product.category
              );
              return fetch('http://localhost:3333/api/products', {
                method: 'POST',
                headers: {
                  ...this.AUTH_HEADER,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ...product,
                  kind: curr.kind,
                  brand: brand.id,
                  category: category.id,
                }),
              });
            })
          );
          return acc;
        }, [])
      );
      console.log(chalk.green('Products seeded successfully'));
    } catch (e) {
      console.log(chalk.red('Error seeding products', e));
    }
  };
}

const seeder = new Seeder();
await seeder.seed();
