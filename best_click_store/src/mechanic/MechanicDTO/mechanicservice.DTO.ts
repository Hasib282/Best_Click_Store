import { IsNotEmpty } from "class-validator";


export class MechanicServiceDTO {
    @IsNotEmpty()
    service_id: number;
}