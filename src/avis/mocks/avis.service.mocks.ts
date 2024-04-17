import { avisMocks } from "./avis.mocks";

export class AvisServiceMock {
    getAvis = jest.fn();
    createAvisWithPrescription = jest.fn().mockResolvedValue(avisMocks);
}