import fetch from 'node-fetch';
import * as chalk from 'chalk';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { BRANDS } from './brands';
import { CATEGORIES } from './categories';
import { PRODUCTS } from './products';

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
  brands: { name: string; id: string }[] = [];
  categories: { name: string; id: string }[] = [];

  constructor() {}

  seed = async () => {
    this.status = await this.loadStatusFile();
    await this.getExistingData();
    if (this.status) {
      await this.seedBrands();
      await this.seedCategories();
      // Test Products Before Seeding
      await this.seedProducts(true);
      await this.seedProducts();
    }
  };

  private loadStatusFile = async () => {
    try {
      const status = await fs.promises.readFile('./result.json', 'utf8');
      return JSON.parse(status);
    } catch (e) {
      return null;
    }
  };

  private seedBrands = async () => {
    if (this.status.seedStatus.brand) {
      console.log(chalk.yellow('Brands already seeded'));
      return Promise.resolve();
    }
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

  private seedCategories = async () => {
    if (this.status.seedStatus.category) {
      console.log(chalk.yellow('Categories already seeded'));
      return Promise.resolve();
    }

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

  private getExistingData = async () => {
    const brands = (await this.getBrands()) ?? [];
    if (brands.length > 0) {
      this.brands = brands.map((brand) => ({
        name: brand.name,
        id: brand._id,
      }));
      await fs.promises.writeFile('./brands.json', JSON.stringify(this.brands));
      this.status.seedStatus.brand = true;
    }

    const categories = ((await this.getCategories()) as any[]) ?? [];
    if (categories.length > 0) {
      this.categories = categories.map((brand) => ({
        name: brand.name,
        id: brand._id,
      }));
      await fs.promises.writeFile('./categories.json', JSON.stringify(this.categories));
      this.status.seedStatus.category = true;
    }

    await fs.promises.writeFile('./result.json', JSON.stringify(this.status));
  };

  private getBrands = async () => {
    try {
      const response = await fetch('http://localhost:3333/api/brands', {
        headers: {
          ...this.AUTH_HEADER,
        },
      });
      const data = (await response.json()) as any[];
      console.log(chalk.green(`${data?.length} Brands fetched successfully`));
      return data;
    } catch (e) {
      console.log(chalk.red('Error fetching brands', e));
    }
  };

  private getCategories = async () => {
    try {
      const response = await fetch('http://localhost:3333/api/categories', {
        headers: {
          ...this.AUTH_HEADER,
        },
      });
      const data = await response.json();
      console.log(chalk.green(`${data?.length} Brands fetched successfully`));
      return data;
    } catch (e) {
      console.log(chalk.red('Error fetching categories', e));
    }
  };

  private seedProducts = async (test = false) => {
    if (this.status.seedStatus.product) return;
    console.info(
      chalk.blue(
        `Seeding products. ${this.brands?.length} Brands and ${this.categories?.length} Categories`
      )
    );
    if (this.brands?.length === 0 || this.categories?.length === 0) return;
    try {
      await Promise.all(
        PRODUCTS.reduce((acc: any[], curr) => {
          const creatProductPromises = curr.items.map((product) => {
            const brand = this.brands.find((brand) => brand.name === product.brand);
            const category = this.categories.find((category) => category.name === product.category);
            if (!brand || !category) return Promise.resolve();
            const body = {
              ...product,
              kind: curr.kind,
              brand: brand.id,
              category: category.id,
            };
            console.info(chalk.blue(`${test ? '[TEST]' : ''} Seeding product ${body.name}`));
            return test
              ? Promise.resolve()
              : fetch('http://localhost:3333/api/products', {
                  method: 'POST',
                  headers: {
                    ...this.AUTH_HEADER,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(body),
                });
          });
          acc.push(...creatProductPromises);
          return acc;
        }, [])
      );
      console.log(chalk.green(`${test ? '[TEST]' : ''}Products seeded successfully`));
    } catch (e) {
      console.log(chalk.red('Error seeding products', e));
    }
  };
}

const seeder = new Seeder();
seeder
  .seed()
  .then(() => {
    console.log(chalk.green('Seeding completed'));
  })
  .catch((e) => {
    console.log(chalk.red('Error seeding', e));
  });
