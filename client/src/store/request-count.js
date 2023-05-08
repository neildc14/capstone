import { create } from "zustand";

export const useScheduleStore = create((set) => ({
  driver_data: {
    status: "",
    ambulance: "",
    ambulance_plate: "",
  },
  updateData: (newData) => set(() => ({ data: newData })),
}));
