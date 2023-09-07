
type PriorityNames = 'Ninguna' | 'Baja' | 'Media' | 'Alta';

type PriorityValues = 'N' | 'B' | 'M' | 'A';

export interface Priority {
  name: PriorityNames;
  code: PriorityValues;
}