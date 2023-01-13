import Photo from '../../domain/entity/Photo';
import PhotoRepository from '../../domain/repository/PhotoRepository';

export default class SavePhoto {

  constructor(private photoRepository: PhotoRepository) { }

  async execute(photo: Photo) {
    await this.photoRepository.save(photo);
  }
}