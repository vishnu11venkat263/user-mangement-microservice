
import { IsString, IsNotEmpty } from 'class-validator';

export class BlockUserDto {
  @IsString()
  @IsNotEmpty()
  targetUserId: string;
}
