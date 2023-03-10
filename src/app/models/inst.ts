export class Institution {
  institutionId: number;
  englishName: string;
  frenchName: string;
  cuid: string;
  status?: string;
  alias: string;
  rank: number;
  ectDays?: number;
  platform: string;
  notes?: string;
  displayKey?: string;

  englishDesc?: string;
  frenchDesc?: string;
  blueDotCuid?: string;
  deliveryMethod?: string;
}
