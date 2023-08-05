import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MechanicDTO, MechanicLoginDTO, MechanicUpdateDTO, MechanicUpdatePassDTO } from "./MechanicDTO/mechanic.DTO";
import { MechanicEntity } from "./MechanicEntity/mechanic.entity";
import { MechanicProfileEntity } from "./MechanicEntity/mechanicProfile.entity";
import * as bcrypt from 'bcrypt';
import { ServiceDTO } from "./MechanicDTO/service.DTO";
import { ServiceEntity } from "./MechanicEntity/service.entity";
import { HttpException } from "@nestjs/common";
import { ChatEntity } from "./MechanicEntity/chat.entity";
import { CustomerEntity } from "../customer/CustomerEntity/customer.entity";
import { ChatDTO } from "../customer/Customer DTO/chat.DTO";
import { ServiceRequestEntity } from "./MechanicEntity/serviceRequest.entity";

@Injectable()
export class MechanicService {
    constructor(
        @InjectRepository(MechanicEntity) private mechanicRepo: Repository<MechanicEntity>,
        @InjectRepository(MechanicProfileEntity) private mechanicProfileRepo: Repository<MechanicProfileEntity>,
        @InjectRepository(ServiceEntity) private serviceRepo: Repository<ServiceEntity>,
        @InjectRepository(ServiceRequestEntity) private serviceRequestRepo: Repository<ServiceRequestEntity>,
        @InjectRepository(ChatEntity) private chatRepo: Repository<ChatEntity>,
        @InjectRepository(CustomerEntity) private customerRepo: Repository<CustomerEntity>,
    ) { }

    ////////////////////////////////////// Registration part start here ////////////////////////////////////////////////////

    //Mechanic Registration
    async mechanicRegistration(data: MechanicDTO) {
        //hasshing the password
        const pass = await bcrypt.genSalt();
        data.mechanic_password = await bcrypt.hash(data.mechanic_password, pass);

        //assign body value in mechanic profile table
        const mechanicProfile = new MechanicProfileEntity();
        mechanicProfile.mechanic_password = data.mechanic_password;
        mechanicProfile.mechanic_profilepic = data.mechanic_profilepic;


        //assign body value in mechanic table
        const mechanic = new MechanicEntity();
        mechanic.mechanic_name = data.mechanic_name;
        mechanic.mechanic_email = data.mechanic_email;
        mechanic.mechanic_phone = data.mechanic_phone;
        mechanic.mechanic_nid = data.mechanic_nid;
        mechanic.mechanic_address = data.mechanic_address;
        mechanic.mechanic_gender = data.mechanic_gender;
        mechanic.profile = mechanicProfile;

        await this.mechanicProfileRepo.save(mechanicProfile);
        return await this.mechanicRepo.save(mechanic);
    }


    //Check email existance
    async checkEmail(email): Promise<MechanicEntity> {
        return this.mechanicRepo.findOneBy({ mechanic_email: email });
    }

    //Check nid existance
    async checkNid(nid): Promise<MechanicEntity> {
        return this.mechanicRepo.findOneBy({ mechanic_nid: nid });
    }

    //Check phone existance
    async checkPhone(phone): Promise<MechanicEntity> {
        return this.mechanicRepo.findOneBy({ mechanic_phone: phone });
    }

    

    //////////////////////////////////////// registration part end here /////////////////////////////////////////////////

    /////////////////////////////////////// Login Part start here ////////////////////////////////////////////////

    //Mechanic Login
    async mechanicLogin(data: MechanicLoginDTO) {
        const profile = await this.getProfile(data.email);
        const isMatch: boolean = await bcrypt.compare(data.password, profile.profile.mechanic_password);
        if (isMatch) {
            return isMatch;
        }
        else {
            return false;
        }
    }

    /////////////////////////////////////////// Login Part end here //////////////////////////////////////////////////


    ////////////////////////////////////////// profile part start here //////////////////////////////////////////////

    //Show All Mechanic
    getAllMechanics() {
        return this.mechanicRepo.find({ relations: { profile: true, services: true, } });
    }


    //Show Mechanic Profile
    getProfile(email) {
        return this.mechanicRepo.findOne({
            where: { mechanic_email: email },
            relations: {
                profile: true,
                services: true,
            }
        });
    }


    //Update Mechanic Profile
    async updateProfile(id, data: MechanicUpdateDTO): Promise<any> {
        return this.mechanicRepo.update(id, data);
    }


    //verify Mechanic password
    async verifyPassword(id, data: MechanicUpdatePassDTO): Promise<any> {
        const profile = await this.mechanicProfileRepo.findOneBy({ mechanic_id: id });
        const isMatch: boolean = await bcrypt.compare(data.old_password, profile.mechanic_password);
        if (isMatch) {
            return isMatch;
        }
        else {
            return false;
        }
    }


