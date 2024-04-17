import { SejourMock } from "./sejour.mock";

export class SejourServiceMock {
    getSejours = jest.fn().mockResolvedValue(SejourMock);
    getSejoursByMedecinIdWithoutAvis = jest.fn().mockResolvedValue(SejourMock);
}