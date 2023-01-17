import { expect } from "chai";
import Photo from "../../src/domain/entity/Photo";

describe('Photo', function () {
  it('Deve ser possível criar uma foto', function () {
    const photo = new Photo('4da5e84f-2040-4f1e-8207-a8f834351685', '');
    expect(photo).to.be.contains.all.keys(['identifier', 'ownerId', 'active', 'url', 'createdAt'])
  });
});