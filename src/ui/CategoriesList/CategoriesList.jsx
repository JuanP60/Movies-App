import React from "react";
import { useApiTMDB } from "../../routes/ProviderApiTMDB";
import { useNavigate } from "react-router-dom";

function CategoriesList() {

    const {fetchCategories, categories} = useApiTMDB();
    const navigate = useNavigate();

    // podriamos agregar en el apiprovider manejo dde errores para el fetch de categories.
    React.useEffect(() => {
        fetchCategories();
    }, [])

    // funcion para enviar a la ruta por categoria

    const categoriesRoute = (id, name) => {
        navigate(`/category/${id}/${name}`);
    };

    return (
        <div className="flex flex-col items-center">
            <p>Categorias</p>
            <ul className="flex gap-1.5">
                {categories.map(category => (
                    <li 
                    key={category.id} 
                    className="cursor-pointer"
                    onClick={() => categoriesRoute(category.id, category.name)}
                    >{category.name}</li>
                ))}
            </ul>
        </div>
    );
}

export {CategoriesList};