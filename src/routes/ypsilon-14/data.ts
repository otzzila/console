export const shipName = 'IMS GRASSHOPPER'

export const spaceYear = 2665

export enum AirlockState {
    LOCKED = "LOCKED",
    UNLOCKED = "UNLOCKED",
    OPEN = "OPEN",
}

export enum AirlockName {
    BAY1 = "BAY1",
    BAY2 = "BAY2",
    MINESHAFT = "MINESHAFT",
}


export interface Status {
    airlocks: Record<AirlockName, AirlockState>,
    showers: boolean[],
    hasAdmin: boolean,
    lifeSupport: boolean,
}