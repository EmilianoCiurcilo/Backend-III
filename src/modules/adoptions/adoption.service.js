import { NotFoundError } from "../../common/errors/errors.js";
import { adoptionDao } from "./adoption.dao.js";
import { petDao } from "../pets/pet.dao.js";
import { userDao } from "../users/user.dao.js";

class AdoptionService {
    async getAllAdoptions() {
        return await adoptionDao.getAll();
    }

    async getAdoption (query) {
        const adoption = await adoptionDao.getOne(query);
        if(!adoption) throw new NotFoundError("Adoption not found");

        return adoption;
    }

    async createAdoption (ownerID, petID) {
        const pet = await petDao.getOne({_id: petID });
        if(!pet) throw new NotFoundError("Pet not found");
        if (pet.adopted) throw new NotFoundError("Pet already adopted");

        const user = await userDao.getOne({ _id: ownerID });
        if(!user) throw new NotFoundError("User not found");

        const adoption = await adoptionDao.create({owner: ownerID, pet: petID });
        await petDao.update(pet._id, { adopted: true, owner: user._id });

        const updatePets = [...user.pets, {_id: pet._id}];
        await userDao.update(user._id, { pets: updatePets });

        return adoption;
    }
}

export const adoptionService = new AdoptionService();