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

export const energyRestoreTemplate: Template = {
  basePrice: 1000,
  baseValue: 500,
};

export const maxEnergyTemplate: Template = {
  basePrice: 3000,
  baseValue: 2000,
};

export enum ItemType {
  multitap,
  autotap,
  crittap,
  energyRestore,
  maxEnergy,
}
