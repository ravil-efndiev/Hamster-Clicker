
interface Template {
  basePrice: number;
  baseValue: number;
}
  
export const multitapTemplate: Template = {
  basePrice: 300,
  baseValue: 2,
};

export const autotapTemplate: Template = {
  basePrice: 400,
  baseValue: 2000,
};

export const crittapTemplate: Template = {
  basePrice: 500,
  baseValue: 2.5,
};

export enum ItemType {
  multitap, autotap, crittap
}
