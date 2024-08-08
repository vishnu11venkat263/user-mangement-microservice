
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';

export class SearchUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minAge?: number;

  @IsOptional()
  @IsNumber()
  @Max(120)
  maxAge?: number;
}