    //Update Mechanic password
    async changePassword(id, password): Promise<any> {
        const pass = await bcrypt.genSalt();
        password = await bcrypt.hash(password, pass);
        return this.mechanicProfileRepo.update(id, { mechanic_password: password });
    }


    //Delete Mechanic Profile
    async deleteProfile(id) {
        return this.mechanicRepo.delete(id);
    }

    
    //Forget Password





    ///////////////////////////////////////// profile part end here //////////////////////////////////////////////////


    ///////////////////////////////////////// service part start here ////////////////////////////////////////////////////////

    
    //Add new service
    async createService(data: ServiceDTO) {
        return this.serviceRepo.save(data);
    }

    //get all services
    async getAllServices() {
        return this.serviceRepo.find({ relations: { mechanics:true } });
    }


    //get service by id
    async getService(id) {
        return this.serviceRepo.findOneBy({ service_id: id });
    }



    //update service
    async updateService(id, data: ServiceDTO) {
        return this.serviceRepo.update({ service_id: id }, data); 
    }



    //delete service
    async deleteService(id) {
        return this.serviceRepo.delete({ service_id: id });
        
    }



    ///////////////////////////////////// service part end here ///////////////////////////////////////////////////////



    //////////////////////////////////// mechanic Service part start here /////////////////////////////////////////////

    //add service for mechanic
    async addServiceToMechanic(mechanic_id: number, service_id: number) {

        const mechanic = await this.mechanicRepo.findOne({
            where: { mechanic_id: mechanic_id },
            relations: { services: true }
        });

        const service = await this.serviceRepo.findOneBy({ service_id: service_id });
        if (!mechanic) {
            throw new HttpException('Mechanic doesnt exist', HttpStatus.NOT_FOUND);
        }
        if (!service) {
            throw new HttpException('Service doesnt exist', HttpStatus.NOT_FOUND);
        }
        
        if (mechanic && service) {
            mechanic.services = [...mechanic.services, service];
            return await this.mechanicRepo.save(mechanic);
        }
    }


    //get services by mechanic id
    async getServiceByMechanicID(id) {
        return this.mechanicRepo.findOne({
            where: { mechanic_id: id },
            relations: { services: true }
        });
    }


    //get services by service id
    async getMechanicServices() {
        return this.serviceRepo.find({ relations: { mechanics:true } })
    }



    //delete mechanic services
    async deleteMechanicServices(id: number, serviceId: number) {
        const mechanic = await this.getServiceByMechanicID(id);
        const service = await this.serviceRepo.findOneBy({ service_id: serviceId });
        if (mechanic && service) {
            mechanic.services = mechanic.services.filter((c) => c.service_id !== service.service_id);
            return await this.mechanicRepo.save(mechanic);
        }
    }


    //////////////////////////////////// mechanic service part end here /////////////////////////////////////////////


    //////////////////////////////////// Mechanic Response to service request part start //////////////////////////////



    /////////////////////////////////// Mechanic Response to service request part end /////////////////////////////////////


    /////////////////////////////////// customer part start here ///////////////////////////////////////////////////

    //Get customer by id
    async getCustomerById(id) {
        return this.customerRepo.findOneBy({ id: id });
    }


    ////////////////////////////////// customer part end here //////////////////////////////////////////////////////


    /////////////////////////////////// Chat with customer part start //////////////////////////////////////////////

    //Mechanic Send Message
    async mechanicSendMessage(mechanicid, customerid, message: ChatDTO) {
        const chat = new ChatEntity();
        chat.message = message.message;
        chat.sendermechanic = mechanicid;
        chat.receivercustomer = customerid;
        return this.chatRepo.save(chat)
    }


    //Show mechanic send and received chats
    async showMechanicChat(id) {
        return this.mechanicRepo.find({
            select: {
                mechanic_id: true,
                mechanic_name: true,
                profile: { mechanic_profilepic:true },
                sendmessage: {
                    message: true,
                    createDate: true,
                    receivercustomer: {
                        id: true,
                        name: true,
                        profilepic: true,
                    }
                },
                receivemessage: {
                    message: true,
                    createDate: true,
                    sendercustomer: {
                        id: true,
                        name: true,
                        profilepic: true
                    }
                }
            },
            where: { mechanic_id: id },
            relations: {
                profile: true,
                sendmessage: { receivercustomer: true },
                receivemessage: { sendercustomer:true }
            },
            
        })
    }

    ////////////////////////////////// Chat with customer part end /////////////////////////////////////////////////




}