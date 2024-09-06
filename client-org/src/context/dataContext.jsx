import { createContext, useContext, useState, useEffect } from "react";

const SwitchContext = createContext();

export default function SwitchConnectionContextProvider({ children }) {
  const [calorySwt, setCalorySwt] = useState(false);
  const [mealSwt, setMealSwt] = useState(false);
  const [heartSwt, setHeartSwt] = useState(false);
  const [diabetesSwt, setDiabetesSwt] = useState(false);
  const [parkinsonsSwt, setParkinsonsSwt] = useState(false);
  const [mentalSwt, setMentalSwt] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/getSwitchStates")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setCalorySwt(data?.calorySwt);
          setMealSwt(data?.mealSwt);
          setHeartSwt(data?.heartSwt);
          setDiabetesSwt(data?.diabetesSwt);
          setParkinsonsSwt(data?.parkinsonsSwt);
          setMentalSwt(data?.mentalSwt);
        }
      })
      .catch((error) => console.error("Error fetching switch states:", error));
  }, []);

  return (
    <SwitchContext.Provider
      value={{
        calorySwt,
        setCalorySwt,
        mealSwt,
        setMealSwt,
        heartSwt,
        setHeartSwt,
        diabetesSwt,
        setDiabetesSwt,
        parkinsonsSwt,
        setParkinsonsSwt,
        mentalSwt,
        setMentalSwt,
      }}
    >
      {children}
    </SwitchContext.Provider>
  );
}

export const SwitchMug = () => {
  return useContext(SwitchContext);
};
