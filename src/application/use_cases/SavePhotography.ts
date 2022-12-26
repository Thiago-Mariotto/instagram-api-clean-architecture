import Photography from '../../domain/entity/Photography';
import PhotoRepository from '../../domain/repository/PhotographyRepository';

export default class SavePhotography {

  constructor(private photoRepository: PhotoRepository) { }

  async execute(photo: Photography) {
    await this.photoRepository.save(photo);
  }
}