import Photography from '../entity/Photography';
interface PhotoRepository {
  save(photo: Photography): Promise<void>;
}

export default PhotoRepository;