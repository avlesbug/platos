import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestoreDatabase } from "./utils/firebase.utils";
import { Recipe } from "./types";
import { IngredientsComponent } from "./IngredientsComponent";
import { InstructionsComponent } from "./InstructionsComponent";
import { ColorRing } from "react-loader-spinner";

interface Props {
    user: User | null;
}

export const RecipePage = ({user} : Props) => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState<Recipe>();

    const fetchPost = async () => {
        if(user){
            await getDoc(doc(firestoreDatabase, `users/${user.uid}/recipes/${recipeId}`)).then((docSnapshot) => {
                if (docSnapshot.exists()) {
                  // Document exists, you can access its data using docSnapshot.data()
                  const recipeData = docSnapshot.data();
                  console.log('Recipe data:', recipeData);
                  setRecipe({
                      id: docSnapshot.id,
                      name: recipeData.name,
                      ingredients: recipeData.ingredients,
                      instructions: recipeData.instructions,
                      portions: recipeData.portions,
                      image: recipeData.image,
                    }
                  )
                } else {
                  console.log('Document does not exist');
                }
              })
              .catch((error) => {
                console.error('Error getting document:', error);
              });
        }
    }
    useEffect(()=>{
        fetchPost();
    }, [])

    const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

    return(<>
      {recipe ?
        <div className="recipe-grid-layout">
          <div className="recipe-heading">
            <h4>{recipe.name}</h4>
          </div>
          <div className="ingredients">
            <IngredientsComponent recipe={recipe} />
          </div>
          <div className="image">
          {!imageLoaded && <div
            className="image-placeholder">
            </div>}
            <img
            className="recipe-image"
            src={recipe.image}
            alt={recipe.name}
            onLoad={handleImageLoad}
            />
          </div>
          <div className="instructions">
            <InstructionsComponent recipe={recipe} />
          </div>
        </div>
        :
        <ColorRing/>
      }
      </>
    )
}