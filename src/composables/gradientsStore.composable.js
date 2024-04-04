import {useStorage} from "@vueuse/core";
import Palette from "@/models/Palette.js";

let gradients = useStorage('gradients', [])
export default function useGradientsStore () {

    addGradients(Array.from({ length: 30 }, () => new Palette()));

    function replaceGradient (idx, value) {
        if(!value || !gradients.value[idx]) {
            return
        }

        gradients.value[idx] = value;
    }

    function addGradients (gradientsList = []) {
        if (!gradients.value.length) {
            gradients.value = gradientsList;
        }
    }

    return {
        gradients,
        replaceGradient
    }
}
