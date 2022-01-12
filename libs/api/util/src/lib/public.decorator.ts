import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const IS_INTERNAL = 'isInternal';
export const Internal = () => SetMetadata(IS_INTERNAL, true);
