import { IsNumberString, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class AppDto {
  @IsString()
  @MinLength(43)
  @MaxLength(44)
  // User wallet publickey
  userPublicKey: string;

  /**
   * optional: message address, will create one if not set
   */
  @IsString()
  @IsOptional()
  messageAddress?: string;

  @IsString()
  @MinLength(43)
  @MaxLength(44)
  // Cross chain token address
  mint: string;

  @IsString()
  @Length(42)
  @Matches(/^0x[a-fA-F0-9]{40}$/)
  // Cross chain target recipient eth address
  targetAddress: string;

  @IsNumberString()
  // Cross chain amount
  amount: string;
}
