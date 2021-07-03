import { IsString } from 'class-validator';

export class RootConfig {
  @IsString()
  public readonly TOKEN!: string;
}
