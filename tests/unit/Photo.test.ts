import { expect } from "chai";
import Photo from "../../src/domain/entity/Photo";

describe('Photo entity', function () {
  it('Deve ser possível criar uma foto', function () {
    const photo = new Photo('4da5e84f-2040-4f1e-8207-a8f834351685', 'www.google.com/images/123');
    expect(photo).to.be.instanceof(Photo);
  });



});