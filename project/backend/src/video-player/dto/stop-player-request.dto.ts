import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsNumber, IsString, Min} from 'class-validator';

export class StopPlayerRequest {
    @ApiProperty()
    // @Type must be first for proper transformation before validation
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    currentVideoNum: number;

    @ApiProperty()
    @IsString()
    timeline: string;
}
