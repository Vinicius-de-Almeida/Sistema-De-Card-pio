// src/hooks/useFoodData.tsx
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase"; // Importe o cliente que acabamos de criar
import type { FoodData } from "../interface/FoodData";

const fetchData = async (): Promise<FoodData[]> => {
  // Puxa todos os dados (*) da tabela 'food'
  const { data, error } = await supabase
    .from('food') // Certifique-se de que sua tabela no Supabase chama 'food'
    .select('*');

  // O React Query lida bem com erros se você der um 'throw'
  if (error) {
    throw new Error(error.message);
  }

  return data as FoodData[];
};

export function useFoodData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['food-data'],
    retry: 2
  });

  return {
    ...query,
    data: query.data // não precisa mais do .data do axios
  };
}