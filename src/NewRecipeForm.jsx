import { useState } from "react"
import { createRecipe } from 'wasp/client/operations'
import { Header } from "./Header"

export const NewRecipeForm = () => {
	const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }])

	const handleChangeIngredient = (index, field, value) => {
		const newIngredients = [...ingredients]
		newIngredients[index][field] = value
		setIngredients(newIngredients)
	}

	const addIngredient = () => {
		setIngredients([...ingredients, { name: '', quantity: '' }])
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const target = event.target
			const name = target.name.value
			const notes = target.notes.value
			const calories = parseInt(target.calories.value, 10)

			const formattedIngredients = ingredients.map((i) => ({
				name: i.name,
				// quantity: parseFloat(i.quantity),
				quantity: String(i.quantity),
			}))

			await createRecipe({ name, notes, calories, incredients: formattedIngredients })
			target.reset()
			setIngredients([{ name: '', quantity: '' }])
		} catch (err) {
			window.alert('Error: ' + err.message)
		}
	}

	return (
		<>
			<Header />
			<div className='flex justify-center border-2 border-solid'>
				<form onSubmit={handleSubmit}>
					<input name="name" type="text" placeholder="Recipe name" required />
					<input name="notes" type="text" placeholder="notes" />
					<input name="calories" type="number" placeholder="Calories" required />

					<h4>Ingredients</h4>
					{ingredients.map((ingredient, index) => (
						<div key={index}>
							<input
								type="text"
								placeholder="Ingredient name"
								value={ingredient.name}
								onChange={(e) => handleChangeIngredient(index, 'name', e.target.value)}
								required
							/>
							<input
								type="text"
								placeholder="Quantity"
								value={ingredient.quantity}
								onChange={(e) => handleChangeIngredient(index, 'quantity', e.target.value)}
								required
							/>
						</div>
					))}

					<button type="button" onClick={addIngredient}>
						Add Ingredient
					</button>

					<input type="submit" value="Create Recipe" />
				</form >
			</div >
		</>
	)
}


