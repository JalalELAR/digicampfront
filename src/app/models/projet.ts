import { Collaborateur } from "./collaborateur";
import { Status } from "./status";


export class Projet {
    id!:number;
    title!:string;
    description!:string;
    image!:string;
    status:Status = new Status();
    dated!:Date;
    collaborateurs!:Collaborateur[];
   
       
      
}
