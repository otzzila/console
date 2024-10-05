import { AirlockName, AirlockState } from "../../../routes/ypsilon-14/data";

export let airlocks = {
    BAY1: AirlockState.LOCKED,
    BAY2: AirlockState.UNLOCKED,
    MINESHAFT: AirlockState.UNLOCKED
}

export let showers = [false, false, false, false, false]

let hasAdmin: boolean = false;
export const getHasAdmin = () => hasAdmin
export const setHasAdmin = (newState: boolean) => {hasAdmin = newState}

let lifeSupport: boolean = true;
export const getLifeSupport = () => lifeSupport
export const setLifeSupport = (newState: boolean) => {lifeSupport = newState}