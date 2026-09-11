export type Model = {
  id: string;
  description: string;
  dimensions: [number, number, number];
  match?: number;
  master?: boolean;
};

export const mockModels: Model[] = [
  {
    id: "MTTH-0036-IAA-177",
    description: "Medium Temp, Air Cooled, 3.6 HP",
    dimensions: [1200, 800, 650],
    match: 100,
  },
  {
    id: "MTTL-0042-IAA-160",
    description: "Low Temp, Air Cooled, 4.2 HP",
    dimensions: [1150, 780, 620],
    match: 96.2,
  },
  {
    id: "MTTH-0051-IAA-177",
    description: "Medium Temp, Air Cooled, 5.1 HP",
    dimensions: [1350, 850, 700],
    match: 91.2,
  },
  {
    id: "M6TH-0009-IAA-090",
    description: "High Temp, Compact, 0.9 HP",
    dimensions: [750, 500, 450],
  },
  {
    id: "M6TL-0018-IAA-118",
    description: "Low Temp, Compact, 1.8 HP",
    dimensions: [900, 600, 520],
  },
  {
    id: "496-7140-MASTER MODEL",
    description: "Master model · full 3D assembly",
    dimensions: [1200, 800, 650],
    master: true,
  },
];
