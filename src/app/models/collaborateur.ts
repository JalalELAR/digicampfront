import { Grade } from "./grade";
import { Site } from "./site";
import { Techno } from "./techno";
import { Projet } from "./projet";
import { StatutCollab } from "./statut_collab";
import { Role } from "./role";

export class Collaborateur {
    id!:number;
    nom!:string;
    email!:string;
    image!:string;
    site!:Site;
    grade!:Grade;
    statutCollab!: StatutCollab;
    roleCollab!:Role;
    technologies!:Techno[];
    projets:Projet[] = [];
    projectCount!:number;
    [key: string]: any;
}
