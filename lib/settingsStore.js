import { create } from "zustand";

const getInitialValue = (key, defaultValue) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) || defaultValue;
  }
  return defaultValue;
};

const useSettingsStore = create((set) => ({
  idealBedTime: getInitialValue("idealBedTime", "22:00"),
  idealWakeTime: getInitialValue("idealWakeTime", "06:00"),
  latency: Number(getInitialValue("latency", "15")),
  use12Hour: getInitialValue("use12Hour", "false") === "true",
  showInHours: getInitialValue("showInHours", "false") === "true",

  setIdealBedTime: (time) => {
    set({ idealBedTime: time });
    localStorage.setItem("idealBedTime", time);
  },
  setIdealWakeTime: (time) => {
    set({ idealWakeTime: time });
    localStorage.setItem("idealWakeTime", time);
  },
  setLatency: (minutes) => {
    set({ latency: minutes });
    localStorage.setItem("latency", minutes.toString());
  },
  setUse12Hour: (value) => {
    set({ use12Hour: value });
    localStorage.setItem("use12Hour", value.toString());
  },
  setShowInHours: (value) => {
    set({ showInHours: value });
    localStorage.setItem("showInHours", value.toString());
  },
}));

export default useSettingsStore;
