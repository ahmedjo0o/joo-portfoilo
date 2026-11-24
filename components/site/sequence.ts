import { SEQUENCE_FRAMES } from "./sequenceManifest";

export const FRAME_COUNT = SEQUENCE_FRAMES.length;
export const IMAGE_COUNT = Math.max(...SEQUENCE_FRAMES) + 1;

// Phones get the 960px frames, everything else the 1280px frames.
export function sequenceDir() {
    return window.innerWidth < 768 ? "/sequence/960/" : "/sequence/1280/";
}

export function frameSrc(id: number) {
    return `${sequenceDir()}${id.toString().padStart(3, "0")}.webp`;
}

export function firstFrameSrc() {
    return frameSrc(0);
}

// Load order: a coarse pass first (every 16th image, then 8th, 4th, 2nd, 1st), so the
// whole scroll range is covered quickly and the gaps fill in afterwards.
export function loadOrder(count: number) {
    const order: number[] = [];
    const seen = new Set<number>();
    for (const stride of [16, 8, 4, 2, 1]) {
        for (let i = 0; i < count; i += stride) {
            if (!seen.has(i)) {
                seen.add(i);
                order.push(i);
            }
        }
    }
    return order;
}

export { SEQUENCE_FRAMES };
