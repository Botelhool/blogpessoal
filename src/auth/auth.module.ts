import { forwardRef, Module } from "@nestjs/common";
import { Bcrypt } from "../bcrypt/bcrypt";
import { UsuarioModule } from "../usuario/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constant/constants";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategie/local.strategy";
import { JwtStrategy } from "./strategie/jwt-strategy";
import { AuthController } from "./controllers/auth.controller";


@Module({
    imports: [
        forwardRef(()=>UsuarioModule),
        UsuarioModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        })],
    providers: [Bcrypt,
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
    controllers: [AuthController],
    exports: [Bcrypt],
})
export class AuthModule { };