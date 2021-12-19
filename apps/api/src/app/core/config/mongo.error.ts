import { BadRequestException, HttpException } from '@nestjs/common';

export const MONGO_ERROR = (...args: string[]): Record<string, HttpException> => ({
  11000: new BadRequestException(`${args[0]} already exists`),
});
