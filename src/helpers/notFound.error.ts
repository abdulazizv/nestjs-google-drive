import {HttpException,HttpStatus} from '@nestjs/common'

export function notFoundError(message) {
    throw new HttpException(
        `${message}`,
        HttpStatus.NOT_FOUND
    )
}