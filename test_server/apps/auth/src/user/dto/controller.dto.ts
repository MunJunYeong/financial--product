import { UserDto, ProfileDto, PaginationDto } from './common.dto'



export class CreateUserDto extends UserDto {
    profile: ProfileDto
    pagenation: PaginationDto
}

export class UpdateUserDto {

}
