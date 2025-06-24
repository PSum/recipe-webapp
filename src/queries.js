import { HttpError } from 'wasp/server'

export const getRecipe = async (args, context) => {
	if (!context.user) {
		throw new HttpError(401)
	}
	return context.entities.Recipe.findMany({
		where: { user: { id: context.user.id } },
		orderBy: { id: 'asc' },
	})
}
