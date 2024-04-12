import { createParamDecorator } from "@nestjs/common";
import { CreateUserDto } from "./dto/create_user.dt";

export const getUser = createParamDecorator((data,req):CreateUserDto=>{
return req.user as CreateUserDto;
})