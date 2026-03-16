import { ApiProperty } from "@nestjs/swagger"


export class UsuarioLogin {
    @ApiProperty({ example: "email@.com" })
    public usuario: string
    @ApiProperty({})
    public senha: string

}