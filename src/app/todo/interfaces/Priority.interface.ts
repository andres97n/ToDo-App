
export type PriorityNames = 'Ninguna' | 'Baja' | 'Media' | 'Alta';

export type PriorityValues = 0 | 1 | 2 | 3;

export interface Priority {
  name: PriorityNames;
  code: PriorityValues;
}