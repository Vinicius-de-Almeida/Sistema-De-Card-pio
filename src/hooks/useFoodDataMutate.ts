// src/hooks/useFoodDataMutate.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";
import type { FoodData } from "../interface/FoodData";

const postData = async (food: FoodData): Promise<any> => {
  // O Supabase espera receber um array no insert
  const { data, error } = await supabase
    .from('food')
    .insert([food]); 

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export function useFoodDataMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['food-data'] });
    }
  });

  return mutate;
}