import { defineStore } from "pinia";
import {reactive} from "vue";
import Palette from "@/models/Palette.js";

export const usePalettesStore = defineStore("palettes", () => {
    const palettes = reactive([]);

    const addPalettes = (qty) => {
        palettes.push(...Array.from({ length: qty }, () => new Palette()));
    };

    const removePalette = (index) => {
        palettes[index] = new Palette();
    };

    return {
        palettes,
        addPalettes,
        removePalette
    };
});