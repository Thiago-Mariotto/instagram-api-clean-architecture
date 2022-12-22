import Photography from '../entity/Photography';

interface PhotoRepository {
  savePhoto(photo: Photography): Promise<void>;
}

export default PhotoRepository;