import { Savings } from './savings.entity'

export const catsProviders = [
  {
    provide: 'SAVINGS_REPOSITORY',
    useValue: Savings,
  },
];