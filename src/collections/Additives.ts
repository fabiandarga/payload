import { CollectionConfig } from "payload/types";
import { anyoneMayAccess } from "../access/generalAccess";
import { isAdmin } from "../access/isAdmin";

const Additives: CollectionConfig = {
    slug: 'additives',
    admin: {
      useAsTitle: 'name',
    },
    access: {
        create: isAdmin,
        read: anyoneMayAccess,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
        },
        {
            name: 'publicId',
            label: 'ID',
            type: 'text',
            unique: true,
        },
        {
            name: 'type',
            label: 'Typ',
            type: 'select',
            options: [{ label: 'Zusatzstoff', value: 'additive' }, { label: 'Allergen', value: 'allergen' }]
        }
      ],
};

export default Additives;