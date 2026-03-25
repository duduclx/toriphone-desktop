import Wazo from "@wazo/sdk/lib/simple";

export const SearchPhoneDialer = async (inputValue, setSearchResult, user) => {
  
  if (inputValue.trim() === "") {
    return;
  }

  try {
    const get = await Wazo.dird.search("default", inputValue);
    if (get.length === 0) {
      // Si le résultat de la recherche est vide, afficher le numéro tapé
      const result = [{label: inputValue, value: inputValue}];
      setSearchResult(result);
      return result
    } else {
      const filteredResult = get.filter((item) => item.uuid !== user.uuid);
      setSearchResult(filteredResult); // Mettre à jour l'état avec le résultat de la recherche
      return filteredResult
    }
  } catch (error) {
    setSearchResult([]); // Réinitialiser le résultat en cas d'erreur
  }

};
