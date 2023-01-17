import { expect } from "chai";
import Photo from "../../src/domain/entity/Photo";

describe('Photo entity', function () {
  it('Deve ser possível criar uma Photo', function () {
    const photo = new Photo('4da5e84f-2040-4f1e-8207-a8f834351685', 'www.google.com/images/123');
    expect(photo).to.be.instanceof(Photo);
  });

  it('Deve ser possível recuperar as informações de uma Photo', function () {
    const photo = new Photo('4da5e84f-2040-4f1e-8207-a8f834351685', 'www.google.com/images/123');
    const photoInfo = photo.getPhoto;
    expect(photoInfo).to.be.contains.all.keys(['identifier', 'url', 'ownerId', 'active', 'createdAt']);
  });

  it('Deve ser possível recuperar o identifier de Photo', function () {
    const photo = new Photo('4da5e84f-2040-4f1e-8207-a8f834351685', 'www.google.com/images/123');
    const photoId = photo.identifier;
    expect(photoId).to.be.an('string');
  });

  it('Deve ser possível recuperar a url de uma Photo', function () {
    const photo = new Photo('4da5e84f-2040-4f1e-8207-a8f834351685', 'www.google.com/images/123');
    const photoUrl = photo.url;
    expect(photoUrl).to.be.an('string');
  });

  it('Deve ser possível arquivar uma Photo', function () {
    const photo = new Photo('4da5e84f-2040-4f1e-8207-a8f834351685', 'www.google.com/images/123');
    photo.active = false;
    expect(photo.active).to.be.false;
  });

  it('Deve ser possível recuperar uma Photo arquivada', function () {
    const photo = new Photo('4da5e84f-2040-4f1e-8207-a8f834351685', 'www.google.com/images/123');
    photo.active = false;
    expect(photo.active).to.be.false;
    photo.active = true;
    expect(photo.active).to.be.true;
  });
});