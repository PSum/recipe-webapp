import { getRecipe, useQuery } from 'wasp/client/operations'
import './Main.css'
import { Header } from './Header'

export const MainPage = ({ user }) => {
	const { data: recipes, isLoading, error } = useQuery(getRecipe)

	return (
		<div className="h-screen w-full flex flex-col">
			<Header />
			<div className='flex flex-end'>
				{recipes && <RecipeList recipes={recipes} />}

				{isLoading && 'Loading...'}
				{error && 'Error: ' + error}


			</div>
		</div>
	)
}

const RecipeView = ({ recipe }) => {
	return (
		<div className='m-10'>
			{recipe.name}
		</div>
	)
}

const RecipeList = ({ recipes }) => {
	if (!recipes?.length) return <div>No Recipes</div>

	return (
		<div className='flex flex-col'>
			{recipes.map((recipe, idx) => (
				<RecipeView recipe={recipe} key={idx} />
			))}
		</div>
	)
}

