import { HttpError } from 'wasp/server'

export const createRecipe = async (args, context) => {
	if (!context.user) {
		throw new HttpError(401)
	}
	return context.entities.Recipe.create({
		data: {
			name: args.name,
			instructions: args.instructions,
			calories: args.calories,
			incredients: {
				create: args.incredients.map((ingredient) => ({
					name: ingredient.name,
					quantity: ingredient.quantity,
				})),
			},
			user: { connect: { id: context.user.id } },
		},
	});
};
