import { UserDto, ProfileDto, PaginationDto } from './common.dto'


export class createUserDto extends UserDto {
    profile: ProfileDto
    pagenation: PaginationDto
}

export class UpdateProfileDto extends UserDto {
    profile?: ProfileDto
    pagenation?: PaginationDto
}
