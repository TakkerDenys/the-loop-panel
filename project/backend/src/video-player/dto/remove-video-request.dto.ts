import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsNumber, Min} from 'class-validator';

export class RemoveVideoRequest {
    @ApiProperty()
    // @Type must be first for proper transformation before validation
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    currentVideoNum: number;
}