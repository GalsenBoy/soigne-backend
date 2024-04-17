import { MedecinMock } from "./medecin.mock";

export class MedecinServiceMock {
    createMedecin = jest.fn();
    getMedecins = jest.fn().mockResolvedValue(MedecinMock);
    limitMedecinsWithFiveSejours = jest.fn();
}